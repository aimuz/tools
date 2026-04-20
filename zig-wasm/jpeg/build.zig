const std = @import("std");

// Build MozJPEG (vendored under vendor/mozjpeg) + our wrapper.c into one
// wasm module. Three MozJPEG specifics worth calling out:
//
//   - MozJPEG ships only templated config headers (`jconfig.h.in`, etc.)
//     that cmake is meant to fill in. We keep hand-maintained
//     replacements under `config/` so we don't have to run cmake for
//     build-time constants.
//   - `jstdhuff.c` is a `#include`-only file (pulled in by jcparam.c).
//     Don't list it here or the standalone compile will fail.
//   - `jpegyuv.c` references the decompressor API; since we're
//     encode-only, skipping it avoids a decoder-side link.
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

    mod.addIncludePath(b.path("config"));
    mod.addIncludePath(b.path("vendor/mozjpeg"));

    const cflags: []const []const u8 = &.{"-Oz"};

    mod.addCSourceFile(.{ .file = b.path("src/wrapper.c"), .flags = cflags });

    for (mozjpeg_sources) |rel| {
        mod.addCSourceFile(.{
            .file = b.path(b.pathJoin(&.{ "vendor/mozjpeg", rel })),
            .flags = cflags,
        });
    }

    const exe = b.addExecutable(.{
        .name = "jpeg",
        .root_module = mod,
        .linkage = .static,
    });
    // `export_name` attrs on `wrapper.c` functions drive the exports; no
    // explicit `--export` flags needed. See zig-wasm/webp/build.zig for
    // the rationale.
    exe.entry = .disabled;
    exe.rdynamic = false;

    b.installArtifact(exe);
}

const mozjpeg_sources = [_][]const u8{
    "jaricom.c",
    "jcapimin.c",
    "jcapistd.c",
    "jcarith.c",
    "jccoefct.c",
    "jccolor.c",
    "jcdctmgr.c",
    "jcext.c",
    "jchuff.c",
    "jcicc.c",
    "jcinit.c",
    "jcmainct.c",
    "jcmarker.c",
    "jcmaster.c",
    "jcomapi.c",
    "jcparam.c",
    "jcphuff.c",
    "jcprepct.c",
    "jcsample.c",
    "jctrans.c",
    "jdatadst.c",
    "jerror.c",
    "jfdctflt.c",
    "jfdctfst.c",
    "jfdctint.c",
    "jmemmgr.c",
    "jmemnobs.c",
    "jquant1.c",
    "jquant2.c",
    "jsimd_none.c",
    "jutils.c",
};
