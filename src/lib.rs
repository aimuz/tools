use wasm_bindgen::prelude::*;
use image::ImageOutputFormat;
use std::io::Cursor;

#[cfg(feature = "console_error_panic_hook")]
pub fn set_panic_hook() {
    console_error_panic_hook::set_once();
}

/// Convert image from one format to another
#[wasm_bindgen]
pub fn convert_image(input: &[u8], output_format: &str, quality: u8) -> Result<Vec<u8>, JsValue> {
    #[cfg(feature = "console_error_panic_hook")]
    set_panic_hook();

    let img = image::load_from_memory(input)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    let img = img.to_rgb8();
    let mut output = Cursor::new(Vec::new());

    match output_format.to_lowercase().as_str() {
        "png" => {
            img.write_to(&mut output, ImageOutputFormat::Png)
                .map_err(|e| JsValue::from_str(&format!("PNG encode failed: {}", e)))?;
        }
        "jpeg" | "jpg" => {
            let quality = quality.min(100);
            img.write_to(&mut output, ImageOutputFormat::Jpeg(quality))
                .map_err(|e| JsValue::from_str(&format!("JPEG encode failed: {}", e)))?;
        }
        "bmp" => {
            img.write_to(&mut output, ImageOutputFormat::Bmp)
                .map_err(|e| JsValue::from_str(&format!("BMP encode failed: {}", e)))?;
        }
        "gif" => {
            img.write_to(&mut output, ImageOutputFormat::Gif)
                .map_err(|e| JsValue::from_str(&format!("GIF encode failed: {}", e)))?;
        }
        _ => {
            return Err(JsValue::from_str(&format!("Unsupported format: {}", output_format)));
        }
    }

    Ok(output.into_inner())
}

/// Get image info
#[wasm_bindgen]
pub fn get_image_info(input: &[u8]) -> Result<JsValue, JsValue> {
    #[cfg(feature = "console_error_panic_hook")]
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

/// Resize image
#[wasm_bindgen]
pub fn resize_image(input: &[u8], width: u32, height: u32) -> Result<Vec<u8>, JsValue> {
    #[cfg(feature = "console_error_panic_hook")]
    set_panic_hook();

    let img = image::load_from_memory(input)
        .map_err(|e| JsValue::from_str(&format!("Failed to load image: {}", e)))?;

    let resized = img.resize(width, height, image::imageops::FilterType::Lanczos3);
    
    let mut output = Cursor::new(Vec::new());
    resized.write_to(&mut output, ImageOutputFormat::Png)
        .map_err(|e| JsValue::from_str(&format!("Resize failed: {}", e)))?;

    Ok(output.into_inner())
}
