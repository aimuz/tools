import type { Translations } from '../schema';

export const zhCN = {
  common: {
    siteName: 'WizGo',
    siteTagline:
      'WizGo 是免费在线工具箱：图片压缩、格式转换、JWT、时间戳等开发者日常工具，纯浏览器本地处理不上传。',
    aboutLink: '关于',
    menuButtonAria: '菜单',
    languageSwitcherAria: '切换语言',
    scripts: {
      loading: '加载中，请稍后再试',
      processing: '处理中...',
      processingFailedTemplate: '处理失败：{name}',
      convertFailedTemplate: '转换失败：{name}',
      savedPercentTemplate: '· 节省 {pct}%',
      optimized: '· 已优化',
      copyBtn: '复制',
      downloadBtn: '下载',
      copying: '复制中...',
      copied: '已复制',
      copyFailed: '复制失败',
      startCompress: '开始压缩',
      startConvert: '开始转换',
      autoDetect: '自动检测',
      canvasError: '无法创建 canvas 上下文',
      parseImageError: '无法解析图片，请换一张',
      needImageFirst: '请先上传一张图片',
      needText: '请输入要嵌入的文本',
      noWatermark: '未检测到水印',
      capacityHintTemplate: '可嵌入 {bytes} 字节 · 约 {chars} 个汉字',
      capacityErrorTemplate:
        '图片容量不足，最多可嵌入 {cap} 字节（当前文本 {len} 字节）',
      imageTooSmallDct: '图片太小，DCT 算法至少需要 128×128 像素',
      imageTooSmallLsb: '图片太小，无法嵌入水印（至少需要约 32×32 像素）',
      clipboardNotSupported: '当前浏览器不支持剪贴板 API',
      pngGenerationFailed: 'PNG 生成失败',
      audioDecodeFailed: '无法解码音频，请尝试其他文件或使用 Chrome / Firefox',
      audioEncodeFailed: '音频编码失败',
      compareBtn: '对比',
      compareBefore: '原图',
      compareAfter: '输出',
    },
  },
  nav: {
    image: {
      label: '图片工具',
      items: {
        compress: { name: '图片压缩', desc: 'PNG / JPG / WebP 智能压缩' },
        convert: { name: '图片格式转换', desc: 'PNG JPG WebP GIF BMP 互转' },
        'png-to-jpg': {
          name: 'PNG 转 JPG',
          desc: '透明背景白色填充 · 体积更小',
        },
        'jpg-to-png': { name: 'JPG 转 PNG', desc: '无损保存 · 支持透明度' },
        'png-to-webp': { name: 'PNG 转 WebP', desc: '保留透明 · 更小体积' },
        'jpg-to-webp': { name: 'JPG 转 WebP', desc: '同画质再压缩 25-35%' },
        watermark: { name: '图片隐藏水印', desc: '嵌入 / 提取隐藏文字' },
        'text-watermark': {
          name: '图片文字水印',
          desc: '仅供备案使用 · 防盗水印',
        },
      },
    },
    dev: {
      label: '开发者工具',
      items: {
        jwt: { name: 'JWT 解码/验签', desc: '解析、生成、签名验证' },
        timestamp: { name: '时间戳转换', desc: 'Unix 时间戳和日期互转' },
        json: { name: 'JSON 格式化', desc: '美化 / 压缩 / 校验' },
        'code-image': { name: '代码转图片', desc: '生成代码分享图' },
        base64: { name: 'Base64 编解码', desc: '文本 / 文件编码解码' },
        uuid: { name: 'UUID 生成', desc: '批量生成唯一标识符' },
        'url-encode': { name: 'URL 编解码', desc: 'URL 特殊字符编码解码' },
        color: { name: '颜色转换', desc: '十六进制、RGB、HSL 互转' },
        qrcode: { name: '二维码生成', desc: '文本 / 链接生成二维码' },
        hash: {
          name: '哈希值生成',
          desc: 'SHA-1 / SHA-256 / SHA-384 / SHA-512 校验',
        },
        password: {
          name: '密码生成器',
          desc: '生成高强度随机密码',
        },
      },
    },
    media: {
      label: '媒体工具',
      items: {
        'mp4-to-mp3': { name: 'MP4 转 MP3', desc: '从视频文件提取音频' },
        'compress-mp3': {
          name: 'MP3 压缩',
          desc: '降低比特率减小 MP3 文件体积',
        },
      },
    },
    document: {
      label: '文档工具',
      items: {
        'pdf-compress': { name: 'PDF 压缩', desc: '减小 PDF 文件体积' },
        'pdf-merge': { name: 'PDF 合并', desc: '多个 PDF 合并为一个' },
      },
    },
  },
  quickActions: {
    'png-compress': {
      name: 'PNG 压缩',
      description: '智能压缩 · 减小 60-80%',
      tags: ['PNG压缩', 'PNG compress', 'pngquant', '图片压缩'],
    },
    'jpg-compress': {
      name: 'JPG 压缩',
      description: '照片压缩 · 减小 30-45%',
      tags: ['JPG压缩', 'JPEG压缩', 'JPG compress', '图片压缩'],
    },
    'webp-compress': {
      name: 'WebP 压缩',
      description: '无损压缩 · 保留透明',
      tags: ['WebP压缩', 'WebP compress'],
    },
    'png-to-jpg': {
      name: 'PNG 转 JPG',
      description: '透明背景白色填充 · 体积更小',
      tags: ['PNG转JPG', 'PNG转JPEG', 'png to jpg'],
    },
    'jpg-to-png': {
      name: 'JPG 转 PNG',
      description: '无损保存 · 支持透明度',
      tags: ['JPG转PNG', 'JPEG转PNG', 'jpg to png'],
    },
    'png-to-webp': {
      name: 'PNG 转 WebP',
      description: '保留透明 · 体积更小',
      tags: ['PNG转WebP', 'png to webp'],
    },
    'jpg-to-webp': {
      name: 'JPG 转 WebP',
      description: '同等画质更小体积',
      tags: ['JPG转WebP', 'JPEG转WebP', 'jpg to webp'],
    },
    'webp-to-png': {
      name: 'WebP 转 PNG',
      description: 'WebP 兼容性兜底',
      tags: ['WebP转PNG', 'webp to png'],
    },
    'webp-to-jpg': {
      name: 'WebP 转 JPG',
      description: '兼容老旧平台',
      tags: ['WebP转JPG', 'webp to jpg'],
    },
    'code-image': {
      name: '代码转图片',
      description: '代码生成分享图',
      tags: ['代码', '图片', '分享'],
    },
    jwt: {
      name: 'JWT 解码',
      description: '生成、解析、验签',
      tags: ['JWT', 'token', '加密', 'jsonwebtoken'],
    },
    timestamp: {
      name: '时间戳转换',
      description: 'Unix 时间戳和日期互转',
      tags: ['时间戳', 'timestamp', 'Unix', '日期', '时间'],
    },
    json: {
      name: 'JSON 格式化',
      description: 'JSON 美化、压缩、校验',
      tags: ['JSON', '格式化', '美化', '压缩', '校验', 'format', 'parser'],
    },
    base64: {
      name: 'Base64 编解码',
      description: '文本/文件与 Base64 互转',
      tags: [
        'Base64',
        '编码',
        '解码',
        '文件转换',
        'base64 encode',
        'base64 decode',
      ],
    },
    uuid: {
      name: 'UUID 生成器',
      description: '批量生成唯一标识符',
      tags: ['UUID', 'GUID', '唯一ID', '随机ID', 'uuid generator'],
    },
    'url-encode': {
      name: 'URL 编解码',
      description: 'URL 特殊字符编码解码',
      tags: [
        'URL编码',
        'URL解码',
        'encodeURIComponent',
        '百分号编码',
        'url encode',
      ],
    },
    color: {
      name: '颜色转换',
      description: '十六进制、RGB、HSL 色值互转',
      tags: [
        '颜色',
        '色值',
        '颜色转换',
        'RGB',
        'HEX',
        'HSL',
        'color picker',
        '取色器',
      ],
    },
    qrcode: {
      name: '二维码生成',
      description: '文本/链接生成二维码',
      tags: ['二维码', 'QR Code', '条码', 'qrcode generator', '二维码生成器'],
    },
    'any-convert': {
      name: '图片转换',
      description: 'PNG JPG WebP 格式互转',
      tags: [
        '图片转换',
        '图片格式转换',
        'PNG转JPG',
        'JPG转PNG',
        'WebP',
        'HEIC',
        'BMP',
        'GIF',
      ],
    },
    'any-compress': {
      name: '图片压缩',
      description: '任意图片压缩',
      tags: ['压缩', '通用'],
    },
    watermark: {
      name: '图片隐藏水印',
      description: '嵌入/提取隐藏文本',
      tags: ['隐藏水印', '隐写', 'watermark', 'steganography', 'LSB', 'DCT'],
    },
    'text-watermark': {
      name: '图片文字水印',
      description: '身份证 / 备案 / 防盗水印',
      tags: [
        '文字水印',
        '图片水印',
        '图片加水印',
        '在线加水印',
        '身份证水印',
        '身份证加水印',
        '证件水印',
        '营业执照水印',
        '合同水印',
        '备案水印',
        'ICP备案水印',
        '防盗水印',
        '版权水印',
        '仅供备案使用',
        '仅供xx使用',
        '照片水印',
        'text watermark',
        'image watermark',
        'photo watermark',
      ],
    },
    'mp4-to-mp3': {
      name: 'MP4 转 MP3',
      description: '从视频中提取音频 · 128-320 kbps',
      tags: [
        'mp4转mp3',
        '视频转mp3',
        '提取音频',
        '视频转音频',
        'mp3',
        '音频提取',
        'mp4 to mp3',
      ],
    },
    'compress-mp3': {
      name: 'MP3 压缩',
      description: '减小 MP3 文件体积 · 降低比特率',
      tags: [
        'MP3 压缩',
        '压缩 MP3',
        '减小 MP3 体积',
        'MP3 瘦身',
        '音频压缩',
        'MP3 比特率',
      ],
    },
    'pdf-compress': {
      name: 'PDF 压缩',
      description: '减小 PDF 文件体积 · 本地处理',
      tags: [
        'PDF 压缩',
        '压缩 PDF',
        'PDF 瘦身',
        '减小 PDF 体积',
        'PDF compress',
        'shrink pdf',
        'reduce pdf size',
      ],
    },
    'pdf-merge': {
      name: 'PDF 合并',
      description: '多个 PDF 合并为一个 · 可排序',
      tags: [
        'PDF 合并',
        '合并 PDF',
        'PDF 拼接',
        'PDF 组合',
        'merge PDF',
        'combine PDF',
        'PDF join',
      ],
    },
    hash: {
      name: '哈希值生成',
      description: '一键生成 SHA-1 / SHA-256 / SHA-384 / SHA-512',
      tags: [
        '哈希',
        'hash',
        'sha256',
        'sha-256',
        'sha512',
        '校验值',
        '文件校验',
        'checksum',
        '散列',
      ],
    },
    password: {
      name: '密码生成器',
      description: '生成高强度随机密码 · 支持自定义长度和字符类型',
      tags: [
        '密码生成器',
        '随机密码',
        '强密码',
        'password generator',
        '安全密码',
        '随机字符串',
      ],
    },
  },
  toolCategories: {
    image: {
      name: '图片工具',
      description: '图片压缩、格式转换',
      tools: {
        compress: { name: '图片压缩', description: '压缩图片大小，保持画质' },
        convert: {
          name: '图片格式转换',
          description: 'PNG JPG WebP GIF BMP 互转',
        },
        watermark: { name: '图片隐藏水印', description: '嵌入 / 提取隐藏文字' },
        'text-watermark': {
          name: '图片文字水印',
          description: '备案 / 防盗水印',
        },
      },
    },
    code: {
      name: '代码工具',
      description: '开发者工具',
      tools: {
        'code-image': {
          name: '代码转图片',
          description: '把代码生成精美的分享图片',
        },
        json: { name: 'JSON', description: 'JSON 格式化' },
        jwt: { name: 'JWT', description: '生成 / 解析 / 验签' },
        timestamp: { name: '时间戳', description: 'Unix 时间戳转换' },
        base64: { name: 'Base64', description: '文本/文件编解码' },
        uuid: { name: 'UUID', description: '批量生成唯一标识符' },
        'url-encode': {
          name: 'URL 编解码',
          description: 'URL 特殊字符编码解码',
        },
        color: { name: '颜色转换', description: '十六进制、RGB、HSL 色值互转' },
        qrcode: { name: '二维码生成', description: '文本/链接生成二维码' },
        hash: { name: '哈希值生成', description: '文本和文件的 SHA 校验值' },
        password: { name: '密码生成器', description: '生成高强度随机密码' },
      },
    },
    media: {
      name: '音视频工具',
      description: '音频和视频转换',
      tools: {
        'mp4-to-mp3': { name: 'MP4 转 MP3', description: '从视频文件提取音频' },
        'compress-mp3': { name: 'MP3 压缩', description: '减小 MP3 文件体积' },
      },
    },
    document: {
      name: '文档工具',
      description: 'PDF 处理',
      tools: {
        'pdf-compress': {
          name: 'PDF 压缩',
          description: '减小 PDF 文件体积',
        },
        'pdf-merge': {
          name: 'PDF 合并',
          description: '多个 PDF 合并为一个文件',
        },
      },
    },
  },
  notFound: {
    title: '页面未找到 - WizGo',
    h1: '404',
    body: '你要访问的页面不存在，可能是链接错误或页面已移除。',
    homeBtn: '回到首页',
  },
  manifest: {
    name: 'WizGo',
    shortName: 'WizGo',
    description:
      '免费在线工具箱：图片压缩、格式转换、JWT、时间戳等，本地处理不上传',
  },
  pages: {
    home: {
      title: 'WizGo - 免费在线工具箱 · 图片压缩、格式转换、JWT、时间戳',
      description:
        'WizGo 提供图片压缩、图片格式转换、JWT 解码、时间戳转换、JSON 格式化、代码转图片等免费在线工具。纯浏览器本地处理不上传，安全快速无需安装。',
      heroHeading: '免费在线工具箱',
      heroSubheading: '图片压缩、格式转换、JWT、时间戳 · 本地处理不上传',
      searchPlaceholder: '搜索工具，例如：PNG 压缩、转 JPG...',
      emptyState: '没有找到相关工具',
      features: {
        noUpload: '文件不上传',
        free: '免费使用',
        noInstall: '无需安装',
      },
      schema: { alternateName: 'WizGo 工具箱' },
    },
    compressFormat: {
      titleTemplate: '{label} 压缩 - 免费在线 {full} 图片压缩工具 | WizGo',
      descriptionTemplate:
        '免费在线 {label} 图片压缩工具。{seoBenefit} 纯浏览器本地处理不上传，支持批量，保护隐私。',
      h1Template: '{label} 图片压缩',
      formats: {
        png: {
          headline: '保留透明背景 · 文件通常缩小 60-80%',
          hint: '截图、插画、图标、logo 效果最好，肉眼几乎看不出差别，透明背景自动保留。',
          seoBenefit:
            'PNG 智能压缩，截图、插画、图标可缩小 60-80%，照片类 PNG 也能缩小 20-30%，视觉几乎无差。',
        },
        jpg: {
          headline: '照片专用压缩 · 文件通常缩小 30-45%',
          hint: '针对照片深度优化，画质基本不变；同时自动清除照片里的拍摄地点、设备等隐私信息。',
          seoBenefit:
            'JPG 照片压缩，文件缩小 30-45%，自动剥离照片中的拍摄地点、设备型号等隐私信息。',
        },
        webp: {
          headline: '无损压缩 · 保留透明背景',
          hint: '对 WebP 图片做无损优化，画质和透明度完整保留。如果你的图片已经足够小，工具会自动返回原图。',
          seoBenefit:
            'WebP 无损压缩，保留透明度；若原图已经足够优化，工具会返回原图，确保你拿到的永远是更小的那个。',
        },
      },
      upload: {
        dragTemplate: '拖放 {label} 图片到此处',
        orClick: '或点击上传（其他格式也接受）',
        pasteHint: '或按 ⌘V / Ctrl+V 粘贴',
        sizeHint: '最大 100MB · 支持批量',
      },
      options: {
        strength: '压缩力度：',
        smart: '智能推荐',
        light: '轻度',
        strong: '强力',
        start: '开始压缩',
      },
      aboutTemplate: '关于 {label} 压缩',
      related: {
        label: '其他格式压缩',
        compressTemplate: '{label} 压缩',
        toJpgTemplate: '{label} 转 JPG',
        toWebpTemplate: '{label} 转 WebP',
        all: '全部图片压缩',
      },
      schema: {
        browserReq: '需要支持 WebAssembly 的现代浏览器',
        descriptionTemplate: '{full} 图片在线压缩，{headline}。',
      },
    },
    convertPair: {
      titleTemplate: '{fromLabel} 转 {toLabel}：免费在线工具 | WizGo',
      descriptionTemplate:
        '{fromLabel} 转 {toLabel} 在线工具。{hintWithSpace}纯浏览器本地处理不上传。',
      h1Template: '{fromLabel} 转 {toLabel}',
      fallbackHintTemplate:
        '把 {fromFull} 图片在线转换为 {toFull} 格式 · 本地处理不上传',
      pairHints: {
        'png-jpg':
          '透明背景会被白色填充，文件通常可缩小 40-80%，适合网页、邮件、微信分享。',
        'png-webp':
          'WebP 保留透明度的同时比 PNG 小 25-50%，现代浏览器普遍支持。',
        'png-gif': '把 PNG 转成 GIF，用于发送到只支持 GIF 的老旧平台。',
        'png-bmp': '把 PNG 转成无损未压缩的 BMP，常用于兼容老旧 Windows 程序。',
        'jpg-png':
          'JPG 转 PNG 可无损保存并获得透明度支持，适合 logo 底图抠图前处理。',
        'jpg-webp':
          'JPG 转 WebP 可再压缩 25-35%，视觉几乎无差，适合图片量大的网站。',
        'jpg-gif': 'JPG 转 GIF，常用于把照片变成可发送到老旧聊天平台的格式。',
        'jpg-bmp':
          'JPG 转 BMP 会得到一个无损但体积巨大的位图，用于打印或特殊程序输入。',
        'webp-png':
          'WebP 不被某些软件支持时，转回 PNG 是最安全的兜底选择，完整保留透明度。',
        'webp-jpg':
          '需要发图到不支持 WebP 的老平台（微博、公众号、论坛等）时，转 JPG 最稳妥。',
        'webp-gif': 'WebP 转 GIF，兼容老旧浏览器或只支持 GIF 的聊天平台。',
        'webp-bmp': 'WebP 转 BMP，用于特定的图形程序或打印流程。',
        'gif-png': 'GIF 转 PNG 保留透明度，画质更清晰（仅转换首帧）。',
        'gif-jpg':
          'GIF 转 JPG 体积更小，但会丢透明度、只保留首帧，适合分享用途。',
        'gif-webp': 'GIF 转 WebP 静态图可以进一步压缩，保留透明度。',
        'gif-bmp': 'GIF 转 BMP，仅保留首帧，适用于图形程序批量处理。',
        'bmp-png':
          'BMP 转 PNG 可以无损大幅缩小体积（通常减小 70%+），适合归档。',
        'bmp-jpg':
          'BMP 转 JPG 压缩率最高，适合有大量扫描件、截图需要分享时使用。',
        'bmp-webp': 'BMP 转 WebP 可获得最高压缩率，现代浏览器普遍支持。',
        'bmp-gif': 'BMP 转 GIF，用于兼容只支持 GIF 的老旧聊天或论坛平台。',
      },
      upload: {
        dragTemplate: '拖放 {fromLabel} 图片到此处',
        orClick: '或点击上传（也接受其他图片格式）',
        pasteHint: '或按 ⌘V / Ctrl+V 粘贴',
        sizeHint: '最大 100MB · 支持批量',
      },
      options: {
        quality: '画质：',
        qualityLossless: '无损',
        qualityHigh: '高',
        qualityMid: '中',
        qualityLow: '低',
        startTemplate: '开始转换为 {toLabel}',
      },
      related: {
        label: '相关格式转换',
        pairTemplate: '{fromLabel} 转 {toLabel}',
        more: '更多格式',
      },
      schema: {
        descriptionTemplate:
          '把 {fromFull} 图片在线转换为 {toFull} 格式，本地处理不上传。',
      },
    },
    compress: {
      title: '图片压缩 - PNG、JPG、WebP 在线无损压缩 | WizGo',
      description:
        '免费在线图片压缩工具，支持 PNG、JPG、JPEG、WebP、GIF 等常见格式，智能保持画质大幅减小文件体积。纯浏览器本地处理不上传，支持批量压缩。',
      h1: '图片压缩',
      subheading: 'PNG、JPG、WebP 在线无损压缩 · 本地处理不上传 · 支持批量',
      schema: {
        name: '图片压缩',
        description:
          '免费在线图片压缩工具，支持 PNG、JPG、WebP 格式，本地处理不上传',
        browserReq: '需要支持 WebAssembly 的现代浏览器',
      },
      upload: {
        drag: '拖放图片到此处',
        orClick: '或点击上传',
        pasteHint: '或按 ⌘V / Ctrl+V 粘贴',
        sizeHint: '支持 JPG、PNG、WebP、GIF · 最大 100MB',
      },
      options: {
        strength: '压缩力度：',
        smart: '智能推荐',
        light: '轻度',
        strong: '强力',
        start: '开始压缩',
      },
    },
    convert: {
      title: '图片格式转换 - PNG JPG WebP HEIC 在线互转 | WizGo',
      description:
        '免费在线图片格式转换工具，支持 PNG、JPG、JPEG、WebP、GIF、BMP 等常见格式互转。纯浏览器本地处理不上传，安全快速无需安装。',
      h1: '图片格式转换',
      subheading: 'PNG、JPG、WebP、GIF、BMP 在线互转 · 本地处理不上传',
      schema: {
        name: '图片格式转换',
        description: 'PNG、JPG、WebP、GIF、BMP 在线互转，本地处理不上传',
      },
      upload: {
        drag: '拖放图片到此处',
        orClick: '或点击上传',
        pasteHint: '或按 ⌘V / Ctrl+V 粘贴',
        sizeHint: '最大 100MB',
      },
      options: {
        fromLabel: '原格式：',
        autoDetect: '自动检测',
        toLabel: '转换为：',
        qualityLabel: '画质：',
        qualityLossless: '无损',
        qualityHigh: '高',
        qualityMid: '中',
        qualityLow: '低',
        start: '开始转换',
      },
    },
    about: {
      title: '关于 WizGo - 本地处理的免费在线工具箱 | 隐私与技术栈',
      description:
        '了解 WizGo 的技术实现与隐私政策。所有工具都在浏览器本地运行，文件不上传。基于 Astro + Rust WASM + WebCrypto 构建。',
      h1: '关于 WizGo',
      schema: {
        name: '关于 WizGo',
        description:
          'WizGo 的技术栈与隐私政策：所有工具在浏览器本地运行，文件不上传。',
        orgDescription:
          '免费在线工具箱，图片压缩、格式转换、JWT、时间戳等，纯浏览器本地处理不上传。',
      },
      intro:
        'WizGo 是一套免费、安全、快速的在线工具箱。我们坚信用户的数据隐私至关重要，因此所有工具都在你的浏览器中本地完成处理，文件和数据不会上传到任何服务器。',
      techStack: {
        heading: '技术栈',
        image: {
          title: '图片处理',
          body: 'Rust 编写的 WebAssembly 模块，集成 imagequant 调色板量化与 jpeg-encoder 优化管线，支持 PNG、JPEG、WebP、GIF、BMP 等格式',
        },
        crypto: {
          title: '加密与签名',
          body: 'JWT 解码、签发与验签全部走浏览器原生 WebCrypto，支持 HS、RS、ES 系列算法，零第三方依赖',
        },
        frontend: {
          title: '前端框架',
          body: '基于 Astro 静态构建，Tailwind CSS 实现 Vercel 风格的简洁界面',
        },
        pwa: {
          title: 'PWA 支持',
          body: '支持渐进式 Web 应用，可安装到桌面和移动设备，离线也能使用',
        },
      },
      privacy: {
        heading: '隐私政策',
        intro: 'WizGo 采用纯前端架构，所有文件处理都在你的浏览器中完成：',
        items: [
          '文件不会上传到任何服务器',
          '不收集任何个人数据',
          '少量偏好设置仅存储在本地 LocalStorage 中',
        ],
      },
      limits: {
        heading: '限制说明',
        intro: '由于浏览器环境的限制，WizGo 有以下使用约束：',
        items: [
          '图片文件建议 100MB 以内',
          '大文件处理可能需要较长时间',
          '部分高级压缩算法（如 mozjpeg trellis、libwebp 有损）受限于纯 Rust WASM 工具链',
        ],
      },
      credits: {
        heading: '开源库致谢',
        intro: 'WizGo 构建过程中使用了以下优秀的开源库：',
        items: [
          {
            label: 'imagequant',
            href: 'https://github.com/ImageOptim/libimagequant',
            desc: 'PNG 调色板量化',
          },
          {
            label: 'lodepng-rust',
            href: 'https://github.com/kornelski/lodepng-rust',
            desc: '纯 Rust PNG 编码',
          },
          {
            label: 'jpeg-encoder',
            href: 'https://github.com/vstroebel/jpeg-encoder',
            desc: 'Rust JPEG 编码',
          },
          {
            label: 'Astro',
            href: 'https://astro.build',
            desc: '现代静态站点生成器',
          },
          {
            label: 'Geist',
            href: 'https://vercel.com/font',
            desc: 'Vercel 设计字体',
          },
        ],
      },
    },
    watermark: {
      title: '图片隐藏水印 - 嵌入 / 提取隐写文本 | WizGo',
      description:
        '免费在线图片隐藏水印工具。在图片像素里嵌入隐藏文字或从图片提取水印，支持 LSB 和 DCT 两种算法，LSB 容量大、DCT 可经受 JPG 重压。纯浏览器本地处理不上传。',
      h1: '图片隐藏水印',
      subheading: '把文字隐藏进图片像素，或从图片中提取 · 本地处理不上传',
      schema: {
        name: '图片隐藏水印',
        description:
          '在图片像素里嵌入隐藏文字或从图片提取水印，支持 LSB 和 DCT 两种算法，纯浏览器本地处理',
      },
      tabs: { embed: '嵌入水印', extract: '提取水印' },
      common: {
        imageLabel: '图片',
        dropImage: '点击或拖放图片到此处',
        formats: 'PNG · JPG · WebP',
        replaceImage: '更换图片',
        copyBtn: '复制',
      },
      embed: {
        textLabel: '隐藏文本',
        textPlaceholder: '例如：© 作者 2026',
        runBtn: '嵌入水印',
        jpgWarn: '输出始终为 PNG，以 PNG 保存可保留最大兼容性',
        resultLabel: '带水印的结果',
        downloadBtn: '下载 PNG',
        copyImageBtn: '复制图片',
      },
      extract: {
        resultLabel: '提取结果',
        resultPlaceholder: '点击下方按钮提取水印',
        runBtn: '提取水印',
      },
      faq: {
        heading: '工具说明',
        paragraphs: [
          '把一段文字"藏"进图片里：写入的变化人眼看不出来，图片也不改变尺寸，但用本工具可以把这段文字再读出来。可以用来给图片打隐形签名、溯源或附加说明。',
          '嵌入结果始终保存为 PNG，以保留全部水印信号。若图片之后被保存成 JPG 再重压缩，短文本通常仍可提取；长文本或多次压缩后可能失效——想更稳妥就保留 PNG 原件。',
          '所有处理在浏览器本地完成，图片和文本都不会上传。',
        ],
      },
    },
    uuid: {
      title: 'UUID 生成器 - 在线批量生成唯一标识符 | WizGo',
      description:
        '免费在线 UUID 生成器，支持批量生成、多种格式（标准/无横线/大写）、一键复制。使用密码学安全随机数生成，浏览器本地处理不上传。',
      h1: 'UUID 生成器',
      subheading:
        '批量生成唯一标识符 · 标准格式 / 无横线 / 大写 · 本地生成不上传',
      schema: {
        name: 'UUID 生成器',
        description: '在线批量生成 UUID 唯一标识符，支持多种格式',
      },
      countLabel: '生成数量',
      formatLabel: '格式选项',
      noDashes: '移除横线 (-)',
      uppercase: '大写字母',
      generateBtn: '重新生成',
      resultLabel: '生成结果',
      copyAllBtn: '复制全部',
      copiedAllBtn: '已复制全部',
      empty: '点击"重新生成"按钮生成 UUID',
      copyBtn: '复制',
      copiedBtn: '已复制',
      info: {
        heading: '关于 UUID',
        body: 'UUID（通用唯一标识符）是一种 128 位的标识符，通常表示为 32 个十六进制数字，分为 5 组。本工具使用浏览器内置的加密安全随机数生成器（crypto.getRandomValues）生成 UUID v4 版本，确保生成的标识符具有极高的唯一性，适合用于数据库主键、会话标识、API 密钥等场景。',
      },
    },
    urlEncode: {
      title: 'URL 编解码 - 在线 URL 编码/解码工具 | WizGo',
      description:
        '免费在线 URL 编解码工具，支持中文和特殊字符编码、批量处理、encodeURI 与 encodeURIComponent 模式切换。浏览器本地处理不上传。',
      h1: 'URL 编解码',
      subheading: 'URL 特殊字符编码解码 · 支持中文 · 批量处理 · 本地处理不上传',
      schema: {
        name: 'URL 编解码',
        description: 'URL 编码解码工具，支持中文和特殊字符',
      },
      tabEncode: '编码',
      tabDecode: '解码',
      encodeMode: {
        label: '编码模式',
        component: '完整编码（推荐）',
        uri: '保留 URL 字符',
        componentHint: '完整编码：编码所有特殊字符，适合作为 URL 参数值',
        uriHint:
          '保留 URL 字符：不编码 : / ? # & = 等 URL 保留字符，适合编码完整 URL',
      },
      labels: {
        inputEncode: '输入文本',
        inputDecode: '输入编码',
        outputEncode: '编码结果',
        outputDecode: '解码结果',
      },
      placeholders: {
        inputEncode: '在此输入要编码的文本...',
        inputDecode: '在此输入要解码的 URL 编码字符串...',
        output: '结果将显示在这里...',
      },
      hint: '支持多行批量处理',
      copyBtn: '复制',
      copiedBtn: '已复制',
      clearBtn: '清空',
      charCountTemplate: '字符数：{count}',
      errors: {
        encode: '编码失败：包含无法编码的字符',
        decode: '解码失败：无效的 URL 编码字符串',
      },
      examples: {
        heading: '编码示例',
        labels: { chinese: '中文', space: '空格', ampersand: '&', equals: '=' },
      },
      useCases: {
        heading: '使用场景',
        items: [
          '在 URL 中传递中文字符',
          '构造带参数的 URL 链接',
          '处理表单数据中的特殊字符',
          'API 请求参数编码',
          '解析已编码的 URL 字符串',
        ],
      },
    },
    qrcode: {
      title: '二维码生成 - 在线文本/链接转二维码工具 | WizGo',
      description:
        '免费在线二维码生成器，支持文本、URL、联系人生成二维码。自定义尺寸、颜色，可下载 PNG/SVG 格式。纯浏览器本地生成不上传。',
      h1: '二维码生成',
      subheading:
        '文本/链接生成二维码 · 自定义样式 · 下载 PNG/SVG · 本地生成不上传',
      schema: {
        name: '二维码生成器',
        description: '在线生成二维码，支持自定义尺寸和颜色',
      },
      content: {
        label: '内容',
        placeholder: '输入文本或网址...',
        hint: '支持：文本、网址、邮箱、电话号码等',
      },
      size: '尺寸',
      colors: { label: '颜色', foreground: '前景色', background: '背景色' },
      ec: {
        label: '容错级别',
        low: '低',
        medium: '中',
        quartile: '高',
        high: '最高',
        lowTitle: '低 - 约 7% 容错',
        mediumTitle: '中 - 约 15% 容错',
        quartileTitle: '高 - 约 25% 容错',
        highTitle: '最高 - 约 30% 容错',
        hint: '容错级别越高，二维码可被遮挡/损坏的部分越多',
      },
      generateBtn: '生成二维码',
      resetBtn: '重置',
      preview: '预览',
      previewEmpty: '输入内容并点击"生成二维码"',
      generating: '生成中...',
      generateError: '生成失败，请检查内容',
      emptyContent: '请输入内容',
      downloadPng: '下载 PNG',
      downloadSvg: '下载 SVG',
      infoTemplate:
        '内容长度：{chars} 字符 / {bytes} 字节 · 尺寸：{size}x{size}px',
      examples: {
        heading: '使用示例',
        url: '网址：',
        email: '邮箱：',
        phone: '电话：',
        wifi: 'WiFi：',
      },
    },
    timestamp: {
      title: 'Unix 时间戳转换 - 时间戳转日期/日期转时间戳 | WizGo',
      description:
        '免费在线 Unix 时间戳转换工具，支持秒/毫秒、UTC 和本地时区、ISO 8601 格式互转，实时显示当前时间戳，一键复制。浏览器本地处理不上传。',
      h1: '时间戳转换',
      subheading: 'Unix 时间戳和日期互转 · 支持秒 / 毫秒 / ISO 8601',
      schema: {
        name: 'Unix 时间戳转换',
        description: 'Unix 时间戳和日期互转工具，支持秒/毫秒、UTC/本地时区',
      },
      currentTime: {
        label: '当前时间',
        pauseBtn: '暂停',
        resumeBtn: '继续',
        unixSec: 'Unix 秒',
        unixMs: 'Unix 毫秒',
        localTime: '本地时间',
        isoUtc: 'ISO 8601 (UTC)',
        tzTemplate: '时区：{tz} · UTC{sign}{h}:{m}',
        tzPlaceholder: '时区：—',
      },
      t2d: {
        label: '时间戳 → 日期',
        fillNowBtn: '填入当前',
        units: { auto: '自动', sec: '秒', ms: '毫秒' },
        placeholder: '如：1516239022 或 1516239022000',
        errors: {
          nan: '必须是数字',
          oor: '数字超出范围',
          invalid: '无效的时间戳',
        },
        outputs: {
          local: '本地时间',
          utc: 'UTC 时间',
          iso: 'ISO 8601',
          relative: '相对时间',
        },
      },
      d2t: {
        label: '日期 → 时间戳',
        fillNowBtn: '填入当前',
        isoPlaceholder: '或粘贴 ISO 字符串：2024-01-18T03:30:22Z',
        errors: {
          invalidDate: '日期无效',
          unparseable: '无法解析的日期字符串',
        },
        outputs: { sec: 'Unix 秒', ms: 'Unix 毫秒', iso: 'ISO 8601 (UTC)' },
      },
      copyBtn: '复制',
      copiedBtn: '已复制',
      justNow: '刚刚',
      footerHint:
        'Unix 纪元：1970-01-01 00:00:00 UTC · 秒级时间戳 10 位 · 毫秒级 13 位',
    },
    color: {
      title: '颜色转换 - 在线 HEX/RGB/HSL 色值转换工具 | WizGo',
      description:
        '免费在线颜色转换工具，支持十六进制色值、RGB数值、HSL色彩互相转换。实时预览、一键复制，适合设计师和开发者使用。浏览器本地处理不上传。',
      h1: '颜色转换',
      subheading: '十六进制、RGB、HSL 色值互转 · 实时预览 · 本地处理不上传',
      schema: {
        name: '颜色转换',
        description: 'HEX、RGB、HSL 色值互相转换工具，实时预览',
      },
      pickerHint: '点击取色',
      hex: { label: '十六进制色值' },
      rgb: { label: 'RGB 数值', r: 'R (红)', g: 'G (绿)', b: 'B (蓝)' },
      hsl: { label: 'HSL 色彩', h: 'H (色相)', s: 'S (饱和度)', l: 'L (亮度)' },
      copyBtn: '复制',
      copiedBtn: '已复制',
      quickColorsLabel: '常用颜色',
      colorNames: {
        black: '黑色',
        red: '红色',
        orange: '橙色',
        amber: '琥珀色',
        yellowGreen: '黄绿色',
        green: '绿色',
        cyan: '青色',
        blue: '蓝色',
        indigo: '靛蓝色',
        purple: '紫色',
        pink: '粉色',
        white: '白色',
      },
      randomBtn: '随机颜色',
    },
    codeImage: {
      title: '代码转图片 - 精美代码分享图生成器 | WizGo',
      description:
        '在线把代码片段转成精美分享图，支持 JavaScript、TypeScript、Python、Go、Rust 等多种语言，多种主题可选，一键下载 PNG。',
      h1: '代码转图片',
      subheading: '把代码片段生成精美分享图 · 多语言 · 多主题',
      schema: {
        name: '代码转图片',
        description: '把代码转成精美分享图，支持多语言和多主题',
      },
      placeholder: '在此输入或粘贴代码...',
      formatBtn: '格式化',
      sampleBtn: '加载示例',
      copyBtn: '复制图片',
      downloadBtn: '下载图片',
      tipPrefix: '提示：',
      tipBody: '支持多种编程语言高亮，代码会实时渲染，直接输入即可看到效果。',
      renderError: '渲染失败',
    },
    base64: {
      title: 'Base64 编解码 - 在线文本/文件转换工具 | WizGo',
      description:
        '免费在线 Base64 编解码工具，支持文本与 Base64 互转、文件上传转 Base64、Base64 下载为文件。图片、文本、二进制文件均可处理，浏览器本地处理不上传。',
      h1: 'Base64 编解码',
      subheading:
        '文本/文件与 Base64 互转 · 支持图片、文本、二进制文件 · 本地处理不上传',
      schema: {
        name: 'Base64 编解码',
        description: '文本/文件与 Base64 互转工具，支持图片、文本、二进制文件',
      },
      tabs: { encode: '编码', decode: '解码' },
      labels: {
        inputEncode: '输入文本',
        inputDecode: '输入 Base64',
        outputEncode: 'Base64 结果',
        outputDecode: '解码结果',
        imagePreview: '图片预览',
        imageAlt: '预览',
      },
      placeholders: {
        inputEncode: '在此输入文本...',
        inputDecode: '在此输入 Base64 字符串...',
        outputEncode: 'Base64 结果将显示在这里...',
        outputDecode: '解码结果将显示在这里...',
      },
      clearBtn: '清空',
      uploadBtn: '上传文件',
      copyBtn: '复制',
      copiedBtn: '已复制',
      downloadBtn: '下载文件',
      fileSizeLimit: '文件大小限制：5MB',
      unknownType: '未知类型',
      errors: {
        encodeFail: '编码失败：文本包含无法处理的字符',
        fileReadFail: '文件读取失败',
        decodeFail: '解码失败：无效的 Base64 字符串',
        fileTooLargeTemplate: '文件过大，最大支持 5MB，当前 {size}',
      },
      binaryFileTemplate: '[二进制文件 - {size}]',
      tips: {
        heading: '使用说明',
        items: [
          '编码：输入任意文本或上传文件，自动转换为 Base64 字符串',
          '解码：粘贴 Base64 字符串（可包含 data URI 前缀），自动还原为文本或文件',
          '支持图片预览：解码后的图片可直接在页面中查看',
          '文件下载：解码后的二进制文件可直接下载保存',
        ],
      },
    },
    jwt: {
      title: 'JWT 在线解码/生成/验签工具 - HS256 RS256 ES256 | WizGo',
      description:
        '在线 JSON Web Token 工具，解码 header/payload、验证签名、生成新 token。支持 HS256/384/512、RS256/384/512、ES256/384 算法，浏览器本地运算不上传。',
      h1: 'JWT 解码/生成/验签',
      subheading:
        'JSON Web Token 在线工具 · HS256 RS256 ES256 · 本地运算不上传',
      schema: {
        name: 'JWT 解码/生成/验签',
        description:
          'JSON Web Token 在线工具，支持 HS/RS/ES 系列算法，本地运算',
      },
      algoLabel: '签名算法',
      encodedLabel: 'Encoded · 完整 Token',
      encodedPlaceholder: 'header.payload.signature',
      sampleBtn: '加载示例',
      copyBtn: '复制',
      copiedBtn: '已复制',
      verify: {
        idle: '输入 token 和密钥以验证签名',
        ok: '签名验证通过',
        bad: '签名不匹配',
        needSecret: '输入 secret 以验证签名',
        needPubkey: '粘贴 public key 以验证签名',
        needSecretForSign: '输入 secret 生成签名',
        needPrivkeyForSign: '粘贴 private key 生成签名',
        signedNoVerify: '已签发 · 粘贴 public key/secret 以验证',
        failTemplate: '验证失败：{msg}',
      },
      headerLabel: 'Header',
      payloadLabel: 'Payload',
      secret: {
        label: 'Secret（UTF-8 或 base64）',
        isB64Label: 'secret 是 base64 编码',
        placeholder: 'your-256-bit-secret',
      },
      pubkeyLabel: 'Public Key（PEM，用于验签）',
      privkeyLabel: 'Private Key（PEM，用于签发）',
      pubkeyPlaceholder:
        '-----BEGIN PUBLIC KEY-----\n...\n-----END PUBLIC KEY-----',
      privkeyPlaceholder:
        '-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----',
      errors: {
        pemEmpty: 'PEM 内容为空',
        jwtFormat: 'JWT 格式错误：应为 header.payload.signature',
        headerB64: 'Header base64 无效',
        payloadB64: 'Payload base64 无效',
        headerJson: 'Header 不是合法 JSON',
        payloadJson: 'Payload 不是合法 JSON',
        signFailTemplate: '签名失败：{msg}',
      },
    },
    textWatermark: {
      title: '身份证加水印：防盗图片水印工具 | WizGo',
      description:
        '给图片加"仅供xx使用"文字水印：身份证、营业执照、合同、网站备案防冒用。平铺/居中/右下角排列。本地处理不上传照片。',
      h1: '图片文字水印',
      subheading:
        '在图片上添加"仅供备案使用"等文字水印 · 防盗、溯源 · 本地处理不上传',
      schema: {
        name: '图片文字水印',
        alternateNames: [
          '身份证加水印',
          '证件水印',
          '备案水印工具',
          '图片加文字水印',
        ],
        description:
          '在图片上添加可见的文字水印，用于身份证防冒用、证件复印件、网站备案、版权防盗等场景。支持平铺、居中、右下角三种排列，纯浏览器本地处理不上传。',
        featureList: [
          '身份证 / 营业执照证件水印',
          '仅供备案 / 仅供开户专用水印',
          '平铺 / 居中 / 右下角排列',
          '颜色、字号、透明度、旋转角度可调',
          '浏览器本地处理，图片不上传',
          '支持 PNG / JPG / WebP',
        ],
      },
      howToSchema: {
        name: '如何给图片（身份证 / 证件）添加文字水印',
        description: '三步给图片添加"仅供xx使用"文字水印，防止证件被冒用',
        toolName: '浏览器（Chrome / Safari / Edge）',
        steps: [
          {
            name: '上传图片',
            text: '点击上传区或直接拖拽图片进来，支持 PNG / JPG / WebP，图片只在本机处理不会上传服务器。',
          },
          {
            name: '输入水印文字',
            text: '例如"仅供 xx 银行房贷办理使用"、"仅供 xxx.com 网站备案使用"等。建议写明具体用途和接收方名称。',
          },
          {
            name: '调整样式并下载',
            text: '选择平铺（防裁剪）、调整颜色字号透明度和旋转角度，点击下载 PNG。',
          },
        ],
      },
      faqSchema: {
        items: [
          {
            question: '给身份证加水印合法吗？',
            answer:
              '合法，且被广泛推荐。在身份证复印件 / 扫描件上标注"仅供 xx 使用"的文字水印，是防止证件被挪作他用的有效手段，公安部、央行、银保监会等均有过相关提示。',
          },
          {
            question: '水印文字应该写什么？',
            answer:
              '建议包含「用途 + 接收方 + 日期」三要素，例如"仅供 xx 银行 2026 年房贷办理使用"。越具体越不容易被滥用。',
          },
          {
            question: '水印加在哪里最安全？',
            answer:
              '平铺模式最安全——文字斜向铺满整张图，无法通过裁剪去除；右下角等角落水印容易被直接裁掉。建议身份证等重要证件用平铺+半透明灰。',
          },
          {
            question: '图片会被上传到服务器吗？',
            answer:
              '不会。本工具所有处理都在你的浏览器本地完成（Canvas 2D），图片文件和水印文字从不离开你的设备，服务器只提供静态页面。',
          },
          {
            question: '水印能被 PS 去掉吗？',
            answer:
              '文字水印本质上是可见的像素改动，专业用户用 PS 可以擦除，但耗时且会留下痕迹。对于普通盗用场景（微信转发、被其他网站复用），文字水印的威慑力已经足够。如果需要抗擦除的"隐形签名"，可以用我们的图片隐藏水印工具。',
          },
          {
            question: '水印后的图片保存成 JPG 还是 PNG？',
            answer:
              '本工具导出 PNG（无损，水印边缘最清晰）。如果文件太大，可以用"PNG 压缩"工具进一步减小体积。',
          },
        ],
      },
      imageLabel: '图片',
      dropImage: '点击或拖放图片到此处',
      formats: 'PNG · JPG · WebP',
      replaceImage: '更换图片',
      textLabel: '水印文字',
      textDefault: '仅供网站备案使用',
      textPlaceholder: '例如：仅供网站备案使用',
      sizeLabel: '字号',
      colorLabel: '颜色',
      boldLabel: '加粗',
      swatches: {
        red: '备案红',
        white: '白',
        lightGray: '浅灰',
        midGray: '中灰',
        darkGray: '深灰',
        charcoal: '炭灰',
        black: '黑',
      },
      customColorTitle: '自定义颜色',
      opacityLabel: '透明度',
      rotationLabel: '旋转角度',
      spacingLabel: '间距',
      patternLabel: '排列方式',
      patterns: { tile: '平铺', single: '单个', corner: '右下角' },
      downloadBtn: '下载 PNG',
      copyImageBtn: '复制图片',
      useCases: {
        heading: '常见用途',
        items: [
          {
            title: '身份证加水印 · 防冒用',
            bodyHtml:
              '办理银行业务、租房、工作入职时经常要提交身份证复印件。加上"仅供 xx 银行 2026 年房贷办理使用"一类的文字水印，可以避免身份证信息被挪作贷款、开卡等其它用途，降低冒名风险。建议用<strong>平铺模式</strong>，透明度 30–50%。',
          },
          {
            title: '营业执照 / 合同 / 证件水印',
            bodyHtml:
              '公司营业执照、开户许可证、合同扫描件提交给合作方时，加上"仅供 xx 用途"水印可以限制被复用。同样适用于学位证、驾照、护照等证件的电子副本。',
          },
          {
            title: '网站备案水印',
            bodyHtml:
              'ICP 备案材料里，主体身份证件和法人授权书都需要在图片上加水印。常见格式："仅供 xxx.com 网站 ICP 备案使用"，红色平铺是阿里云 / 腾讯云 / 华为云备案推荐样式。',
          },
          {
            title: '防盗图 / 版权保护',
            bodyHtml:
              '摄影作品、产品图、插画发布到社交平台前加上作者署名或站点域名，可以显著降低被直接盗用的概率。版权标用<strong>右下角</strong>低调；防盗用<strong>平铺</strong>强覆盖。',
          },
        ],
      },
      steps: {
        heading: '使用步骤',
        itemsHtml: [
          '<strong>上传图片</strong>——点击上传区或拖拽图片进来，支持 PNG / JPG / WebP，图片只在本机处理不会上传服务器。',
          '<strong>输入水印文字</strong>——写明具体用途和接收方名称，例如"仅供 xx 银行房贷办理使用"或"仅供 xxx.com 网站 ICP 备案使用"，越具体越难被滥用。',
          '<strong>调整样式</strong>——选择排列方式（平铺最防裁剪）、颜色（备案场景建议红色 / 灰色）、字号、透明度、旋转角度，实时预览结果。',
          '<strong>下载 PNG</strong>——点击下载按钮即可保存到本地，或用"复制图片"直接贴到微信 / 邮件。',
        ],
      },
      faq: {
        heading: '常见问题',
        items: [
          {
            q: '给身份证加水印合法吗？',
            aHtml:
              '合法，且被广泛推荐。在身份证复印件 / 扫描件上标注"仅供 xx 使用"的文字水印，是防止证件被挪作他用的有效手段，公安部、央行、银保监会都有过相关提示。',
          },
          {
            q: '水印文字应该写什么？',
            aHtml:
              '建议包含「用途 + 接收方 + 日期」三要素，例如"仅供 xx 银行 2026 年房贷办理使用"。越具体越不容易被滥用。如果是网站备案，写"仅供 yourdomain.com 网站 ICP 备案使用"。',
          },
          {
            q: '水印加在哪里最安全？',
            aHtml:
              '平铺模式最安全——文字斜向铺满整张图，无法通过裁剪去除。右下角等角落水印容易被直接裁掉。身份证、银行卡等重要证件建议平铺 + 半透明灰，既安全又不影响识别。',
          },
          {
            q: '图片会被上传到服务器吗？',
            aHtml:
              '不会。本工具所有处理都在你的浏览器本地完成（Canvas 2D 直接绘制像素），图片文件和水印文字从不离开你的设备。可以断网后继续使用。',
          },
          {
            q: '水印能被 PS 去掉吗？',
            aHtml:
              '文字水印本质上是可见的像素改动，专业用户用 PS 可以擦除，但耗时且会留下痕迹。对于普通盗用场景（微信转发、被其他网站复用），文字水印的威慑力已经足够。如果需要抗擦除的"隐形签名"，可以用我们的<a href="/watermark" class="text-[#0072f5] hover:underline">图片隐藏水印</a>工具。',
          },
          {
            q: '水印后的图片太大怎么办？',
            aHtml:
              '本工具导出 PNG（无损，水印边缘最清晰）。如果文件太大影响上传或发送，可以用<a href="/compress-png" class="text-[#0072f5] hover:underline">PNG 压缩</a>进一步减小体积，或用<a href="/png-to-jpg" class="text-[#0072f5] hover:underline">PNG 转 JPG</a>换成更小的格式。',
          },
        ],
      },
    },
    json: {
      title: 'JSON 格式化 - 在线美化、压缩、校验工具 | WizGo',
      description:
        '免费在线 JSON 格式化工具，支持 JSON 美化、压缩、语法校验，一键复制。纯浏览器本地处理，粘贴的数据不会上传到任何服务器。',
      h1: 'JSON 格式化',
      subheading: 'JSON 美化、压缩、语法校验 · 本地处理不上传',
      schema: {
        name: 'JSON 格式化',
        description: 'JSON 美化、压缩、校验工具，本地处理不上传',
      },
      inputLabel: '输入 JSON',
      formatBtn: '美化',
      minifyBtn: '压缩',
      clearBtn: '清空',
      inputPlaceholder: '{"example": "在此输入 JSON 数据"}',
      resultLabel: '结果',
      copyBtn: '复制',
      copiedBtn: '已复制',
      outputPlaceholder: '格式化后的 JSON 将显示在这里',
      formatError: 'JSON 格式错误，请检查输入',
    },
    hash: {
      title: '哈希值生成器：SHA-256、SHA-512 在线计算 | WizGo',
      description:
        '在浏览器中为文本和文件生成 SHA-1、SHA-256、SHA-384、SHA-512 哈希值。校验下载完整性，数据全程本地处理，不上传。',
      h1: '哈希值生成器',
      subheading:
        '校验文件完整性或对任意文本计算哈希 · SHA-1 / SHA-256 / SHA-384 / SHA-512 · 纯浏览器本地运算',
      schema: {
        name: '哈希值生成器',
        description:
          '免费在线工具，为文本或文件一次性生成 SHA-1、SHA-256、SHA-384、SHA-512 哈希值，全部在浏览器本地计算。',
      },
      tabs: { text: '文本', file: '文件' },
      input: {
        textLabel: '输入文本',
        textPlaceholder: '输入或粘贴需要计算哈希的文本...',
        fileLabel: '选择文件',
        fileDrop: '拖拽文件到此处',
        fileHint: '或点击选择文件',
        clearBtn: '清空',
        fileReplace: '换一个文件',
        fileSizeHint: '最大支持 2GB · 本地处理，不上传',
      },
      output: {
        label: '计算结果',
        formatLabel: '输出格式',
        hex: '十六进制',
        base64: 'Base64',
        copyBtn: '复制',
        copiedBtn: '已复制',
        computing: '计算中...',
        empty: '输入文本或选择文件后显示哈希值',
      },
      algorithms: {
        sha1: 'SHA-1',
        sha256: 'SHA-256',
        sha384: 'SHA-384',
        sha512: 'SHA-512',
      },
      errors: {
        tooLargeTemplate: '文件过大（{size}），当前支持最大 2GB。',
        readFailed: '无法读取文件，请重试。',
        hashFailed: '计算失败，当前浏览器可能不支持该算法。',
      },
      tips: {
        heading: '关于哈希值',
        items: [
          '哈希是一段固定长度的"指纹"，相同内容始终产生相同的哈希值。',
          '最常用的是 SHA-256，用于校验下载文件的完整性。',
          '全部在浏览器本地计算，文件和文本不会上传到任何服务器。',
          '已不推荐使用 MD5（存在安全隐患），本工具仅提供 SHA 系列算法。',
        ],
      },
    },
    mp4ToMp3: {
      title: 'MP4 转 MP3：免费在线提取视频音频 | WizGo',
      description:
        '把视频里的声音提取出来，保存成 MP3。免费、即时、在浏览器里完成，不用上传、不用注册、不用安装。',
      h1: '视频转 MP3',
      subheading: '把视频里的声音提取出来 · 在你的电脑上完成 · 文件不上传',
      schema: {
        name: 'MP4 转 MP3 转换器',
        description:
          '免费在线把 MP4 视频中的音频提取并保存为 MP3，浏览器本地处理，文件不会上传。',
      },
      upload: {
        drag: '把视频拖到这里',
        orClick: '或点击选择文件（MP4、MOV、M4A、WebM）',
        sizeHint: '最大 500MB · 一次一个',
      },
      options: {
        bitrateLabel: '音质：',
        k128: '标准 · 128k',
        k192: '推荐 · 192k',
        k256: '高 · 256k',
        k320: '最高 · 320k',
        start: '生成 MP3',
      },
      progress: {
        preparing: '准备中…',
        decoding: '正在读取音频…',
        encodingTemplate: '正在转换 · {pct}%',
        done: '完成！',
      },
      errors: {
        tooLargeTemplate: '文件太大了，最多 500MB（你的有 {size}）',
        decodeFailedSafari:
          'Safari 读取这个文件失败。请升级 Safari，或用 Chrome、Firefox 试试。',
        decodeFailedGeneric: '读不出这个文件里的声音，里面的格式可能比较少见。',
      },
      result: {
        ready: 'MP3 已经做好了，可以试听或下载',
        downloadBtn: '下载',
        sizeTemplate: '大小：{size}',
      },
      faq: {
        heading: '常见问题',
        items: [
          {
            q: '我的视频会被上传到服务器吗？',
            a: '不会。整个过程都在你浏览器里完成，文件不会离开你的电脑。',
          },
          {
            q: '支持哪些视频？',
            a: '常见的视频都可以：手机/电脑里的 MP4、iPhone 拍摄的 MOV、M4A 音频，还有 WebM。如果某个文件不行，说明里面的音频格式比较少见。',
          },
          {
            q: '为什么 Safari 上有时候会失败？',
            a: '老版本的 Safari 读不出某些 MP4 里的声音。把 Safari 升到新版，或者改用 Chrome、Firefox、Edge。',
          },
          {
            q: '有大小限制吗？',
            a: '有，单个文件最大 500MB。再大可能让浏览器卡死，尤其在手机上。',
          },
          { q: '可以一次转好几个吗？', a: '暂时还不行，目前一次只能转一个。' },
        ],
      },
    },
    compressMp3: {
      title: '在线压缩 MP3 - 减小音频文件体积 | WizGo',
      description:
        '降低比特率压缩 MP3 文件 · 免费、即时、浏览器内完成。无需上传、无需注册。',
      h1: 'MP3 体积压缩',
      subheading: '降低比特率压缩 MP3 · 本地处理 · 文件不离开你的设备',
      schema: {
        name: 'MP3 压缩工具',
        description:
          '免费在线工具，通过降低比特率压缩 MP3 文件。浏览器内 WebAssembly 运行。',
      },
      upload: {
        drag: '拖入音频文件',
        orClick: '或点击选择 (MP3、M4A、WAV、FLAC、OGG)',
        sizeHint: '最大 500MB · 一次一个文件',
      },
      options: {
        bitrateLabel: '目标比特率：',
        k64: '语音 · 64k',
        k96: '音乐 · 96k',
        k128: '标准 · 128k',
        k192: '高品 · 192k',
        start: '开始压缩',
      },
      progress: {
        preparing: '准备中...',
        decoding: '读取音频...',
        encodingTemplate: '压缩中 · {pct}%',
        done: '完成！',
      },
      errors: {
        tooLargeTemplate: '文件太大，最大 500MB（当前 {size}）。',
        decodeFailedSafari:
          'Safari 无法解码此文件。请升级 Safari 或改用 Chrome / Firefox。',
        decodeFailedGeneric: '无法解码此文件中的音频。',
      },
      result: {
        ready: '压缩完成',
        downloadBtn: '下载',
        sizeTemplate: '大小：{size}',
        reductionTemplate: '节省 {pct}% · {before} → {after}',
      },
      faq: {
        heading: '常见问题',
        items: [
          {
            q: 'MP3 能压缩多少？',
            a: '取决于原始比特率。320kbps 压到 128kbps 大约省 60%；192kbps 压到 96kbps 大约省 50%。',
          },
          {
            q: '会损失音质吗？',
            a: '会，但多少取决于目标比特率。128kbps 对多数音乐接近原声，96kbps 对流媒体够用，64kbps 仅建议用于语音。',
          },
          {
            q: '音频会上传吗？',
            a: '不会。一切在你的浏览器里用 WebAssembly 处理，文件不离开设备。',
          },
          {
            q: '可以压 WAV、FLAC 吗？',
            a: '可以。任何浏览器能解码的音频格式（WAV、FLAC、M4A、OGG）都会被转成 MP3。',
          },
          {
            q: '文件大小上限？',
            a: '每个文件 500MB。超大文件可能卡浏览器，尤其是手机。',
          },
        ],
      },
    },
    password: {
      title: '密码生成器 - 在线生成高强度随机密码 | WizGo',
      description:
        '免费在线密码生成器，生成高强度随机密码。支持自定义长度、字符类型（大小写字母、数字、符号），排除相似字符和歧义符号。浏览器本地生成，不上传。',
      h1: '密码生成器',
      subheading: '生成高强度随机密码 · 自定义长度和字符类型 · 本地生成不上传',
      schema: {
        name: '密码生成器',
        description: '在线生成高强度随机密码，支持自定义选项',
      },
      modeLabel: '密码类型',
      mode: {
        random: '随机密码',
        passphrase: '短语密码',
      },
      lengthLabel: '密码长度',
      wordCountLabel: '单词数量',
      charTypesLabel: '字符类型',
      charTypes: {
        uppercase: '大写字母 (A-Z)',
        lowercase: '小写字母 (a-z)',
        numbers: '数字 (0-9)',
        symbols: '特殊符号 (!@#$%)',
      },
      separatorLabel: '分隔符',
      separators: {
        hyphen: '连字符 (-)',
        underscore: '下划线 (_)',
        space: '空格 ( )',
        period: '句点 (.)',
        number: '随机数字',
      },
      advanced: {
        label: '高级选项',
        excludeSimilar: '排除相似字符 (i, l, 1, L, o, 0, O)',
        excludeAmbiguous:
          '排除歧义符号 ({ } [ ] ( ) / \\ \' " ` ~ , ; : . < >)',
      },
      generateBtn: '生成密码',
      copyBtn: '复制',
      copiedBtn: '已复制',
      regenerateBtn: '重新生成',
      resultLabel: '生成的密码',
      strength: {
        label: '密码强度',
        weak: '弱',
        fair: '一般',
        good: '良好',
        strong: '强',
      },
      info: {
        heading: '密码安全提示',
        body: '密码越长越安全。建议密码长度至少 12 位，包含大小写字母、数字和特殊符号的组合。不要在多个网站使用相同密码，推荐使用密码管理器保存生成的密码。',
      },
    },
    pdfCompress: {
      title: 'PDF 压缩 - 在线减小 PDF 体积 | WizGo',
      description:
        '免费在线 PDF 压缩工具，通过对象流重写和清除元数据减小文件体积。纯浏览器本地处理不上传，支持批量。',
      h1: 'PDF 压缩',
      subheading: '减小 PDF 文件体积 · 本地处理 · 文件不上传',
      schema: {
        name: 'PDF 压缩',
        description:
          '免费在线压缩 PDF 文件，去除元数据并重写对象流以减小体积，浏览器本地处理',
        browserReq: '需要支持 File API 的现代浏览器',
      },
      upload: {
        drag: '拖放 PDF 到此处',
        orClick: '或点击上传',
        pasteHint: '或按 ⌘V / Ctrl+V 粘贴',
        sizeHint: '单个文件最大 200MB · 支持批量',
      },
      options: {
        stripMetadataLabel: '清除元数据',
        stripMetadataHint: '删除标题、作者、关键字等信息',
        objectStreamNote:
          '对象流压缩始终开启；本工具暂不重新编码嵌入图片，预期体积减小 5-15%',
        start: '开始压缩',
      },
      progress: {
        preparing: '准备中...',
        processingTemplate: '处理中 · {cur}/{total}',
        done: '完成',
      },
      result: {
        ready: '压缩完成',
        downloadBtn: '下载',
        sizeTemplate: '大小：{size}',
        reductionTemplate: '节省 {pct}% · {before} → {after}',
        noReduction: '原文件已经足够小，返回原文件',
      },
      errors: {
        tooLargeTemplate: '{name} 过大，最大 200MB（当前 {size}）',
        notPdfTemplate: '{name} 不是 PDF 文件',
        loadFailedTemplate: '无法读取 PDF：{name}',
        encryptedPdf: '不支持加密或受密码保护的 PDF',
      },
      faq: {
        heading: '常见问题',
        items: [
          {
            q: 'PDF 能压缩多少？',
            a: '通常 5-15%，取决于原文件。已经高度优化过的 PDF 压缩空间较小。对于包含大量图片的 PDF，目前不会重新编码图片；V2 会加入此功能，预计能节省 50-80%。',
          },
          {
            q: '会损失画质吗？',
            a: '不会。V1 只做对象流重写和元数据清除，图像、字体和文本的像素保持完全一致，纯粹是格式层面的优化。',
          },
          {
            q: '文件会被上传吗？',
            a: '不会。全部在浏览器本地用 pdf-lib 处理，文件不离开你的设备。',
          },
          {
            q: '支持加密 PDF 吗？',
            a: '不支持。带密码或加密的 PDF 会报错，请先解除保护再压缩。',
          },
          {
            q: '为什么有时候反而变大了？',
            a: '极少数情况下（原文件已高度优化），重写后可能增大几 KB。遇到此情况工具会提示"无法进一步压缩"并让你下载原文件。',
          },
        ],
      },
    },
    pdfMerge: {
      title: 'PDF 合并 - 在线多个 PDF 合并为一个 | WizGo',
      description:
        '免费在线 PDF 合并工具，多个 PDF 拼接成一个文件，支持调整顺序。纯浏览器本地处理不上传。',
      h1: 'PDF 合并',
      subheading: '多个 PDF 合并为一个 · 可调整顺序 · 本地处理不上传',
      schema: {
        name: 'PDF 合并',
        description:
          '免费在线合并多个 PDF 为一个文件，支持调整顺序，浏览器本地处理',
        browserReq: '需要支持 File API 的现代浏览器',
      },
      upload: {
        drag: '拖放 PDF 到此处',
        orClick: '或点击上传（可多选）',
        pasteHint: '或按 ⌘V / Ctrl+V 粘贴',
        sizeHint: '单个文件最大 200MB',
        multipleHint: '至少需要 2 个 PDF 才能合并',
      },
      list: {
        emptyHint: '先上传至少 2 个 PDF',
        moveUpAria: '上移',
        moveDownAria: '下移',
        removeAria: '移除',
        positionTemplate: '{i}/{total}',
      },
      options: {
        mergeBtn: '合并 PDF',
        clearAllBtn: '清空',
        minFilesHint: '至少 2 个文件才能合并',
      },
      progress: {
        preparing: '准备中...',
        loadingTemplate: '正在读取 · {cur}/{total}',
        writing: '写入中...',
        done: '完成',
      },
      result: {
        ready: '合并完成',
        downloadBtn: '下载',
        sizeTemplate: '大小：{size}',
        pageCountTemplate: '共 {pages} 页',
      },
      errors: {
        tooLargeTemplate: '{name} 过大，最大 200MB（当前 {size}）',
        notPdfTemplate: '{name} 不是 PDF 文件',
        loadFailedTemplate: '无法读取 PDF：{name}',
        encryptedPdf: '不支持加密或受密码保护的 PDF',
        needTwoFiles: '至少需要 2 个 PDF',
      },
      faq: {
        heading: '常见问题',
        items: [
          {
            q: '文件会被上传吗？',
            a: '不会。全部在浏览器本地用 pdf-lib 处理，文件不离开你的设备。',
          },
          {
            q: '有文件数量限制吗？',
            a: '没有硬限制，但合并 20 个以上大文件可能会让浏览器变卡，尤其是在手机上。',
          },
          {
            q: '可以调整顺序吗？',
            a: '可以。用每个文件旁的 ▲ / ▼ 按钮调整顺序，合并后的页面顺序与列表一致。',
          },
          {
            q: '支持加密 PDF 吗？',
            a: '不支持。带密码或加密的 PDF 会报错，请先解除保护再合并。',
          },
          {
            q: '会保留书签和目录吗？',
            a: '当前版本只保留页面内容，文档级的书签、表单字段、链接注解可能会丢失。',
          },
        ],
      },
    },
  },
} satisfies Translations;
