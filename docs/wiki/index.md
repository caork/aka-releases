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

从 [GitHub Releases](https://github.com/caork/aka-releases/releases) 下载正式资产。Windows complete、其 updater `.sig` 与 Linux complete 双卷均只在 GitHub 发布；校验时使用同一 Release 的 `SHA256SUMS`。

| 选择 | 适用场景 | 包含内容 |
| --- | --- | --- |
| Linux complete 包 | 隔离网络、受控网络，或需要在首轮索引就使用上游语义增强 | Linux complete 同版本 `base`/`packs` 两个 `aka-headless-complete-*.tar.gz`，包含 Java、Python、TypeScript/JavaScript、C/C++、Rust。两卷必须依次解压到同一目录；完整目录内置五个已签名 `.aka-pack`，不需要首次联网下载。 |
| GitHub Windows complete 包 | Windows 用户 | GitHub 单体 `aka-desktop-complete-*-setup.exe` 及 detached `.sig`；用 GitHub `SHA256SUMS` 校验，内置 Java、TypeScript/JavaScript、Rust 三个各自已签名 `.aka-pack`。Python 与 C/C++ 没有 Windows pack，仍可导入外部 `index.scip`。 |

complete 包不会降低数据一致性：每次成功索引都会发布同一不可变 generation 的源码、图和搜索结果。Linux complete 包只是把可选的上游语义工具预先带到离线环境；没有 pack 时仍使用内置 Rust `aka-parse`。已发布的 Linux complete 基线包含 `packs-v0.1.13` 的 Java、Python、TypeScript/JavaScript、C/C++、Rust，其中 C/C++ 使用官方 `scip-clang` v0.3.3。Linux 包最低要求 glibc 2.28。GitHub Windows complete 包含 Java、TypeScript/JavaScript、Rust；需要更换或补充时可从 GitHub `aka-packs` 本地导入相应签名 pack。Python 与 C/C++ 可导入外部预生成的 `index.scip`。Vue 仅有 Tier-0 和 `<script>` 内 TS/JS 能力，不包含 Vue SCIP pack。complete 包不包含 raw exporter 或未签名 payload。`v0.1.49` 和其他历史发布保持原样；旧 Release 记录或资产可以为配额清理，但保留 Git tag，当前 Release 永不清理。

## 通用原则

- 默认搜索是 BM25；embedding 默认关闭，只有仓库所有者手动启用时才会使用。
- 语义 pack 是可选增强。pack 不可用、超时或被跳过时，基础索引仍可发布和查询，结果会缺少该语言的部分语义关系。
- 从 GitHub `aka-releases` 取得 Windows complete `setup.exe`、`.sig`、Linux complete 双卷及 `SHA256SUMS`。签名 `.aka-pack`、规则包和其他非产品资产仅从 GitHub [AKA Packs Releases](https://github.com/caork/aka-packs/releases) 取得。不要导入任意 `.zip`、`.tgz` 或 `.tar.gz` 作为 pack。
- 从对应发布页取得的 `SHA256SUMS` 用于核对下载；Windows 更新只读取 GitHub `latest.json` 并在安装前校验 updater 签名。

下一步：Windows 使用者进入 [Windows 桌面版](windows-desktop.md)，Linux 管理员进入 [Linux headless 服务包](linux-headless.md)。
