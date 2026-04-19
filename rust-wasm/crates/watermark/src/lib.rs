use wasm_bindgen::prelude::*;

const MAGIC_LSB: [u8; 4] = [b'W', b'L', b'S', b'B'];
const HEADER_LEN: usize = 9; // 4 magic + 1 version + 4 len

#[wasm_bindgen]
pub fn lsb_capacity(width: u32, height: u32) -> u32 {
    let w = width as usize;
    let h = height as usize;
    ((w * h * 3) / 8).saturating_sub(HEADER_LEN) as u32
}

fn header(magic: &[u8; 4], len: u32) -> [u8; HEADER_LEN] {
    let mut h = [0u8; HEADER_LEN];
    h[0] = magic[0]; h[1] = magic[1]; h[2] = magic[2]; h[3] = magic[3];
    h[4] = 0;
    let b = len.to_le_bytes();
    h[5] = b[0]; h[6] = b[1]; h[7] = b[2]; h[8] = b[3];
    h
}

fn read_len(bytes: &[u8]) -> u32 {
    u32::from_le_bytes([bytes[5], bytes[6], bytes[7], bytes[8]])
}

fn lsb_embed(rgba: &mut [u8], payload: &[u8]) {
    let hdr = header(&MAGIC_LSB, payload.len() as u32);

    let mut bit_idx = 0usize;
    let mut i = 0usize;
    let hdr_bits = HEADER_LEN * 8;
    while i < rgba.len() && bit_idx < hdr_bits {
        if i % 4 != 3 {
            let bit = (hdr[bit_idx >> 3] >> (7 - (bit_idx & 7))) & 1;
            rgba[i] = (rgba[i] & 0xfe) | bit;
            bit_idx += 1;
        }
        i += 1;
    }

    let mut pay_bit = 0usize;
    let pay_bits = payload.len() * 8;
    while i < rgba.len() && pay_bit < pay_bits {
        if i % 4 != 3 {
            let bit = (payload[pay_bit >> 3] >> (7 - (pay_bit & 7))) & 1;
            rgba[i] = (rgba[i] & 0xfe) | bit;
            pay_bit += 1;
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

    if hdr[0] != MAGIC_LSB[0] || hdr[1] != MAGIC_LSB[1] || hdr[2] != MAGIC_LSB[2] || hdr[3] != MAGIC_LSB[3] {
        return None;
    }

    let len = read_len(&hdr) as usize;
    let cap = ((w * h * 3) / 8).saturating_sub(HEADER_LEN);
    if len > cap || len > 1024 * 1024 { return None; } // sanity limit 1MB

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

#[wasm_bindgen]
pub fn embed_watermark(
    rgba: &[u8],
    _width: u32,
    _height: u32,
    text: &str,
) -> Vec<u8> {
    let mut out = rgba.to_vec();
    lsb_embed(&mut out, text.as_bytes());
    out
}

#[wasm_bindgen]
pub fn extract_watermark(rgba: &[u8], width: u32, height: u32) -> String {
    lsb_extract(rgba, width as usize, height as usize).unwrap_or_default()
}
