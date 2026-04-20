#define BUILD "wasm-wizgo"
#define INLINE inline
#define THREAD_LOCAL _Thread_local
#define PACKAGE_NAME "mozjpeg"
#define VERSION "4.1.5"
#define SIZEOF_SIZE_T 4
#define HAVE_BUILTIN_CTZL 1
#if defined(__has_attribute) && __has_attribute(fallthrough)
#define FALLTHROUGH __attribute__((fallthrough));
#else
#define FALLTHROUGH
#endif
