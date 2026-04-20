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

### 本地化原则：从场景出发，不是从字典出发

**默认心智**：写任何 locale 的文案之前，先问"目标读者会在什么情境下用这个工具、身边有哪些真实的抓手"，再动手翻译。中文版本只是 source of truth（key 的定义和 UX 结构），**场景才是 ground truth**。这条原则对**所有工具**都适用——不是只给"涉及监管"的工具用，颜色选择器、JSON 格式化、时间戳转换也都会被场景污染（例如 timestamp 工具的示例时区、JSON 里的示例 payload、颜色工具的命名习惯）。

**反面教材**：ICP 备案是大陆独有的监管制度，翻译成 `"ICP filing"` / `"ICP 提出"` / `"ICP 제출"` 对海外读者就是噪音——而且 zh-TW 的读者（台湾 / 香港）也没这套制度。别的常见坑：把 `张三` 翻译成 `Zhang San` 而不是换成 `John Doe` / `田中太郎` / `홍길동`；示例时区留成 Asia/Shanghai；把中文 pinyin 塞进英文 SEO tag。

**按字段分两类处理**：

- **场景字段**（per-locale 重新设计）：`title` / `description` / `subheading` / `schema.description` / `schema.featureList` / `useCases` / `faq` / `howToSchema.steps` / `textDefault` / `textPlaceholder` / `quickActions.*.tags` / 任何示例文本（日期、货币、域名、人名、时区、机构名）
- **控件字段**（直接翻译即可）：按钮名、字段 label、错误提示、进度文案——这些是 UX 术语，和场景无关

**每个 locale 的业务抓手速查**（涉及证件 / 金融 / 日常事务时可直接套）：

- **zh-CN**：身份证、营业执照、ICP 备案、阿里云 / 腾讯云 / 华为云、房贷、开户、Asia/Shanghai、CNY、张三 / 李四
- **zh-TW / HK**：身分證 / 香港身份證、駕照、護照、房貸申請、租屋審核、開戶、合約簽署、戶籍謄本、Asia/Taipei、TWD / HKD——**不要** ICP 备案
- **en**：passport、driver's license、SSN / W-9 / W-8、mortgage、KYC onboarding、rental application、NDA、proof of address；公司举例 Acme / Globex、地址举例 123 Main St、人名 John Doe / Jane Smith、域名 example.com、时区 UTC / America/New_York、货币 USD、日期 MM/DD/YYYY
- **ja**：運転免許証、マイナンバーカード、住民票、印鑑証明書、戸籍抄本、源泉徴収票、住宅ローン申請、賃貸審査、契約書、Asia/Tokyo、JPY、山田太郎、○○株式会社、example.jp、YYYY/MM/DD
- **ko**：주민등록증、운전면허증、주민등록등본、가족관계증명서、근로계약서、주택담보대출、전월세 심사、증권 계좌 개설、Asia/Seoul、KRW、홍길동、○○주식회사、example.kr
- **es**：DNI / NIE、pasaporte、carnet de conducir、hipoteca、contrato de alquiler、justificante de ingresos、declaración de la renta、Europe/Madrid、EUR、Juan Pérez、example.es

**动手前的 5 点自检**：

1. 这段文案里的**监管制度 / 证件 / 机构 / 云平台 / 支付方式**在目标地区存在吗？不存在就换成本地等价物。
2. **示例域名 / 公司名 / 人名 / 地址 / 电话 / 时区 / 货币 / 日期格式**是不是中国语境？替换成目标市场通用的占位符（见上表）。
3. **颜色 / 样式推荐**（例如"备案红是阿里云推荐样式"）是不是跟特定监管绑定？不是通用真理就删掉，别输出到 en / ja / ko / es。
4. **`quickActions.*.tags` 的 SEO 词**——每个 locale 用自己市场的高频关键词，别把中文 pinyin / 繁體词汇塞进 en / ja / ko 的 tag 数组。
5. `zh-CN` 和 `zh-TW` 是**两个独立场景**（大陆 vs 台港），不要一起打包改；同理，`en` 里 US / UK / CA / AU 的监管细节别混用——当通用就写通用，不通用就选一个说清。

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
6. **任何工具**的 i18n 都要从目标 locale 的使用场景出发——场景字段（`title` / `description` / FAQ / useCases / schema.description / textDefault / textPlaceholder / SEO tags / 示例时区・域名・人名・货币）必须 per-locale 重新设计，**不要**把中文原文逐字翻译；UI 控件 label 可以直接翻译。详见"本地化原则"章节
7. `.prettierignore` 排除了 `dist/` / `node_modules/` / `rust-wasm/{target,pkg}/` / `src/wasm/rust/` / lockfiles / `public/`——新增生成物请同步加
8. 任何与 `AGENT.md`（设计/格式化/提交约定）冲突的做法，以 `AGENT.md` 为准
9. **所有面向用户的随机值**（密码、token、session id、UUID、shuffle、passphrase 词选）必须用 `crypto.getRandomValues` / `crypto.randomUUID`，且对 `n` 不整除 `2^32` 的离散分布要做 rejection sampling（参考 `src/components/pages/PasswordPage.astro` 的 `secureRandomInt`）。**禁止** `Math.random()`——见 commit `14003b0 🔒 [security fix]`
10. **当前 wasm-opt 用 `-O4`**（兼顾体积 + 性能的对齐结果）。要改动优化级别必须**同时量化**体积和 benchmark 收益再决定，不要随手改——Rust `opt-level="z"` + wasm-opt `-O4` 是两个独立 knob，别把它们搞混

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
