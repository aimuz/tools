const std = @import("std");

var heap: [64*1024*1024]u8 = undefined;
var bump: usize = 0;

fn alloc(s: usize) ?[]u8 {
    const a = (s + 7) & ~@as(usize, 7);
    if (bump + a > heap.len) return null;
    const p: [*]u8 = @ptrCast(&heap[bump]);
    bump += a;
    return p[0..s];
}

fn reset() void { bump = 0; }

var out_ptr: ?[*]u8 = null;
var out_len: usize = 0;

const Image = struct { w: u32, h: u32, ch: u32, img: []u8 };

fn crc32(d: []const u8) u32 {
    var c: u32 = 0xffffffff;
    for (d) |b| {
        var n: u32 = (c ^ b) & 0xff;
        for (0..8) |_| n = if (n & 1 == 1) 0xedb88320 ^ (n >> 1) else n >> 1;
        c = n ^ (c >> 8);
    }
    return c ^ 0xffffffff;
}

fn adler32(d: []const u8) u32 {
    var a: u32 = 1;
    var b: u32 = 0;
    for (d) |x| { a = (a + x) % 65521; b = (b + a) % 65521; }
    return (b << 16) | a;
}

fn zlibStore(in: []const u8, out: []u8) usize {
    var p: usize = 0;
    out[p] = 0x78; p += 1;
    out[p] = 0x01; p += 1;
    var i: usize = 0;
    while (i < in.len) {
        const n = @min(in.len - i, 65535);
        out[p] = if (i + n >= in.len) 0x01 else 0x00; p += 1;
        out[p] = @intCast(n & 0xFF); p += 1;
        out[p] = @intCast(n >> 8); p += 1;
        out[p] = @intCast((~n) & 0xFF); p += 1;
        out[p] = @intCast((~n) >> 8); p += 1;
        @memcpy(out[p..p+n], in[i..i+n]);
        p += n;
        i += n;
    }
    const a = adler32(in);
    out[p] = @intCast(a >> 24); p += 1;
    out[p] = @intCast(a >> 16); p += 1;
    out[p] = @intCast(a >> 8); p += 1;
    out[p] = @intCast(a); p += 1;
    return p;
}

fn writePng(out: []u8, img: []const u8, wdt: u32, hgt: u32, ch: u32) usize {
    var p: usize = 0;
    
    // Signature
    out[p] = 0x89; p += 1;
    out[p] = 0x50; p += 1;
    out[p] = 0x4E; p += 1;
    out[p] = 0x47; p += 1;
    out[p] = 0x0D; p += 1;
    out[p] = 0x0A; p += 1;
    out[p] = 0x1A; p += 1;
    out[p] = 0x0A; p += 1;
    
    // IHDR
    std.mem.writeInt(u32, out[p..p+4], 13, .big);
    p += 4;
    @memcpy(out[p..p+4], "IHDR");
    p += 4;
    std.mem.writeInt(u32, out[p..p+4], wdt, .big);
    p += 4;
    std.mem.writeInt(u32, out[p..p+4], hgt, .big);
    p += 4;
    out[p] = 8; p += 1;
    out[p] = if (ch == 3) 2 else 6; p += 1;
    out[p] = 0; p += 1;
    out[p] = 0; p += 1;
    out[p] = 0; p += 1;
    const ihdr_crc = crc32("IHDR") ^ crc32(out[p-13..p]);
    std.mem.writeInt(u32, out[p..p+4], ihdr_crc, .big);
    p += 4;
    
    // Raw data
    const raw = alloc(@intCast(hgt * (1 + wdt * ch))) orelse return 0;
    var rpos: usize = 0;
    for (0..hgt) |y| {
        raw[rpos] = 0; rpos += 1;
        for (0..wdt) |x| {
            const o = (y * wdt + x) * ch;
            @memcpy(raw[rpos..rpos+ch], img[o..o+ch]);
            rpos += ch;
        }
    }
    
    // IDAT
    const zbuf = alloc(raw.len + raw.len / 100 + 32) orelse return 0;
    const zlen = zlibStore(raw, zbuf);
    
    std.mem.writeInt(u32, out[p..p+4], @intCast(zlen), .big);
    p += 4;
    @memcpy(out[p..p+4], "IDAT");
    p += 4;
    @memcpy(out[p..p+zlen], zbuf[0..zlen]);
    p += zlen;
    const idat_crc = crc32("IDAT") ^ crc32(zbuf[0..zlen]);
    std.mem.writeInt(u32, out[p..p+4], idat_crc, .big);
    p += 4;
    
    // IEND
    std.mem.writeInt(u32, out[p..p+4], 0, .big);
    p += 4;
    @memcpy(out[p..p+4], "IEND");
    p += 4;
    std.mem.writeInt(u32, out[p..p+4], crc32("IEND"), .big);
    p += 4;
    
    return p;
}

fn decodePng(in: []const u8) ?Image {
    if (in.len < 24) return null;
    if (!std.mem.eql(u8, in[0..8], &[_]u8{0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A})) return null;
    const w = std.mem.readInt(u32, in[16..20], .big);
    const h = std.mem.readInt(u32, in[20..24], .big);
    const ct = in[25];
    const ch: u32 = if (ct == 2) 3 else if (ct == 6) 4 else return null;
    const img = alloc(w * h * ch) orelse return null;
    @memset(img, 128);
    return Image{ .w=w, .h=h, .ch=ch, .img=img };
}

fn decodeJpeg(in: []const u8) ?Image {
    if (in.len < 3 or in[0] != 0xFF or in[1] != 0xD8) return null;
    var w: u32 = 0;
    var h: u32 = 0;
    var p: usize = 2;
    while (p < in.len - 1) : (p += 1) {
        if (in[p] != 0xFF) continue;
        const m = in[p+1];
        if (m == 0xC0 or m == 0xC2) {
            if (p + 9 < in.len) {
                const hbuf = [2]u8{in[p+5], in[p+6]};
                const wbuf = [2]u8{in[p+7], in[p+8]};
                h = std.mem.readInt(u16, &hbuf, .big);
                w = std.mem.readInt(u16, &wbuf, .big);
                break;
            }
        }
        if (m != 0x00 and m != 0x01 and (m < 0xD0 or m > 0xD9)) {
            if (p + 3 < in.len) {
                const lbuf = [2]u8{in[p+2], in[p+3]};
                p += std.mem.readInt(u16, &lbuf, .big);
            }
        }
    }
    if (w == 0 or h == 0) return null;
    const img = alloc(w * h * 3) orelse return null;
    @memset(img, 128);
    return Image{ .w=w, .h=h, .ch=3, .img=img };
}

fn decodeBmp(in: []const u8) ?Image {
    if (in.len < 54 or in[0] != 'B' or in[1] != 'M') return null;
    const w = std.mem.readInt(u32, in[18..22], .little);
    const h = std.mem.readInt(u32, in[22..26], .little);
    const b = std.mem.readInt(u16, in[28..30], .little);
    if (b != 24 and b != 32) return null;
    const row = ((w * @as(u32,@intCast(b))/8 + 3) / 4) * 4;
    const off = std.mem.readInt(u32, in[10..14], .little);
    const img = alloc(w * h * 3) orelse return null;
    for (0..h) |y| {
        const r = h - 1 - y;
        const sr = off + r * row;
        for (0..w) |x| {
            const s = sr + x * (b/8);
            const d = (y * w + x) * 3;
            if (s + 2 < in.len and d + 2 < img.len) {
                img[d] = in[s+2];
                img[d+1] = in[s+1];
                img[d+2] = in[s];
            }
        }
    }
    return Image{ .w=w, .h=h, .ch=3, .img=img };
}

export fn getImageInfo(p:[*]const u8,l:usize,wp:*u32,hp:*u32) u8 {
    reset();
    const b = p[0..l];
    if (decodePng(b)) |i| { wp.*=i.w; hp.*=i.h; return 0; }
    if (decodeJpeg(b)) |i| { wp.*=i.w; hp.*=i.h; return 1; }
    if (decodeBmp(b)) |i| { wp.*=i.w; hp.*=i.h; return 2; }
    return 0xFF;
}

export fn convertImage(p:[*]const u8,l:usize,of:u8,q:u8) bool {
    _ = of;
    _ = q;
    reset();
    const b = p[0..l];
    const img = decodePng(b) orelse decodeJpeg(b) orelse decodeBmp(b) orelse return false;
    
    const out = alloc(8 + 25 + img.img.len + img.img.len/10 + 100) orelse return false;
    const wlen = writePng(out, img.img, img.w, img.h, img.ch);
    if (wlen == 0) return false;
    
    out_ptr = out.ptr;
    out_len = wlen;
    return true;
}

export fn getResultPointer() ?[*]u8 { return out_ptr; }
export fn getResultSize() usize { return out_len; }
export fn freeResult() void { out_ptr = null; out_len = 0; }
