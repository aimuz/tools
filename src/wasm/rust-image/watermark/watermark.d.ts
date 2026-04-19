/* tslint:disable */
/* eslint-disable */

/**
 * Embed `text` into an RGBA image using LSB + DCT (maximum robustness).
 */
export function embed_watermark(rgba: Uint8Array, width: number, height: number, text: string): Uint8Array;

/**
 * Extract text embedded via `embed_watermark`. Tries DCT first, then LSB.
 */
export function extract_watermark(rgba: Uint8Array, width: number, height: number): string;

/**
 * LSB payload capacity in bytes (useful for UI hints).
 */
export function lsb_capacity(width: number, height: number): number;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
    readonly memory: WebAssembly.Memory;
    readonly embed_watermark: (a: number, b: number, c: number, d: number, e: number, f: number, g: number) => void;
    readonly extract_watermark: (a: number, b: number, c: number, d: number, e: number) => void;
    readonly lsb_capacity: (a: number, b: number) => number;
    readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
    readonly __wbindgen_export: (a: number, b: number) => number;
    readonly __wbindgen_export2: (a: number, b: number, c: number, d: number) => number;
    readonly __wbindgen_export3: (a: number, b: number, c: number) => void;
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
