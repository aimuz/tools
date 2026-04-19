export type ToolEntry = {
  name: string;
  description: string;
  tags: string[];
  navName?: string;
  navDesc?: string;
};

export type QuickActionKey =
  | 'png-compress'
  | 'jpg-compress'
  | 'webp-compress'
  | 'png-to-jpg'
  | 'jpg-to-png'
  | 'png-to-webp'
  | 'jpg-to-webp'
  | 'webp-to-png'
  | 'webp-to-jpg'
  | 'code-image'
  | 'jwt'
  | 'timestamp'
  | 'json'
  | 'base64'
  | 'uuid'
  | 'url-encode'
  | 'color'
  | 'qrcode'
  | 'hash'
  | 'password'
  | 'any-convert'
  | 'any-compress'
  | 'watermark'
  | 'text-watermark'
  | 'mp4-to-mp3'
  | 'compress-mp3';

export type CategoryToolKey =
  | 'compress'
  | 'convert'
  | 'watermark'
  | 'text-watermark'
  | 'code-image'
  | 'json'
  | 'jwt'
  | 'timestamp'
  | 'base64'
  | 'uuid'
  | 'url-encode'
  | 'color'
  | 'qrcode'
  | 'hash'
  | 'password'
  | 'mp4-to-mp3'
  | 'compress-mp3';

export type CategoryKey = 'image' | 'code' | 'media';

export type NavItemKey =
  | 'compress'
  | 'convert'
  | 'png-to-jpg'
  | 'jpg-to-png'
  | 'png-to-webp'
  | 'jpg-to-webp'
  | 'watermark'
  | 'text-watermark'
  | 'jwt'
  | 'timestamp'
  | 'json'
  | 'code-image'
  | 'base64'
  | 'uuid'
  | 'url-encode'
  | 'color'
  | 'qrcode'
  | 'hash'
  | 'password'
  | 'mp4-to-mp3'
  | 'compress-mp3';

export type CompressFormat = 'png' | 'jpg' | 'webp';

export type ConvertFormat = 'png' | 'jpg' | 'webp' | 'gif' | 'bmp';

export type ConvertPairKey =
  | 'png-jpg'
  | 'png-webp'
  | 'png-gif'
  | 'png-bmp'
  | 'jpg-png'
  | 'jpg-webp'
  | 'jpg-gif'
  | 'jpg-bmp'
  | 'webp-png'
  | 'webp-jpg'
  | 'webp-gif'
  | 'webp-bmp'
  | 'gif-png'
  | 'gif-jpg'
  | 'gif-webp'
  | 'gif-bmp'
  | 'bmp-png'
  | 'bmp-jpg'
  | 'bmp-webp'
  | 'bmp-gif';

export type FormatPitch = {
  headline: string;
  hint: string;
  seoBenefit: string;
};

export type ScriptLabels = {
  loading: string;
  processing: string;
  processingFailedTemplate: string;
  convertFailedTemplate: string;
  savedPercentTemplate: string;
  optimized: string;
  copyBtn: string;
  downloadBtn: string;
  copying: string;
  copied: string;
  copyFailed: string;
  startCompress: string;
  startConvert: string;
  autoDetect: string;
  canvasError: string;
  parseImageError: string;
  needImageFirst: string;
  needText: string;
  noWatermark: string;
  capacityHintTemplate: string;
  capacityErrorTemplate: string;
  imageTooSmallDct: string;
  imageTooSmallLsb: string;
  clipboardNotSupported: string;
  pngGenerationFailed: string;
  audioDecodeFailed: string;
  audioEncodeFailed: string;
  compareBtn: string;
  compareBefore: string;
  compareAfter: string;
};

export type Translations = {
  common: {
    siteName: string;
    siteTagline: string;
    aboutLink: string;
    menuButtonAria: string;
    languageSwitcherAria: string;
    scripts: ScriptLabels;
  };
  nav: {
    image: {
      label: string;
      items: Partial<Record<NavItemKey, { name: string; desc: string }>>;
    };
    dev: {
      label: string;
      items: Partial<Record<NavItemKey, { name: string; desc: string }>>;
    };
    media: {
      label: string;
      items: Partial<Record<NavItemKey, { name: string; desc: string }>>;
    };
  };
  quickActions: Record<QuickActionKey, ToolEntry>;
  toolCategories: Record<
    CategoryKey,
    {
      name: string;
      description: string;
      tools: Partial<
        Record<CategoryToolKey, { name: string; description: string }>
      >;
    }
  >;
  notFound: {
    title: string;
    h1: string;
    body: string;
    homeBtn: string;
  };
  manifest: {
    name: string;
    shortName: string;
    description: string;
  };
  pages: {
    home: {
      title: string;
      description: string;
      heroHeading: string;
      heroSubheading: string;
      searchPlaceholder: string;
      emptyState: string;
      features: { noUpload: string; free: string; noInstall: string };
      schema: { alternateName: string };
    };
    compressFormat: {
      titleTemplate: string;
      descriptionTemplate: string;
      h1Template: string;
      formats: Record<CompressFormat, FormatPitch>;
      upload: {
        dragTemplate: string;
        orClick: string;
        sizeHint: string;
      };
      options: {
        strength: string;
        smart: string;
        light: string;
        strong: string;
        start: string;
      };
      aboutTemplate: string;
      related: {
        label: string;
        compressTemplate: string;
        toJpgTemplate: string;
        toWebpTemplate: string;
        all: string;
      };
      schema: {
        browserReq: string;
        descriptionTemplate: string;
      };
    };
    convertPair: {
      titleTemplate: string;
      descriptionTemplate: string;
      h1Template: string;
      fallbackHintTemplate: string;
      pairHints: Partial<Record<ConvertPairKey, string>>;
      upload: {
        dragTemplate: string;
        orClick: string;
        sizeHint: string;
      };
      options: {
        quality: string;
        qualityHigh: string;
        qualityMid: string;
        qualityLow: string;
        startTemplate: string;
      };
      related: {
        label: string;
        pairTemplate: string;
        more: string;
      };
      schema: {
        descriptionTemplate: string;
      };
    };
    compress: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string; browserReq: string };
      upload: { drag: string; orClick: string; sizeHint: string };
      options: {
        strength: string;
        smart: string;
        light: string;
        strong: string;
        start: string;
      };
    };
    convert: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      upload: { drag: string; orClick: string; sizeHint: string };
      options: {
        fromLabel: string;
        autoDetect: string;
        toLabel: string;
        qualityLabel: string;
        qualityHigh: string;
        qualityMid: string;
        qualityLow: string;
        start: string;
      };
    };
    about: {
      title: string;
      description: string;
      h1: string;
      schema: { name: string; description: string; orgDescription: string };
      intro: string;
      techStack: {
        heading: string;
        image: { title: string; body: string };
        crypto: { title: string; body: string };
        frontend: { title: string; body: string };
        pwa: { title: string; body: string };
      };
      privacy: {
        heading: string;
        intro: string;
        items: [string, string, string];
      };
      limits: {
        heading: string;
        intro: string;
        items: [string, string, string];
      };
      credits: {
        heading: string;
        intro: string;
        items: { label: string; href: string; desc: string }[];
      };
    };
    json: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      inputLabel: string;
      formatBtn: string;
      minifyBtn: string;
      clearBtn: string;
      inputPlaceholder: string;
      resultLabel: string;
      copyBtn: string;
      copiedBtn: string;
      outputPlaceholder: string;
      formatError: string;
    };
    watermark: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      tabs: { embed: string; extract: string };
      common: {
        imageLabel: string;
        dropImage: string;
        formats: string;
        replaceImage: string;
        copyBtn: string;
      };
      embed: {
        textLabel: string;
        textPlaceholder: string;
        runBtn: string;
        jpgWarn: string;
        resultLabel: string;
        downloadBtn: string;
        copyImageBtn: string;
      };
      extract: {
        resultLabel: string;
        resultPlaceholder: string;
        runBtn: string;
      };
      faq: {
        heading: string;
        paragraphs: [string, string, string];
      };
    };
    uuid: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      countLabel: string;
      formatLabel: string;
      noDashes: string;
      uppercase: string;
      generateBtn: string;
      resultLabel: string;
      copyAllBtn: string;
      copiedAllBtn: string;
      empty: string;
      copyBtn: string;
      copiedBtn: string;
      info: { heading: string; body: string };
    };
    urlEncode: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      tabEncode: string;
      tabDecode: string;
      encodeMode: {
        label: string;
        component: string;
        uri: string;
        componentHint: string;
        uriHint: string;
      };
      labels: {
        inputEncode: string;
        inputDecode: string;
        outputEncode: string;
        outputDecode: string;
      };
      placeholders: {
        inputEncode: string;
        inputDecode: string;
        output: string;
      };
      hint: string;
      copyBtn: string;
      copiedBtn: string;
      clearBtn: string;
      charCountTemplate: string;
      errors: { encode: string; decode: string };
      examples: {
        heading: string;
        labels: {
          chinese: string;
          space: string;
          ampersand: string;
          equals: string;
        };
      };
      useCases: {
        heading: string;
        items: [string, string, string, string, string];
      };
    };
    qrcode: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      content: { label: string; placeholder: string; hint: string };
      size: string;
      colors: { label: string; foreground: string; background: string };
      ec: {
        label: string;
        low: string;
        medium: string;
        quartile: string;
        high: string;
        lowTitle: string;
        mediumTitle: string;
        quartileTitle: string;
        highTitle: string;
        hint: string;
      };
      generateBtn: string;
      resetBtn: string;
      preview: string;
      previewEmpty: string;
      generating: string;
      generateError: string;
      emptyContent: string;
      downloadPng: string;
      downloadSvg: string;
      infoTemplate: string;
      examples: {
        heading: string;
        url: string;
        email: string;
        phone: string;
        wifi: string;
      };
    };
    timestamp: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      currentTime: {
        label: string;
        pauseBtn: string;
        resumeBtn: string;
        unixSec: string;
        unixMs: string;
        localTime: string;
        isoUtc: string;
        tzTemplate: string;
        tzPlaceholder: string;
      };
      t2d: {
        label: string;
        fillNowBtn: string;
        units: { auto: string; sec: string; ms: string };
        placeholder: string;
        errors: { nan: string; oor: string; invalid: string };
        outputs: { local: string; utc: string; iso: string; relative: string };
      };
      d2t: {
        label: string;
        fillNowBtn: string;
        isoPlaceholder: string;
        errors: { invalidDate: string; unparseable: string };
        outputs: { sec: string; ms: string; iso: string };
      };
      copyBtn: string;
      copiedBtn: string;
      justNow: string;
      footerHint: string;
    };
    base64: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      tabs: { encode: string; decode: string };
      labels: {
        inputEncode: string;
        inputDecode: string;
        outputEncode: string;
        outputDecode: string;
        imagePreview: string;
        imageAlt: string;
      };
      placeholders: {
        inputEncode: string;
        inputDecode: string;
        outputEncode: string;
        outputDecode: string;
      };
      clearBtn: string;
      uploadBtn: string;
      copyBtn: string;
      copiedBtn: string;
      downloadBtn: string;
      fileSizeLimit: string;
      unknownType: string;
      errors: {
        encodeFail: string;
        fileReadFail: string;
        decodeFail: string;
        fileTooLargeTemplate: string;
      };
      binaryFileTemplate: string;
      tips: { heading: string; items: [string, string, string, string] };
    };
    jwt: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      algoLabel: string;
      encodedLabel: string;
      encodedPlaceholder: string;
      sampleBtn: string;
      copyBtn: string;
      copiedBtn: string;
      verify: {
        idle: string;
        ok: string;
        bad: string;
        needSecret: string;
        needPubkey: string;
        needSecretForSign: string;
        needPrivkeyForSign: string;
        signedNoVerify: string;
        failTemplate: string;
      };
      headerLabel: string;
      payloadLabel: string;
      secret: { label: string; isB64Label: string; placeholder: string };
      pubkeyLabel: string;
      privkeyLabel: string;
      pubkeyPlaceholder: string;
      privkeyPlaceholder: string;
      errors: {
        pemEmpty: string;
        jwtFormat: string;
        headerB64: string;
        payloadB64: string;
        headerJson: string;
        payloadJson: string;
        signFailTemplate: string;
      };
    };
    color: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      pickerHint: string;
      hex: { label: string };
      rgb: { label: string; r: string; g: string; b: string };
      hsl: { label: string; h: string; s: string; l: string };
      copyBtn: string;
      copiedBtn: string;
      quickColorsLabel: string;
      colorNames: {
        black: string;
        red: string;
        orange: string;
        amber: string;
        yellowGreen: string;
        green: string;
        cyan: string;
        blue: string;
        indigo: string;
        purple: string;
        pink: string;
        white: string;
      };
      randomBtn: string;
    };
    codeImage: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      placeholder: string;
      formatBtn: string;
      sampleBtn: string;
      copyBtn: string;
      downloadBtn: string;
      tipPrefix: string;
      tipBody: string;
      renderError: string;
    };
    textWatermark: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: {
        name: string;
        alternateNames: string[];
        description: string;
        featureList: string[];
      };
      howToSchema: {
        name: string;
        description: string;
        toolName: string;
        steps: { name: string; text: string }[];
      };
      faqSchema: { items: { question: string; answer: string }[] };
      imageLabel: string;
      dropImage: string;
      formats: string;
      replaceImage: string;
      textLabel: string;
      textDefault: string;
      textPlaceholder: string;
      sizeLabel: string;
      colorLabel: string;
      boldLabel: string;
      swatches: {
        red: string;
        white: string;
        lightGray: string;
        midGray: string;
        darkGray: string;
        charcoal: string;
        black: string;
      };
      customColorTitle: string;
      opacityLabel: string;
      rotationLabel: string;
      spacingLabel: string;
      patternLabel: string;
      patterns: { tile: string; single: string; corner: string };
      downloadBtn: string;
      copyImageBtn: string;
      useCases: {
        heading: string;
        items: { title: string; bodyHtml: string }[];
      };
      steps: { heading: string; itemsHtml: string[] };
      faq: { heading: string; items: { q: string; aHtml: string }[] };
    };
    hash: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      tabs: { text: string; file: string };
      input: {
        textLabel: string;
        textPlaceholder: string;
        fileLabel: string;
        fileDrop: string;
        fileHint: string;
        clearBtn: string;
        fileReplace: string;
        fileSizeHint: string;
      };
      output: {
        label: string;
        formatLabel: string;
        hex: string;
        base64: string;
        copyBtn: string;
        copiedBtn: string;
        computing: string;
        empty: string;
      };
      algorithms: {
        sha1: string;
        sha256: string;
        sha384: string;
        sha512: string;
      };
      errors: {
        tooLargeTemplate: string;
        readFailed: string;
        hashFailed: string;
      };
      tips: { heading: string; items: string[] };
    };
    password: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      modeLabel: string;
      mode: {
        random: string;
        passphrase: string;
      };
      lengthLabel: string;
      wordCountLabel: string;
      charTypesLabel: string;
      charTypes: {
        uppercase: string;
        lowercase: string;
        numbers: string;
        symbols: string;
      };
      separatorLabel: string;
      separators: {
        hyphen: string;
        underscore: string;
        space: string;
        period: string;
        number: string;
      };
      advanced: {
        label: string;
        excludeSimilar: string;
        excludeAmbiguous: string;
      };
      generateBtn: string;
      copyBtn: string;
      copiedBtn: string;
      regenerateBtn: string;
      resultLabel: string;
      strength: {
        label: string;
        weak: string;
        fair: string;
        good: string;
        strong: string;
      };
      info: {
        heading: string;
        body: string;
      };
    };
    mp4ToMp3: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      upload: { drag: string; orClick: string; sizeHint: string };
      options: {
        bitrateLabel: string;
        k128: string;
        k192: string;
        k256: string;
        k320: string;
        start: string;
      };
      progress: {
        preparing: string;
        decoding: string;
        encodingTemplate: string;
        done: string;
      };
      errors: {
        tooLargeTemplate: string;
        decodeFailedSafari: string;
        decodeFailedGeneric: string;
      };
      result: {
        ready: string;
        downloadBtn: string;
        sizeTemplate: string;
      };
      faq: {
        heading: string;
        items: { q: string; a: string }[];
      };
    };
    compressMp3: {
      title: string;
      description: string;
      h1: string;
      subheading: string;
      schema: { name: string; description: string };
      upload: { drag: string; orClick: string; sizeHint: string };
      options: {
        bitrateLabel: string;
        k64: string;
        k96: string;
        k128: string;
        k192: string;
        start: string;
      };
      progress: {
        preparing: string;
        decoding: string;
        encodingTemplate: string;
        done: string;
      };
      errors: {
        tooLargeTemplate: string;
        decodeFailedSafari: string;
        decodeFailedGeneric: string;
      };
      result: {
        ready: string;
        downloadBtn: string;
        sizeTemplate: string;
        reductionTemplate: string;
      };
      faq: {
        heading: string;
        items: { q: string; a: string }[];
      };
    };
  };
};
