/* tslint:disable */
/* eslint-disable */

/**
 * Compression options
 */
export class CompressOptions {
    free(): void;
    [Symbol.dispose](): void;
    constructor(quality: number, max_width: number, max_height: number, keep_aspect_ratio: boolean);
}

/**
 * Compress image preserving the original format.
 */
export function compress_image(input: Uint8Array, options: CompressOptions): Uint8Array;

/**
 * Batch compress multiple images
 */
export function compress_image_batch(inputs: any[], options: CompressOptions): any[];

/**
 * Convert image from one format to another
 */
export function convert_image(input: Uint8Array, output_format: string, quality: number): Uint8Array;

/**
 * Get detailed image info including EXIF data
 */
export function get_detailed_image_info(input: Uint8Array): any;

/**
 * Get image info
 */
export function get_image_info(input: Uint8Array): any;

/**
 * Resize image
 */
export function resize_image(input: Uint8Array, width: number, height: number): Uint8Array;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly __wbg_compressoptions_free: (a: number, b: number) => void;
    readonly compress_image: (a: number, b: number, c: number) => [number, number, number, number];
    readonly compress_image_batch: (a: number, b: number, c: number) => [number, number, number, number];
    readonly compressoptions_new: (a: number, b: number, c: number, d: number) => number;
    readonly convert_image: (a: number, b: number, c: number, d: number, e: number) => [number, number, number, number];
    readonly get_detailed_image_info: (a: number, b: number) => [number, number, number];
    readonly get_image_info: (a: number, b: number) => [number, number, number];
    readonly resize_image: (a: number, b: number, c: number, d: number) => [number, number, number, number];
    readonly __wbindgen_free: (a: number, b: number, c: number) => void;
    readonly __wbindgen_exn_store: (a: number) => void;
    readonly __externref_table_alloc: () => number;
    readonly __wbindgen_externrefs: WebAssembly.Table;
    readonly __wbindgen_malloc: (a: number, b: number) => number;
    readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
    readonly __externref_table_dealloc: (a: number) => void;
    readonly __externref_drop_slice: (a: number, b: number) => void;
    readonly __wbindgen_start: () => void;
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
