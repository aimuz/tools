/* Manual jconfig.h for wasm32-wasi build (no cmake). */
#define JPEG_LIB_VERSION 80
#define LIBJPEG_TURBO_VERSION "2.1.5"
#define LIBJPEG_TURBO_VERSION_NUMBER 2001005
#define C_ARITH_CODING_SUPPORTED 1
#define D_ARITH_CODING_SUPPORTED 1
#define MEM_SRCDST_SUPPORTED 1
/* WITH_SIMD: not defined — wasm scalar path */
#define BITS_IN_JSAMPLE 8
/* RIGHT_SHIFT_IS_UNSIGNED: not defined — clang does arithmetic shift */
