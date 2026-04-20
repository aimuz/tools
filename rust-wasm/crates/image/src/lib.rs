use image::{imageops::FilterType, DynamicImage, ImageFormat};
use wasm_bindgen::prelude::*;
use wizgo_core::{
    calculate_dimensions, encode_jpeg, encode_png_lossless, encode_via_image_crate, set_panic_hook,
};

// ---------- shared info helpers ----------

#[wasm_bindgen]
pub fn get_image_info(input: &[u8]) -> Result<JsValue, JsValue> {
    set_panic_hook();
    let img = image::load_from_memory(input)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    let info = js_sys::Object::new();
    js_sys::Reflect::set(&info, &"width".into(), &(img.width() as u32).into())?;
    js_sys::Reflect::set(&info, &"height".into(), &(img.height() as u32).into())?;
    let format = image::guess_format(input)
        .map(|f| format!("{:?}", f).to_lowercase())
        .unwrap_or_else(|_| "unknown".to_string());
    js_sys::Reflect::set(&info, &"format".into(), &format.into())?;
    Ok(info.into())
}

#[wasm_bindgen]
pub fn get_detailed_image_info(input: &[u8]) -> Result<JsValue, JsValue> {
    set_panic_hook();
    let img = image::load_from_memory(input)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    let info = js_sys::Object::new();
    js_sys::Reflect::set(&info, &"width".into(), &(img.width() as u32).into())?;
    js_sys::Reflect::set(&info, &"height".into(), &(img.height() as u32).into())?;

    let format = image::guess_format(input)
        .map(|f| format!("{:?}", f).to_lowercase())
        .unwrap_or_else(|_| "unknown".to_string());
    js_sys::Reflect::set(&info, &"format".into(), &format.into())?;

    let megapixels = (img.width() as f64 * img.height() as f64) / 1_000_000.0;
    js_sys::Reflect::set(
        &info,
        &"megapixels".into(),
        &format!("{:.1}", megapixels).into(),
    )?;

    if let Ok(exif_data) = rexif::parse_buffer(input) {
        let exif_obj = js_sys::Object::new();
        for entry in &exif_data.entries {
            let tag_name = format!("{:?}", entry.tag);
            let value_str = entry.value_more_readable.as_ref();
            js_sys::Reflect::set(&exif_obj, &tag_name.into(), &JsValue::from_str(value_str))?;
        }
        js_sys::Reflect::set(&info, &"exif".into(), &exif_obj.into())?;
    }

    Ok(info.into())
}

// ---------- convert ----------

#[wasm_bindgen]
pub fn convert_image(input: &[u8], output_format: &str, quality: u8) -> Result<Vec<u8>, JsValue> {
    set_panic_hook();
    let img = image::load_from_memory(input)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    // WebP encoding is handled browser-side via libwebp (zig-wasm/webp) — the
    // pure-Rust image-webp encoder produces 2-3× larger output than libwebp
    // on transparency-heavy PNG content, which is why we carved it out.
    // `convert-page.ts` routes `webp` targets directly to the zig worker.
    match output_format.to_lowercase().as_str() {
        "jpeg" | "jpg" => encode_jpeg(&img, quality).map_err(js_err),
        "png" => encode_png_lossless(&img).map_err(js_err),
        "bmp" => encode_via_image_crate(&img, ImageFormat::Bmp).map_err(js_err),
        "gif" => encode_via_image_crate(&img, ImageFormat::Gif).map_err(js_err),
        other => Err(JsValue::from_str(&format!("Unsupported format: {}", other))),
    }
}

#[wasm_bindgen]
pub fn resize_image(input: &[u8], width: u32, height: u32) -> Result<Vec<u8>, JsValue> {
    set_panic_hook();
    let img = image::load_from_memory(input)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;
    let resized = img.resize(width, height, FilterType::Lanczos3);
    encode_png_lossless(&resized).map_err(js_err)
}

// ---------- compress ----------

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct CompressOptions {
    quality: u8,
    max_width: u32,
    max_height: u32,
    keep_aspect_ratio: bool,
}

#[wasm_bindgen]
impl CompressOptions {
    #[wasm_bindgen(constructor)]
    pub fn new(quality: u8, max_width: u32, max_height: u32, keep_aspect_ratio: bool) -> Self {
        Self {
            quality: quality.clamp(1, 100),
            max_width,
            max_height,
            keep_aspect_ratio,
        }
    }
}

/// Compress image preserving the original format.
#[wasm_bindgen]
pub fn compress_image(input: &[u8], options: CompressOptions) -> Result<Vec<u8>, JsValue> {
    set_panic_hook();
    let img = image::load_from_memory(input)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    let original_format = image::guess_format(input).unwrap_or(ImageFormat::Png);

    let (new_width, new_height) = if options.max_width > 0 || options.max_height > 0 {
        calculate_dimensions(
            img.width(),
            img.height(),
            options.max_width,
            options.max_height,
            options.keep_aspect_ratio,
        )
    } else {
        (img.width(), img.height())
    };

    let img = if new_width != img.width() || new_height != img.height() {
        img.resize(new_width, new_height, FilterType::Lanczos3)
    } else {
        img
    };

    // WebP inputs are routed to the zig/libwebp encoder from JS (see
    // compress-page.ts); they never reach this function. If one slips through
    // we fall back to JPEG just to return something, same as any unknown format.
    let result = match original_format {
        ImageFormat::Jpeg => encode_jpeg(&img, options.quality).map_err(js_err)?,
        ImageFormat::Png => encode_png_quantized(&img, options.quality)?,
        _ => encode_jpeg(&img, options.quality).map_err(js_err)?,
    };

    // Safety net: if compression did not help and no resize happened, return original bytes
    // so users never see growth. Only applies to formats where "original" is meaningful.
    if result.len() > input.len() && new_width == img.width() && new_height == img.height() {
        match original_format {
            ImageFormat::Jpeg | ImageFormat::Png => {
                return Ok(input.to_vec());
            }
            _ => {}
        }
    }

    Ok(result)
}

#[wasm_bindgen]
pub fn compress_image_batch(
    inputs: Vec<JsValue>,
    options: CompressOptions,
) -> Result<Vec<JsValue>, JsValue> {
    set_panic_hook();
    inputs
        .into_iter()
        .map(|input| {
            let array = js_sys::Uint8Array::from(input);
            let input_bytes = array.to_vec();
            compress_image(&input_bytes, options).map(|bytes| {
                let result_array = js_sys::Uint8Array::new_with_length(bytes.len() as u32);
                result_array.copy_from(&bytes);
                result_array.into()
            })
        })
        .collect()
}

/// PNG encoder: lossy palette quantization (imagequant + lodepng) below quality 95,
/// lossless RGBA otherwise.
fn encode_png_quantized(img: &DynamicImage, quality: u8) -> Result<Vec<u8>, JsValue> {
    if quality >= 95 {
        return encode_png_lossless(img).map_err(js_err);
    }

    let rgba = img.to_rgba8();
    let (w, h) = (rgba.width(), rgba.height());
    if w == 0 || h == 0 {
        return Err(JsValue::from_str("PNG dimensions are zero"));
    }
    let pixels: &[lodepng::RGBA] = lodepng::bytemuck::cast_slice(rgba.as_raw());

    let mut liq = imagequant::new();
    let (min_q, target_q) = map_quality_to_imagequant(quality);
    liq.set_quality(min_q, target_q)
        .map_err(|e| JsValue::from_str(&format!("imagequant set_quality: {:?}", e)))?;

    let mut liq_img = liq
        .new_image_borrowed(pixels, w as usize, h as usize, 0.0)
        .map_err(|e| JsValue::from_str(&format!("imagequant new_image: {:?}", e)))?;
    let mut res = liq
        .quantize(&mut liq_img)
        .map_err(|e| JsValue::from_str(&format!("imagequant quantize: {:?}", e)))?;
    // Floyd–Steinberg dithering strength. 1.0 = full. Lower = less noise but more banding.
    let _ = res.set_dithering_level(1.0);

    let (palette, indexed) = res
        .remapped(&mut liq_img)
        .map_err(|e| JsValue::from_str(&format!("imagequant remap: {:?}", e)))?;

    let mut enc = lodepng::Encoder::new();
    enc.set_palette(&palette)
        .map_err(|e| JsValue::from_str(&format!("lodepng set_palette: {:?}", e)))?;
    enc.encode(&indexed, w as usize, h as usize)
        .map_err(|e| JsValue::from_str(&format!("lodepng encode: {:?}", e)))
}

/// User quality 1..100 -> (imagequant min, target). Target tracks user quality;
/// min floors a bit lower so pathological images can still fit 256 colours.
fn map_quality_to_imagequant(quality: u8) -> (u8, u8) {
    let target = quality.clamp(1, 100);
    let min = target.saturating_sub(20).max(10);
    (min, target)
}

fn js_err(e: String) -> JsValue {
    JsValue::from_str(&e)
}
