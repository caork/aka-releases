# AKA Releases

AKA 的公开发行仓库。源码保存在私有仓库；这里仅承载 Windows 桌面版、Linux
headless 服务包、更新元数据与使用文档。

## 下载

从 [Releases](../../releases) 获取当前版本。从下一个正式版本起，GitHub 提供：

- Windows x86_64 complete NSIS 安装包及 detached updater `.sig`；
- Linux x86_64 complete headless 服务包固定 `base`/`packs` 双卷；已发布的 `packs-v0.1.13` 叠加后内置五个已签名 upstream packs；
- GitHub 自己的 `SHA256SUMS` 与 `latest.json`。

正式产品不再发布到 Gitee。普通 Windows 安装包和普通 Linux headless 服务包不属于未来正式发行。

不发布 portable Windows 可执行文件、macOS 包、AppImage、DEB/RPM、Docker 镜像或
独立客户端配置压缩包。

## 使用说明

- [Windows 桌面版](docs/wiki/windows-desktop.md)
- [Linux headless 服务包](docs/wiki/linux-headless.md)
- [更新与故障排查](docs/wiki/maintenance.md)
- [许可证与通知](docs/wiki/licenses.md)

complete 包使用内置 Rust `aka-parse`，无需额外解析器即可索引。GitHub Windows complete 是带 detached `.sig` 的 updater 目标，额外内置 Java、TypeScript/JavaScript、Rust 三个适用于 Windows 的签名 pack；请使用 GitHub `SHA256SUMS` 校验安装包，内嵌 pack 各自验签。Linux complete 内置 Java、Python、TypeScript/JavaScript、C/C++、Rust 五个适用于 Linux 的签名 pack，其中 C/C++ 固定为官方 `scip-clang` v0.3.3。Linux 服务包的最低 glibc 基线是 2.28。Windows Python 与 C/C++ 可导入外部预生成的 `index.scip`。Vue 没有 SCIP pack。GitHub Release 提供对应的 `SHA256SUMS` 和 `latest.json`。`v0.1.45` Windows complete、`v0.1.49` 及其他既有发布均保持不变；旧 Release 记录或资产可为配额清理，但会保留 Git tag，且当前 Release 永不清理。Linux complete 必须同时下载同版本的 `base` 与
`packs` 两个 `.tar.gz`，依次解压到同一目录；每卷严格小于 95 MiB。

Windows 桌面版只从 GitHub 的 `latest.json` 检查更新；发现新版本后仅显示
更新按钮，用户点击后才校验签名、安装并重启。Linux 服务的标准入口是 `aka serve`，
默认提供 REST/Web `:4111` 与 MCP `:4112/mcp`。

发行资产中的第三方通知必须保留。下载后可用同一 Release 的 `SHA256SUMS` 校验文件。
