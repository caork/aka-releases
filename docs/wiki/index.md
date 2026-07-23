# AKA 使用 Wiki

AKA 的正式产品形态只有 **Windows 桌面版** 与 **Linux headless 服务包**。本
Wiki 面向使用者和管理员；源码构建、内部运行时和发布流水线不在本文范围内。

## 从这里开始

| 你的场景 | 阅读页面 |
| --- | --- |
| 在一台 Windows 电脑上浏览、索引和搜索代码 | [Windows 桌面版](windows-desktop.md) |
| 在 Linux 主机上为团队提供 REST、Web 工作区和 MCP | [Linux headless 服务包](linux-headless.md) |
| 更新失败、索引变慢、pack 无法导入或需要离线部署 | [更新与故障排查](maintenance.md) |
| 需要确认第三方许可与通知 | [许可证与通知](licenses.md) |

## 选择下载内容

从 [GitHub Releases](https://github.com/caork/aka-releases/releases) 或
[Gitee Releases](https://gitee.com/jscao/aka-releases/releases) 下载相同版本的正式资产。
二者是镜像；下载失败时切换到另一个镜像，不要混用不同版本的文件。

| 选择 | 适用场景 | 包含内容 |
| --- | --- | --- |
| 普通包 | 能访问互联网，或只需要基础代码结构、搜索和图 | Windows 普通 NSIS `setup.exe`，或 Linux 普通 `aka-headless-*.tar.gz`。内置 Rust `aka-parse` 可立即索引，不需要额外解析器。 |
| Linux complete 包 | 隔离网络、受控网络，或需要在首轮索引就使用上游语义增强 | Linux complete 同版本 `base`/`packs` 两个 `aka-headless-complete-*.tar.gz`，包含 Java、Python、TypeScript/JavaScript、C/C++、Rust。两卷必须依次解压到同一目录；完整目录内置五个已签名 `.aka-pack`，不需要首次联网下载。Windows 暂只提供普通桌面安装包。 |

普通包不会降低数据一致性：每次成功索引都会发布同一不可变 generation 的源码、图和搜索结果。Linux complete 包只是把可选的上游语义工具预先带到离线环境；没有 pack 时仍使用内置 Rust `aka-parse`。计划中的 Linux complete 包含 Java、Python、TypeScript/JavaScript、C/C++、Rust。Windows 暂只提供普通安装包：Java、TypeScript/JavaScript、Rust 可按需安装或本地导入；Python 与 C/C++ 可导入外部预生成的 `index.scip`。Vue 仅有 Tier-0 和 `<script>` 内 TS/JS 能力，不包含 Vue SCIP pack。86,321,571-byte Java 上游包会让 Windows complete 超过 GitHub/Gitee 的 100 MB 单附件限制，解决前不恢复该产品形态；`v0.1.45` Windows complete 是已公开历史。complete 包不包含 raw exporter 或未签名 payload。

## 通用原则

- 默认搜索是 BM25；embedding 默认关闭，只有仓库所有者手动启用时才会使用。
- 语义 pack 是可选增强。pack 不可用、超时或被跳过时，基础索引仍可发布和查询，结果会缺少该语言的部分语义关系。
- 从 GitHub 或 Gitee 的 `aka-releases` 取得 `setup.exe`、`aka-headless-*.tar.gz` 及其 `SHA256SUMS`；签名 `.aka-pack`、规则包和其他非产品资产仅从 GitHub [AKA Packs Releases](https://github.com/caork/aka-packs/releases) 取得。当前没有 Gitee packs 镜像。不要导入任意 `.zip`、`.tgz` 或 `.tar.gz` 作为 pack。
- 从对应发布页取得的 `SHA256SUMS` 用于核对下载；Windows 更新还会在安装前校验更新签名。

下一步：Windows 使用者进入 [Windows 桌面版](windows-desktop.md)，Linux 管理员进入 [Linux headless 服务包](linux-headless.md)。
