#!/usr/bin/env bash
# Build the per-feature wasm crates and deploy artifacts into the app.
#
# For each crate in rust-wasm/crates/<dir>:
#   - wasm-pack build → rust-wasm/pkg/<dir>/
#   - copy JS glue + .d.ts         → src/wasm/rust-image/<dir>/     (bundled by vite)
#   - copy .wasm binary            → public/rust-image/<dir>/       (served statically)
#
# Worker references these as:
#   import('./rust-image/<dir>/<crate_name>.js')
#   default('/rust-image/<dir>/<crate_name>_bg.wasm')

set -euo pipefail
cd "$(dirname "$0")/.."

ROOT="$(pwd)"
PKG_ROOT="$ROOT/rust-wasm/pkg"
JS_ROOT="$ROOT/src/wasm/rust-image"
WASM_ROOT="$ROOT/public/rust-image"

if ! command -v wasm-pack >/dev/null 2>&1; then
  echo "ERROR: wasm-pack not installed. See https://rustwasm.github.io/wasm-pack/installer/" >&2
  exit 1
fi

mkdir -p "$JS_ROOT" "$WASM_ROOT"

build_crate() {
  local crate_dir="$1"     # subdir under rust-wasm/crates
  local crate_name="$2"    # wasm-pack output stem (dashes replaced with underscores)

  echo "==> building $crate_dir"
  wasm-pack build "rust-wasm/crates/$crate_dir" \
    --target web \
    --out-dir "$PKG_ROOT/$crate_dir" \
    --release

  local js_dest="$JS_ROOT/$crate_dir"
  rm -rf "$js_dest"
  mkdir -p "$js_dest"
  cp "$PKG_ROOT/$crate_dir/${crate_name}.js" \
     "$PKG_ROOT/$crate_dir/${crate_name}.d.ts" \
     "$PKG_ROOT/$crate_dir/${crate_name}_bg.wasm.d.ts" \
     "$PKG_ROOT/$crate_dir/package.json" \
     "$js_dest/"

  local wasm_dest="$WASM_ROOT/$crate_dir"
  rm -rf "$wasm_dest"
  mkdir -p "$wasm_dest"
  local wasm_in="$PKG_ROOT/$crate_dir/${crate_name}_bg.wasm"
  local wasm_out="$wasm_dest/${crate_name}_bg.wasm"
  # If a modern system wasm-opt is on PATH, use it for -Oz shrink with the
  # newer feature flags enabled. Otherwise just copy.
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

echo ""
echo "==> wasm sizes"
ls -lah "$WASM_ROOT"/*/*.wasm | awk '{printf "  %-60s %s\n", $NF, $5}'
