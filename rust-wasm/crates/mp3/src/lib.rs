// Streaming MP3 encoder wrapper around shine-rs (pure-Rust LAME-alike).
//
// Audio decoding stays in JS via Web Audio's AudioContext.decodeAudioData;
// this crate only handles the CPU-heavy MPEG Layer III encode step. The
// browser hands us raw i16 PCM per channel and we emit MP3 bytes frame by
// frame. No image-crate deps → wasm stays small.

use shine_rs::{Mp3EncoderConfig, StereoMode};
use wasm_bindgen::prelude::*;

fn set_panic_hook() {
    #[cfg(feature = "debug-panics")]
    console_error_panic_hook::set_once();
}

fn js_err(msg: &str) -> JsValue {
    JsValue::from_str(msg)
}

/// Streaming MP3 encoder. Feed PCM chunks of any length; the encoder buffers
/// internally and emits complete MP3 frames whenever enough samples accumulate.
#[wasm_bindgen]
pub struct Mp3Encoder {
    inner: shine_rs::Mp3Encoder,
    channels: u8,
}

#[wasm_bindgen]
impl Mp3Encoder {
    /// `channels` ∈ {1, 2}. Supported `sample_rate`: 32000, 44100, 48000
    /// (plus MPEG-2 half-rates). Supported `kbps`: LAME-style 32..320.
    #[wasm_bindgen(constructor)]
    pub fn new(channels: u8, sample_rate: u32, kbps: u32) -> Result<Mp3Encoder, JsValue> {
        set_panic_hook();
        if channels != 1 && channels != 2 {
            return Err(js_err("channels must be 1 or 2"));
        }
        let stereo = if channels == 1 {
            StereoMode::Mono
        } else {
            StereoMode::JointStereo
        };
        let config = Mp3EncoderConfig::new()
            .sample_rate(sample_rate)
            .bitrate(kbps)
            .channels(channels)
            .stereo_mode(stereo);

        let inner = shine_rs::Mp3Encoder::new(config)
            .map_err(|e| js_err(&format!("Mp3Encoder init failed: {:?}", e)))?;
        Ok(Self { inner, channels })
    }

    /// Encode a mono PCM chunk. Returns the bytes of any complete MP3 frames
    /// produced (empty if the chunk is shorter than one frame's worth).
    pub fn encode_mono(&mut self, samples: &[i16]) -> Result<Vec<u8>, JsValue> {
        if self.channels != 1 {
            return Err(js_err("encode_mono called on stereo encoder"));
        }
        let frames = self
            .inner
            .encode_separate_channels(samples, None)
            .map_err(|e| js_err(&format!("encode_mono: {:?}", e)))?;
        Ok(flatten(frames))
    }

    /// Encode a stereo PCM chunk. `left` and `right` must be equal length.
    pub fn encode_stereo(&mut self, left: &[i16], right: &[i16]) -> Result<Vec<u8>, JsValue> {
        if self.channels != 2 {
            return Err(js_err("encode_stereo called on mono encoder"));
        }
        if left.len() != right.len() {
            return Err(js_err("left and right channel lengths must match"));
        }
        let frames = self
            .inner
            .encode_separate_channels(left, Some(right))
            .map_err(|e| js_err(&format!("encode_stereo: {:?}", e)))?;
        Ok(flatten(frames))
    }

    /// Flush any buffered samples and emit the final MP3 frames.
    pub fn finish(&mut self) -> Result<Vec<u8>, JsValue> {
        self.inner
            .finish()
            .map_err(|e| js_err(&format!("finish: {:?}", e)))
    }
}

fn flatten(frames: Vec<Vec<u8>>) -> Vec<u8> {
    let total: usize = frames.iter().map(|f| f.len()).sum();
    let mut out = Vec::with_capacity(total);
    for f in frames {
        out.extend_from_slice(&f);
    }
    out
}
