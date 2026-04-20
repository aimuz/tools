#!/usr/bin/env bash
# Build the per-feature wasm crates and stage them for Vite's asset pipeline.
#
# Rust crates (rust-wasm/crates/<dir>):
#   - wasm-pack build → rust-wasm/pkg/<dir>/
#   - copy .js glue + .d.ts + .wasm → src/wasm/rust/<dir>/
#
# Zig + C crates (zig-wasm/<dir>):
#   - zig cc -target wasm32-wasi each scalar .c → .o
#   - link via wasm-ld into a single wasm (no JS glue; export_name attrs)
#   - wasm-opt -Oz --converge → src/wasm/zig/<dir>/<dir>.wasm
#
# .wasm lives next to the JS glue so workers can import it via Vite's `?url`
# suffix. Vite then emits the binary into /_astro/ with a content hash, which
# lets us serve it with `Cache-Control: immutable` safely. Never put the .wasm
# in public/ — the filename there is stable across deploys, so `immutable`
# would strand users on old builds.

set -euo pipefail
cd "$(dirname "$0")/.."

ROOT="$(pwd)"
PKG_ROOT="$ROOT/rust-wasm/pkg"
RUST_DEST_ROOT="$ROOT/src/wasm/rust"
ZIG_DEST_ROOT="$ROOT/src/wasm/zig"

if ! command -v wasm-pack >/dev/null 2>&1; then
  echo "ERROR: wasm-pack not installed. See https://rustwasm.github.io/wasm-pack/installer/" >&2
  exit 1
fi

if ! command -v zig >/dev/null 2>&1; then
  echo "ERROR: zig not installed. See https://ziglang.org/download/" >&2
  exit 1
fi

mkdir -p "$RUST_DEST_ROOT" "$ZIG_DEST_ROOT"

build_rust_crate() {
  local crate_dir="$1"     # subdir under rust-wasm/crates
  local crate_name="$2"    # wasm-pack output stem (dashes replaced with underscores)

  echo "==> building rust/$crate_dir"
  wasm-pack build "rust-wasm/crates/$crate_dir" \
    --target web \
    --out-dir "$PKG_ROOT/$crate_dir" \
    --release

  local dest="$RUST_DEST_ROOT/$crate_dir"
  rm -rf "$dest"
  mkdir -p "$dest"

  cp "$PKG_ROOT/$crate_dir/${crate_name}.js" \
     "$PKG_ROOT/$crate_dir/${crate_name}.d.ts" \
     "$PKG_ROOT/$crate_dir/${crate_name}_bg.wasm.d.ts" \
     "$PKG_ROOT/$crate_dir/package.json" \
     "$dest/"

  local wasm_in="$PKG_ROOT/$crate_dir/${crate_name}_bg.wasm"
  local wasm_out="$dest/${crate_name}_bg.wasm"
  # System wasm-opt is newer than wasm-pack's bundled one and speaks the wasm
  # features current Rust emits (bulk-memory, nontrapping-fptoi, etc.).
  if command -v wasm-opt >/dev/null 2>&1; then
    wasm-opt "$wasm_in" -o "$wasm_out" \
      -O4 \
      --enable-bulk-memory \
      --enable-nontrapping-float-to-int \
      --enable-reference-types \
      --enable-sign-ext \
      --enable-mutable-globals
  else
    cp "$wasm_in" "$wasm_out"
  fi
}

# Build zig-wasm/webp/ — wrapper.c + vendored libwebp C sources → one wasm.
#
# Zig 0.16 on macOS has a shared-cache race that surfaces as "CacheCheckFailed"
# when multiple `zig cc` invocations run without isolated cache dirs. We give
# each compile step its own ZIG_LOCAL_CACHE_DIR / ZIG_GLOBAL_CACHE_DIR under a
# tmp dir that we clean up on exit. Rust crates don't hit this because
# wasm-pack owns the toolchain internally.
#
# Rust crates get `-O4` (they're already `opt-level="z"` from cargo, so the
# wasm-opt pass exists to add speed without blowing up size). Zig/C crates
# don't have that pre-pass, so they use `-Oz --converge` instead.
build_zig_webp() {
  local crate="webp"
  local lib="$ROOT/zig-wasm/$crate/vendor/libwebp"
  local src="$ROOT/zig-wasm/$crate/src"
  local dest="$ZIG_DEST_ROOT/$crate"

  echo "==> building zig/$crate"

  if [ ! -f "$lib/src/webp/encode.h" ]; then
    echo "ERROR: libwebp submodule not initialized." >&2
    echo "       Run: git submodule update --init --recursive" >&2
    exit 1
  fi

  local work
  work="$(mktemp -d -t wizgo-zig-webp.XXXXXX)"
  trap 'rm -rf "$work"' RETURN

  local objs="$work/objs"
  mkdir -p "$objs"

  # Scalar-only C sources. SIMD variants (SSE2/SSE41/NEON/MIPS/MSA) don't
  # match wasm32's available features, and their intrinsics won't compile
  # without target-specific flags. libwebp's runtime CPU detection falls
  # back to scalar cleanly when the SIMD implementations aren't linked.
  local -a srcs=("$src/wrapper.c")
  local dir f
  for dir in "$lib/src/enc" "$lib/src/dsp" "$lib/src/utils" "$lib/sharpyuv"; do
    for f in "$dir"/*.c; do
      case "$f" in
        *_neon.c|*_sse2.c|*_sse41.c|*_mips32.c|*_mips_dsp_r2.c|*_msa.c) continue ;;
      esac
      srcs+=("$f")
    done
  done

  local i=0
  for f in "${srcs[@]}"; do
    local base
    base="$(basename "${f%.c}")"
    i=$((i+1))
    ZIG_LOCAL_CACHE_DIR="$work/zc-L-$i" \
    ZIG_GLOBAL_CACHE_DIR="$work/zc-G-$i" \
      zig cc -target wasm32-wasi -Oz -c "$f" \
        -I"$lib" -I"$lib/src" \
        -o "$objs/$base.o"
  done

  # Link. No --export= flags needed: wrapper.c uses
  # __attribute__((export_name("…"))) which the .o carries forward into the
  # final wasm as proper exports.
  ZIG_LOCAL_CACHE_DIR="$work/zc-L-link" \
  ZIG_GLOBAL_CACHE_DIR="$work/zc-G-link" \
    zig cc -target wasm32-wasi -Oz \
      -Wl,--no-entry \
      "$objs"/*.o \
      -o "$work/$crate.raw.wasm"

  rm -rf "$dest"
  mkdir -p "$dest"

  if command -v wasm-opt >/dev/null 2>&1; then
    wasm-opt "$work/$crate.raw.wasm" -o "$dest/$crate.wasm" \
      -O4 --converge --strip-debug --strip-producers \
      --enable-bulk-memory \
      --enable-nontrapping-float-to-int \
      --enable-reference-types \
      --enable-sign-ext \
      --enable-mutable-globals
  else
    cp "$work/$crate.raw.wasm" "$dest/$crate.wasm"
  fi
}

build_rust_crate image image_tools
build_rust_crate watermark watermark
build_rust_crate mp3 mp3_encode
build_zig_webp

echo ""
echo "==> wasm sizes"
ls -lah "$RUST_DEST_ROOT"/*/*.wasm "$ZIG_DEST_ROOT"/*/*.wasm 2>/dev/null \
  | awk '{printf "  %-70s %s\n", $NF, $5}'
