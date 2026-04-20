# zig-wasm

Zig + C wasm crates, sibling to `rust-wasm/`. Build outputs land under
`src/wasm/zig/<crate>/` (mirrors `src/wasm/rust/<crate>/`).

Zig is used here as a portable `cc` front-end for C libraries that are the
reference implementations in their domain — cases where a pure-Rust port is
noticeably worse (e.g. `image-webp` crate vs libwebp). Zig's wasi-libc and
`wasm32-wasi` target let us cross-compile straightforward C to wasm without
Emscripten's JS runtime overhead.

## Crates

- `webp/` — libwebp 1.4.0 (C, vendored as git submodule), scalar-only build.
  ~180 KB wasm after `wasm-opt -Oz --converge`.

## Toolchain

- `zig` ≥ 0.16 (cross-compiler + wasi-libc)
- `wasm-opt` from `binaryen` (size-optimizer pass)

## Build

`bun run build:wasm` drives both Rust (wasm-pack) and Zig builds; see
`scripts/build-wasm.sh`. The Zig crates have no build cache in the repo —
everything is rebuilt from source each time.

## Adding a new crate

1. `mkdir zig-wasm/<name>/{src,vendor}`
2. Vendor the C sources (git submodule under `vendor/` or direct copy)
3. Write `<name>/src/wrapper.c` with `__attribute__((export_name("…")))`
   for every symbol JS needs
4. Add a branch in `scripts/build-wasm.sh` that lists the scalar C files,
   compiles each via `zig cc -target wasm32-wasi -Oz -c`, links with
   `wasm-ld`, runs `wasm-opt -Oz --converge`, and emits to
   `src/wasm/zig/<name>/<name>.wasm`
