const std = @import("std");

// Build libwebp (vendored under vendor/libwebp) + our wrapper.c into one
// wasm module, installed at the prefix-relative path `bin/webp.wasm` —
// `scripts/build-wasm.sh` then copies that through wasm-opt into
// `src/wasm/zig/webp/`.
//
// Source enumeration is live against the vendored tree. We walk the four
// libwebp scalar-source directories (`src/dsp`, `src/enc`, `src/utils`,
// `sharpyuv`) and feed every `.c` file that isn't a SIMD variant to the
// compiler. Runtime CPU detection in libwebp picks the scalar path when
// the SIMD implementations aren't linked, so dropping them is safe.
//
// Two choices worth calling out:
//   - wasm32-wasi target: Zig 0.16 doesn't supply a libc for
//     wasm32-freestanding, but wasi-libc's `malloc`/`free` are pure
//     in-memory (no real syscalls) — the browser never hits a WASI
//     import it can't stub.
//   - No entry + export_name attrs: `wrapper.c` uses
//     `__attribute__((export_name("…")))`; we need `entry = .disabled`
//     plus no `--export` CLI flags so wasm-ld honors the attrs and
//     doesn't try to resolve non-existent C-level symbols.
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

    const scalar_dirs = [_][]const u8{
        "vendor/libwebp/src/dsp",
        "vendor/libwebp/src/enc",
        "vendor/libwebp/src/utils",
        "vendor/libwebp/sharpyuv",
    };
    for (scalar_dirs) |dir| {
        addScalarCSources(b, mod, dir, cflags);
    }

    const exe = b.addExecutable(.{
        .name = "webp",
        .root_module = mod,
        .linkage = .static,
    });
    exe.entry = .disabled;
    exe.rdynamic = false;

    b.installArtifact(exe);
}

const skip_suffixes = [_][]const u8{
    "_neon.c",
    "_sse2.c",
    "_sse41.c",
    "_mips32.c",
    "_mips_dsp_r2.c",
    "_msa.c",
};

fn addScalarCSources(
    b: *std.Build,
    mod: *std.Build.Module,
    rel_dir: []const u8,
    cflags: []const []const u8,
) void {
    var dir = b.build_root.handle.openDir(b.graph.io, rel_dir, .{ .iterate = true }) catch |err|
        std.debug.panic("cannot open {s}: {s}", .{ rel_dir, @errorName(err) });
    defer dir.close(b.graph.io);

    var it = dir.iterate();
    while (it.next(b.graph.io) catch null) |entry| {
        if (entry.kind != .file) continue;
        if (!std.mem.endsWith(u8, entry.name, ".c")) continue;
        var skip = false;
        for (skip_suffixes) |suf| {
            if (std.mem.endsWith(u8, entry.name, suf)) {
                skip = true;
                break;
            }
        }
        if (skip) continue;

        const rel_path = b.pathJoin(&.{ rel_dir, entry.name });
        mod.addCSourceFile(.{ .file = b.path(rel_path), .flags = cflags });
    }
}
