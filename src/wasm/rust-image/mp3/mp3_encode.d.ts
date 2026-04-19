/* tslint:disable */
/* eslint-disable */

/**
 * Streaming MP3 encoder. Feed PCM chunks of any length; the encoder buffers
 * internally and emits complete MP3 frames whenever enough samples accumulate.
 */
export class Mp3Encoder {
    free(): void;
    [Symbol.dispose](): void;
    /**
     * Encode a mono PCM chunk. Returns the bytes of any complete MP3 frames
     * produced (empty if the chunk is shorter than one frame's worth).
     */
    encode_mono(samples: Int16Array): Uint8Array;
    /**
     * Encode a stereo PCM chunk. `left` and `right` must be equal length.
     */
    encode_stereo(left: Int16Array, right: Int16Array): Uint8Array;
    /**
     * Flush any buffered samples and emit the final MP3 frames.
     */
    finish(): Uint8Array;
    /**
     * `channels` ∈ {1, 2}. Supported `sample_rate`: 32000, 44100, 48000
     * (plus MPEG-2 half-rates). Supported `kbps`: LAME-style 32..320.
     */
    constructor(channels: number, sample_rate: number, kbps: number);
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_mp3encoder_free: (a: number, b: number) => void;
    readonly mp3encoder_encode_mono: (a: number, b: number, c: number, d: number) => void;
    readonly mp3encoder_encode_stereo: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly mp3encoder_finish: (a: number, b: number) => void;
    readonly mp3encoder_new: (a: number, b: number, c: number, d: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
