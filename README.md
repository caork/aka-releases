# AKA Releases

AKA 的公开发行仓库。源码保存在私有仓库；这里仅承载 Windows 桌面版、Linux
headless 服务包、更新元数据与使用文档。

## 下载

从 [Releases](../../releases) 获取当前版本。每个正式版本同时提供：

- Windows x86_64 普通 NSIS 安装包与签名；
- Windows x86_64 complete NSIS 安装包与签名，内置五个已签名 semantic packs；
- Linux x86_64 普通 headless 服务包；
- Linux x86_64 complete headless 服务包，内置五个已签名 semantic packs；
- `SHA256SUMS` 与 `latest.json`。

不发布 portable Windows 可执行文件、macOS 包、AppImage、DEB/RPM、Docker 镜像或
独立客户端配置压缩包。

## 使用说明

- [Windows 桌面版](docs/wiki/windows-desktop.md)
- [Linux headless 服务包](docs/wiki/linux-headless.md)
- [更新与故障排查](docs/wiki/maintenance.md)
- [许可证与通知](docs/wiki/licenses.md)

普通包使用内置 Rust `aka-parse`，无需额外解析器即可索引。complete 包额外内置
Java、Python、TypeScript/JavaScript/Vue、C/C++、Rust 五个适用于当前平台的签名
pack，适合离线或受控网络环境。

Windows 桌面版从 GitHub、Gitee 的 `latest.json` 顺序检查更新；发现新版本后仅显示
更新按钮，用户点击后才校验签名、安装并重启。Linux 服务的标准入口是 `aka serve`，
默认提供 REST/Web `:4111` 与 MCP `:4112/mcp`。

发行资产中的第三方通知必须保留。下载后可用同一 Release 的 `SHA256SUMS` 校验文件。
