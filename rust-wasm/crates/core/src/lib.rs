use image::{DynamicImage, ImageFormat};
use std::io::Cursor;

pub fn set_panic_hook() {
    #[cfg(feature = "panic-hook")]
    console_error_panic_hook::set_once();
}

pub fn calculate_dimensions(
    orig_width: u32,
    orig_height: u32,
    max_width: u32,
    max_height: u32,
    keep_aspect_ratio: bool,
) -> (u32, u32) {
    if !keep_aspect_ratio {
        return (
            if max_width > 0 { max_width } else { orig_width },
            if max_height > 0 {
                max_height
            } else {
                orig_height
            },
        );
    }

    let mut new_width = orig_width;
    let mut new_height = orig_height;

    if max_width > 0 && new_width > max_width {
        new_height = (new_height as f32 * (max_width as f32 / new_width as f32)) as u32;
        new_width = max_width;
    }

    if max_height > 0 && new_height > max_height {
        new_width = (new_width as f32 * (max_height as f32 / new_height as f32)) as u32;
        new_height = max_height;
    }

    (new_width.max(1), new_height.max(1))
}

/// Lossless PNG encode through lodepng (keeps 32-bit RGBA colour depth).
pub fn encode_png_lossless(img: &DynamicImage) -> Result<Vec<u8>, String> {
    let rgba = img.to_rgba8();
    let (w, h) = (rgba.width(), rgba.height());
    let pixels: &[lodepng::RGBA] = lodepng::bytemuck::cast_slice(rgba.as_raw());
    let enc = lodepng::Encoder::new();
    enc.encode(pixels, w as usize, h as usize)
        .map_err(|e| format!("lodepng encode: {}", e))
}

pub fn encode_via_image_crate(img: &DynamicImage, format: ImageFormat) -> Result<Vec<u8>, String> {
    let mut out = Cursor::new(Vec::new());
    img.write_to(&mut out, format)
        .map_err(|e| format!("Encode failed: {}", e))?;
    Ok(out.into_inner())
}
