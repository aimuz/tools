const std = @import("std");

// Build libwebp (vendored under vendor/libwebp) + our wrapper.c into one
// wasm module and install it at the prefix-relative path `webp.wasm`
// (which `scripts/build-wasm.sh` then copies to `src/wasm/zig/webp/`).
//
// Three choices worth calling out:
//   - wasm32-wasi target: Zig 0.16 doesn't supply a libc for
//     wasm32-freestanding, but wasi-libc's `malloc`/`free` are pure
//     in-memory (no real syscalls), so the browser never hits a WASI
//     import it can't stub.
//   - ReleaseSmall: libwebp is size-dominated, not speed-dominated, for
//     our single-threaded use. We further run `wasm-opt` outside the
//     build graph (see the top-level build script).
//   - No entry + export_name attrs: `wrapper.c` uses
//     `__attribute__((export_name("…")))`; we need `entry = .disabled`
//     plus no `--export` CLI flags so wasm-ld honors the attrs.
pub fn build(b: *std.Build) void {
    const target = b.resolveTargetQuery(.{
        .cpu_arch = .wasm32,
        .os_tag = .wasi,
    });
    const optimize = b.standardOptimizeOption(.{
        .preferred_optimize_mode = .ReleaseSmall,
    });

    const mod = b.createModule(.{
        .target = target,
        .optimize = optimize,
        .link_libc = true,
    });

    mod.addIncludePath(b.path("vendor/libwebp"));
    mod.addIncludePath(b.path("vendor/libwebp/src"));

    const cflags: []const []const u8 = &.{"-Oz"};

    mod.addCSourceFile(.{ .file = b.path("src/wrapper.c"), .flags = cflags });

    // libwebp 1.4.0 scalar-only sources. SIMD variants (_sse2, _sse41,
    // _neon, _mips32, _mips_dsp_r2, _msa) won't compile for wasm32 without
    // target-specific flags, and libwebp's runtime CPU detection falls
    // back to scalar cleanly when they aren't linked.
    for (libwebp_sources) |rel| {
        mod.addCSourceFile(.{
            .file = b.path(b.pathJoin(&.{ "vendor/libwebp", rel })),
            .flags = cflags,
        });
    }

    const exe = b.addExecutable(.{
        .name = "webp",
        .root_module = mod,
        .linkage = .static,
    });
    // No `entry` point, and no explicit `--export` flags: `wrapper.c` uses
    // `__attribute__((export_name("…")))` so wasm-ld walks the .o files
    // and picks up the exports automatically. Setting
    // `export_symbol_names` here would make wasm-ld look for C symbols
    // `alloc`/`dealloc`/… which don't exist (the real names are
    // `wg_alloc` etc, rewritten by the attribute at link time).
    exe.entry = .disabled;
    exe.rdynamic = false;

    b.installArtifact(exe);
}

const libwebp_sources = [_][]const u8{
    // src/dsp (scalar)
    "src/dsp/alpha_processing.c",
    "src/dsp/cost.c",
    "src/dsp/cpu.c",
    "src/dsp/dec.c",
    "src/dsp/dec_clip_tables.c",
    "src/dsp/enc.c",
    "src/dsp/filters.c",
    "src/dsp/lossless.c",
    "src/dsp/lossless_enc.c",
    "src/dsp/rescaler.c",
    "src/dsp/ssim.c",
    "src/dsp/upsampling.c",
    "src/dsp/yuv.c",
    // src/enc
    "src/enc/alpha_enc.c",
    "src/enc/analysis_enc.c",
    "src/enc/backward_references_cost_enc.c",
    "src/enc/backward_references_enc.c",
    "src/enc/config_enc.c",
    "src/enc/cost_enc.c",
    "src/enc/filter_enc.c",
    "src/enc/frame_enc.c",
    "src/enc/histogram_enc.c",
    "src/enc/iterator_enc.c",
    "src/enc/near_lossless_enc.c",
    "src/enc/picture_csp_enc.c",
    "src/enc/picture_enc.c",
    "src/enc/picture_psnr_enc.c",
    "src/enc/picture_rescale_enc.c",
    "src/enc/picture_tools_enc.c",
    "src/enc/predictor_enc.c",
    "src/enc/quant_enc.c",
    "src/enc/syntax_enc.c",
    "src/enc/token_enc.c",
    "src/enc/tree_enc.c",
    "src/enc/vp8l_enc.c",
    "src/enc/webp_enc.c",
    // src/utils
    "src/utils/bit_reader_utils.c",
    "src/utils/bit_writer_utils.c",
    "src/utils/color_cache_utils.c",
    "src/utils/filters_utils.c",
    "src/utils/huffman_encode_utils.c",
    "src/utils/huffman_utils.c",
    "src/utils/palette.c",
    "src/utils/quant_levels_dec_utils.c",
    "src/utils/quant_levels_utils.c",
    "src/utils/random_utils.c",
    "src/utils/rescaler_utils.c",
    "src/utils/thread_utils.c",
    "src/utils/utils.c",
    // sharpyuv
    "sharpyuv/sharpyuv.c",
    "sharpyuv/sharpyuv_cpu.c",
    "sharpyuv/sharpyuv_csp.c",
    "sharpyuv/sharpyuv_dsp.c",
    "sharpyuv/sharpyuv_gamma.c",
};
