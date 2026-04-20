import type { Translations } from '../schema';

export const en = {
  common: {
    siteName: 'WizGo',
    siteTagline:
      'WizGo is a free online toolbox: image compression, format conversion, JWT, timestamps and other developer utilities. Everything runs in your browser — no uploads.',
    aboutLink: 'About',
    menuButtonAria: 'Menu',
    languageSwitcherAria: 'Switch language',
    scripts: {
      loading: 'Loading, please try again shortly',
      processing: 'Processing...',
      processingFailedTemplate: 'Failed: {name}',
      convertFailedTemplate: 'Convert failed: {name}',
      savedPercentTemplate: '· saved {pct}%',
      optimized: '· already optimized',
      copyBtn: 'Copy',
      downloadBtn: 'Download',
      copying: 'Copying...',
      copied: 'Copied',
      copyFailed: 'Copy failed',
      startCompress: 'Start compressing',
      startConvert: 'Start converting',
      autoDetect: 'Auto-detected',
      canvasError: 'Failed to create canvas context',
      parseImageError: 'Could not parse image, try another',
      needImageFirst: 'Please upload an image first',
      needText: 'Please enter the text to embed',
      noWatermark: 'No watermark detected',
      capacityHintTemplate: 'Capacity {bytes} bytes · ~{chars} characters',
      capacityErrorTemplate:
        'Image capacity exceeded — max {cap} bytes (current text {len} bytes)',
      imageTooSmallDct: 'Image too small — DCT requires at least 128×128 px',
      imageTooSmallLsb:
        'Image too small — at least ~32×32 px required to embed a watermark',
      clipboardNotSupported: 'Clipboard API is not supported in this browser',
      pngGenerationFailed: 'PNG generation failed',
      audioDecodeFailed:
        'Could not decode audio. Try another file or use Chrome/Firefox.',
      audioEncodeFailed: 'Audio encoding failed',
      compareBtn: 'Compare',
      compareBefore: 'Before',
      compareAfter: 'After',
    },
  },
  nav: {
    image: {
      label: 'Image Tools',
      items: {
        compress: {
          name: 'Image Compress',
          desc: 'Smart PNG / JPG / WebP compression',
        },
        convert: {
          name: 'Image Format Convert',
          desc: 'PNG JPG WebP GIF BMP interchange',
        },
        'png-to-jpg': {
          name: 'PNG to JPG',
          desc: 'Fill transparency with white · smaller files',
        },
        'jpg-to-png': {
          name: 'JPG to PNG',
          desc: 'Lossless save · transparency support',
        },
        'png-to-webp': {
          name: 'PNG to WebP',
          desc: 'Keep transparency · smaller files',
        },
        'jpg-to-webp': {
          name: 'JPG to WebP',
          desc: 'Same quality · 25-35% smaller',
        },
        watermark: {
          name: 'Hidden Watermark',
          desc: 'Embed / extract hidden text',
        },
        'text-watermark': {
          name: 'Text Watermark',
          desc: 'For ID cards · anti-theft watermark',
        },
      },
    },
    dev: {
      label: 'Developer Tools',
      items: {
        jwt: {
          name: 'JWT Decode/Verify',
          desc: 'Parse, generate, signature verification',
        },
        timestamp: { name: 'Timestamp Convert', desc: 'Unix timestamp ↔ date' },
        json: { name: 'JSON Format', desc: 'Beautify / minify / validate' },
        'code-image': {
          name: 'Code to Image',
          desc: 'Generate code share images',
        },
        base64: {
          name: 'Base64 Encode/Decode',
          desc: 'Text and file encoding & decoding',
        },
        uuid: { name: 'UUID Generator', desc: 'Batch generate unique IDs' },
        'url-encode': {
          name: 'URL Encode/Decode',
          desc: 'URL special character encoding',
        },
        color: { name: 'Color Converter', desc: 'HEX, RGB, HSL conversions' },
        qrcode: {
          name: 'QR Code Generator',
          desc: 'Generate QR codes from text/links',
        },
        hash: {
          name: 'Hash Generator',
          desc: 'SHA-1 / SHA-256 / SHA-384 / SHA-512 checksums',
        },
        password: {
          name: 'Password Generator',
          desc: 'Generate strong random passwords',
        },
      },
    },
    media: {
      label: 'Media Tools',
      items: {
        'mp4-to-mp3': {
          name: 'MP4 to MP3',
          desc: 'Extract audio from video files',
        },
        'compress-mp3': {
          name: 'MP3 Compress',
          desc: 'Shrink MP3 size by lowering bitrate',
        },
      },
    },
    document: {
      label: 'Document Tools',
      items: {
        'pdf-compress': {
          name: 'PDF Compress',
          desc: 'Shrink PDF file size',
        },
        'pdf-merge': {
          name: 'PDF Merge',
          desc: 'Combine multiple PDFs into one',
        },
      },
    },
  },
  quickActions: {
    'png-compress': {
      name: 'PNG Compress',
      description: 'Smart compression · 60-80% smaller',
      tags: ['PNG compress', 'pngquant', 'image compression', 'compress png'],
    },
    'jpg-compress': {
      name: 'JPG Compress',
      description: 'Photo compression · 30-45% smaller',
      tags: [
        'JPG compress',
        'JPEG compress',
        'image compression',
        'compress jpg',
      ],
    },
    'webp-compress': {
      name: 'WebP Compress',
      description: 'Lossless compression · keep transparency',
      tags: ['WebP compress', 'compress webp'],
    },
    'png-to-jpg': {
      name: 'PNG to JPG',
      description: 'Fill transparency with white · smaller files',
      tags: ['png to jpg', 'png to jpeg', 'convert png'],
    },
    'jpg-to-png': {
      name: 'JPG to PNG',
      description: 'Lossless save · transparency support',
      tags: ['jpg to png', 'jpeg to png', 'convert jpg'],
    },
    'png-to-webp': {
      name: 'PNG to WebP',
      description: 'Keep transparency · smaller files',
      tags: ['png to webp', 'convert to webp'],
    },
    'jpg-to-webp': {
      name: 'JPG to WebP',
      description: 'Same quality, smaller files',
      tags: ['jpg to webp', 'jpeg to webp', 'convert to webp'],
    },
    'webp-to-png': {
      name: 'WebP to PNG',
      description: 'WebP compatibility fallback',
      tags: ['webp to png', 'convert webp'],
    },
    'webp-to-jpg': {
      name: 'WebP to JPG',
      description: 'Compatible with legacy platforms',
      tags: ['webp to jpg', 'convert webp'],
    },
    'code-image': {
      name: 'Code to Image',
      description: 'Generate share images from code',
      tags: ['code', 'image', 'share', 'carbon', 'snippet'],
    },
    jwt: {
      name: 'JWT Decode',
      description: 'Generate, parse, verify',
      tags: ['JWT', 'token', 'jsonwebtoken', 'decode', 'verify'],
    },
    timestamp: {
      name: 'Timestamp Convert',
      description: 'Unix timestamp ↔ date',
      tags: ['timestamp', 'Unix', 'date', 'time', 'epoch'],
    },
    json: {
      name: 'JSON Format',
      description: 'Beautify, minify, validate JSON',
      tags: ['JSON', 'format', 'beautify', 'minify', 'validate', 'parser'],
    },
    base64: {
      name: 'Base64 Encode/Decode',
      description: 'Convert text/files to and from Base64',
      tags: [
        'Base64',
        'encode',
        'decode',
        'file',
        'base64 encode',
        'base64 decode',
      ],
    },
    uuid: {
      name: 'UUID Generator',
      description: 'Batch generate unique IDs',
      tags: ['UUID', 'GUID', 'unique ID', 'random ID', 'uuid generator'],
    },
    'url-encode': {
      name: 'URL Encode/Decode',
      description: 'Encode/decode URL special characters',
      tags: [
        'URL encode',
        'URL decode',
        'encodeURIComponent',
        'percent encoding',
        'url encode',
      ],
    },
    color: {
      name: 'Color Converter',
      description: 'HEX, RGB, HSL color value conversion',
      tags: ['color', 'color converter', 'RGB', 'HEX', 'HSL', 'color picker'],
    },
    qrcode: {
      name: 'QR Code Generator',
      description: 'Generate QR codes from text/links',
      tags: ['QR Code', 'barcode', 'qrcode generator', 'QR'],
    },
    'any-convert': {
      name: 'Image Convert',
      description: 'PNG JPG WebP format interchange',
      tags: [
        'image convert',
        'image format convert',
        'png to jpg',
        'jpg to png',
        'WebP',
        'HEIC',
        'BMP',
        'GIF',
      ],
    },
    'any-compress': {
      name: 'Image Compress',
      description: 'Compress any image',
      tags: ['compress', 'general'],
    },
    watermark: {
      name: 'Hidden Watermark',
      description: 'Embed/extract hidden text',
      tags: ['hidden watermark', 'steganography', 'watermark', 'LSB', 'DCT'],
    },
    'text-watermark': {
      name: 'Text Watermark',
      description: 'ID card / anti-theft watermark',
      tags: [
        'text watermark',
        'image watermark',
        'photo watermark',
        'add watermark',
        'online watermark',
        'ID watermark',
        'document watermark',
        'copyright watermark',
        'anti-theft watermark',
      ],
    },
    'mp4-to-mp3': {
      name: 'MP4 to MP3',
      description: 'Extract audio from video · 128-320 kbps',
      tags: [
        'mp4 to mp3',
        'video to mp3',
        'extract audio',
        'mp4 audio',
        'mp3 converter',
        'audio extractor',
      ],
    },
    'compress-mp3': {
      name: 'MP3 Compress',
      description: 'Shrink MP3 files · lower bitrate, same format',
      tags: [
        'compress mp3',
        'mp3 compressor',
        'shrink mp3',
        'mp3 size reducer',
        'audio compression',
        'reduce mp3 size',
        'mp3 bitrate',
      ],
    },
    'pdf-compress': {
      name: 'PDF Compress',
      description: 'Shrink PDF file size · runs locally',
      tags: [
        'pdf compress',
        'compress pdf',
        'shrink pdf',
        'reduce pdf size',
        'pdf compressor',
        'pdf optimizer',
      ],
    },
    'pdf-merge': {
      name: 'PDF Merge',
      description: 'Combine multiple PDFs into one · reorder pages',
      tags: [
        'pdf merge',
        'merge pdf',
        'combine pdf',
        'pdf combine',
        'pdf join',
        'join pdf',
      ],
    },
    hash: {
      name: 'Hash Generator',
      description: 'SHA-1 / SHA-256 / SHA-384 / SHA-512 in one click',
      tags: [
        'hash',
        'sha256',
        'sha-256',
        'sha512',
        'checksum',
        'file hash',
        'sha1',
        'file integrity',
      ],
    },
    password: {
      name: 'Password Generator',
      description: 'Generate strong random passwords with customizable options',
      tags: [
        'password generator',
        'random password',
        'strong password',
        'secure password',
        'password creator',
        'generate password',
      ],
    },
  },
  toolCategories: {
    image: {
      name: 'Image Tools',
      description: 'Image compression and format conversion',
      tools: {
        compress: {
          name: 'Image Compress',
          description: 'Compress images while keeping quality',
        },
        convert: {
          name: 'Image Format Convert',
          description: 'PNG JPG WebP GIF BMP interchange',
        },
        watermark: {
          name: 'Hidden Watermark',
          description: 'Embed / extract hidden text',
        },
        'text-watermark': {
          name: 'Text Watermark',
          description: 'Anti-theft / document watermark',
        },
      },
    },
    code: {
      name: 'Developer Tools',
      description: 'Tools for developers',
      tools: {
        'code-image': {
          name: 'Code to Image',
          description: 'Turn code into beautiful share images',
        },
        json: { name: 'JSON', description: 'JSON formatting' },
        jwt: { name: 'JWT', description: 'Generate / parse / verify' },
        timestamp: {
          name: 'Timestamp',
          description: 'Unix timestamp conversion',
        },
        base64: {
          name: 'Base64',
          description: 'Text/file encoding & decoding',
        },
        uuid: { name: 'UUID', description: 'Batch generate unique IDs' },
        'url-encode': {
          name: 'URL Encode/Decode',
          description: 'URL special character encoding',
        },
        color: {
          name: 'Color Converter',
          description: 'HEX, RGB, HSL conversions',
        },
        qrcode: {
          name: 'QR Code Generator',
          description: 'Generate QR codes from text/links',
        },
        hash: {
          name: 'Hash Generator',
          description: 'SHA family checksums for text and files',
        },
        password: {
          name: 'Password Generator',
          description: 'Generate strong random passwords',
        },
      },
    },
    media: {
      name: 'Media Tools',
      description: 'Audio and video conversion',
      tools: {
        'mp4-to-mp3': {
          name: 'MP4 to MP3',
          description: 'Extract audio from video files',
        },
        'compress-mp3': {
          name: 'MP3 Compress',
          description: 'Reduce MP3 file size',
        },
      },
    },
    document: {
      name: 'Document Tools',
      description: 'PDF processing',
      tools: {
        'pdf-compress': {
          name: 'PDF Compress',
          description: 'Shrink PDF file size',
        },
        'pdf-merge': {
          name: 'PDF Merge',
          description: 'Combine multiple PDFs into one',
        },
      },
    },
  },
  notFound: {
    title: 'Page Not Found - WizGo',
    h1: '404',
    body: 'The page you are looking for does not exist — the link may be wrong or the page may have been removed.',
    homeBtn: 'Back to home',
  },
  manifest: {
    name: 'WizGo',
    shortName: 'WizGo',
    description:
      'Free online toolbox: image compression, format conversion, JWT, timestamps and more — runs locally, no uploads',
  },
  pages: {
    home: {
      title: 'Free Online Toolbox: Compress, JWT, Timestamps | WizGo',
      description:
        'Free in-browser tools: image compression, format conversion, JWT decode, timestamp, JSON formatting, code-to-image. No uploads, no install.',
      heroHeading: 'Free Online Toolbox',
      heroSubheading:
        'Image compression, format conversion, JWT, timestamps · runs locally',
      searchPlaceholder: 'Search tools, e.g. PNG compress, to JPG...',
      emptyState: 'No matching tools',
      features: {
        noUpload: 'No upload',
        free: 'Free to use',
        noInstall: 'No install',
      },
      schema: { alternateName: 'WizGo Toolbox' },
    },
    compressFormat: {
      titleTemplate: '{label} Compress: Free Online Lossless Tool | WizGo',
      descriptionTemplate:
        'Compress {label} online — {seoBenefit} Runs in your browser, no uploads.',
      h1Template: '{label} Image Compression',
      formats: {
        png: {
          headline: 'Keep transparency · typically 60-80% smaller',
          hint: 'Best for screenshots, illustrations, icons and logos. Visually indistinguishable from the original; transparent backgrounds preserved automatically.',
          seoBenefit:
            'screenshots and icons shrink 60-80%, photos 20-30%, virtually no quality loss.',
        },
        jpg: {
          headline: 'Photo-tuned compression · typically 30-45% smaller',
          hint: 'Optimized for photos with virtually no visible quality loss; also strips embedded location, device and other privacy metadata.',
          seoBenefit:
            'files shrink 30-45%, EXIF location and device metadata automatically stripped.',
        },
        webp: {
          headline: 'Lossless compression · keeps transparency',
          hint: 'Lossless WebP optimization that fully preserves quality and transparency. If your image is already small enough, the tool returns the original untouched.',
          seoBenefit:
            'lossless optimization that keeps transparency, returns original if already optimal.',
        },
      },
      upload: {
        dragTemplate: 'Drop {label} images here',
        orClick: 'or click to upload (other formats accepted too)',
        pasteHint: 'or press ⌘V / Ctrl+V to paste',
        sizeHint: 'Up to 100MB · batch supported',
      },
      options: {
        strength: 'Compression level:',
        smart: 'Smart',
        light: 'Light',
        strong: 'Strong',
        start: 'Start compressing',
      },
      aboutTemplate: 'About {label} compression',
      related: {
        label: 'Other format compression',
        compressTemplate: '{label} Compress',
        toJpgTemplate: '{label} to JPG',
        toWebpTemplate: '{label} to WebP',
        all: 'All image compression',
      },
      schema: {
        browserReq: 'Modern browser with WebAssembly support',
        descriptionTemplate: 'Online {full} image compression — {headline}.',
      },
    },
    convertPair: {
      titleTemplate: '{fromLabel} to {toLabel}: Free Online Converter | WizGo',
      descriptionTemplate:
        'Convert {fromLabel} to {toLabel} online. {hintWithSpace}Runs locally, no uploads.',
      h1Template: '{fromLabel} to {toLabel}',
      fallbackHintTemplate:
        'Convert {fromFull} images to {toFull} online · runs locally, no uploads',
      pairHints: {
        'png-jpg':
          'Transparent backgrounds filled white, typically 40-80% smaller, great for web, email, chat.',
        'png-webp':
          'WebP keeps transparency while 25-50% smaller than PNG, widely supported.',
        'png-gif': 'For legacy platforms that only accept GIF.',
        'png-bmp': 'Lossless uncompressed BMP for older Windows applications.',
        'jpg-png':
          'Lossless save with transparency — useful before background removal.',
        'jpg-webp':
          '25-35% smaller with virtually no visible difference — ideal for image-heavy sites.',
        'jpg-gif': 'Photos to GIF for legacy chat platforms.',
        'jpg-bmp':
          'Lossless but very large bitmap — for printing or special program input.',
        'webp-png':
          'When WebP is unsupported, PNG is the safest fallback. Transparency preserved.',
        'webp-jpg':
          'Best for platforms lacking WebP support (forums, older publishers).',
        'webp-gif':
          'For older browsers or chat platforms that only accept GIF.',
        'webp-bmp': 'For specific graphics programs or print pipelines.',
        'gif-png': 'Keeps transparency, sharper quality (first frame only).',
        'gif-jpg':
          'Smaller files but loses transparency, first frame only — suited for sharing.',
        'gif-webp':
          'Static GIFs compressed further as WebP, transparency kept.',
        'gif-bmp': 'First frame only, for batch graphics processing.',
        'bmp-png':
          'Major lossless size reduction (70%+) — great for archiving.',
        'bmp-jpg':
          'Highest compression for sharing scans and screenshots in bulk.',
        'bmp-webp':
          'Highest compression ratio, supported across modern browsers.',
        'bmp-gif': 'For legacy chat or forum platforms accepting only GIF.',
      },
      upload: {
        dragTemplate: 'Drop {fromLabel} images here',
        orClick: 'or click to upload (other image formats accepted too)',
        pasteHint: 'or press ⌘V / Ctrl+V to paste',
        sizeHint: 'Up to 100MB · batch supported',
      },
      options: {
        quality: 'Quality:',
        qualityLossless: 'Lossless',
        qualityHigh: 'High',
        qualityMid: 'Medium',
        qualityLow: 'Low',
        startTemplate: 'Convert to {toLabel}',
      },
      related: {
        label: 'Related conversions',
        pairTemplate: '{fromLabel} to {toLabel}',
        more: 'More formats',
      },
      schema: {
        descriptionTemplate:
          'Convert {fromFull} images to {toFull} online — runs locally, no uploads.',
      },
    },
    compress: {
      title: 'Image Compression: Free PNG/JPG/WebP Online | WizGo',
      description:
        'Compress PNG, JPG, JPEG, WebP, GIF online — smart algorithm preserves quality, batch supported, runs in browser, no uploads.',
      h1: 'Image Compression',
      subheading:
        'Online PNG, JPG, WebP compression · runs locally · batch supported',
      schema: {
        name: 'Image Compression',
        description:
          'Free online image compression for PNG, JPG, WebP — runs locally, no uploads',
        browserReq: 'Modern browser with WebAssembly support',
      },
      upload: {
        drag: 'Drop images here',
        orClick: 'or click to upload',
        pasteHint: 'or press ⌘V / Ctrl+V to paste',
        sizeHint: 'JPG, PNG, WebP, GIF supported · up to 100MB',
      },
      options: {
        strength: 'Compression level:',
        smart: 'Smart',
        light: 'Light',
        strong: 'Strong',
        start: 'Start compressing',
      },
    },
    convert: {
      title: 'Image Format Converter: PNG/JPG/WebP/HEIC | WizGo',
      description:
        'Convert PNG, JPG, JPEG, WebP, GIF, BMP online — runs in your browser, no uploads, no install.',
      h1: 'Image Format Converter',
      subheading: 'Online PNG, JPG, WebP, GIF, BMP interchange · runs locally',
      schema: {
        name: 'Image Format Converter',
        description:
          'PNG, JPG, WebP, GIF, BMP online interchange — runs locally, no uploads',
      },
      upload: {
        drag: 'Drop images here',
        orClick: 'or click to upload',
        pasteHint: 'or press ⌘V / Ctrl+V to paste',
        sizeHint: 'Up to 100MB',
      },
      options: {
        fromLabel: 'Source format:',
        autoDetect: 'Auto-detected',
        toLabel: 'Convert to:',
        qualityLabel: 'Quality:',
        qualityLossless: 'Lossless',
        qualityHigh: 'High',
        qualityMid: 'Medium',
        qualityLow: 'Low',
        start: 'Start converting',
      },
    },
    about: {
      title: 'About WizGo — Local-First Tools, Privacy & Stack',
      description:
        "WizGo's tech and privacy policy: tools run locally in your browser — no file uploads. Built with Astro + Rust WASM + WebCrypto.",
      h1: 'About WizGo',
      schema: {
        name: 'About WizGo',
        description:
          "WizGo's tech stack and privacy policy: every tool runs in your browser — no uploads.",
        orgDescription:
          'Free online toolbox: image compression, format conversion, JWT, timestamps and more. Pure in-browser processing — no uploads.',
      },
      intro:
        'WizGo is a free, secure and fast online toolbox. We believe user privacy is essential, so every tool runs locally in your browser — files and data never leave your device.',
      techStack: {
        heading: 'Tech Stack',
        image: {
          title: 'Image Processing',
          body: 'Rust-built WebAssembly modules with imagequant palette quantization and the jpeg-encoder optimization pipeline. Supports PNG, JPEG, WebP, GIF, BMP.',
        },
        crypto: {
          title: 'Crypto & Signing',
          body: 'JWT decoding, signing and verification all run on the browser-native WebCrypto API. Supports HS, RS and ES algorithm families with zero third-party dependencies.',
        },
        frontend: {
          title: 'Frontend Framework',
          body: 'Built on Astro static-site generation with Tailwind CSS for a clean Vercel-style UI.',
        },
        pwa: {
          title: 'PWA Support',
          body: 'Progressive Web App support — installable on desktop and mobile, works offline.',
        },
      },
      privacy: {
        heading: 'Privacy Policy',
        intro:
          'WizGo is a pure-frontend architecture; every file is processed inside your browser:',
        items: [
          'Files are never uploaded to any server',
          'No personal data is collected',
          'A small amount of preference data is stored locally in LocalStorage',
        ],
      },
      limits: {
        heading: 'Limitations',
        intro:
          'Due to browser environment constraints, WizGo has the following usage limits:',
        items: [
          'Image files should stay under 100MB',
          'Large files may take longer to process',
          'Some advanced compression algorithms (mozjpeg trellis, lossy libwebp) are limited by the pure-Rust WASM toolchain',
        ],
      },
      credits: {
        heading: 'Open-Source Acknowledgements',
        intro:
          'WizGo is built with the following excellent open-source libraries:',
        items: [
          {
            label: 'imagequant',
            href: 'https://github.com/ImageOptim/libimagequant',
            desc: 'PNG palette quantization',
          },
          {
            label: 'lodepng-rust',
            href: 'https://github.com/kornelski/lodepng-rust',
            desc: 'Pure-Rust PNG encoding',
          },
          {
            label: 'jpeg-encoder',
            href: 'https://github.com/vstroebel/jpeg-encoder',
            desc: 'Rust JPEG encoder',
          },
          {
            label: 'Astro',
            href: 'https://astro.build',
            desc: 'Modern static site generator',
          },
          {
            label: 'Geist',
            href: 'https://vercel.com/font',
            desc: 'Vercel design typeface',
          },
        ],
      },
    },
    watermark: {
      title: 'Hidden Image Watermark: Embed/Extract | WizGo',
      description:
        'Embed hidden text in image pixels or extract watermark — LSB and DCT steganography. Pure in-browser processing, no uploads.',
      h1: 'Hidden Image Watermark',
      subheading:
        'Hide text inside image pixels or extract it back · runs locally',
      schema: {
        name: 'Hidden Image Watermark',
        description:
          'Embed hidden text into image pixels or extract watermark from images. Supports LSB and DCT algorithms. Pure in-browser processing.',
      },
      tabs: { embed: 'Embed', extract: 'Extract' },
      common: {
        imageLabel: 'Image',
        dropImage: 'Click or drop an image here',
        formats: 'PNG · JPG · WebP',
        replaceImage: 'Replace image',
        copyBtn: 'Copy',
      },
      embed: {
        textLabel: 'Hidden text',
        textPlaceholder: 'e.g. © Author 2026',
        runBtn: 'Embed watermark',
        jpgWarn:
          'Output is always PNG — saving as PNG keeps the broadest compatibility',
        resultLabel: 'Watermarked result',
        downloadBtn: 'Download PNG',
        copyImageBtn: 'Copy image',
      },
      extract: {
        resultLabel: 'Extracted text',
        resultPlaceholder: 'Click the button below to extract the watermark',
        runBtn: 'Extract watermark',
      },
      faq: {
        heading: 'How it works',
        paragraphs: [
          'Hide a piece of text inside an image — the change is invisible to the eye and the image dimensions stay the same, but this tool can read the text back. Useful for invisible signatures, source tracing or attaching hidden notes.',
          'Embed output is always saved as PNG to preserve the full watermark signal. If the image is later re-saved as JPG and re-compressed, short text usually still recovers; long text or repeated compression may break — keep the PNG original for safety.',
          'Everything runs locally in your browser — neither the image nor the text is uploaded.',
        ],
      },
    },
    uuid: {
      title: 'UUID Generator: Online Batch Tool | WizGo',
      description:
        'Free online UUID v4 generator — batch, multiple formats (standard / no-dashes / uppercase), one-click copy. Crypto-secure random, runs locally.',
      h1: 'UUID Generator',
      subheading:
        'Batch generate unique IDs · standard / no-dashes / uppercase · runs locally',
      schema: {
        name: 'UUID Generator',
        description: 'Online batch UUID generator with multiple formats',
      },
      countLabel: 'Count',
      formatLabel: 'Format options',
      noDashes: 'Remove dashes (-)',
      uppercase: 'Uppercase',
      generateBtn: 'Regenerate',
      resultLabel: 'Generated',
      copyAllBtn: 'Copy all',
      copiedAllBtn: 'Copied all',
      empty: 'Click "Regenerate" to generate UUIDs',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      info: {
        heading: 'About UUID',
        body: "UUID (Universally Unique Identifier) is a 128-bit identifier, typically rendered as 32 hexadecimal digits in 5 groups. This tool uses the browser's built-in cryptographically secure random generator (crypto.getRandomValues) to produce UUID v4, ensuring extremely high uniqueness — suitable for database primary keys, session IDs, API keys, and more.",
      },
    },
    urlEncode: {
      title: 'URL Encode/Decode: Online Tool | WizGo',
      description:
        'Free URL encode/decode online — Unicode and special characters, batch processing, encodeURI vs encodeURIComponent modes. Runs locally.',
      h1: 'URL Encode/Decode',
      subheading:
        'URL special character encoding · supports Unicode · batch processing · runs locally',
      schema: {
        name: 'URL Encode/Decode',
        description:
          'URL encoding/decoding tool with Unicode and special character support',
      },
      tabEncode: 'Encode',
      tabDecode: 'Decode',
      encodeMode: {
        label: 'Encode mode',
        component: 'Full encode (recommended)',
        uri: 'Preserve URL chars',
        componentHint:
          'Full encode: encodes all special characters — best for URL parameter values',
        uriHint:
          'Preserve URL chars: keeps : / ? # & = and other reserved characters — best for full URLs',
      },
      labels: {
        inputEncode: 'Input text',
        inputDecode: 'Input encoded',
        outputEncode: 'Encoded result',
        outputDecode: 'Decoded result',
      },
      placeholders: {
        inputEncode: 'Type text to encode...',
        inputDecode: 'Paste a URL-encoded string to decode...',
        output: 'Result will appear here...',
      },
      hint: 'Multi-line batch supported',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      clearBtn: 'Clear',
      charCountTemplate: 'Characters: {count}',
      errors: {
        encode: 'Encode failed: contains characters that cannot be encoded',
        decode: 'Decode failed: invalid URL-encoded string',
      },
      examples: {
        heading: 'Examples',
        labels: {
          chinese: '中文',
          space: 'Space',
          ampersand: '&',
          equals: '=',
        },
      },
      useCases: {
        heading: 'Use cases',
        items: [
          'Pass non-ASCII characters in URLs',
          'Build URLs with query parameters',
          'Handle special characters in form data',
          'Encode API request parameters',
          'Decode previously encoded URL strings',
        ],
      },
    },
    qrcode: {
      title: 'QR Code Generator - Online Text/Link to QR | WizGo',
      description:
        'Free online QR code generator for text, URLs and contacts. Customize size and colors; download PNG/SVG. Pure in-browser generation, no uploads.',
      h1: 'QR Code Generator',
      subheading:
        'Text/links to QR codes · customizable styles · PNG/SVG download · runs locally',
      schema: {
        name: 'QR Code Generator',
        description: 'Online QR code generator with custom size and color',
      },
      content: {
        label: 'Content',
        placeholder: 'Type text or URL...',
        hint: 'Supports text, URLs, emails, phone numbers and more',
      },
      size: 'Size',
      colors: {
        label: 'Colors',
        foreground: 'Foreground',
        background: 'Background',
      },
      ec: {
        label: 'Error correction',
        low: 'Low',
        medium: 'Medium',
        quartile: 'High',
        high: 'Highest',
        lowTitle: 'Low - ~7% error correction',
        mediumTitle: 'Medium - ~15% error correction',
        quartileTitle: 'High - ~25% error correction',
        highTitle: 'Highest - ~30% error correction',
        hint: 'Higher error correction tolerates more occlusion or damage on the QR code',
      },
      generateBtn: 'Generate QR code',
      resetBtn: 'Reset',
      preview: 'Preview',
      previewEmpty: 'Type content and click "Generate QR code"',
      generating: 'Generating...',
      generateError: 'Generation failed — please check content',
      emptyContent: 'Please type content',
      downloadPng: 'Download PNG',
      downloadSvg: 'Download SVG',
      infoTemplate:
        'Length: {chars} chars / {bytes} bytes · Size: {size}x{size}px',
      examples: {
        heading: 'Examples',
        url: 'URL:',
        email: 'Email:',
        phone: 'Phone:',
        wifi: 'WiFi:',
      },
    },
    timestamp: {
      title: 'Unix Timestamp Converter — Timestamp ↔ Date | WizGo',
      description:
        'Free Unix timestamp ↔ date converter — sec/ms, UTC/local timezone, ISO 8601. Live timestamp display, one-click copy. Runs locally.',
      h1: 'Timestamp Converter',
      subheading: 'Unix timestamp ↔ date · seconds / milliseconds / ISO 8601',
      schema: {
        name: 'Unix Timestamp Converter',
        description:
          'Unix timestamp ↔ date converter with seconds/milliseconds and UTC/local timezone support',
      },
      currentTime: {
        label: 'Current time',
        pauseBtn: 'Pause',
        resumeBtn: 'Resume',
        unixSec: 'Unix sec',
        unixMs: 'Unix ms',
        localTime: 'Local time',
        isoUtc: 'ISO 8601 (UTC)',
        tzTemplate: 'Timezone: {tz} · UTC{sign}{h}:{m}',
        tzPlaceholder: 'Timezone: —',
      },
      t2d: {
        label: 'Timestamp → Date',
        fillNowBtn: 'Fill now',
        units: { auto: 'Auto', sec: 'sec', ms: 'ms' },
        placeholder: 'e.g. 1516239022 or 1516239022000',
        errors: {
          nan: 'Must be a number',
          oor: 'Number out of range',
          invalid: 'Invalid timestamp',
        },
        outputs: {
          local: 'Local time',
          utc: 'UTC time',
          iso: 'ISO 8601',
          relative: 'Relative',
        },
      },
      d2t: {
        label: 'Date → Timestamp',
        fillNowBtn: 'Fill now',
        isoPlaceholder: 'or paste ISO string: 2024-01-18T03:30:22Z',
        errors: {
          invalidDate: 'Invalid date',
          unparseable: 'Could not parse date string',
        },
        outputs: { sec: 'Unix sec', ms: 'Unix ms', iso: 'ISO 8601 (UTC)' },
      },
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      justNow: 'just now',
      footerHint:
        'Unix epoch: 1970-01-01 00:00:00 UTC · 10-digit second · 13-digit millisecond',
    },
    color: {
      title: 'Color Converter: HEX/RGB/HSL Online | WizGo',
      description:
        'Free HEX, RGB, HSL color converter online — live preview, one-click copy. Built for designers and developers. Runs locally.',
      h1: 'Color Converter',
      subheading:
        'HEX, RGB and HSL color value conversion · live preview · runs locally',
      schema: {
        name: 'Color Converter',
        description: 'HEX, RGB and HSL color value converter with live preview',
      },
      pickerHint: 'Pick a color',
      hex: { label: 'Hex value' },
      rgb: { label: 'RGB values', r: 'R (red)', g: 'G (green)', b: 'B (blue)' },
      hsl: {
        label: 'HSL values',
        h: 'H (hue)',
        s: 'S (saturation)',
        l: 'L (lightness)',
      },
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      quickColorsLabel: 'Quick colors',
      colorNames: {
        black: 'Black',
        red: 'Red',
        orange: 'Orange',
        amber: 'Amber',
        yellowGreen: 'Yellow-green',
        green: 'Green',
        cyan: 'Cyan',
        blue: 'Blue',
        indigo: 'Indigo',
        purple: 'Purple',
        pink: 'Pink',
        white: 'White',
      },
      randomBtn: 'Random color',
    },
    codeImage: {
      title: 'Code to Image - Beautiful Code Share Image Generator | WizGo',
      description:
        'Turn code snippets into beautiful share images online. Supports JavaScript, TypeScript, Python, Go, Rust and many more. Pick a theme, download as PNG.',
      h1: 'Code to Image',
      subheading:
        'Generate beautiful share images from code · multi-language · multi-theme',
      schema: {
        name: 'Code to Image',
        description:
          'Convert code to beautiful share images with multi-language and multi-theme support',
      },
      placeholder: 'Type or paste code here...',
      formatBtn: 'Format',
      sampleBtn: 'Load sample',
      copyBtn: 'Copy image',
      downloadBtn: 'Download image',
      tipPrefix: 'Tip:',
      tipBody:
        'Multi-language syntax highlighting renders live as you type — no extra step needed.',
      renderError: 'Render failed',
    },
    base64: {
      title: 'Base64 Encode/Decode: Text & File Online | WizGo',
      description:
        'Free Base64 encoder/decoder online — text and files, image preview, binary download. Runs in your browser, no uploads.',
      h1: 'Base64 Encode/Decode',
      subheading:
        'Text/file ↔ Base64 · supports images, text and binary · runs locally',
      schema: {
        name: 'Base64 Encode/Decode',
        description:
          'Text/file ↔ Base64 converter supporting images, text and binary',
      },
      tabs: { encode: 'Encode', decode: 'Decode' },
      labels: {
        inputEncode: 'Input text',
        inputDecode: 'Input Base64',
        outputEncode: 'Base64 output',
        outputDecode: 'Decoded output',
        imagePreview: 'Image preview',
        imageAlt: 'Preview',
      },
      placeholders: {
        inputEncode: 'Type text...',
        inputDecode: 'Paste a Base64 string...',
        outputEncode: 'Base64 result will appear here...',
        outputDecode: 'Decoded result will appear here...',
      },
      clearBtn: 'Clear',
      uploadBtn: 'Upload file',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      downloadBtn: 'Download file',
      fileSizeLimit: 'File size limit: 5MB',
      unknownType: 'unknown type',
      errors: {
        encodeFail:
          'Encode failed: text contains characters that cannot be processed',
        fileReadFail: 'Failed to read file',
        decodeFail: 'Decode failed: invalid Base64 string',
        fileTooLargeTemplate: 'File too large. Max 5MB, current {size}',
      },
      binaryFileTemplate: '[binary file - {size}]',
      tips: {
        heading: 'How to use',
        items: [
          'Encode: type text or upload a file — converts to a Base64 string automatically',
          'Decode: paste a Base64 string (data URI prefix is fine) — decodes to text or file',
          'Image preview: decoded images render directly on the page',
          'File download: decoded binary files can be downloaded directly',
        ],
      },
    },
    jwt: {
      title: 'JWT Decoder/Generator/Verifier: HS/RS/ES | WizGo',
      description:
        'Decode JWT header/payload, verify signatures, generate tokens online. Supports HS, RS, ES algorithms. Runs locally, no uploads.',
      h1: 'JWT Decode/Sign/Verify',
      subheading: 'JSON Web Token · HS256 RS256 ES256 · runs locally',
      schema: {
        name: 'JWT Decode/Sign/Verify',
        description:
          'JSON Web Token online tool supporting HS/RS/ES algorithm families — runs locally',
      },
      algoLabel: 'Signing algorithm',
      encodedLabel: 'Encoded · full token',
      encodedPlaceholder: 'header.payload.signature',
      sampleBtn: 'Load sample',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      verify: {
        idle: 'Provide a token and key to verify the signature',
        ok: 'Signature verified',
        bad: 'Signature does not match',
        needSecret: 'Provide secret to verify signature',
        needPubkey: 'Paste a public key to verify the signature',
        needSecretForSign: 'Provide secret to generate signature',
        needPrivkeyForSign: 'Paste a private key to generate signature',
        signedNoVerify: 'Signed · paste public key/secret to verify',
        failTemplate: 'Verification failed: {msg}',
      },
      headerLabel: 'Header',
      payloadLabel: 'Payload',
      secret: {
        label: 'Secret (UTF-8 or base64)',
        isB64Label: 'secret is base64-encoded',
        placeholder: 'your-256-bit-secret',
      },
      pubkeyLabel: 'Public Key (PEM, for verification)',
      privkeyLabel: 'Private Key (PEM, for signing)',
      pubkeyPlaceholder:
        '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      privkeyPlaceholder:
        '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----',
      errors: {
        pemEmpty: 'PEM content is empty',
        jwtFormat: 'Invalid JWT format: expected header.payload.signature',
        headerB64: 'Header base64 is invalid',
        payloadB64: 'Payload base64 is invalid',
        headerJson: 'Header is not valid JSON',
        payloadJson: 'Payload is not valid JSON',
        signFailTemplate: 'Sign failed: {msg}',
      },
    },
    textWatermark: {
      title: 'Passport & ID Watermark: Anti-Fraud Image Tool | WizGo',
      description:
        'Add "for X use only" watermark to passports, driver\'s licenses and contracts before sending to banks, landlords or KYC — anti-fraud, copyright protection. Runs locally.',
      h1: 'Image Text Watermark',
      subheading:
        'Stamp "for X use only" on passport and ID scans before sharing · anti-fraud, traceable · runs locally',
      schema: {
        name: 'Image Text Watermark',
        alternateNames: [
          'passport watermark',
          'driver license watermark',
          'KYC document watermark',
          'image text watermark',
        ],
        description:
          "Add visible text watermarks to sensitive images — passport scans, driver's license copies, contracts and signed forms — so a recipient cannot repurpose them. Supports tile / center / corner layouts. Pure in-browser processing.",
        featureList: [
          "Passport / driver's license / ID scan watermarking",
          '"For [purpose] use only" dedicated marks',
          'Tile / center / corner layouts',
          'Color, size, opacity and rotation are adjustable',
          'In-browser processing — images never uploaded',
          'Supports PNG / JPG / WebP',
        ],
      },
      howToSchema: {
        name: 'How to watermark an ID or document image before sharing',
        description:
          'Stamp a "for X use only" text watermark on an image in three steps to prevent document misuse',
        toolName: 'Browser (Chrome / Safari / Edge)',
        steps: [
          {
            name: 'Upload image',
            text: 'Click the upload area or drag the image in. Supports PNG / JPG / WebP. Images are processed locally and never uploaded.',
          },
          {
            name: 'Type watermark text',
            text: 'For example "For Acme Bank mortgage application only" or "For Globex rental application 2026". State the specific use case and recipient.',
          },
          {
            name: 'Adjust style and download',
            text: 'Pick tile (anti-crop), tweak color, size, opacity and rotation, then click download PNG.',
          },
        ],
      },
      faqSchema: {
        items: [
          {
            question: 'Is it legal to watermark my own passport or ID?',
            answer:
              'Yes — you own the copy. Stamping a "for X use only" watermark on a passport or driver\'s license scan before emailing it to a landlord, bank or employer is a widely recommended anti-fraud practice and does not invalidate the document.',
          },
          {
            question: 'What text should the watermark contain?',
            answer:
              'Include three elements: purpose + recipient + date. For example "For Acme Bank 2026 mortgage application only". The more specific, the harder to misuse.',
          },
          {
            question: 'Where is the safest place to put the watermark?',
            answer:
              'Tile mode is safest — text is laid diagonally across the whole image and cannot be cropped out. Corner watermarks are easily cropped away. For important documents, use tile + semi-transparent gray.',
          },
          {
            question: 'Will my image be uploaded to a server?',
            answer:
              'No. All processing happens locally in your browser (Canvas 2D). Image files and watermark text never leave your device — the server only delivers the static page.',
          },
          {
            question: 'Can the watermark be removed in Photoshop?',
            answer:
              'Text watermarks are visible pixel changes; a skilled user can erase them in Photoshop, but it takes time and leaves traces. For everyday misuse (forwarding, scraping, hot-linking), a text watermark is deterrent enough. For removal-resistant invisible signatures, use our hidden watermark tool.',
          },
          {
            question: 'Is the watermarked image saved as JPG or PNG?',
            answer:
              'This tool exports PNG (lossless, sharpest watermark edges). If the file is too large, run it through "PNG Compress" to shrink further.',
          },
        ],
      },
      imageLabel: 'Image',
      dropImage: 'Click or drop an image here',
      formats: 'PNG · JPG · WebP',
      replaceImage: 'Replace image',
      textLabel: 'Watermark text',
      textDefault: 'For Acme Bank use only',
      textPlaceholder: 'e.g. For Acme Bank mortgage application only',
      sizeLabel: 'Size',
      colorLabel: 'Color',
      boldLabel: 'Bold',
      swatches: {
        red: 'Red',
        white: 'White',
        lightGray: 'Light gray',
        midGray: 'Medium gray',
        darkGray: 'Dark gray',
        charcoal: 'Charcoal',
        black: 'Black',
      },
      customColorTitle: 'Custom color',
      opacityLabel: 'Opacity',
      rotationLabel: 'Rotation',
      spacingLabel: 'Spacing',
      patternLabel: 'Layout',
      patterns: { tile: 'Tile', single: 'Single', corner: 'Corner' },
      downloadBtn: 'Download PNG',
      copyImageBtn: 'Copy image',
      useCases: {
        heading: 'Common use cases',
        items: [
          {
            title: "Passport / driver's license · anti-fraud",
            bodyHtml:
              'Rental applications, bank onboarding, KYC at crypto exchanges and new-employer I-9 checks all ask you to email a scan of a government ID. Stamping "For Acme Bank 2026 mortgage only" prevents that scan being reused for loan fraud or unauthorized account openings elsewhere. Use <strong>tile mode</strong> at 30–50% opacity.',
          },
          {
            title: 'Contracts, NDAs and signed forms',
            bodyHtml:
              'When emailing a signed contract, NDA, W-9 or lease to a counterparty, a "for [recipient + purpose] only" watermark restricts later reuse or forwarding. Same applies to utility bills and bank statements used as proof of address.',
          },
          {
            title: 'Proof of address / income to a landlord or CPA',
            bodyHtml:
              'Utility bills, pay stubs and tax returns routinely leak into recruiter spreadsheets and landlord databases. A watermark like "For 123 Main St rental application only" makes reuse obviously suspicious.',
          },
          {
            title: 'Copyright protection for photos and artwork',
            bodyHtml:
              'Adding a byline or domain to photos, product shots and illustrations before posting on social platforms substantially reduces direct theft. Use <strong>corner</strong> for subtle copyright marks; <strong>tile</strong> for strong anti-theft coverage.',
          },
        ],
      },
      steps: {
        heading: 'How to use',
        itemsHtml: [
          '<strong>Upload the image</strong> — click the upload area or drag the file in. Supports PNG / JPG / WebP. Images are processed locally and never uploaded.',
          '<strong>Type the watermark text</strong> — state the purpose and recipient explicitly, e.g. "For Acme Bank mortgage application only" or "For 123 Main St rental application 2026". The more specific, the harder to misuse.',
          '<strong>Adjust style</strong> — pick a layout (tile is most crop-resistant), color (red for strong emphasis, gray for a subtler mark), size, opacity and rotation. Preview updates live.',
          '<strong>Download PNG</strong> — click the download button to save locally, or use "Copy image" to paste straight into email or chat.',
        ],
      },
      faq: {
        heading: 'FAQ',
        items: [
          {
            q: 'Is it legal to watermark my own passport or ID?',
            aHtml:
              'Yes — you own the copy. Stamping a "for X use only" watermark on a passport or driver\'s license scan before emailing it to a landlord, bank or employer is a widely recommended anti-fraud practice and does not invalidate the document.',
          },
          {
            q: 'What text should the watermark contain?',
            aHtml:
              'Include three elements: purpose + recipient + date. For example "For Acme Bank 2026 mortgage only" or "For 123 Main St rental application — April 2026". The more specific, the harder to misuse.',
          },
          {
            q: 'Where is the safest place to put the watermark?',
            aHtml:
              'Tile mode is safest — text is laid diagonally across the whole image and cannot be cropped out. Corner watermarks are easily cropped away. For ID documents or bank cards, use tile + semi-transparent gray for both safety and legibility.',
          },
          {
            q: 'Will my image be uploaded to a server?',
            aHtml:
              'No. All processing happens locally in your browser (Canvas 2D draws pixels directly). Image files and watermark text never leave your device. You can even use this tool offline.',
          },
          {
            q: 'Can the watermark be removed in Photoshop?',
            aHtml:
              'Text watermarks are visible pixel changes; a skilled user can erase them in Photoshop, but it takes time and leaves traces. For everyday misuse (forwarding, scraping, hot-linking), a text watermark is deterrent enough. For removal-resistant invisible signatures, use our <a href="/en/watermark" class="text-[#0072f5] hover:underline">Hidden Watermark</a> tool.',
          },
          {
            q: 'What if the watermarked image is too large?',
            aHtml:
              'This tool exports PNG (lossless, sharpest edges). If the file is too large to upload or send, run it through <a href="/en/compress-png" class="text-[#0072f5] hover:underline">PNG Compress</a> to shrink further, or use <a href="/en/png-to-jpg" class="text-[#0072f5] hover:underline">PNG to JPG</a> to switch to a smaller format.',
          },
        ],
      },
    },
    json: {
      title: 'JSON Formatter: Beautify, Minify, Validate | WizGo',
      description:
        'Free online JSON formatter — beautify, minify, validate with one-click copy. Runs in your browser, pasted data never uploaded.',
      h1: 'JSON Formatter',
      subheading: 'Beautify, minify, validate JSON · runs locally',
      schema: {
        name: 'JSON Formatter',
        description:
          'JSON beautify, minify and validate — runs locally, no uploads',
      },
      inputLabel: 'Input JSON',
      formatBtn: 'Beautify',
      minifyBtn: 'Minify',
      clearBtn: 'Clear',
      inputPlaceholder: '{"example": "Paste JSON data here"}',
      resultLabel: 'Result',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      outputPlaceholder: 'Formatted JSON will appear here',
      formatError: 'Invalid JSON — please check your input',
    },
    hash: {
      title: 'Hash Generator: SHA-256, SHA-512 Online | WizGo',
      description:
        'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes for text and files in your browser. Verify downloads, check integrity — nothing leaves your device.',
      h1: 'Hash Generator',
      subheading:
        'Check file integrity or hash any text · SHA-1 / SHA-256 / SHA-384 / SHA-512 · runs in your browser',
      schema: {
        name: 'Hash Generator',
        description:
          'Free online tool to compute SHA-1, SHA-256, SHA-384, and SHA-512 hashes for text and files — all locally in your browser.',
      },
      tabs: { text: 'Text', file: 'File' },
      input: {
        textLabel: 'Text to hash',
        textPlaceholder: 'Type or paste any text here...',
        fileLabel: 'File to hash',
        fileDrop: 'Drop a file here',
        fileHint: 'or click to choose a file',
        clearBtn: 'Clear',
        fileReplace: 'Choose another file',
        fileSizeHint: 'Up to 2GB · processed locally, never uploaded',
      },
      output: {
        label: 'Results',
        formatLabel: 'Output format',
        hex: 'Hex',
        base64: 'Base64',
        copyBtn: 'Copy',
        copiedBtn: 'Copied',
        computing: 'Computing...',
        empty: 'Enter text or pick a file to see hashes',
      },
      algorithms: {
        sha1: 'SHA-1',
        sha256: 'SHA-256',
        sha384: 'SHA-384',
        sha512: 'SHA-512',
      },
      errors: {
        tooLargeTemplate:
          'File is too large ({size}). Maximum supported size is 2GB.',
        readFailed: 'Could not read the file. Please try again.',
        hashFailed:
          'Hashing failed. Your browser may not support this algorithm.',
      },
      tips: {
        heading: 'About hash values',
        items: [
          'A hash is a fixed-length fingerprint of your content — identical input always yields identical hash.',
          'SHA-256 is the most common choice for file integrity checks (e.g., verifying downloads).',
          'Everything runs in your browser. Files and text never leave your device.',
          'MD5 is not included because it is no longer considered secure — prefer SHA-256 or stronger.',
        ],
      },
    },
    mp4ToMp3: {
      title: 'MP4 to MP3: Free Online Video to Audio | WizGo',
      description:
        'Pull the audio out of a video and save it as MP3 — free, instant, in your browser. No uploads, no sign-up, no install.',
      h1: 'Video to MP3',
      subheading:
        'Get the audio out of any video · works on your device · nothing leaves your computer',
      schema: {
        name: 'MP4 to MP3 Converter',
        description:
          'Free online tool to extract audio from MP4 videos and save as MP3 — runs in your browser, no uploads.',
      },
      upload: {
        drag: 'Drop a video here',
        orClick: 'or click to choose a file (MP4, MOV, M4A, WebM)',
        sizeHint: 'Up to 500MB · one file at a time',
      },
      options: {
        bitrateLabel: 'Audio quality:',
        k128: 'Standard · 128k',
        k192: 'Recommended · 192k',
        k256: 'High · 256k',
        k320: 'Best · 320k',
        start: 'Get MP3',
      },
      progress: {
        preparing: 'Getting ready...',
        decoding: 'Reading the audio...',
        encodingTemplate: 'Converting · {pct}%',
        done: 'Done!',
      },
      errors: {
        tooLargeTemplate:
          'That file is too big. Max size is 500MB (yours is {size}).',
        decodeFailedSafari:
          'Safari could not read this file. Please update Safari, or try it in Chrome or Firefox.',
        decodeFailedGeneric:
          'Could not read the audio in this file. The format inside might be unusual.',
      },
      result: {
        ready: 'Your MP3 is ready — preview or download below',
        downloadBtn: 'Download',
        sizeTemplate: 'Size: {size}',
      },
      faq: {
        heading: 'Common questions',
        items: [
          {
            q: 'Will my video be uploaded somewhere?',
            a: 'No. Everything happens right here in your browser. The file never leaves your computer.',
          },
          {
            q: 'What kinds of videos work?',
            a: 'Most everyday videos — MP4 (the most common), MOV from iPhone, M4A audio, and WebM. If a file does not work, the audio inside is in an unusual format.',
          },
          {
            q: 'Why does it sometimes fail on Safari?',
            a: 'Older Safari can not read the audio in some MP4 files. Update Safari, or open the page in Chrome, Firefox or Edge.',
          },
          {
            q: 'Is there a size limit?',
            a: 'Yes — 500MB per file. Anything bigger can freeze your browser, especially on a phone.',
          },
          {
            q: 'Can I convert several videos at once?',
            a: 'Not yet. For now, do them one by one.',
          },
        ],
      },
    },
    compressMp3: {
      title: 'Compress MP3 Online - Reduce Audio File Size | WizGo',
      description:
        'Shrink MP3 files by re-encoding at a lower bitrate — free, instant, in your browser. No uploads, no sign-up.',
      h1: 'MP3 Compressor',
      subheading:
        'Shrink MP3 files by re-encoding at a lower bitrate · runs on your device · nothing uploaded',
      schema: {
        name: 'MP3 Compressor',
        description:
          'Free online tool to compress MP3 files by re-encoding at a lower bitrate. Runs in your browser with WebAssembly.',
      },
      upload: {
        drag: 'Drop an audio file here',
        orClick: 'or click to choose (MP3, M4A, WAV, FLAC, OGG)',
        sizeHint: 'Up to 500MB · one file at a time',
      },
      options: {
        bitrateLabel: 'Target bitrate:',
        k64: 'Voice · 64k',
        k96: 'Music · 96k',
        k128: 'Standard · 128k',
        k192: 'High · 192k',
        start: 'Compress',
      },
      progress: {
        preparing: 'Getting ready...',
        decoding: 'Reading the audio...',
        encodingTemplate: 'Compressing · {pct}%',
        done: 'Done!',
      },
      errors: {
        tooLargeTemplate:
          'That file is too big. Max size is 500MB (yours is {size}).',
        decodeFailedSafari:
          'Safari could not read this file. Please update Safari, or try it in Chrome or Firefox.',
        decodeFailedGeneric: 'Could not read the audio in this file.',
      },
      result: {
        ready: 'Your compressed MP3 is ready',
        downloadBtn: 'Download',
        sizeTemplate: 'Size: {size}',
        reductionTemplate: 'Saved {pct}% · {before} → {after}',
      },
      faq: {
        heading: 'Common questions',
        items: [
          {
            q: 'How much smaller will my MP3 be?',
            a: 'Depends on the original bitrate. A 320kbps MP3 compressed to 128kbps shrinks by about 60%. A 192kbps to 96kbps saves around 50%.',
          },
          {
            q: 'Will the quality drop?',
            a: 'Yes, but how much depends on the target bitrate. 128kbps sounds near-original for most music, 96kbps is OK for streaming, 64kbps is for voice recordings only.',
          },
          {
            q: 'Is my audio uploaded?',
            a: 'No. Everything happens in your browser with WebAssembly. The file never leaves your device.',
          },
          {
            q: 'Can I also use WAV or FLAC files?',
            a: 'Yes. Any format your browser can decode (WAV, FLAC, M4A, OGG) will be converted to MP3 at your chosen bitrate.',
          },
          {
            q: 'What is the maximum file size?',
            a: '500MB per file. Larger files may freeze your browser, especially on mobile.',
          },
        ],
      },
    },
    password: {
      title: 'Password Generator - Create Strong Random Passwords | WizGo',
      description:
        'Free online password generator. Create strong random passwords with customizable length and character types (uppercase, lowercase, numbers, symbols). Exclude similar and ambiguous characters. Runs locally in your browser.',
      h1: 'Password Generator',
      subheading:
        'Generate strong random passwords · customize length and character types · runs locally',
      schema: {
        name: 'Password Generator',
        description:
          'Generate strong random passwords with customizable options',
      },
      modeLabel: 'Password type',
      mode: {
        random: 'Random password',
        passphrase: 'Passphrase',
      },
      lengthLabel: 'Password length',
      wordCountLabel: 'Word count',
      charTypesLabel: 'Character types',
      charTypes: {
        uppercase: 'Uppercase (A-Z)',
        lowercase: 'Lowercase (a-z)',
        numbers: 'Numbers (0-9)',
        symbols: 'Symbols (!@#$%)',
      },
      separatorLabel: 'Separator',
      separators: {
        hyphen: 'Hyphen (-)',
        underscore: 'Underscore (_)',
        space: 'Space ( )',
        period: 'Period (.)',
        number: 'Random number',
      },
      advanced: {
        label: 'Advanced options',
        excludeSimilar: 'Exclude similar characters (i, l, 1, L, o, 0, O)',
        excludeAmbiguous:
          'Exclude ambiguous symbols ({ } [ ] ( ) / \\ \' " ` ~ , ; : . < >)',
      },
      generateBtn: 'Generate password',
      copyBtn: 'Copy',
      copiedBtn: 'Copied',
      regenerateBtn: 'Regenerate',
      resultLabel: 'Generated password',
      strength: {
        label: 'Password strength',
        weak: 'Weak',
        fair: 'Fair',
        good: 'Good',
        strong: 'Strong',
      },
      info: {
        heading: 'Password security tips',
        body: 'Longer passwords are more secure. We recommend at least 12 characters with a mix of uppercase, lowercase, numbers, and symbols. Never reuse passwords across multiple sites. Consider using a password manager to store your generated passwords.',
      },
    },
    pdfCompress: {
      title: 'PDF Compress: Shrink PDF File Size Online | WizGo',
      description:
        'Free online PDF compressor. Shrinks file size by rewriting object streams and stripping metadata. Runs entirely in your browser — nothing uploaded.',
      h1: 'PDF Compress',
      subheading: 'Shrink PDF file size · runs locally · nothing uploaded',
      schema: {
        name: 'PDF Compress',
        description:
          'Free online tool to compress PDF files by rewriting object streams and stripping metadata. Runs entirely in the browser.',
        browserReq: 'Modern browser with File API support',
      },
      upload: {
        drag: 'Drop PDF files here',
        orClick: 'or click to upload',
        pasteHint: 'or press ⌘V / Ctrl+V to paste',
        sizeHint: 'Up to 200MB per file · batch supported',
      },
      options: {
        stripMetadataLabel: 'Strip metadata',
        stripMetadataHint: 'Remove title, author, keywords and producer info',
        objectStreamNote:
          'Object-stream compression is always on. Embedded images are not re-encoded in this version — expect 5–15% savings.',
        start: 'Compress',
      },
      progress: {
        preparing: 'Preparing...',
        processingTemplate: 'Processing · {cur}/{total}',
        done: 'Done',
      },
      result: {
        ready: 'Compressed',
        downloadBtn: 'Download',
        sizeTemplate: 'Size: {size}',
        reductionTemplate: 'Saved {pct}% · {before} → {after}',
        noReduction: 'No further reduction possible — original returned',
      },
      errors: {
        tooLargeTemplate: '{name} is too large — max 200MB (current {size})',
        notPdfTemplate: '{name} is not a PDF file',
        loadFailedTemplate: 'Could not read PDF: {name}',
        encryptedPdf: 'Encrypted or password-protected PDFs are not supported',
      },
      faq: {
        heading: 'FAQ',
        items: [
          {
            q: 'How much smaller will my PDF get?',
            a: 'Typically 5–15%, depending on the source. Already-optimized PDFs have less room to shrink. Image-heavy PDFs will benefit far more once image re-encoding ships in V2 (projected 50–80%).',
          },
          {
            q: 'Will quality drop?',
            a: 'No. V1 only rewrites object streams and strips metadata — images, fonts and text keep identical pixels. The savings are purely structural.',
          },
          {
            q: 'Is my file uploaded?',
            a: 'No. Everything runs in your browser with pdf-lib — the file never leaves your device.',
          },
          {
            q: 'Are encrypted PDFs supported?',
            a: 'Not in V1. Password-protected PDFs raise an error — remove protection first.',
          },
          {
            q: 'Why does the output sometimes grow?',
            a: 'For highly optimized originals, the rewrite can add a few KB. When that happens, the tool shows "no further reduction" and lets you download the original.',
          },
        ],
      },
    },
    pdfMerge: {
      title: 'PDF Merge: Combine Multiple PDFs Online | WizGo',
      description:
        'Free online PDF merger. Combine multiple PDFs into one, reorder with up/down buttons. Runs in your browser — nothing uploaded.',
      h1: 'PDF Merge',
      subheading:
        'Combine multiple PDFs into one · reorder before merging · runs locally',
      schema: {
        name: 'PDF Merge',
        description:
          'Free online tool to merge multiple PDFs into a single document, with ordering controls. Runs entirely in the browser.',
        browserReq: 'Modern browser with File API support',
      },
      upload: {
        drag: 'Drop PDF files here',
        orClick: 'or click to upload (multiple supported)',
        pasteHint: 'or press ⌘V / Ctrl+V to paste',
        sizeHint: 'Up to 200MB per file',
        multipleHint: 'Upload at least 2 PDFs to merge',
      },
      list: {
        emptyHint: 'Upload at least 2 PDFs to start',
        moveUpAria: 'Move up',
        moveDownAria: 'Move down',
        removeAria: 'Remove',
        positionTemplate: '{i}/{total}',
      },
      options: {
        mergeBtn: 'Merge PDFs',
        clearAllBtn: 'Clear all',
        minFilesHint: 'At least 2 files are required to merge',
      },
      progress: {
        preparing: 'Preparing...',
        loadingTemplate: 'Loading · {cur}/{total}',
        writing: 'Writing...',
        done: 'Done',
      },
      result: {
        ready: 'Merged',
        downloadBtn: 'Download',
        sizeTemplate: 'Size: {size}',
        pageCountTemplate: '{pages} pages total',
      },
      errors: {
        tooLargeTemplate: '{name} is too large — max 200MB (current {size})',
        notPdfTemplate: '{name} is not a PDF file',
        loadFailedTemplate: 'Could not read PDF: {name}',
        encryptedPdf: 'Encrypted or password-protected PDFs are not supported',
        needTwoFiles: 'At least 2 PDFs are required',
      },
      faq: {
        heading: 'FAQ',
        items: [
          {
            q: 'Is my file uploaded?',
            a: 'No. Everything runs in your browser with pdf-lib — files never leave your device.',
          },
          {
            q: 'Is there a file count limit?',
            a: 'No hard cap, but merging 20+ large files may slow the browser — especially on mobile.',
          },
          {
            q: 'Can I reorder files?',
            a: 'Yes. Use the ▲ / ▼ buttons next to each file. The merged PDF pages follow the list order.',
          },
          {
            q: 'Are encrypted PDFs supported?',
            a: 'Not in V1. Password-protected PDFs raise an error — remove protection first.',
          },
          {
            q: 'Do bookmarks and links survive the merge?',
            a: 'V1 preserves only page content — document-level bookmarks, form fields and link annotations may be dropped.',
          },
        ],
      },
    },
  },
} satisfies Translations;
