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
| complete 包 | 隔离网络、受控网络，或需要在首轮索引就使用 Java、Python、TypeScript/JavaScript/Vue、C/C++、Rust 的语义增强 | Windows complete NSIS `setup.exe`，或 Linux complete 同版本 `base`/`packs` 两个 `aka-headless-complete-*.tar.gz`。Linux 两卷必须依次解压到同一目录；完整目录内置五个已签名 `.aka-pack`，不需要首次联网下载。 |

普通包不会降低数据一致性：每次成功索引都会发布同一不可变 generation 的源码、图和搜索结果。complete 包只是把可选的语义分析器预先带到离线环境；没有 pack 时仍使用内置 Rust `aka-parse`。当前 complete 包固定包含 `packs-v0.1.11`（或发布合同明确升级后的版本）中适用于目标平台的 Java、Python、TypeScript/JavaScript/Vue、C/C++、Rust packs；不包含 raw exporter 或未签名 payload。

## 通用原则

- 默认搜索是 BM25；embedding 默认关闭，只有仓库所有者手动启用时才会使用。
- 语义 pack 是可选增强。pack 不可用、超时或被跳过时，基础索引仍可发布和查询，结果会缺少该语言的部分语义关系。
- 只从官方 GitHub/Gitee 镜像取得 `setup.exe`、`aka-headless-*.tar.gz` 和签名 `.aka-pack`。不要导入 raw exporter 的 `.zip`、`.tgz` 或 `.tar.gz`。
- 从发布页取得的 `SHA256SUMS` 用于核对下载；Windows 更新还会在安装前校验更新签名。

下一步：Windows 使用者进入 [Windows 桌面版](windows-desktop.md)，Linux 管理员进入 [Linux headless 服务包](linux-headless.md)。
