#!/usr/bin/env bash
# Build the per-feature wasm crates and stage them for Vite's asset pipeline.
#
# Rust crates (rust-wasm/crates/<dir>):
#   - wasm-pack build → rust-wasm/pkg/<dir>/
#   - copy .js glue + .d.ts + .wasm → src/wasm/rust/<dir>/
#
# Zig + C crates (zig-wasm/<dir>):
#   - each crate owns a build.zig that knows its source list / include
#     paths; this script just runs `zig build` and picks up the output
#   - wasm-opt -O4 --converge → src/wasm/zig/<dir>/<dir>.wasm
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

# Drive each zig-wasm/<crate>/build.zig — the crate owns its source list
# and compile flags. We just run `zig build` and copy the output through
# wasm-opt. Rust crates get `-O4` (Cargo already did `opt-level="z"`, so
# wasm-opt is layered for speed); Zig crates skip the Rust prepass so
# `-O4 --converge` is the balanced size+speed pick there too.
build_zig_crate() {
  local crate="$1"
  local root="$ROOT/zig-wasm/$crate"
  local dest="$ZIG_DEST_ROOT/$crate"

  echo "==> building zig/$crate"

  if [ ! -f "$root/build.zig" ]; then
    echo "ERROR: $root/build.zig not found" >&2
    exit 1
  fi

  (cd "$root" && zig build -Drelease)

  local wasm_in="$root/zig-out/bin/$crate.wasm"
  if [ ! -f "$wasm_in" ]; then
    echo "ERROR: $wasm_in not produced by zig build" >&2
    exit 1
  fi

  rm -rf "$dest"
  mkdir -p "$dest"

  if command -v wasm-opt >/dev/null 2>&1; then
    wasm-opt "$wasm_in" -o "$dest/$crate.wasm" \
      -O4 --converge --strip-debug --strip-producers \
      --enable-bulk-memory \
      --enable-nontrapping-float-to-int \
      --enable-reference-types \
      --enable-sign-ext \
      --enable-mutable-globals
  else
    cp "$wasm_in" "$dest/$crate.wasm"
  fi
}

build_rust_crate image image_tools
build_rust_crate watermark watermark
build_rust_crate mp3 mp3_encode
build_zig_crate webp
build_zig_crate jpeg

echo ""
echo "==> wasm sizes"
ls -lah "$RUST_DEST_ROOT"/*/*.wasm "$ZIG_DEST_ROOT"/*/*.wasm 2>/dev/null \
  | awk '{printf "  %-70s %s\n", $NF, $5}'
