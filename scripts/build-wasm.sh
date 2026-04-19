#!/usr/bin/env bash
# Build the per-feature wasm crates and stage them for Vite's asset pipeline.
#
# For each crate in rust-wasm/crates/<dir>:
#   - wasm-pack build → rust-wasm/pkg/<dir>/
#   - copy .js glue + .d.ts + .wasm → src/wasm/rust-image/<dir>/
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
DEST_ROOT="$ROOT/src/wasm/rust-image"

if ! command -v wasm-pack >/dev/null 2>&1; then
  echo "ERROR: wasm-pack not installed. See https://rustwasm.github.io/wasm-pack/installer/" >&2
  exit 1
fi

mkdir -p "$DEST_ROOT"

build_crate() {
  local crate_dir="$1"     # subdir under rust-wasm/crates
  local crate_name="$2"    # wasm-pack output stem (dashes replaced with underscores)

  echo "==> building $crate_dir"
  wasm-pack build "rust-wasm/crates/$crate_dir" \
    --target web \
    --out-dir "$PKG_ROOT/$crate_dir" \
    --release

  local dest="$DEST_ROOT/$crate_dir"
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
      -Oz \
      --enable-bulk-memory \
      --enable-nontrapping-float-to-int \
      --enable-reference-types \
      --enable-sign-ext \
      --enable-mutable-globals
  else
    cp "$wasm_in" "$wasm_out"
  fi
}

build_crate image image_tools
build_crate watermark watermark
build_crate mp3 mp3_encode

echo ""
echo "==> wasm sizes"
ls -lah "$DEST_ROOT"/*/*.wasm | awk '{printf "  %-70s %s\n", $NF, $5}'
