# Windows 桌面版

## 安装

1. 在 [GitHub Releases](https://github.com/caork/aka-releases/releases) 或 [Gitee Releases](https://gitee.com/jscao/aka-releases/releases) 下载当前版本的 Windows x86_64 普通或 complete `setup.exe`。需要断网或首轮就使用五种语义 pack 时选择 complete；否则选择体积更小的普通包。
2. 可选：用同一 Release 的 `SHA256SUMS` 核对安装文件哈希。
3. 运行 NSIS 安装程序并完成安装。正式发布只提供该安装方式。
4. 启动 AKA，使用 **Add repository** 导入本地目录、Git 地址或 zip；索引完成后即可在 Search、Graph、Symbol 中浏览同一份 generation。

首次分析使用内置 Rust `aka-parse`，不要求 Java、Python、Node.js、C/C++ 或 Rust 工具链。对于单纯的导航、全文代码搜索和图浏览，普通包通常已足够。

## 索引时间预算

默认索引时间预算是 **1500 秒（25 分钟）**。在 **Settings > Indexing** 中调整它；最低 10 秒，最高 24 小时。也可在一次启动前设置 `AKA_INDEX_MAX_SECS` 临时覆盖该全局设置。

大仓库第一次索引可能接近预算。遇到预算耗尽时，先阅读 [故障排查](maintenance.md#indexing)；不要反复删除应用数据。安装了语义 pack 的仓库若某项增强超时，基础 generation 仍会保持可用，界面会标记缺少的可选能力。

## Java、Python、TypeScript、C++ 和 Rust packs

语义 pack 为语言关系和符号精度提供增强。安装后默认启用；也可以在仓库设置中单独关闭。选择与你的项目匹配的 pack：

| 项目语言 | Pack ID | 准备条件 |
| --- | --- | --- |
| Java | `java` | JDK 21；项目依赖应可由 Maven、Gradle 或既有构建环境解析。 |
| Python | `python` | Node.js 16+；推荐配置项目虚拟环境。 |
| TypeScript / JavaScript / Vue | `typescript` | Node.js 18+；项目通常应已有 `node_modules`。Vue 使用同一个 Volar-aware pack。 |
| C / C++ | `cpp` | 选择 Windows x86_64 pack；提供 `compile_commands.json` 可得到更完整精度。 |
| Rust | `rust` | 本机 Cargo/Rust toolchain，供 metadata、build script 与 proc-macro 使用。 |

普通包的在线环境：打开 **Settings > Semantic packs**，按对应语言选择安装。AKA 会从 GitHub 再到 Gitee 检查可更新的规则 pack；发现更新只会提示，必须由你点击安装。

complete 包首次启动时会自动校验并导入随安装包提供的五个离线 `.aka-pack`；重复启动会幂等跳过已经安装的相同版本，不需要联网或手工选文件。导入失败不会阻止桌面版启动或基础索引，可在 **Settings > Semantic packs** 查看状态并按提示处理。普通包的隔离网络部署也可从 [AKA Packs Releases](https://github.com/caork/aka-packs/releases) 或 [Gitee Packs Releases](https://gitee.com/jscao/aka-packs/releases) 转移匹配的签名 `.aka-pack`，然后在对应语言点击 **Import local package**。选择 `.aka-pack` 本身，不要选择发布审计使用的 raw exporter 文件。导入会校验 pack 身份、平台、文件大小、SHA-256 和 Ed25519 签名；未通过校验的文件不会安装。

原生 C/C++、Rust packs 必须选择 `windows-x86_64` 文件；`any-any` 的 Java、Python、TypeScript packs 可用于 Windows x86_64 和 Linux x86_64。

## 更新

AKA 在启动时检查一次，并每 30 分钟仅检查版本。更新源顺序为 GitHub、Gitee。发现新版本时，窗口右上角会出现更新按钮。

点击按钮后才会下载、校验 Tauri updater 签名、安装并自动重启。AKA 不会在后台自动下载或安装更新。若更新按钮没有出现，或校验失败，请见 [更新与故障排查](maintenance.md#updates)。

## 本地 MCP

桌面版运行时，本机 MCP 地址为 `http://127.0.0.1:4112/mcp`。将支持 Streamable HTTP MCP 的开发工具连接到这个地址，即可复用桌面版创建的索引；不要把该本机地址直接暴露到不可信网络。

有关许可、第三方 notice 和 MIT 派生来源的说明，见 [许可证与通知](licenses.md)。
