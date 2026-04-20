#!/usr/bin/env bash

curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
sources ~/.bashrc

mise install
sources ~/.bashrc

cargo --version
cargo install wasm-pack
