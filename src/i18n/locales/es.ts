import type { Translations } from '../schema';

export const es = {
  common: {
    siteName: 'WizGo',
    siteTagline:
      'WizGo es una caja de herramientas online gratis: compresión de imágenes, conversión de formatos, JWT, timestamps y otras utilidades para desarrolladores. Todo se ejecuta en tu navegador — sin subidas.',
    aboutLink: 'Acerca de',
    menuButtonAria: 'Menú',
    languageSwitcherAria: 'Cambiar idioma',
    scripts: {
      loading: 'Cargando, inténtalo de nuevo en un momento',
      processing: 'Procesando...',
      processingFailedTemplate: 'Error: {name}',
      convertFailedTemplate: 'Conversión fallida: {name}',
      savedPercentTemplate: '· ahorrado {pct}%',
      optimized: '· ya optimizado',
      copyBtn: 'Copiar',
      downloadBtn: 'Descargar',
      copying: 'Copiando...',
      copied: 'Copiado',
      copyFailed: 'Error al copiar',
      startCompress: 'Comenzar compresión',
      startConvert: 'Comenzar conversión',
      autoDetect: 'Detectado automáticamente',
      canvasError: 'No se pudo crear el contexto del canvas',
      parseImageError: 'No se pudo procesar la imagen, prueba con otra',
      needImageFirst: 'Primero sube una imagen',
      needText: 'Introduce el texto a insertar',
      noWatermark: 'No se detectó ninguna marca de agua',
      capacityHintTemplate: 'Capacidad {bytes} bytes · ~{chars} caracteres',
      capacityErrorTemplate:
        'Capacidad excedida — máximo {cap} bytes (texto actual {len} bytes)',
      imageTooSmallDct:
        'Imagen demasiado pequeña — DCT requiere al menos 128×128 px',
      imageTooSmallLsb:
        'Imagen demasiado pequeña — se requieren al menos ~32×32 px para insertar marca de agua',
      clipboardNotSupported: 'El navegador no soporta la API del portapapeles',
      pngGenerationFailed: 'Error al generar PNG',
      audioDecodeFailed:
        'No se pudo decodificar el audio. Prueba otro archivo o usa Chrome / Firefox',
      audioEncodeFailed: 'Error al codificar el audio',
      compareBtn: 'Comparar',
      compareBefore: 'Antes',
      compareAfter: 'Después',
    },
  },
  nav: {
    image: {
      label: 'Herramientas de imagen',
      items: {
        compress: {
          name: 'Comprimir imagen',
          desc: 'Compresión inteligente PNG / JPG / WebP',
        },
        convert: {
          name: 'Convertir formato',
          desc: 'Intercambio PNG JPG WebP GIF BMP',
        },
        'png-to-jpg': {
          name: 'PNG a JPG',
          desc: 'Rellena transparencia · archivos más ligeros',
        },
        'jpg-to-png': {
          name: 'JPG a PNG',
          desc: 'Guardado sin pérdida · soporta transparencia',
        },
        'png-to-webp': {
          name: 'PNG a WebP',
          desc: 'Conserva transparencia · archivos más ligeros',
        },
        'jpg-to-webp': {
          name: 'JPG a WebP',
          desc: 'Misma calidad · 25-35% menos tamaño',
        },
        watermark: {
          name: 'Marca de agua oculta',
          desc: 'Insertar / extraer texto invisible',
        },
        'text-watermark': {
          name: 'Marca de agua de texto',
          desc: 'Para DNI · marca anti-fraude',
        },
      },
    },
    dev: {
      label: 'Herramientas para desarrolladores',
      items: {
        jwt: {
          name: 'JWT Decodificar/Verificar',
          desc: 'Analizar, generar, verificar firma',
        },
        timestamp: {
          name: 'Convertir Timestamp',
          desc: 'Unix timestamp ↔ fecha',
        },
        json: {
          name: 'Formatear JSON',
          desc: 'Embellecer / minificar / validar',
        },
        'code-image': {
          name: 'Código a Imagen',
          desc: 'Generar imágenes para compartir código',
        },
        base64: {
          name: 'Base64 Codificar/Decodificar',
          desc: 'Codificación de texto y archivos',
        },
        uuid: {
          name: 'Generador UUID',
          desc: 'Generar identificadores únicos en lote',
        },
        'url-encode': {
          name: 'Codificar/Decodificar URL',
          desc: 'Codificación de caracteres especiales de URL',
        },
        color: {
          name: 'Conversor de Color',
          desc: 'Conversiones HEX, RGB, HSL',
        },
        qrcode: {
          name: 'Generador de Código QR',
          desc: 'Genera códigos QR desde texto o enlaces',
        },
        hash: {
          name: 'Generador de Hash',
          desc: 'Sumas SHA-1 / SHA-256 / SHA-384 / SHA-512',
        },
      },
    },
    media: {
      label: 'Herramientas Multimedia',
      items: {
        'mp4-to-mp3': {
          name: 'MP4 a MP3',
          desc: 'Extrae audio de archivos de video',
        },
        'compress-mp3': {
          name: 'Comprimir MP3',
          desc: 'Reduce el tamaño del MP3 bajando el bitrate',
        },
      },
    },
  },
  quickActions: {
    'png-compress': {
      name: 'Comprimir PNG',
      description: 'Compresión inteligente · 60-80% más ligero',
      tags: [
        'comprimir PNG',
        'pngquant',
        'compresión de imagen',
        'compress png',
      ],
    },
    'jpg-compress': {
      name: 'Comprimir JPG',
      description: 'Compresión de fotos · 30-45% más ligero',
      tags: [
        'comprimir JPG',
        'comprimir JPEG',
        'compresión de imagen',
        'compress jpg',
      ],
    },
    'webp-compress': {
      name: 'Comprimir WebP',
      description: 'Compresión sin pérdida · mantiene transparencia',
      tags: ['comprimir WebP', 'compress webp'],
    },
    'png-to-jpg': {
      name: 'PNG a JPG',
      description: 'Rellena transparencia con blanco · más ligero',
      tags: ['png a jpg', 'png a jpeg', 'convertir png'],
    },
    'jpg-to-png': {
      name: 'JPG a PNG',
      description: 'Guardado sin pérdida · soporta transparencia',
      tags: ['jpg a png', 'jpeg a png', 'convertir jpg'],
    },
    'png-to-webp': {
      name: 'PNG a WebP',
      description: 'Conserva transparencia · archivos más ligeros',
      tags: ['png a webp', 'convertir a webp'],
    },
    'jpg-to-webp': {
      name: 'JPG a WebP',
      description: 'Misma calidad, menor tamaño',
      tags: ['jpg a webp', 'jpeg a webp', 'convertir a webp'],
    },
    'webp-to-png': {
      name: 'WebP a PNG',
      description: 'Compatibilidad WebP',
      tags: ['webp a png', 'convertir webp'],
    },
    'webp-to-jpg': {
      name: 'WebP a JPG',
      description: 'Compatible con plataformas antiguas',
      tags: ['webp a jpg', 'convertir webp'],
    },
    'code-image': {
      name: 'Código a Imagen',
      description: 'Genera imágenes para compartir desde código',
      tags: ['código', 'imagen', 'compartir', 'carbon', 'snippet'],
    },
    jwt: {
      name: 'JWT Decodificar',
      description: 'Generar, analizar, verificar',
      tags: ['JWT', 'token', 'jsonwebtoken', 'decodificar', 'verificar'],
    },
    timestamp: {
      name: 'Convertir Timestamp',
      description: 'Unix timestamp ↔ fecha',
      tags: ['timestamp', 'Unix', 'fecha', 'tiempo', 'epoch'],
    },
    json: {
      name: 'Formatear JSON',
      description: 'Embellecer, minificar, validar JSON',
      tags: [
        'JSON',
        'formatear',
        'embellecer',
        'minificar',
        'validar',
        'parser',
      ],
    },
    base64: {
      name: 'Base64 Codificar/Decodificar',
      description: 'Convierte texto/archivos a y desde Base64',
      tags: [
        'Base64',
        'codificar',
        'decodificar',
        'archivo',
        'codificar base64',
        'decodificar base64',
      ],
    },
    uuid: {
      name: 'Generador UUID',
      description: 'Genera IDs únicos por lotes',
      tags: ['UUID', 'GUID', 'ID único', 'ID aleatorio', 'generador uuid'],
    },
    'url-encode': {
      name: 'URL Codificar/Decodificar',
      description: 'Codifica/decodifica caracteres especiales URL',
      tags: [
        'codificar URL',
        'decodificar URL',
        'encodeURIComponent',
        'percent encoding',
        'url encode',
      ],
    },
    color: {
      name: 'Conversor de Color',
      description: 'Conversión entre HEX, RGB, HSL',
      tags: [
        'color',
        'conversor de color',
        'RGB',
        'HEX',
        'HSL',
        'selector de color',
      ],
    },
    qrcode: {
      name: 'Generador de QR',
      description: 'Genera códigos QR desde texto/enlaces',
      tags: ['Código QR', 'código de barras', 'generador qr', 'QR'],
    },
    'any-convert': {
      name: 'Convertir Imagen',
      description: 'Intercambio de formato PNG JPG WebP',
      tags: [
        'convertir imagen',
        'convertir formato de imagen',
        'png a jpg',
        'jpg a png',
        'WebP',
        'HEIC',
        'BMP',
        'GIF',
      ],
    },
    'any-compress': {
      name: 'Comprimir Imagen',
      description: 'Comprime cualquier imagen',
      tags: ['comprimir', 'general'],
    },
    watermark: {
      name: 'Marca de agua oculta',
      description: 'Inserta/extrae texto invisible',
      tags: [
        'marca de agua oculta',
        'esteganografía',
        'marca de agua',
        'LSB',
        'DCT',
      ],
    },
    'text-watermark': {
      name: 'Marca de agua de texto',
      description: 'DNI / marca anti-fraude',
      tags: [
        'marca de agua de texto',
        'marca de agua de imagen',
        'marca de agua de foto',
        'añadir marca de agua',
        'marca de agua online',
        'marca de agua DNI',
        'marca de agua documento',
        'marca de agua copyright',
        'marca anti-fraude',
      ],
    },
    'mp4-to-mp3': {
      name: 'MP4 a MP3',
      description: 'Extrae audio de vídeo · 128-320 kbps',
      tags: [
        'mp4 a mp3',
        'vídeo a mp3',
        'extraer audio',
        'audio de vídeo',
        'convertidor mp3',
        'mp4 to mp3',
      ],
    },
    'compress-mp3': {
      name: 'Comprimir MP3',
      description: 'Reduce el tamaño de MP3 · baja el bitrate',
      tags: [
        'comprimir mp3',
        'reducir tamaño mp3',
        'compresor mp3',
        'compresión audio',
        'mp3 bitrate',
      ],
    },
    hash: {
      name: 'Generador de Hash',
      description: 'Genera SHA-1 / SHA-256 / SHA-384 / SHA-512 con un clic',
      tags: [
        'hash',
        'sha256',
        'sha-256',
        'sha512',
        'checksum',
        'suma de verificación',
        'integridad de archivo',
      ],
    },
  },
  toolCategories: {
    image: {
      name: 'Herramientas de imagen',
      description: 'Compresión y conversión de imágenes',
      tools: {
        compress: {
          name: 'Comprimir imagen',
          description: 'Comprime imágenes manteniendo la calidad',
        },
        convert: {
          name: 'Convertir formato',
          description: 'Intercambio PNG JPG WebP GIF BMP',
        },
        watermark: {
          name: 'Marca de agua oculta',
          description: 'Insertar / extraer texto invisible',
        },
        'text-watermark': {
          name: 'Marca de agua de texto',
          description: 'Marca anti-fraude / para documentos',
        },
      },
    },
    code: {
      name: 'Herramientas para desarrolladores',
      description: 'Utilidades para desarrolladores',
      tools: {
        'code-image': {
          name: 'Código a Imagen',
          description: 'Convierte código en bonitas imágenes para compartir',
        },
        json: { name: 'JSON', description: 'Formateo JSON' },
        jwt: { name: 'JWT', description: 'Generar / analizar / verificar' },
        timestamp: {
          name: 'Timestamp',
          description: 'Conversión Unix timestamp',
        },
        base64: {
          name: 'Base64',
          description: 'Codificación y decodificación de texto/archivos',
        },
        uuid: { name: 'UUID', description: 'Genera IDs únicos por lotes' },
        'url-encode': {
          name: 'Codificar/Decodificar URL',
          description: 'Caracteres especiales de URL',
        },
        color: {
          name: 'Conversor de Color',
          description: 'Conversiones HEX, RGB, HSL',
        },
        qrcode: {
          name: 'Generador de QR',
          description: 'Genera códigos QR desde texto/enlaces',
        },
        hash: {
          name: 'Generador de Hash',
          description: 'Sumas SHA para texto y archivos',
        },
      },
    },
    media: {
      name: 'Herramientas multimedia',
      description: 'Conversión de audio y vídeo',
      tools: {
        'mp4-to-mp3': {
          name: 'MP4 a MP3',
          description: 'Extrae el audio de un vídeo',
        },
        'compress-mp3': {
          name: 'Comprimir MP3',
          description: 'Reduce el tamaño de archivos MP3',
        },
      },
    },
  },
  notFound: {
    title: 'Página no encontrada - WizGo',
    h1: '404',
    body: 'La página que buscas no existe — el enlace puede ser incorrecto o la página ha sido eliminada.',
    homeBtn: 'Volver al inicio',
  },
  manifest: {
    name: 'WizGo',
    shortName: 'WizGo',
    description:
      'Caja de herramientas online gratis: compresión, conversión, JWT, timestamps y más — local, sin subidas',
  },
  pages: {
    home: {
      title: 'Herramientas Online Gratis: Comprimir, JWT | WizGo',
      description:
        'Herramientas gratis en el navegador: compresión de imagen, conversión de formato, JWT, timestamp, JSON, código a imagen. Sin subidas, sin instalar.',
      heroHeading: 'Caja de Herramientas Online Gratis',
      heroSubheading:
        'Compresión de imagen, conversión, JWT, timestamps · local',
      searchPlaceholder: 'Buscar herramientas: comprimir PNG, a JPG...',
      emptyState: 'No hay herramientas coincidentes',
      features: {
        noUpload: 'Sin subidas',
        free: 'Gratis',
        noInstall: 'Sin instalación',
      },
      schema: { alternateName: 'WizGo Herramientas' },
    },
    compressFormat: {
      titleTemplate: 'Comprimir {label}: Herramienta Online Gratis | WizGo',
      descriptionTemplate:
        'Comprime {label} online — {seoBenefit} Se ejecuta en tu navegador, sin subidas.',
      h1Template: 'Compresión de imagen {label}',
      formats: {
        png: {
          headline: 'Conserva transparencia · típicamente 60-80% más ligero',
          hint: 'Ideal para capturas, ilustraciones, iconos y logos. Visualmente indistinguible del original; los fondos transparentes se preservan automáticamente.',
          seoBenefit:
            'capturas e iconos reducen 60-80%, fotos 20-30%, sin pérdida visible de calidad.',
        },
        jpg: {
          headline: 'Compresión para fotos · típicamente 30-45% más ligero',
          hint: 'Optimizado para fotografías con apenas pérdida visible de calidad; también elimina metadatos EXIF de ubicación y dispositivo.',
          seoBenefit:
            'archivos reducen 30-45%, metadatos EXIF de ubicación y dispositivo eliminados.',
        },
        webp: {
          headline: 'Compresión sin pérdida · conserva transparencia',
          hint: 'Optimización WebP sin pérdida que conserva calidad y transparencia. Si la imagen ya es pequeña, se devuelve intacta.',
          seoBenefit:
            'optimización sin pérdida que conserva transparencia, devuelve el original si ya es óptimo.',
        },
      },
      upload: {
        dragTemplate: 'Arrastra imágenes {label} aquí',
        orClick: 'o haz clic para subir (otros formatos también válidos)',
        sizeHint: 'Hasta 100MB · procesamiento por lotes',
      },
      options: {
        strength: 'Nivel de compresión:',
        smart: 'Inteligente',
        light: 'Ligera',
        strong: 'Fuerte',
        start: 'Comenzar compresión',
      },
      aboutTemplate: 'Sobre la compresión de {label}',
      related: {
        label: 'Otros formatos de compresión',
        compressTemplate: 'Comprimir {label}',
        toJpgTemplate: '{label} a JPG',
        toWebpTemplate: '{label} a WebP',
        all: 'Todas las compresiones',
      },
      schema: {
        browserReq: 'Navegador moderno con soporte WebAssembly',
        descriptionTemplate: 'Compresión de imagen {full} online — {headline}.',
      },
    },
    convertPair: {
      titleTemplate: '{fromLabel} a {toLabel}: Conversor Online Gratis | WizGo',
      descriptionTemplate:
        'Convierte {fromLabel} a {toLabel} online. {hintWithSpace}Se ejecuta localmente, sin subidas.',
      h1Template: '{fromLabel} a {toLabel}',
      fallbackHintTemplate:
        'Convierte imágenes {fromFull} a {toFull} online · procesamiento local, sin subidas',
      pairHints: {
        'png-jpg':
          'Fondos transparentes rellenos blanco, típicamente 40-80% más ligero, perfecto para web, email y chat.',
        'png-webp':
          'WebP conserva transparencia y es 25-50% más ligero que PNG, ampliamente compatible.',
        'png-gif': 'Para plataformas antiguas que solo aceptan GIF.',
        'png-bmp': 'BMP sin compresión para aplicaciones antiguas de Windows.',
        'jpg-png':
          'Guardado sin pérdida con transparencia — útil antes de quitar el fondo.',
        'jpg-webp':
          '25-35% más ligero sin apenas diferencia visible — ideal para sitios con muchas imágenes.',
        'jpg-gif': 'Fotos a GIF para plataformas de chat antiguas.',
        'jpg-bmp':
          'Sin pérdida pero muy grande — para imprenta o programas específicos.',
        'webp-png':
          'Cuando WebP no se admite, PNG es la alternativa más segura. Transparencia preservada.',
        'webp-jpg':
          'Para plataformas sin soporte WebP (foros, editores antiguos).',
        'webp-gif': 'Para navegadores o chats antiguos que solo aceptan GIF.',
        'webp-bmp': 'Para programas gráficos específicos o flujos de imprenta.',
        'gif-png': 'Conserva transparencia, mayor nitidez (solo primer frame).',
        'gif-jpg':
          'Archivos más ligeros, pierde transparencia, solo primer frame — ideal para compartir.',
        'gif-webp':
          'GIF estáticos comprimidos como WebP, transparencia preservada.',
        'gif-bmp': 'Solo primer frame, para procesamiento gráfico por lotes.',
        'bmp-png': 'Gran reducción sin pérdida (70%+) — ideal para archivado.',
        'bmp-jpg':
          'Máxima compresión para compartir escaneos y capturas por lotes.',
        'bmp-webp': 'Máxima compresión, compatible con navegadores modernos.',
        'bmp-gif':
          'Para plataformas antiguas de chat o foros que solo aceptan GIF.',
      },
      upload: {
        dragTemplate: 'Arrastra imágenes {fromLabel} aquí',
        orClick:
          'o haz clic para subir (otros formatos de imagen también válidos)',
        sizeHint: 'Hasta 100MB · procesamiento por lotes',
      },
      options: {
        quality: 'Calidad:',
        qualityHigh: 'Alta',
        qualityMid: 'Media',
        qualityLow: 'Baja',
        startTemplate: 'Convertir a {toLabel}',
      },
      related: {
        label: 'Conversiones relacionadas',
        pairTemplate: '{fromLabel} a {toLabel}',
        more: 'Más formatos',
      },
      schema: {
        descriptionTemplate:
          'Convierte imágenes {fromFull} a {toFull} online — procesamiento local, sin subidas.',
      },
    },
    compress: {
      title: 'Comprimir Imagen: PNG/JPG/WebP Gratis Online | WizGo',
      description:
        'Comprime PNG, JPG, JPEG, WebP, GIF online — algoritmo inteligente, por lotes, en el navegador, sin subidas.',
      h1: 'Compresión de imagen',
      subheading: 'Compresión online de PNG, JPG, WebP · local · por lotes',
      schema: {
        name: 'Compresión de imagen',
        description:
          'Compresión gratis online de PNG, JPG, WebP — procesamiento local, sin subidas',
        browserReq: 'Navegador moderno con soporte WebAssembly',
      },
      upload: {
        drag: 'Arrastra imágenes aquí',
        orClick: 'o haz clic para subir',
        sizeHint: 'JPG, PNG, WebP, GIF · hasta 100MB',
      },
      options: {
        strength: 'Nivel de compresión:',
        smart: 'Inteligente',
        light: 'Ligera',
        strong: 'Fuerte',
        start: 'Comenzar compresión',
      },
    },
    convert: {
      title: 'Conversor de Imágenes: PNG/JPG/WebP/HEIC | WizGo',
      description:
        'Convierte PNG, JPG, JPEG, WebP, GIF, BMP online — en tu navegador, sin subidas ni instalación.',
      h1: 'Conversor de formato de imagen',
      subheading: 'Intercambio online PNG, JPG, WebP, GIF, BMP · local',
      schema: {
        name: 'Conversor de formato de imagen',
        description:
          'Intercambio online PNG, JPG, WebP, GIF, BMP — procesamiento local, sin subidas',
      },
      upload: {
        drag: 'Arrastra imágenes aquí',
        orClick: 'o haz clic para subir',
        sizeHint: 'Hasta 100MB',
      },
      options: {
        fromLabel: 'Formato de origen:',
        autoDetect: 'Detectado automáticamente',
        toLabel: 'Convertir a:',
        qualityLabel: 'Calidad:',
        qualityHigh: 'Alta',
        qualityMid: 'Media',
        qualityLow: 'Baja',
        start: 'Comenzar conversión',
      },
    },
    about: {
      title: 'Acerca de WizGo — Herramientas Locales y Privacidad',
      description:
        'La tecnología y privacidad de WizGo: las herramientas se ejecutan en tu navegador — sin subidas. Astro + Rust WASM + WebCrypto.',
      h1: 'Acerca de WizGo',
      schema: {
        name: 'Acerca de WizGo',
        description:
          'Stack técnico y política de privacidad de WizGo: cada herramienta se ejecuta en tu navegador — sin subidas.',
        orgDescription:
          'Caja de herramientas online gratis: compresión, conversión, JWT, timestamps y más. Procesamiento en navegador — sin subidas.',
      },
      intro:
        'WizGo es una caja de herramientas online gratis, segura y rápida. Creemos que la privacidad del usuario es esencial, por lo que cada herramienta se ejecuta localmente en tu navegador — los archivos y los datos nunca salen de tu dispositivo.',
      techStack: {
        heading: 'Stack técnico',
        image: {
          title: 'Procesamiento de imagen',
          body: 'Módulos WebAssembly construidos en Rust con cuantización de paleta imagequant y el pipeline de optimización jpeg-encoder. Compatible con PNG, JPEG, WebP, GIF, BMP.',
        },
        crypto: {
          title: 'Criptografía y firma',
          body: 'La decodificación, firma y verificación JWT se ejecutan con la API WebCrypto nativa del navegador. Soporta las familias HS, RS y ES sin dependencias externas.',
        },
        frontend: {
          title: 'Framework de frontend',
          body: 'Construido sobre la generación estática de Astro con Tailwind CSS para una interfaz minimalista al estilo Vercel.',
        },
        pwa: {
          title: 'Soporte PWA',
          body: 'Progressive Web App instalable en escritorio y móvil, funciona sin conexión.',
        },
      },
      privacy: {
        heading: 'Política de privacidad',
        intro:
          'WizGo es una arquitectura 100% frontend; cada archivo se procesa dentro de tu navegador:',
        items: [
          'Los archivos nunca se suben a ningún servidor',
          'No se recopilan datos personales',
          'Una pequeña cantidad de preferencias se guarda localmente en LocalStorage',
        ],
      },
      limits: {
        heading: 'Limitaciones',
        intro:
          'Por las restricciones del entorno del navegador, WizGo tiene los siguientes límites de uso:',
        items: [
          'Los archivos de imagen deben mantenerse por debajo de 100MB',
          'Los archivos grandes pueden tardar más en procesarse',
          'Algunos algoritmos avanzados (mozjpeg trellis, libwebp con pérdida) están limitados por el toolchain WASM puro en Rust',
        ],
      },
      credits: {
        heading: 'Agradecimientos open source',
        intro:
          'WizGo se construye con las siguientes excelentes librerías open source:',
        items: [
          {
            label: 'imagequant',
            href: 'https://github.com/ImageOptim/libimagequant',
            desc: 'Cuantización de paleta PNG',
          },
          {
            label: 'lodepng-rust',
            href: 'https://github.com/kornelski/lodepng-rust',
            desc: 'Codificador PNG puro en Rust',
          },
          {
            label: 'jpeg-encoder',
            href: 'https://github.com/vstroebel/jpeg-encoder',
            desc: 'Codificador JPEG en Rust',
          },
          {
            label: 'Astro',
            href: 'https://astro.build',
            desc: 'Generador moderno de sitios estáticos',
          },
          {
            label: 'Geist',
            href: 'https://vercel.com/font',
            desc: 'Tipografía de diseño de Vercel',
          },
        ],
      },
    },
    watermark: {
      title: 'Marca de Agua Oculta en Imagen: Insertar/Extraer | WizGo',
      description:
        'Inserta texto oculto en los píxeles de una imagen o extrae la marca — esteganografía LSB y DCT. Procesamiento en navegador, sin subidas.',
      h1: 'Marca de agua oculta en imagen',
      subheading:
        'Oculta texto dentro de los píxeles de una imagen o extráelo · procesamiento local',
      schema: {
        name: 'Marca de agua oculta en imagen',
        description:
          'Inserta texto oculto en los píxeles de una imagen o extrae la marca. Soporta algoritmos LSB y DCT. Procesamiento en navegador.',
      },
      tabs: { embed: 'Insertar', extract: 'Extraer' },
      common: {
        imageLabel: 'Imagen',
        dropImage: 'Haz clic o arrastra una imagen aquí',
        formats: 'PNG · JPG · WebP',
        replaceImage: 'Reemplazar imagen',
        copyBtn: 'Copiar',
      },
      embed: {
        textLabel: 'Texto oculto',
        textPlaceholder: 'ej. © Autor 2026',
        runBtn: 'Insertar marca de agua',
        jpgWarn:
          'La salida siempre es PNG — guardar como PNG mantiene la máxima compatibilidad',
        resultLabel: 'Resultado con marca de agua',
        downloadBtn: 'Descargar PNG',
        copyImageBtn: 'Copiar imagen',
      },
      extract: {
        resultLabel: 'Texto extraído',
        resultPlaceholder:
          'Pulsa el botón de abajo para extraer la marca de agua',
        runBtn: 'Extraer marca de agua',
      },
      faq: {
        heading: 'Cómo funciona',
        paragraphs: [
          'Oculta un fragmento de texto dentro de una imagen — el cambio es invisible al ojo humano y las dimensiones de la imagen se mantienen, pero esta herramienta puede leer el texto de vuelta. Útil para firmas invisibles, trazabilidad de origen o notas ocultas.',
          'La salida de inserción se guarda siempre en PNG para preservar la señal completa de la marca. Si la imagen se guarda después como JPG y se re-comprime, un texto corto suele recuperarse; un texto largo o re-compresiones repetidas pueden romperlo — guarda siempre el PNG original.',
          'Todo se ejecuta localmente en tu navegador — ni la imagen ni el texto se suben.',
        ],
      },
    },
    uuid: {
      title: 'Generador UUID: Herramienta Online por Lotes | WizGo',
      description:
        'Generador UUID v4 gratis online — por lotes, múltiples formatos (estándar / sin guiones / mayúsculas), copia en un clic. Aleatorio seguro, local.',
      h1: 'Generador UUID',
      subheading:
        'Genera IDs únicos por lotes · estándar / sin guiones / mayúsculas · local',
      schema: {
        name: 'Generador UUID',
        description: 'Generador UUID online por lotes con múltiples formatos',
      },
      countLabel: 'Cantidad',
      formatLabel: 'Opciones de formato',
      noDashes: 'Quitar guiones (-)',
      uppercase: 'Mayúsculas',
      generateBtn: 'Regenerar',
      resultLabel: 'Generados',
      copyAllBtn: 'Copiar todo',
      copiedAllBtn: 'Todo copiado',
      empty: 'Pulsa "Regenerar" para generar UUIDs',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      info: {
        heading: 'Sobre UUID',
        body: 'UUID (Identificador Único Universal) es un identificador de 128 bits, normalmente representado como 32 dígitos hexadecimales en 5 grupos. Esta herramienta usa el generador criptográficamente seguro del navegador (crypto.getRandomValues) para producir UUID v4, garantizando una unicidad extremadamente alta — adecuado para claves primarias de base de datos, IDs de sesión, claves API y más.',
      },
    },
    urlEncode: {
      title: 'Codificar/Decodificar URL: Herramienta Online | WizGo',
      description:
        'Codificación/decodificación URL gratis — Unicode y caracteres especiales, por lotes, modos encodeURI vs encodeURIComponent. Procesamiento local.',
      h1: 'Codificar/Decodificar URL',
      subheading:
        'Codificación de caracteres especiales URL · Unicode · por lotes · local',
      schema: {
        name: 'Codificar/Decodificar URL',
        description:
          'Herramienta de codificación/decodificación URL con soporte Unicode y caracteres especiales',
      },
      tabEncode: 'Codificar',
      tabDecode: 'Decodificar',
      encodeMode: {
        label: 'Modo de codificación',
        component: 'Codificación completa (recomendada)',
        uri: 'Preservar caracteres URL',
        componentHint:
          'Completa: codifica todos los caracteres especiales — ideal para valores de parámetros URL',
        uriHint:
          'Preservar: mantiene : / ? # & = y otros caracteres reservados — ideal para URLs completas',
      },
      labels: {
        inputEncode: 'Texto de entrada',
        inputDecode: 'Entrada codificada',
        outputEncode: 'Resultado codificado',
        outputDecode: 'Resultado decodificado',
      },
      placeholders: {
        inputEncode: 'Escribe texto para codificar...',
        inputDecode: 'Pega una cadena URL-codificada para decodificar...',
        output: 'El resultado aparecerá aquí...',
      },
      hint: 'Procesamiento multilínea por lotes',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      clearBtn: 'Borrar',
      charCountTemplate: 'Caracteres: {count}',
      errors: {
        encode: 'Error al codificar: contiene caracteres no codificables',
        decode: 'Error al decodificar: cadena URL-codificada inválida',
      },
      examples: {
        heading: 'Ejemplos',
        labels: {
          chinese: 'Chino',
          space: 'Espacio',
          ampersand: '&',
          equals: '=',
        },
      },
      useCases: {
        heading: 'Casos de uso',
        items: [
          'Pasar caracteres no-ASCII en URLs',
          'Construir URLs con parámetros de consulta',
          'Manejar caracteres especiales en datos de formulario',
          'Codificar parámetros de solicitudes API',
          'Decodificar cadenas URL previamente codificadas',
        ],
      },
    },
    qrcode: {
      title: 'Generador de Código QR - Texto/Enlace a QR | WizGo',
      description:
        'Generador QR online gratis para texto, URLs y contactos. Tamaño y colores personalizables; descarga PNG/SVG. Generación en navegador, sin subidas.',
      h1: 'Generador de Código QR',
      subheading:
        'Texto/enlaces a códigos QR · estilos personalizables · PNG/SVG · local',
      schema: {
        name: 'Generador de Código QR',
        description: 'Generador QR online con tamaño y color personalizables',
      },
      content: {
        label: 'Contenido',
        placeholder: 'Escribe texto o URL...',
        hint: 'Soporta texto, URLs, correos, teléfonos y más',
      },
      size: 'Tamaño',
      colors: {
        label: 'Colores',
        foreground: 'Primer plano',
        background: 'Fondo',
      },
      ec: {
        label: 'Corrección de errores',
        low: 'Baja',
        medium: 'Media',
        quartile: 'Alta',
        high: 'Máxima',
        lowTitle: 'Baja - ~7% de corrección',
        mediumTitle: 'Media - ~15% de corrección',
        quartileTitle: 'Alta - ~25% de corrección',
        highTitle: 'Máxima - ~30% de corrección',
        hint: 'Una mayor corrección tolera más oclusión o daño en el código QR',
      },
      generateBtn: 'Generar código QR',
      resetBtn: 'Reiniciar',
      preview: 'Vista previa',
      previewEmpty: 'Escribe contenido y pulsa "Generar código QR"',
      generating: 'Generando...',
      generateError: 'Error al generar — revisa el contenido',
      emptyContent: 'Escribe algún contenido',
      downloadPng: 'Descargar PNG',
      downloadSvg: 'Descargar SVG',
      infoTemplate:
        'Longitud: {chars} caract. / {bytes} bytes · Tamaño: {size}x{size}px',
      examples: {
        heading: 'Ejemplos',
        url: 'URL:',
        email: 'Email:',
        phone: 'Teléfono:',
        wifi: 'WiFi:',
      },
    },
    timestamp: {
      title: 'Conversor Timestamp Unix — Timestamp ↔ Fecha | WizGo',
      description:
        'Conversor Unix timestamp ↔ fecha gratis — seg/ms, UTC/local, ISO 8601. Timestamp en vivo, copia en un clic. Procesamiento local.',
      h1: 'Conversor de Timestamp',
      subheading: 'Unix timestamp ↔ fecha · segundos / milisegundos / ISO 8601',
      schema: {
        name: 'Conversor Unix Timestamp',
        description:
          'Conversor Unix timestamp ↔ fecha con soporte de segundos/milisegundos y zona horaria UTC/local',
      },
      currentTime: {
        label: 'Hora actual',
        pauseBtn: 'Pausar',
        resumeBtn: 'Reanudar',
        unixSec: 'Unix seg',
        unixMs: 'Unix ms',
        localTime: 'Hora local',
        isoUtc: 'ISO 8601 (UTC)',
        tzTemplate: 'Zona horaria: {tz} · UTC{sign}{h}:{m}',
        tzPlaceholder: 'Zona horaria: —',
      },
      t2d: {
        label: 'Timestamp → Fecha',
        fillNowBtn: 'Rellenar ahora',
        units: { auto: 'Auto', sec: 'seg', ms: 'ms' },
        placeholder: 'ej. 1516239022 o 1516239022000',
        errors: {
          nan: 'Debe ser un número',
          oor: 'Número fuera de rango',
          invalid: 'Timestamp inválido',
        },
        outputs: {
          local: 'Hora local',
          utc: 'Hora UTC',
          iso: 'ISO 8601',
          relative: 'Relativo',
        },
      },
      d2t: {
        label: 'Fecha → Timestamp',
        fillNowBtn: 'Rellenar ahora',
        isoPlaceholder: 'o pega cadena ISO: 2024-01-18T03:30:22Z',
        errors: {
          invalidDate: 'Fecha inválida',
          unparseable: 'No se pudo procesar la cadena de fecha',
        },
        outputs: { sec: 'Unix seg', ms: 'Unix ms', iso: 'ISO 8601 (UTC)' },
      },
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      justNow: 'ahora mismo',
      footerHint:
        'Epoch Unix: 1970-01-01 00:00:00 UTC · 10 dígitos para segundos · 13 para milisegundos',
    },
    color: {
      title: 'Conversor de Color: HEX/RGB/HSL Online | WizGo',
      description:
        'Conversor de color HEX, RGB, HSL gratis online — vista previa en vivo, copia en un clic. Para diseñadores y desarrolladores. Local.',
      h1: 'Conversor de Color',
      subheading:
        'Conversión de valores HEX, RGB y HSL · vista previa en vivo · local',
      schema: {
        name: 'Conversor de Color',
        description:
          'Conversor de valores HEX, RGB y HSL con vista previa en vivo',
      },
      pickerHint: 'Elige un color',
      hex: { label: 'Valor hexadecimal' },
      rgb: {
        label: 'Valores RGB',
        r: 'R (rojo)',
        g: 'G (verde)',
        b: 'B (azul)',
      },
      hsl: {
        label: 'Valores HSL',
        h: 'H (tono)',
        s: 'S (saturación)',
        l: 'L (luminosidad)',
      },
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      quickColorsLabel: 'Colores rápidos',
      colorNames: {
        black: 'Negro',
        red: 'Rojo',
        orange: 'Naranja',
        amber: 'Ámbar',
        yellowGreen: 'Verde-amarillo',
        green: 'Verde',
        cyan: 'Cian',
        blue: 'Azul',
        indigo: 'Índigo',
        purple: 'Púrpura',
        pink: 'Rosa',
        white: 'Blanco',
      },
      randomBtn: 'Color aleatorio',
    },
    codeImage: {
      title: 'Código a Imagen - Generar Imágenes Bonitas | WizGo',
      description:
        'Convierte snippets de código en imágenes bonitas para compartir. JavaScript, TypeScript, Python, Go, Rust y más. Elige tema, descarga PNG.',
      h1: 'Código a Imagen',
      subheading:
        'Imágenes para compartir desde código · multi-lenguaje · multi-tema',
      schema: {
        name: 'Código a Imagen',
        description:
          'Convierte código en imágenes bonitas para compartir con soporte multi-lenguaje y multi-tema',
      },
      placeholder: 'Escribe o pega código aquí...',
      formatBtn: 'Formatear',
      sampleBtn: 'Cargar ejemplo',
      copyBtn: 'Copiar imagen',
      downloadBtn: 'Descargar imagen',
      tipPrefix: 'Consejo:',
      tipBody:
        'El resaltado de sintaxis multi-lenguaje se renderiza en vivo mientras escribes — sin pasos extra.',
      renderError: 'Error al renderizar',
    },
    base64: {
      title: 'Base64 Codificar/Decodificar: Texto y Archivo | WizGo',
      description:
        'Codificador/decodificador Base64 gratis online — texto y archivos, vista previa de imagen, descarga binaria. En tu navegador, sin subidas.',
      h1: 'Base64 Codificar/Decodificar',
      subheading:
        'Texto/archivo ↔ Base64 · soporta imágenes, texto y binario · local',
      schema: {
        name: 'Base64 Codificar/Decodificar',
        description:
          'Conversor texto/archivo ↔ Base64 con soporte de imágenes, texto y binario',
      },
      tabs: { encode: 'Codificar', decode: 'Decodificar' },
      labels: {
        inputEncode: 'Texto de entrada',
        inputDecode: 'Entrada Base64',
        outputEncode: 'Salida Base64',
        outputDecode: 'Salida decodificada',
        imagePreview: 'Vista previa de imagen',
        imageAlt: 'Vista previa',
      },
      placeholders: {
        inputEncode: 'Escribe texto...',
        inputDecode: 'Pega una cadena Base64...',
        outputEncode: 'El resultado Base64 aparecerá aquí...',
        outputDecode: 'El resultado decodificado aparecerá aquí...',
      },
      clearBtn: 'Borrar',
      uploadBtn: 'Subir archivo',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      downloadBtn: 'Descargar archivo',
      fileSizeLimit: 'Límite de tamaño: 5MB',
      unknownType: 'tipo desconocido',
      errors: {
        encodeFail:
          'Error al codificar: el texto contiene caracteres no procesables',
        fileReadFail: 'Error al leer el archivo',
        decodeFail: 'Error al decodificar: cadena Base64 inválida',
        fileTooLargeTemplate:
          'Archivo demasiado grande. Máximo 5MB, actual {size}',
      },
      binaryFileTemplate: '[archivo binario - {size}]',
      tips: {
        heading: 'Cómo usar',
        items: [
          'Codificar: escribe texto o sube un archivo — se convierte a Base64 automáticamente',
          'Decodificar: pega una cadena Base64 (el prefijo data URI es válido) — se decodifica a texto o archivo',
          'Vista previa: las imágenes decodificadas se muestran directamente en la página',
          'Descarga: los archivos binarios decodificados pueden descargarse directamente',
        ],
      },
    },
    jwt: {
      title: 'JWT Decodificar/Generar/Verificar: HS/RS/ES | WizGo',
      description:
        'Decodifica cabecera/payload JWT, verifica firmas, genera tokens online. Soporta algoritmos HS, RS, ES. Procesamiento local, sin subidas.',
      h1: 'JWT Decodificar/Firmar/Verificar',
      subheading: 'JSON Web Token · HS256 RS256 ES256 · procesamiento local',
      schema: {
        name: 'JWT Decodificar/Firmar/Verificar',
        description:
          'Herramienta online JSON Web Token con familias HS/RS/ES — procesamiento local',
      },
      algoLabel: 'Algoritmo de firma',
      encodedLabel: 'Codificado · token completo',
      encodedPlaceholder: 'header.payload.signature',
      sampleBtn: 'Cargar ejemplo',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      verify: {
        idle: 'Proporciona un token y una clave para verificar la firma',
        ok: 'Firma verificada',
        bad: 'La firma no coincide',
        needSecret: 'Proporciona el secreto para verificar la firma',
        needPubkey: 'Pega una clave pública para verificar la firma',
        needSecretForSign: 'Proporciona el secreto para generar la firma',
        needPrivkeyForSign: 'Pega una clave privada para generar la firma',
        signedNoVerify: 'Firmado · pega clave pública/secreto para verificar',
        failTemplate: 'Verificación fallida: {msg}',
      },
      headerLabel: 'Cabecera',
      payloadLabel: 'Payload',
      secret: {
        label: 'Secreto (UTF-8 o base64)',
        isB64Label: 'el secreto está codificado en base64',
        placeholder: 'your-256-bit-secret',
      },
      pubkeyLabel: 'Clave Pública (PEM, para verificación)',
      privkeyLabel: 'Clave Privada (PEM, para firma)',
      pubkeyPlaceholder:
        '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      privkeyPlaceholder:
        '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----',
      errors: {
        pemEmpty: 'El contenido PEM está vacío',
        jwtFormat: 'Formato JWT inválido: se esperaba header.payload.signature',
        headerB64: 'Base64 de cabecera inválido',
        payloadB64: 'Base64 de payload inválido',
        headerJson: 'La cabecera no es un JSON válido',
        payloadJson: 'El payload no es un JSON válido',
        signFailTemplate: 'Error al firmar: {msg}',
      },
    },
    textWatermark: {
      title: 'Marca de Agua DNI: Herramienta Anti-Fraude | WizGo',
      description:
        'Añade marca "solo para uso X" a DNI, contratos y documentos — anti-fraude, protección de copyright. Estilos mosaico/centro/esquina. Solo navegador.',
      h1: 'Marca de agua de texto en imagen',
      subheading:
        'Añade marcas de agua de texto a imágenes · anti-fraude, trazabilidad · procesamiento local',
      schema: {
        name: 'Marca de agua de texto en imagen',
        alternateNames: [
          'marca de agua DNI',
          'marca de agua documento',
          'marca de agua para trámite',
          'marca de agua de texto en imagen',
        ],
        description:
          'Añade marcas de agua de texto visibles a imágenes para casos como protección anti-fraude del DNI, escaneos de documentos, trámites y defensa de copyright. Soporta disposiciones mosaico / centro / esquina. Procesamiento en el navegador.',
        featureList: [
          'Marcas de agua para DNI / licencias de empresa',
          'Marcas dedicadas para trámite / apertura de cuenta',
          'Disposiciones mosaico / centro / esquina',
          'Color, tamaño, opacidad y rotación ajustables',
          'Procesamiento en navegador — las imágenes nunca se suben',
          'Soporta PNG / JPG / WebP',
        ],
      },
      howToSchema: {
        name: 'Cómo añadir una marca de agua de texto a una imagen (DNI / documento)',
        description:
          'Añade una marca de agua "solo para uso X" a una imagen en tres pasos para evitar usos indebidos del documento',
        toolName: 'Navegador (Chrome / Safari / Edge)',
        steps: [
          {
            name: 'Sube la imagen',
            text: 'Haz clic en el área de subida o arrastra la imagen. Soporta PNG / JPG / WebP. Las imágenes se procesan localmente y nunca se suben.',
          },
          {
            name: 'Escribe el texto de marca',
            text: 'Por ejemplo "Solo para hipoteca del Banco X" o "Solo para trámite de example.com". Indica el uso y destinatario específicos.',
          },
          {
            name: 'Ajusta estilo y descarga',
            text: 'Elige mosaico (resistente al recorte), ajusta color, tamaño, opacidad y rotación, y pulsa descargar PNG.',
          },
        ],
      },
      faqSchema: {
        items: [
          {
            question: '¿Es legal añadir marca de agua a un DNI?',
            answer:
              'Sí, y es altamente recomendable. Añadir una marca de agua "solo para uso X" a una copia o escaneo del DNI es una forma eficaz de prevenir el uso indebido, y muchos organismos reguladores han publicado guías similares.',
          },
          {
            question: '¿Qué texto debe contener la marca de agua?',
            answer:
              'Incluye tres elementos: propósito + destinatario + fecha. Por ejemplo "Solo para hipoteca del Banco X 2026". Cuanto más específico, más difícil es el uso indebido.',
          },
          {
            question: '¿Dónde es más seguro colocar la marca de agua?',
            answer:
              'El modo mosaico es el más seguro — el texto se extiende diagonalmente por toda la imagen y no se puede recortar. Las marcas en esquina se recortan con facilidad. Para documentos importantes, usa mosaico + gris semitransparente.',
          },
          {
            question: '¿Se sube mi imagen a algún servidor?',
            answer:
              'No. Todo el procesamiento sucede localmente en tu navegador (Canvas 2D). Las imágenes y el texto nunca salen de tu dispositivo — el servidor solo entrega la página estática.',
          },
          {
            question: '¿Se puede eliminar la marca en Photoshop?',
            answer:
              'Las marcas de agua de texto son cambios visibles de píxeles; un usuario experto puede borrarlas en Photoshop, pero lleva tiempo y deja rastros. Para usos cotidianos (reenvíos en chat, hotlinking) disuaden bastante. Para firmas invisibles resistentes a eliminación, usa nuestra herramienta de marca de agua oculta.',
          },
          {
            question: '¿La imagen con marca se guarda como JPG o PNG?',
            answer:
              'Esta herramienta exporta PNG (sin pérdida, bordes nítidos). Si el archivo es demasiado grande, pásalo por "Comprimir PNG" para reducirlo aún más.',
          },
        ],
      },
      imageLabel: 'Imagen',
      dropImage: 'Haz clic o arrastra una imagen aquí',
      formats: 'PNG · JPG · WebP',
      replaceImage: 'Reemplazar imagen',
      textLabel: 'Texto de marca de agua',
      textDefault: 'Solo para trámite web',
      textPlaceholder: 'ej. Solo para trámite web',
      sizeLabel: 'Tamaño',
      colorLabel: 'Color',
      boldLabel: 'Negrita',
      swatches: {
        red: 'Rojo trámite',
        white: 'Blanco',
        lightGray: 'Gris claro',
        midGray: 'Gris medio',
        darkGray: 'Gris oscuro',
        charcoal: 'Carbón',
        black: 'Negro',
      },
      customColorTitle: 'Color personalizado',
      opacityLabel: 'Opacidad',
      rotationLabel: 'Rotación',
      spacingLabel: 'Espaciado',
      patternLabel: 'Disposición',
      patterns: { tile: 'Mosaico', single: 'Única', corner: 'Esquina' },
      downloadBtn: 'Descargar PNG',
      copyImageBtn: 'Copiar imagen',
      useCases: {
        heading: 'Casos de uso comunes',
        items: [
          {
            title: 'Marca en DNI · anti-fraude',
            bodyHtml:
              'Al solicitar banca, alquiler u onboarding, sueles enviar copias del DNI. Añadir una marca como "Solo para hipoteca del Banco X 2026" evita que el DNI se reutilice para préstamos o apertura de cuentas. Usa <strong>modo mosaico</strong> con 30-50% de opacidad.',
          },
          {
            title: 'Licencia / contrato / documento',
            bodyHtml:
              'Al enviar licencias de empresa, permisos de apertura o escaneos de contratos a socios, una marca "solo para uso X" restringe su reutilización. Aplica igual a copias electrónicas de diplomas, carnés y pasaportes.',
          },
          {
            title: 'Marca de trámite web',
            bodyHtml:
              'En materiales de trámite web, los documentos de identidad y cartas de autorización necesitan marca. Formato típico: "Solo para trámite de example.com". El mosaico rojo es el estilo recomendado entre los principales proveedores cloud.',
          },
          {
            title: 'Anti-robo / protección de copyright',
            bodyHtml:
              'Añadir firma de autor o dominio a fotos, imágenes de producto e ilustraciones antes de publicar en redes reduce drásticamente el robo directo. Usa <strong>esquina</strong> para marcas sutiles de copyright; <strong>mosaico</strong> para una cobertura anti-robo fuerte.',
          },
        ],
      },
      steps: {
        heading: 'Cómo usar',
        itemsHtml: [
          '<strong>Sube la imagen</strong> — haz clic en el área de subida o arrastra el archivo. Soporta PNG / JPG / WebP. Las imágenes se procesan localmente y nunca se suben.',
          '<strong>Escribe el texto de marca</strong> — indica propósito y destinatario explícitamente, ej. "Solo para hipoteca del Banco X" o "Solo para trámite de example.com". Cuanto más específico, más difícil es el uso indebido.',
          '<strong>Ajusta el estilo</strong> — elige disposición (mosaico es la más resistente al recorte), color (rojo/gris para trámites), tamaño, opacidad y rotación. La vista previa se actualiza en vivo.',
          '<strong>Descarga PNG</strong> — pulsa el botón de descargar para guardar localmente, o usa "Copiar imagen" para pegarla directamente en chat o correo.',
        ],
      },
      faq: {
        heading: 'Preguntas frecuentes',
        items: [
          {
            q: '¿Es legal añadir marca de agua a un DNI?',
            aHtml:
              'Sí, y es altamente recomendable. Añadir una marca de agua "solo para uso X" a una copia o escaneo del DNI es una forma eficaz de prevenir el uso indebido, y muchos organismos reguladores han publicado guías similares.',
          },
          {
            q: '¿Qué texto debe contener la marca de agua?',
            aHtml:
              'Incluye tres elementos: propósito + destinatario + fecha. Por ejemplo "Solo para hipoteca del Banco X 2026". Cuanto más específico, más difícil es el uso indebido. Para trámites web, usa "Solo para trámite de yourdomain.com".',
          },
          {
            q: '¿Dónde es más seguro colocar la marca de agua?',
            aHtml:
              'El modo mosaico es el más seguro — el texto se extiende diagonalmente por toda la imagen y no se puede recortar. Las marcas en esquina se recortan con facilidad. Para DNI o tarjetas bancarias, usa mosaico + gris semitransparente para máxima seguridad y legibilidad.',
          },
          {
            q: '¿Se sube mi imagen a algún servidor?',
            aHtml:
              'No. Todo el procesamiento sucede localmente en tu navegador (Canvas 2D dibuja los píxeles directamente). Las imágenes y el texto nunca salen de tu dispositivo. Incluso puedes usar esta herramienta sin conexión.',
          },
          {
            q: '¿Se puede eliminar la marca en Photoshop?',
            aHtml:
              'Las marcas de agua de texto son cambios visibles de píxeles; un usuario experto puede borrarlas en Photoshop, pero lleva tiempo y deja rastros. Para usos cotidianos (reenvíos en chat, hotlinking) disuaden bastante. Para firmas invisibles resistentes, usa nuestra herramienta <a href="/es/watermark" class="text-[#0072f5] hover:underline">Marca de agua oculta</a>.',
          },
          {
            q: '¿Qué pasa si la imagen con marca es demasiado grande?',
            aHtml:
              'Esta herramienta exporta PNG (sin pérdida, bordes nítidos). Si el archivo es demasiado grande para enviar, pásalo por <a href="/es/compress-png" class="text-[#0072f5] hover:underline">Comprimir PNG</a> para reducirlo, o usa <a href="/es/png-to-jpg" class="text-[#0072f5] hover:underline">PNG a JPG</a> para cambiar a un formato más ligero.',
          },
        ],
      },
    },
    json: {
      title: 'Formateador JSON: Embellecer, Minificar, Validar | WizGo',
      description:
        'Formateador JSON gratis online — embellece, minifica, valida con copia en un clic. En tu navegador, los datos pegados nunca se suben.',
      h1: 'Formateador JSON',
      subheading: 'Embellecer, minificar, validar JSON · procesamiento local',
      schema: {
        name: 'Formateador JSON',
        description:
          'Embellece, minifica y valida JSON — procesamiento local, sin subidas',
      },
      inputLabel: 'JSON de entrada',
      formatBtn: 'Embellecer',
      minifyBtn: 'Minificar',
      clearBtn: 'Borrar',
      inputPlaceholder: '{"ejemplo": "Pega datos JSON aquí"}',
      resultLabel: 'Resultado',
      copyBtn: 'Copiar',
      copiedBtn: 'Copiado',
      outputPlaceholder: 'El JSON formateado aparecerá aquí',
      formatError: 'JSON inválido — revisa tu entrada',
    },
    hash: {
      title: 'Generador de Hash: SHA-256, SHA-512 Online | WizGo',
      description:
        'Genera hashes SHA-1, SHA-256, SHA-384 y SHA-512 para texto y archivos en tu navegador. Verifica la integridad de descargas — nada sale de tu dispositivo.',
      h1: 'Generador de Hash',
      subheading:
        'Verifica la integridad de archivos o calcula el hash de cualquier texto · SHA-1 / SHA-256 / SHA-384 / SHA-512 · todo en tu navegador',
      schema: {
        name: 'Generador de Hash',
        description:
          'Herramienta online gratuita para calcular hashes SHA-1, SHA-256, SHA-384 y SHA-512 de texto y archivos, todo localmente en tu navegador.',
      },
      tabs: { text: 'Texto', file: 'Archivo' },
      input: {
        textLabel: 'Texto a hashear',
        textPlaceholder: 'Escribe o pega cualquier texto aquí...',
        fileLabel: 'Archivo a hashear',
        fileDrop: 'Suelta un archivo aquí',
        fileHint: 'o haz clic para elegir un archivo',
        clearBtn: 'Limpiar',
        fileReplace: 'Elegir otro archivo',
        fileSizeHint: 'Hasta 2 GB · procesado localmente, sin subir',
      },
      output: {
        label: 'Resultados',
        formatLabel: 'Formato de salida',
        hex: 'Hex',
        base64: 'Base64',
        copyBtn: 'Copiar',
        copiedBtn: 'Copiado',
        computing: 'Calculando...',
        empty: 'Introduce texto o selecciona un archivo para ver los hashes',
      },
      algorithms: {
        sha1: 'SHA-1',
        sha256: 'SHA-256',
        sha384: 'SHA-384',
        sha512: 'SHA-512',
      },
      errors: {
        tooLargeTemplate:
          'El archivo es demasiado grande ({size}). Tamaño máximo soportado: 2 GB.',
        readFailed: 'No se pudo leer el archivo. Inténtalo de nuevo.',
        hashFailed:
          'Fallo al calcular el hash. Tu navegador podría no soportar este algoritmo.',
      },
      tips: {
        heading: 'Sobre los hashes',
        items: [
          'Un hash es una huella digital de longitud fija: la misma entrada siempre produce el mismo hash.',
          'SHA-256 es la opción más común para verificar la integridad de archivos descargados.',
          'Todo se ejecuta en tu navegador. Los archivos y textos nunca salen de tu dispositivo.',
          'MD5 no está incluido porque ya no se considera seguro — usa SHA-256 o superior.',
        ],
      },
    },
    mp4ToMp3: {
      title: 'MP4 a MP3: extrae audio de vídeos gratis | WizGo',
      description:
        'Saca el audio de un vídeo y guárdalo como MP3. Gratis, al instante, en tu navegador. Sin subidas, sin registro, sin instalar nada.',
      h1: 'Vídeo a MP3',
      subheading:
        'Extrae el sonido de cualquier vídeo · en tu dispositivo · nada se sube a internet',
      schema: {
        name: 'Convertidor MP4 a MP3',
        description:
          'Herramienta gratuita online para extraer el audio de vídeos MP4 y guardarlo como MP3 — funciona en tu navegador, sin subidas.',
      },
      upload: {
        drag: 'Suelta un vídeo aquí',
        orClick: 'o haz clic para elegir un archivo (MP4, MOV, M4A, WebM)',
        sizeHint: 'Hasta 500MB · un archivo a la vez',
      },
      options: {
        bitrateLabel: 'Calidad del audio:',
        k128: 'Estándar · 128k',
        k192: 'Recomendada · 192k',
        k256: 'Alta · 256k',
        k320: 'Máxima · 320k',
        start: 'Obtener MP3',
      },
      progress: {
        preparing: 'Preparando...',
        decoding: 'Leyendo el audio...',
        encodingTemplate: 'Convirtiendo · {pct}%',
        done: '¡Listo!',
      },
      errors: {
        tooLargeTemplate:
          'Ese archivo es demasiado grande. El límite es 500MB (el tuyo pesa {size}).',
        decodeFailedSafari:
          'Safari no pudo leer este archivo. Actualiza Safari, o pruébalo en Chrome o Firefox.',
        decodeFailedGeneric:
          'No se pudo leer el audio de este archivo. El formato de dentro puede ser poco común.',
      },
      result: {
        ready: 'Tu MP3 está listo — escúchalo o descárgalo',
        downloadBtn: 'Descargar',
        sizeTemplate: 'Tamaño: {size}',
      },
      faq: {
        heading: 'Preguntas frecuentes',
        items: [
          {
            q: '¿Se sube mi vídeo a algún sitio?',
            a: 'No. Todo ocurre aquí mismo, en tu navegador. El archivo nunca sale de tu ordenador.',
          },
          {
            q: '¿Qué tipo de vídeos puedo usar?',
            a: 'Casi cualquier vídeo del día a día: MP4 (el más común), MOV de iPhone, audios M4A y WebM. Si un archivo no funciona, su audio interno tiene un formato poco frecuente.',
          },
          {
            q: '¿Por qué a veces falla en Safari?',
            a: 'Las versiones antiguas de Safari no leen el audio de algunos MP4. Actualiza Safari, o abre la página en Chrome, Firefox o Edge.',
          },
          {
            q: '¿Hay un límite de tamaño?',
            a: 'Sí: 500MB por archivo. Más allá de eso el navegador puede colgarse, sobre todo en el móvil.',
          },
          {
            q: '¿Puedo convertir varios vídeos a la vez?',
            a: 'Aún no. De momento, uno por uno.',
          },
        ],
      },
    },
    compressMp3: {
      title: 'Comprimir MP3 Online - Reduce el tamaño del audio | WizGo',
      description:
        'Reduce el tamaño de archivos MP3 re-codificando a menor bitrate · gratis, instantáneo, en tu navegador. Sin subidas, sin registro.',
      h1: 'Compresor de MP3',
      subheading:
        'Reduce el tamaño de MP3 bajando el bitrate · se ejecuta en tu dispositivo · nada se sube',
      schema: {
        name: 'Compresor de MP3',
        description:
          'Herramienta online gratuita para comprimir archivos MP3 re-codificando a un bitrate más bajo. Funciona en tu navegador con WebAssembly.',
      },
      upload: {
        drag: 'Suelta un archivo de audio aquí',
        orClick: 'o haz clic para elegir (MP3, M4A, WAV, FLAC, OGG)',
        sizeHint: 'Hasta 500MB · un archivo a la vez',
      },
      options: {
        bitrateLabel: 'Bitrate objetivo:',
        k64: 'Voz · 64k',
        k96: 'Música · 96k',
        k128: 'Estándar · 128k',
        k192: 'Alta · 192k',
        start: 'Comprimir',
      },
      progress: {
        preparing: 'Preparando...',
        decoding: 'Leyendo el audio...',
        encodingTemplate: 'Comprimiendo · {pct}%',
        done: '¡Listo!',
      },
      errors: {
        tooLargeTemplate:
          'El archivo es demasiado grande. Tamaño máximo 500MB (el tuyo es {size}).',
        decodeFailedSafari:
          'Safari no pudo leer este archivo. Actualiza Safari o prueba en Chrome o Firefox.',
        decodeFailedGeneric: 'No se pudo leer el audio de este archivo.',
      },
      result: {
        ready: 'Tu MP3 comprimido está listo',
        downloadBtn: 'Descargar',
        sizeTemplate: 'Tamaño: {size}',
        reductionTemplate: 'Ahorrado {pct}% · {before} → {after}',
      },
      faq: {
        heading: 'Preguntas frecuentes',
        items: [
          {
            q: '¿Cuánto se reducirá mi MP3?',
            a: 'Depende del bitrate original. Un MP3 de 320kbps comprimido a 128kbps se reduce aproximadamente un 60%. De 192kbps a 96kbps ahorra cerca del 50%.',
          },
          {
            q: '¿Bajará la calidad?',
            a: 'Sí, pero depende del bitrate objetivo. 128kbps suena casi original para la mayoría de música, 96kbps está bien para streaming, 64kbps es solo para grabaciones de voz.',
          },
          {
            q: '¿Se sube mi audio?',
            a: 'No. Todo sucede en tu navegador con WebAssembly. El archivo nunca sale de tu dispositivo.',
          },
          {
            q: '¿Puedo usar archivos WAV o FLAC?',
            a: 'Sí. Cualquier formato que tu navegador pueda decodificar (WAV, FLAC, M4A, OGG) se convertirá a MP3 en el bitrate elegido.',
          },
          {
            q: '¿Cuál es el tamaño máximo?',
            a: '500MB por archivo. Archivos más grandes pueden congelar tu navegador, especialmente en móviles.',
          },
        ],
      },
    },
  },
} satisfies Translations;
