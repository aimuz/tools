# Claude Code / AI Agent 入口

**本仓库的开发规范全部沉淀在 [`AGENT.md`](./AGENT.md)。开始任何工作前，请先阅读它。**

`AGENT.md` 覆盖了：

- 设计规范（图标、色彩、字体）
- 组件与页面规范
- 代码格式化工具链（Prettier + rustfmt + EditorConfig）
- 提交前约定与 CI 守门规则

## 快速上手

```bash
bun install           # 安装依赖
bun run dev           # 本地开发
bun run format        # 提交前跑一遍，确保格式统一
bun run format:check  # 预演 CI 行为
bun run build         # 含 wasm 构建
```

## 修改代码时的硬约束

1. 改完代码务必跑 `bun run format`，CI 会卡 `format:check`。
2. 任何与上面规范冲突的写法，以 `AGENT.md` 为准。
3. 不要手动修改 `src/wasm/rust-image/` 下的生成产物。
