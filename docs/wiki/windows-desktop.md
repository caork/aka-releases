# Windows 桌面版

## 安装

1. 在 [GitHub Releases](https://github.com/caork/aka-releases/releases) 下载当前版本的单体 Windows complete `aka-desktop-complete-*-setup.exe` 及其 detached `.sig`。未来正式发行不提供普通 Windows 安装包。GitHub complete 内嵌 Java、TypeScript/JavaScript、Rust 的签名 packs；Python 与 C/C++ 可导入外部预生成的 `index.scip`。
2. 用 GitHub 同一 Release 的 `SHA256SUMS` 核对安装文件哈希；桌面更新也会校验 updater `.sig`。
3. 运行 NSIS 安装程序并完成安装。正式发布只提供该安装方式。
4. 启动 AKA，使用 **Add repository** 导入本地目录、Git 地址或 zip；索引完成后即可在 Search、Graph、Symbol 中浏览同一份 generation。

首次分析使用内置 Rust `aka-parse`，不要求 Java、Python、Node.js、C/C++ 或 Rust 工具链。对于单纯的导航、全文代码搜索和图浏览，complete 包同样可直接使用。

## 索引时间预算

默认索引时间预算是 **1500 秒（25 分钟）**。在 **Settings > Indexing** 中调整它；最低 10 秒，最高 24 小时。也可在一次启动前设置 `AKA_INDEX_MAX_SECS` 临时覆盖该全局设置。

大仓库第一次索引可能接近预算。遇到预算耗尽时，先阅读 [故障排查](maintenance.md#indexing)；不要反复删除应用数据。安装了语义 pack 的仓库若某项增强超时，基础 generation 仍会保持可用，界面会标记缺少的可选能力。

## Java、TypeScript、Rust packs 与外部 SCIP

语义 pack 为语言关系和符号精度提供增强。安装后默认启用；也可以在仓库设置中单独关闭。选择与你的项目匹配的 pack：

| 项目语言 | Pack ID | 准备条件 |
| --- | --- | --- |
| Java | `java` | JDK 17 或更高；项目依赖应可由 Maven、Gradle 或既有构建环境解析。 |
| Python | 无 Windows pack | 上游 `scip-python` 0.6.6 的 Windows path-separator 修复尚未合并；可导入外部预生成的 `index.scip`。 |
| TypeScript / JavaScript | `typescript` | Node.js 18 或 20；项目通常应已有 `node_modules`。Vue 仅由 Tier-0 和 `<script>` 内 TS/JS 能力覆盖。 |
| C / C++ | 无 Windows pack | 上游没有 Windows 原生支持；可导入外部预生成的 `index.scip`。 |
| Rust | `rust` | 本机 Cargo/Rust toolchain，供 metadata、build script 与 proc-macro 使用。 |

打开 **Settings > Semantic packs** 可检查或安装更新的语义 pack。AKA 只从 GitHub `aka-packs` 检查可更新的语义 pack、规则包和其他非产品资产；发现更新只会提示，必须由你点击安装。

GitHub Windows complete 是单体 NSIS 安装包，内置 Java、TypeScript/JavaScript、Rust 三个签名 `.aka-pack`，也是唯一的 Windows desktop updater 目标。可从 GitHub [AKA Packs Releases](https://github.com/caork/aka-packs/releases) 转移匹配的签名 `.aka-pack`，然后在对应语言点击 **Import local package**。选择 `.aka-pack` 本身，不要选择任意 archive。导入会校验 pack 身份、平台、文件大小、SHA-256 和 Ed25519 签名；未通过校验的文件不会安装。`v0.1.45` Windows complete、`v0.1.49` 与 `packs-v0.1.11` 派生包是已公开历史资产。

Windows 只为 Java、TypeScript/JavaScript、Rust 提供受支持 pack；Python 与 C/C++ 使用外部预生成 `index.scip` 时保留其外部 producer provenance。

## 更新

AKA 在启动时检查一次，并每 30 分钟仅检查版本。桌面更新源仅为 GitHub `aka-releases`。发现新版本时，窗口右上角会出现更新按钮。

点击按钮后才会下载、校验 Tauri updater 签名、安装并自动重启。AKA 不会在后台自动下载或安装更新。若更新按钮没有出现，或校验失败，请见 [更新与故障排查](maintenance.md#updates)。

## 本地 MCP

桌面版运行时，本机 MCP 地址为 `http://127.0.0.1:4112/mcp`。将支持 Streamable HTTP MCP 的开发工具连接到这个地址，即可复用桌面版创建的索引；不要把该本机地址直接暴露到不可信网络。

有关许可、第三方 notice 和 MIT 派生来源的说明，见 [许可证与通知](licenses.md)。
