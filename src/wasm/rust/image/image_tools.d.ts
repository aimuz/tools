/* tslint:disable */
/* eslint-disable */

export class CompressOptions {
    free(): void;
    [Symbol.dispose](): void;
    constructor(quality: number, max_width: number, max_height: number, keep_aspect_ratio: boolean);
}

/**
 * Compress image preserving the original format.
 */
export function compress_image(input: Uint8Array, options: CompressOptions): Uint8Array;

export function compress_image_batch(inputs: any[], options: CompressOptions): any[];

export function convert_image(input: Uint8Array, output_format: string, quality: number): Uint8Array;

export function get_detailed_image_info(input: Uint8Array): any;

export function get_image_info(input: Uint8Array): any;

export function resize_image(input: Uint8Array, width: number, height: number): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_compressoptions_free: (a: number, b: number) => void;
    readonly compress_image: (a: number, b: number, c: number, d: number) => void;
    readonly compress_image_batch: (a: number, b: number, c: number, d: number) => void;
    readonly compressoptions_new: (a: number, b: number, c: number, d: number) => number;
    readonly convert_image: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
    readonly get_detailed_image_info: (a: number, b: number, c: number) => void;
    readonly get_image_info: (a: number, b: number, c: number) => void;
    readonly resize_image: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly __wbindgen_export: (a: number) => void;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export2: (a: number, b: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number) => void;
    readonly __wbindgen_export4: (a: number, b: number, c: number, d: number) => number;
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
