# Claude Code / AI Agent 入口

> WizGo（wizgo.xyz）— 本地运行的在线工具箱：图片/音频压缩转换、JWT/JSON/Base64/UUID、二维码、水印等。所有处理在浏览器完成，文件不上传。

设计规范、图标、色彩、提交前约定见 [`AGENT.md`](./AGENT.md)；完整视觉系统见 [`DESIGN.md`](./DESIGN.md)。下文是让 agent 快速上手这个仓库的事实层信息。

## 技术栈

- **框架**：Astro 4.5（`output: 'static'`）+ Tailwind 3 + TypeScript strict
- **包管理**：Bun（lockfile `bun.lock`，CI 用 `bun install --frozen-lockfile`）
- **计算层**：Rust → WebAssembly（`rust-wasm/` workspace，4 crate）
- **部署**：Cloudflare Pages via Wrangler v4（`wrangler.jsonc`，`assets.directory = ./dist`）
- **PWA**：`@vite-pwa/astro`，每个 locale 独立 manifest
- **字体**：`@fontsource/geist-sans` + `@fontsource/geist-mono`（Vercel Geist）

## 目录速查

```
src/
  pages/               # 默认 zh-CN 路由（顶层）
    [locale]/          # 5 个非默认 locale 的镜像路由（en, zh-TW, ja, ko, es）
    [from]-to-[to].astro   # 动态 SSG：20 种转换对
    compress-[format].astro # 动态 SSG：png/jpg/webp
    llms.txt.ts / llms-full.txt.ts
  components/
    layout/            # Header, Footer, Container, LanguageSwitcher
    pages/             # <Name>Page.astro —— 真正的页面实现
    ui/                # Button, Badge, ToolCard, ProgressBar 等
  layouts/Layout.astro # 唯一布局，负责 SEO/OG/Twitter/hreflang/PWA manifest 注入
  i18n/
    config.ts          # LOCALES / DEFAULT_LOCALE / OG_LOCALES
    schema.ts          # QuickActionKey / CategoryToolKey / NavItemKey 强类型
    locales/*.ts       # 6 份翻译表（zh-CN 是 source of truth）
    seo.ts             # localizedPath / absoluteUrl / buildHreflangEntries
    llmsTxt.ts         # /llms.txt、/llms-full.txt 生成器
  data/tools.ts        # QuickActions + 分类元数据（href / isNew / order）
  scripts/*.ts         # 每个工具页对应一个客户端脚本
  wasm/
    rust/              # wasm-pack 生成物（禁止手改，build 会覆盖）
    image-worker.ts / mp3-worker.ts / watermark-worker.ts
    mp3-bridge.ts / watermark-bridge.ts
  styles/global.css    # Tailwind + Geist @import + shadow-border 复合样式
rust-wasm/
  crates/core          # 共享编解码（image/jpeg-encoder/lodepng）
  crates/image         # compress + convert（含 imagequant / rexif）
  crates/watermark     # LSB + DCT 水印（纯数学，~60–80 KB）
  crates/mp3           # shine-rs MP3 编码
  Cargo.toml           # workspace，edition 2021，release profile opt-level="z" + lto="fat"
scripts/build-wasm.sh  # wasm-pack build × 3 crate → 拷贝到 src/wasm/rust/
public/
  _headers             # Cloudflare Pages 缓存 + 安全头 + RFC 8288 Link 头
  robots.txt           # 显式允许主流 LLM / AI 爬虫
  .well-known/agent-skills/  # agentskills.io v0.2 discovery
```

## 常用命令

```bash
bun install                 # 安装依赖（需要本地装 wasm-pack）
bun run dev                 # astro dev
bun run build:wasm          # 只构建 Rust → wasm（调用 scripts/build-wasm.sh）
bun run build               # build:wasm + astro build
bun run preview             # astro preview
bun run deploy              # build 后 wrangler deploy（需登录 Cloudflare）
bun run format              # Prettier + cargo fmt
bun run format:check        # 仅检查（CI 用这个，失败即拒绝合并）
```

## i18n 架构（重要）

- 6 种 locale：`zh-CN`（默认，URL 无前缀）/ `zh-TW` / `en` / `ja` / `ko` / `es`
- 默认 locale 的页面放在 `src/pages/<name>.astro`，非默认 locale 放在 `src/pages/[locale]/<name>.astro`，两者都是**薄壳**，内容渲染全部委托给 `src/components/pages/<Name>Page.astro`
- 每个 `[locale]/*.astro` 必须导出 `getStaticPaths`，返回 5 个非默认 locale（在 `src/pages/[locale]/index.astro` 等里照抄即可）
- 所有面向用户的字符串都必须走 `useTranslations(locale)` 读 `src/i18n/locales/*.ts`；新 key 先加到 `src/i18n/schema.ts` 的类型定义，6 份 locale 文件都要补齐
- hreflang / canonical / OG locale 由 `Layout.astro` 自动注入，调用方只传 `locale` prop
- PWA manifest 走 `/{locale}/manifest.webmanifest.ts`，默认 locale 是 `/manifest.webmanifest`

## 添加一个新工具（checklist）

1. 在 `src/i18n/schema.ts` 加 `QuickActionKey` / `CategoryToolKey` / `NavItemKey`
2. 在 6 份 `src/i18n/locales/*.ts` 补齐翻译条目（name / description / tags / nav）——**只加 UI 会真正渲染的 key**，死 key 会在 6 份文件里全部复制，后续很贵
3. 在 `src/data/tools.ts` 的 `QUICK_ACTION_ORDER` 和 `CATEGORY_ORDER` 添加 meta
4. 新建 `src/components/pages/<Name>Page.astro`（实际 UI）
5. 新建 `src/pages/<slug>.astro`（薄壳，默认 locale）和 `src/pages/[locale]/<slug>.astro`（5 locale 镜像）——`[locale]/` 薄壳照抄 `src/pages/[locale]/hash.astro`：用 `isLocale` 守卫 + `Locale` 类型断言，不要把 locale 列表用 `as 'en' | 'zh-TW' | ...` 硬编码
6. 若需要客户端逻辑：写 `src/scripts/<name>.ts` 并在页面里 `<script src>` 引入
7. 在 `src/components/layout/Header.astro` 的 `NAV_HREFS`（`Record<NavItemKey, string>`）和对应 `*_ORDER` 里挂导航入口——漏挂 `bun tsc --noEmit` 会报 TS2741/TS2739
8. 若涉及计算密集逻辑 → 走 wasm crate + worker（见下文）
9. 提交前 `bun run format` **并** `bun tsc --noEmit`——Prettier 看不出 TS1117（object literal 重复 key）、`Record<K, V>` 缺键这类错误，光靠 format:check 会让坏代码滑进仓库

## WASM 工作流

- Workspace 位于 `rust-wasm/`，`Cargo.toml` 的 release profile 已按体积最优配置：`opt-level="z"`, `lto="fat"`, `codegen-units=1`, `panic="abort"`, `strip="symbols"`
- `scripts/build-wasm.sh` 对每个 crate 依次执行：`wasm-pack build --target web --release` → 拷贝 `.js`/`.d.ts`/`.wasm` 到 `src/wasm/rust/<crate>/` → 若系统装了 `wasm-opt`（比 wasm-pack 捆绑的新）则再跑一轮 `-O4`（启用 bulk-memory / nontrapping-fptoi / reference-types / sign-ext / mutable-globals）。**Rust 侧用 `opt-level="z"` 保证生成小码，wasm-opt `-O4` 在此基础上做性能 pass**，是兼顾体积和速度的对齐结果，不是笔误
- **Worker 协议**：`{id, op, args}` → `{id, ok, result|error}`；`Uint8Array` 结果通过 `postMessage` 的 transfer list 零拷贝返回
- **WASM 加载方式**：worker 内用 `import wasmUrl from './rust/<crate>/xxx_bg.wasm?url'`，Vite 会发 content-hashed URL 到 `/_astro/`，配合 `_headers` 里的 `immutable` 缓存。**不要把 wasm 放到 `public/`**——那里文件名稳定，immutable 缓存会把用户钉死在旧版本
- **image crate 合并了 compress + convert**：两者共享 ~500 KB decoder 栈，拆开只省 25%/页但多 500 KB 总体积。truly 独立的功能（mp3、watermark）才单独起 crate
- **watermark crate 只做纯数学**：浏览器 Canvas 解 PNG/JPG → 传 RGBA 进来 → 返回修改后的 RGBA，crate 里零 image-decoder 依赖
- **MP3 用 shine-rs**，按 1152 × 38 samples/chunk 流式编码，每 chunk 回 progress

## 硬约束（违反会被 CI 或 wasm 覆盖打脸）

1. 改完代码必须 `bun run format` **+** `bun tsc --noEmit`，CI 只卡 `format:check`，但 tsc 挂了 `bun run build` 肯定直接挂
2. **不要**手动编辑 `src/wasm/rust/**`——`bun run build:wasm` 会全部覆盖
3. **不要**把 wasm 二进制放到 `public/`——见上文缓存说明
4. 新增用户可见文案必须走 i18n（6 份 locale 都要补），不要硬编码中文
5. 默认 locale 页面和 `[locale]/` 镜像页面必须同步更新，否则非中文用户会 404
6. `.prettierignore` 排除了 `dist/` / `node_modules/` / `rust-wasm/{target,pkg}/` / `src/wasm/rust/` / lockfiles / `public/`——新增生成物请同步加
7. 任何与 `AGENT.md`（设计/格式化/提交约定）冲突的做法，以 `AGENT.md` 为准
8. **所有面向用户的随机值**（密码、token、session id、UUID、shuffle、passphrase 词选）必须用 `crypto.getRandomValues` / `crypto.randomUUID`，且对 `n` 不整除 `2^32` 的离散分布要做 rejection sampling（参考 `src/components/pages/PasswordPage.astro` 的 `secureRandomInt`）。**禁止** `Math.random()`——见 commit `14003b0 🔒 [security fix]`
9. **当前 wasm-opt 用 `-O4`**（兼顾体积 + 性能的对齐结果）。要改动优化级别必须**同时量化**体积和 benchmark 收益再决定，不要随手改——Rust `opt-level="z"` + wasm-opt `-O4` 是两个独立 knob，别把它们搞混

## 部署 & 缓存

- 目前 CI 只有 `.github/workflows/format.yml`（Prettier + rustfmt gate）。**没有**自动部署 workflow——deploy 由人工 `bun run deploy` 推到 Cloudflare Pages（`dd00933` 曾恢复过 deploy.yml，`fabe038` 又把它删了）
- `public/_headers` 定义的规则：
  - `/_astro/*` → `max-age=31536000, immutable`（含 wasm）
  - `/*.woff2` → 同上
  - `/sw.js` → `max-age=0, must-revalidate`（新版本必须能立即接管）
  - 全站附带 `X-Content-Type-Options: nosniff` / `X-Frame-Options: SAMEORIGIN` / `Referrer-Policy: strict-origin-when-cross-origin` / `Permissions-Policy: interest-cohort=()`
  - RFC 8288 `Link` 头：`describedby` → `/llms.txt`，`service-doc` → `/llms-full.txt`，`sitemap` → `/sitemap-index.xml`
- `/.well-known/agent-skills/index.json` 遵循 agentskills.io v0.2 discovery，修改工具列表时可能需要同步刷新 `digest` 字段

## 提交约定（参考 git log）

- Conventional Commits：`feat(scope): …` / `chore(scope): …` / `ci: …` / `fix: …`
- 安全修复前缀 `🔒 [security fix]`（见 `14003b0`）
- 大规模格式化调整单独起一个 `chore(format): …` commit，不要混进业务 PR
