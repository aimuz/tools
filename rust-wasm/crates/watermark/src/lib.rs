// Dual-layer watermark: LSB (exact, PNG-only) + DCT (JPEG-survivable).
//
// Embed: DCT first on luminance mid-frequency coefficients, then LSB on top.
// The LSB ±1 shift is well below the DCT margin so both signals coexist.
//
// Extract: try DCT first (robust), fall back to LSB (exact).
//
// Header layout (9 bytes, LE):
//   0..3  magic       "WZGL" for LSB, "WZGD" for DCT
//   4     flags       reserved, always 0
//   5..8  payloadLen  u32 LE, UTF-8 byte count

use std::sync::OnceLock;
use wasm_bindgen::prelude::*;

const MAGIC_LSB: [u8; 4] = *b"WZGL";
const MAGIC_DCT: [u8; 4] = *b"WZGD";
const HEADER_LEN: usize = 9;

// Middle-frequency coefficient pair chosen to survive JPEG Q >= 75.
// Standard JPEG luma quantization at (2,3)/(3,2) is ~14-24 at Q=50;
// a 30-unit gap leaves headroom after re-encoding + PNG round-trip noise.
const DCT_MARGIN: f64 = 30.0;
const C1_IDX: usize = 2 * 8 + 3; // coef[2][3]
const C2_IDX: usize = 3 * 8 + 2; // coef[3][2]

fn set_panic_hook() {
    #[cfg(feature = "debug-panics")]
    console_error_panic_hook::set_once();
}

// ---------- DCT basis (computed once) ----------

fn m_matrix() -> &'static [[f64; 8]; 8] {
    static M: OnceLock<[[f64; 8]; 8]> = OnceLock::new();
    M.get_or_init(|| {
        let mut m = [[0.0; 8]; 8];
        for k in 0..8 {
            let ck = if k == 0 {
                1.0 / std::f64::consts::SQRT_2
            } else {
                1.0
            };
            for n in 0..8 {
                m[k][n] = 0.5
                    * ck
                    * ((2.0 * n as f64 + 1.0) * k as f64 * std::f64::consts::PI / 16.0).cos();
            }
        }
        m
    })
}

// ---------- Public API ----------

/// Embed `text` into an RGBA image using LSB + DCT (maximum robustness).
#[wasm_bindgen]
pub fn embed_watermark(
    rgba: &[u8],
    width: u32,
    height: u32,
    text: &str,
) -> Result<Vec<u8>, JsValue> {
    set_panic_hook();
    let w = width as usize;
    let h = height as usize;
    check_dims(rgba.len(), w, h)?;

    let payload = text.as_bytes();
    let lsb_cap = lsb_cap_bytes(w, h);
    if lsb_cap == 0 {
        return Err(js("IMAGE_TOO_SMALL_LSB"));
    }
    if payload.len() > lsb_cap {
        return Err(js(&format!(
            "CAPACITY_EXCEEDED:{}:{}",
            lsb_cap,
            payload.len()
        )));
    }

    let mut out = rgba.to_vec();

    // DCT first (skip if block count too small to fit header).
    let dct_cap = dct_cap_bytes(w, h);
    if dct_cap > 0 && payload.len() <= dct_cap {
        dct_embed(&mut out, w, h, payload);
    }

    // LSB on top — works whether DCT ran or not.
    lsb_embed(&mut out, payload);

    Ok(out)
}

/// Extract text embedded via `embed_watermark`. Tries DCT first, then LSB.
#[wasm_bindgen]
pub fn extract_watermark(rgba: &[u8], width: u32, height: u32) -> Result<String, JsValue> {
    set_panic_hook();
    let w = width as usize;
    let h = height as usize;
    check_dims(rgba.len(), w, h)?;

    if let Some(s) = dct_extract(rgba, w, h) {
        return Ok(s);
    }
    lsb_extract(rgba, w, h).ok_or_else(|| js("NO_WATERMARK"))
}

/// LSB payload capacity in bytes (useful for UI hints).
#[wasm_bindgen]
pub fn lsb_capacity(width: u32, height: u32) -> u32 {
    lsb_cap_bytes(width as usize, height as usize) as u32
}

// ---------- Helpers ----------

fn js(msg: &str) -> JsValue {
    JsValue::from_str(msg)
}

fn check_dims(len: usize, w: usize, h: usize) -> Result<(), JsValue> {
    if len != w.saturating_mul(h).saturating_mul(4) {
        return Err(js("RGBA_LENGTH_MISMATCH"));
    }
    Ok(())
}

fn lsb_cap_bytes(w: usize, h: usize) -> usize {
    ((w * h * 3) / 8).saturating_sub(HEADER_LEN)
}

fn dct_cap_bytes(w: usize, h: usize) -> usize {
    let blocks = (w / 8) * (h / 8);
    (blocks / 8).saturating_sub(HEADER_LEN)
}

fn header(magic: &[u8; 4], len: u32) -> [u8; HEADER_LEN] {
    let mut h = [0u8; HEADER_LEN];
    h[0..4].copy_from_slice(magic);
    h[4] = 0;
    h[5..9].copy_from_slice(&len.to_le_bytes());
    h
}

fn read_len(bytes: &[u8]) -> u32 {
    u32::from_le_bytes([bytes[5], bytes[6], bytes[7], bytes[8]])
}

// ---------- LSB ----------

fn lsb_embed(rgba: &mut [u8], payload: &[u8]) {
    let hdr = header(&MAGIC_LSB, payload.len() as u32);
    let mut total = Vec::with_capacity(HEADER_LEN + payload.len());
    total.extend_from_slice(&hdr);
    total.extend_from_slice(payload);

    let total_bits = total.len() * 8;
    let mut bit_idx = 0usize;
    let mut i = 0usize;
    while i < rgba.len() && bit_idx < total_bits {
        if i % 4 != 3 {
            let bit = (total[bit_idx >> 3] >> (7 - (bit_idx & 7))) & 1;
            rgba[i] = (rgba[i] & 0xfe) | bit;
            bit_idx += 1;
        }
        i += 1;
    }
}

fn lsb_extract(rgba: &[u8], w: usize, h: usize) -> Option<String> {
    let mut hdr = [0u8; HEADER_LEN];
    let mut bit_idx = 0usize;
    let mut i = 0usize;
    while i < rgba.len() && bit_idx < HEADER_LEN * 8 {
        if i % 4 != 3 {
            let bit = rgba[i] & 1;
            hdr[bit_idx >> 3] |= bit << (7 - (bit_idx & 7));
            bit_idx += 1;
        }
        i += 1;
    }
    if hdr[0..4] != MAGIC_LSB {
        return None;
    }
    let len = read_len(&hdr) as usize;
    if len > lsb_cap_bytes(w, h) {
        return None;
    }

    let mut payload = vec![0u8; len];
    let mut pay_bit = 0usize;
    let pay_bits = len * 8;
    while i < rgba.len() && pay_bit < pay_bits {
        if i % 4 != 3 {
            let bit = rgba[i] & 1;
            payload[pay_bit >> 3] |= bit << (7 - (pay_bit & 7));
            pay_bit += 1;
        }
        i += 1;
    }
    String::from_utf8(payload).ok()
}

// ---------- DCT ----------

#[inline]
fn dct8(block: &[f64; 64], out: &mut [f64; 64], scratch: &mut [f64; 64]) {
    let m = m_matrix();
    // Row pass: scratch = M * block
    for k in 0..8 {
        let mk = &m[k];
        for j in 0..8 {
            let mut s = 0.0;
            for x in 0..8 {
                s += mk[x] * block[x * 8 + j];
            }
            scratch[k * 8 + j] = s;
        }
    }
    // Col pass: out = scratch * M^T
    for k in 0..8 {
        for l in 0..8 {
            let ml = &m[l];
            let mut s = 0.0;
            for j in 0..8 {
                s += scratch[k * 8 + j] * ml[j];
            }
            out[k * 8 + l] = s;
        }
    }
}

#[inline]
fn idct8(coef: &[f64; 64], out: &mut [f64; 64], scratch: &mut [f64; 64]) {
    let m = m_matrix();
    // Row pass: scratch = M^T * coef
    for i in 0..8 {
        for j in 0..8 {
            let mut s = 0.0;
            for u in 0..8 {
                s += m[u][i] * coef[u * 8 + j];
            }
            scratch[i * 8 + j] = s;
        }
    }
    // Col pass: out = scratch * M
    for i in 0..8 {
        for j in 0..8 {
            let mut s = 0.0;
            for v in 0..8 {
                s += scratch[i * 8 + v] * m[v][j];
            }
            out[i * 8 + j] = s;
        }
    }
}

#[inline]
fn rgb_to_y(r: u8, g: u8, b: u8) -> f64 {
    0.299 * r as f64 + 0.587 * g as f64 + 0.114 * b as f64
}

#[inline]
fn clamp_u8(v: f64) -> u8 {
    let v = v.round();
    if v < 0.0 {
        0
    } else if v > 255.0 {
        255
    } else {
        v as u8
    }
}

/// Load luminance of one 8×8 block into `block`.
fn load_block_y(rgba: &[u8], w: usize, bx: usize, by: usize, block: &mut [f64; 64]) {
    for y in 0..8 {
        let row = (by * 8 + y) * w;
        for x in 0..8 {
            let p = (row + bx * 8 + x) * 4;
            block[y * 8 + x] = rgb_to_y(rgba[p], rgba[p + 1], rgba[p + 2]);
        }
    }
}

/// Apply ΔY = new_Y - original_Y uniformly to R/G/B (preserves Cb/Cr).
fn apply_delta_y(rgba: &mut [u8], w: usize, bx: usize, by: usize, new_y: &[f64; 64]) {
    for y in 0..8 {
        let row = (by * 8 + y) * w;
        for x in 0..8 {
            let p = (row + bx * 8 + x) * 4;
            let old_y = rgb_to_y(rgba[p], rgba[p + 1], rgba[p + 2]);
            let d = new_y[y * 8 + x] - old_y;
            rgba[p] = clamp_u8(rgba[p] as f64 + d);
            rgba[p + 1] = clamp_u8(rgba[p + 1] as f64 + d);
            rgba[p + 2] = clamp_u8(rgba[p + 2] as f64 + d);
        }
    }
}

fn dct_embed(rgba: &mut [u8], w: usize, h: usize, payload: &[u8]) {
    let hdr = header(&MAGIC_DCT, payload.len() as u32);
    let mut total = Vec::with_capacity(HEADER_LEN + payload.len());
    total.extend_from_slice(&hdr);
    total.extend_from_slice(payload);

    let bw = w / 8;
    let bh = h / 8;
    let total_bits = total.len() * 8;

    let mut block = [0.0f64; 64];
    let mut coef = [0.0f64; 64];
    let mut spatial = [0.0f64; 64];
    let mut scratch = [0.0f64; 64];

    let mut bit_idx = 0usize;
    let mut block_idx = 0usize;
    let total_blocks = bw * bh;
    while bit_idx < total_bits && block_idx < total_blocks {
        let by = block_idx / bw;
        let bx = block_idx % bw;

        load_block_y(rgba, w, bx, by, &mut block);
        dct8(&block, &mut coef, &mut scratch);

        let bit = (total[bit_idx >> 3] >> (7 - (bit_idx & 7))) & 1;
        let c1 = coef[C1_IDX];
        let c2 = coef[C2_IDX];
        if bit == 1 {
            if c1 - c2 < DCT_MARGIN {
                let avg = (c1 + c2) / 2.0;
                coef[C1_IDX] = avg + DCT_MARGIN / 2.0;
                coef[C2_IDX] = avg - DCT_MARGIN / 2.0;
            }
        } else if c2 - c1 < DCT_MARGIN {
            let avg = (c1 + c2) / 2.0;
            coef[C1_IDX] = avg - DCT_MARGIN / 2.0;
            coef[C2_IDX] = avg + DCT_MARGIN / 2.0;
        }

        idct8(&coef, &mut spatial, &mut scratch);
        apply_delta_y(rgba, w, bx, by, &spatial);

        bit_idx += 1;
        block_idx += 1;
    }
}

fn dct_extract(rgba: &[u8], w: usize, h: usize) -> Option<String> {
    let bw = w / 8;
    let bh = h / 8;
    if bw == 0 || bh == 0 {
        return None;
    }
    let total_blocks = bw * bh;

    let mut block = [0.0f64; 64];
    let mut coef = [0.0f64; 64];
    let mut scratch = [0.0f64; 64];

    let mut read_bits = |start: usize, count: usize| -> (Vec<u8>, usize) {
        let mut bytes = vec![0u8; count.div_ceil(8)];
        let mut bi = 0usize;
        let mut block_idx = start;
        while bi < count && block_idx < total_blocks {
            let by = block_idx / bw;
            let bx = block_idx % bw;
            load_block_y(rgba, w, bx, by, &mut block);
            dct8(&block, &mut coef, &mut scratch);
            let bit: u8 = if coef[C1_IDX] > coef[C2_IDX] { 1 } else { 0 };
            bytes[bi >> 3] |= bit << (7 - (bi & 7));
            bi += 1;
            block_idx += 1;
        }
        (bytes, block_idx)
    };

    let (hdr, next) = read_bits(0, HEADER_LEN * 8);
    if hdr[0..4] != MAGIC_DCT {
        return None;
    }
    let len = read_len(&hdr) as usize;
    if len > dct_cap_bytes(w, h) {
        return None;
    }

    let (payload, _) = read_bits(next, len * 8);
    let bytes = &payload[..len.min(payload.len())];
    String::from_utf8(bytes.to_vec()).ok()
}
