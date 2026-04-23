# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

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
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M..."
  ></path>
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

## 代码格式化规范

### 工具链

- **JS / TS / Astro / CSS / MD / JSON / YAML**：Prettier + `prettier-plugin-astro`
- **Rust（`rust-wasm/`）**：`cargo fmt`（rustfmt，edition 2021）
- **编辑器基线**：`.editorconfig`（utf-8 / LF / 2-space，Rust 与 TOML 为 4-space）

### 配置文件（不要随便改）

- `.editorconfig`
- `.prettierrc.json`：唯一覆盖 `singleQuote: true`，其余走官方默认
- `.prettierignore`：排除 `dist/`、`node_modules/`、`rust-wasm/{target,pkg}/`、`src/wasm/rust/`（wasm-pack 生成物）、lockfiles
- `rust-wasm/rustfmt.toml`

### 日常命令

```bash
bun run format        # 一键格式化整个仓库（含 cargo fmt）
bun run format:check  # 只检查不改动，CI 用这个
```

### 提交前约定

1. 提交前本地跑一遍 `bun run format`，不要让 CI 当格式检查工人。
2. 大规模格式化调整（改 Prettier 规则、升级版本等）**单独起一个 `chore: format` commit**，不要混进业务 PR。
3. `prettier-plugin-astro` 对复杂 Astro 文件偶尔需要跑第二次才能幂等收敛——如果 `format:check` 在刚 `format` 之后还报错，再跑一次 `bun run format` 即可。
4. **不要手动格式化** `src/wasm/rust/` 下的文件，它们是 `wasm-pack` 的生成产物，改了会被下次 `bun run build:wasm` 覆盖。

### CI 守门

- Workflow：`.github/workflows/format.yml`
- 触发：所有 PR + push 到 `main`
- 失败即拒绝合并。本地跑 `bun run format:check` 可以预演 CI 行为。
