// 常用场景 - 用户最容易理解的功能入口
export interface QuickAction {
  id: string;
  name: string;
  description: string;
  href: string;
  tags: string[];
  isNew?: boolean;
}

// 工具分类
export interface ToolCategory {
  id: string;
  name: string;
  description: string;
  tools: Tool[];
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  href: string;
  category: string;
  isNew?: boolean;
}

// 常用场景列表 - 首页直接展示
export const quickActions: QuickAction[] = [
  // 图片压缩（独立 slug，独立 SEO）
  {
    id: "png-compress",
    name: "PNG 压缩",
    description: "智能压缩 · 减小 60-80%",
    href: "/compress-png",
    tags: ["PNG压缩", "PNG compress", "pngquant", "图片压缩"],
  },
  {
    id: "jpg-compress",
    name: "JPG 压缩",
    description: "照片压缩 · 减小 30-45%",
    href: "/compress-jpg",
    tags: ["JPG压缩", "JPEG压缩", "JPG compress", "图片压缩"],
  },
  {
    id: "webp-compress",
    name: "WebP 压缩",
    description: "无损压缩 · 保留透明",
    href: "/compress-webp",
    tags: ["WebP压缩", "WebP compress"],
  },
  // 格式转换（独立 slug，独立 SEO）
  {
    id: "png-to-jpg",
    name: "PNG 转 JPG",
    description: "透明背景白色填充 · 体积更小",
    href: "/png-to-jpg",
    tags: ["PNG转JPG", "PNG转JPEG", "png to jpg"],
  },
  {
    id: "jpg-to-png",
    name: "JPG 转 PNG",
    description: "无损保存 · 支持透明度",
    href: "/jpg-to-png",
    tags: ["JPG转PNG", "JPEG转PNG", "jpg to png"],
  },
  {
    id: "png-to-webp",
    name: "PNG 转 WebP",
    description: "保留透明 · 体积更小",
    href: "/png-to-webp",
    tags: ["PNG转WebP", "png to webp"],
  },
  {
    id: "jpg-to-webp",
    name: "JPG 转 WebP",
    description: "同等画质更小体积",
    href: "/jpg-to-webp",
    tags: ["JPG转WebP", "JPEG转WebP", "jpg to webp"],
  },
  {
    id: "webp-to-png",
    name: "WebP 转 PNG",
    description: "WebP 兼容性兜底",
    href: "/webp-to-png",
    tags: ["WebP转PNG", "webp to png"],
  },
  {
    id: "webp-to-jpg",
    name: "WebP 转 JPG",
    description: "兼容老旧平台",
    href: "/webp-to-jpg",
    tags: ["WebP转JPG", "webp to jpg"],
  },
  // 代码工具
  {
    id: "code-image",
    name: "代码转图片",
    description: "代码生成分享图",
    href: "/code-image",
    tags: ["代码", "图片", "分享"],
    isNew: true,
  },
  {
    id: "jwt",
    name: "JWT 解码",
    description: "生成、解析、验签",
    href: "/jwt",
    tags: ["JWT", "token", "加密", "jsonwebtoken"],
    isNew: true,
  },
  {
    id: "timestamp",
    name: "时间戳转换",
    description: "Unix 时间戳和日期互转",
    href: "/timestamp",
    tags: ["时间戳", "timestamp", "Unix", "日期", "时间"],
    isNew: true,
  },
  {
    id: "json",
    name: "JSON 格式化",
    description: "JSON 美化、压缩、校验",
    href: "/json",
    tags: ["JSON", "格式化", "美化", "压缩", "校验", "format", "parser"],
  },
  // 通用
  {
    id: "any-convert",
    name: "图片转换",
    description: "PNG JPG WebP 格式互转",
    href: "/convert",
    tags: [
      "图片转换",
      "图片格式转换",
      "PNG转JPG",
      "JPG转PNG",
      "WebP",
      "HEIC",
      "BMP",
      "GIF",
    ],
  },
  {
    id: "any-compress",
    name: "图片压缩",
    description: "任意图片压缩",
    href: "/compress",
    tags: ["压缩", "通用"],
  },
];

// 工具分类 - 导航使用
export const toolCategories: ToolCategory[] = [
  {
    id: "image",
    name: "图片工具",
    description: "图片压缩、格式转换",
    tools: [
      {
        id: "compress",
        name: "图片压缩",
        description: "压缩图片大小，保持画质",
        href: "/compress",
        category: "image",
      },
      {
        id: "convert",
        name: "图片格式转换",
        description: "PNG JPG WebP GIF BMP 互转",
        href: "/convert",
        category: "image",
      },
    ],
  },
  {
    id: "code",
    name: "代码工具",
    description: "开发者工具",
    tools: [
      {
        id: "code-image",
        name: "代码转图片",
        description: "把代码生成精美的分享图片",
        href: "/code-image",
        category: "code",
        isNew: true,
      },
      {
        id: "json",
        name: "JSON",
        description: "JSON 格式化",
        href: "/json",
        category: "code",
      },
      {
        id: "jwt",
        name: "JWT",
        description: "生成 / 解析 / 验签",
        href: "/jwt",
        category: "code",
        isNew: true,
      },
      {
        id: "timestamp",
        name: "时间戳",
        description: "Unix 时间戳转换",
        href: "/timestamp",
        category: "code",
        isNew: true,
      },
    ],
  },
];

export const allTools: Tool[] = toolCategories.flatMap((cat) => cat.tools);

export function getToolById(id: string): Tool | undefined {
  return allTools.find((tool) => tool.id === id);
}

export function getToolsByCategory(categoryId: string): Tool[] {
  const category = toolCategories.find((cat) => cat.id === categoryId);
  return category?.tools || [];
}

export function searchQuickActions(query: string): QuickAction[] {
  const lowerQuery = query.toLowerCase();
  return quickActions.filter(
    (action) =>
      action.name.toLowerCase().includes(lowerQuery) ||
      action.description.toLowerCase().includes(lowerQuery) ||
      action.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}
