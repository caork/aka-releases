# AKA

[English](README.md)

AKA 是面向软件项目的桌面代码知识引擎。它将代码仓库转换为可搜索、可导航的知识库，让开发者与编码 Agent 不再只依赖孤立的文本匹配，而能在项目结构与上下文中理解代码。

这里是 AKA 的公开二进制发行与更新仓库。AKA 源码仓库保持私有；本仓库有意只保存文档、发行元数据和经过签名的分发资产。

## AKA 能做什么

- 将本地项目索引为不可变快照，使搜索结果、图关系、源码位置和代码预览始终来自同一份一致的数据。
- 结合结构化过滤、全文检索和源码精确验证，快速定位符号与代码。
- 以交互式图谱呈现目录、文件、模块、类型、函数、导入、调用及已支持的应用关系。
- 跟随定义和引用，查看调用方与被调用方，并评估一次改动可能影响的下游范围。
- 在同一个桌面工作区中关联代码上下文、仓库结构、流程、路由、工具以及其他已支持的项目概念。
- 通过 MCP 集成包将同一套本地知识库提供给 Claude Code、Codex 和 OpenCode。

AKA 为本地工作而设计。桌面应用会在运行它的设备上保存索引和仓库快照。搜索默认使用 BM25；语义搜索是用户手动开启的可选能力，并且只使用用户自行提供的本地模型。

## 使用文档

- [新手使用指南](docs/getting-started.zh-CN.md)：安装 Agent 集成包并添加第一个代码仓库索引。

## 快速开始

1. 打开 [Releases](https://github.com/caork/aka-releases/releases)，下载对应平台的正式发行资产。
2. 安装并启动 AKA 桌面端。
3. 在桌面端导入本地文件夹、Git 仓库或代码归档文件。
4. 使用 Search、Graph 和 Symbol 视图探索完成索引的项目。
5. 如有需要，从同一 Release 安装对应的 Claude Code、Codex 或 OpenCode 集成包。集成包连接桌面端提供的本地 MCP 端点，因此 Agent 与桌面端使用的是同一份索引。

## 正式发行资产

正式 Release 只可能包含以下资产：

- Windows：经签名的 NSIS `setup.exe` 安装包及其更新签名。不会发布 portable 或单文件 Windows 可执行文件。
- macOS：经 Developer ID 签名和 Apple 公证的 DMG，以及用于校验手动更新的签名更新归档和签名文件。
- 集成包：Claude Code、Codex、OpenCode 及其他已支持客户端的配置包。
- 校验元数据：`SHA256SUMS` 和 `latest.json`。

预发布资产会被明确标注。例如 macOS ad-hoc 测试构建仅用于受控测试，既不是已公证的正式版本，也不会作为手动更新资产发布。

## 手动更新与校验

AKA 使用手动更新。发现新版本后，请从 Release 页面下载对应平台的资产，并在安装前完成校验。

发行资产会先汇集到 draft Release，只有 Windows、macOS、集成包和更新元数据全部齐备后才发布。这样可避免用户下载到不完整版本。

桌面端更新源直接托管在 GitHub Releases：

`https://github.com/caork/aka-releases/releases/latest/download/latest.json`

下载后可以使用同一 Release 中的 `SHA256SUMS` 校验文件完整性。适用的第三方与 MIT 派生代码声明会随发行版本保留。

## 源码可见性

AKA 的源码维护在私有仓库中。本公开仓库刻意只包含发行说明、元数据与二进制资产，因此 GitHub 在这里生成的源码归档不包含 AKA 应用源码。

安装、更新或发行资产相关的问题，请在本仓库提交 Issue。
