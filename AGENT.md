# WizGo 工具箱 - 开发规范

## 设计规范

### 图标使用
- **禁止使用 Emoji 图标** ❌
- **使用 Lucide 图标** ✅
- 原因：跨平台一致性、专业外观、可定制样式

### 色彩系统
- 主色：#171717（近黑色）
- 背景：#ffffff（纯白）
- 强调：仅使用黑白灰，不使用蓝色系
- 遵循 Vercel 极简设计风格

### 字体
- 使用系统默认字体栈
- 标题使用负字间距

## 组件规范

### 图标组件示例
```astro
---
// 使用 Lucide 图标
---
<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M..."/>
</svg>
```

## 页面规范

### 工具页面结构
1. 简洁标题 + 一句话描述
2. 明显上传区域
3. 清晰选项（Pill 按钮）
4. 结果展示列表

### 文案风格
- 简短直接，避免专业术语
- 使用口语化表达
- 错误提示友好
