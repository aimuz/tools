#!/usr/bin/env bash

curl https://mise.run | sh
echo 'eval "$(~/.local/bin/mise activate bash)"' >> ~/.bashrc
source ~/.bashrc

mise install
source ~/.bashrc

cargo --version
cargo install wasm-pack
