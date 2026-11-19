# 更新与故障排查

## <a id="updates"></a>更新

| 现象 | 处理方式 |
| --- | --- |
| Windows 没有更新按钮 | 更新检查在启动时和每 30 分钟运行一次。确认能访问 GitHub `aka-releases`，重启后等待检查完成。没有新版本时不会显示按钮。GitHub Windows complete 是唯一的 updater 目标。 |
| Windows 更新校验失败 | 不要绕过签名校验。重新从 GitHub 官方 Release 下载对应的 complete `setup.exe` 与 `.sig`，并用 GitHub `SHA256SUMS` 核对。 |
| Linux 升级后无法启动 | 保留上一版 `bin/aka`，检查启动日志和 `AKA_HOME` 的访问权限。确认下载的是 Linux x86_64 headless 服务包，并先用 `/api/health` 验证新版本。 |
| pack 显示有更新 | pack 的更新提示不会自动下载。到 **Settings > Semantic packs** 选择安装，或在离线环境导入受信 `.aka-pack`。 |

不要把 Windows 安装程序、Linux 服务包、PDF 用户手册和 packs 与不对应 Release 的 `SHA256SUMS` 混用。GitHub Windows complete 必须使用同一 GitHub `aka-releases` Release 的 `SHA256SUMS` 与 `.sig`；单一 Linux complete 包和 PDF 用户手册 `aka-<ver>-user-guide.pdf` 也使用该 Release 的清单。可选语言 packs、规则包及其 `SHA256SUMS` 仅来自 GitHub `aka-packs`。

## <a id="indexing"></a>索引

| 现象 | 处理方式 |
| --- | --- |
| 首次索引跑得很久 | 索引默认没有时间上限，可以让它跑完；想提前收尾就在索引界面点 **Skip**，已经跑完的部分会照常发布。Linux 检查服务的环境变量、磁盘空间与 `AKA_HOME` 所在磁盘性能。 |
| 索引只显示部分语义关系 | 基础 Rust `aka-parse` generation 已可用；检查该仓库的 Semantic packs 是否已安装、启用并满足项目运行条件。语义 pack 超时或跳过不会破坏基础索引。 |
| Java/Python/TS/C++/Rust 结果不完整 | 检查对应 pack 与前置工具：JDK 17+、`scip-typescript` 使用 Node.js 18 或 20、Python 虚拟环境、`compile_commands.json`、Cargo/Rust toolchain。Linux Python pack 有 `linux-x86_64` 与 `linux-aarch64` 两个目标；Windows Python/C++ 需要外部 `index.scip`。然后重新分析仓库。 |
| 多个仓库同时索引时内存吃紧，或任务一直显示"排队中" | 同一服务内默认一次只运行 1 个索引任务，其余排队（状态仍是 `indexing`，可点 **Skip** 取消排队）。内存充足时可在 `$AKA_HOME/settings.json` 设置 `"maxConcurrentIndexJobs": 2`（取值 1–8）后重启服务。 |
| 某个仓库不再自动重新索引 | 索引失败或进程在索引中途被杀后，后台自动索引会按 10 分钟、1 小时、6 小时、之后每 24 小时退避该仓库。手动执行一次更新/重新分析即可立即重试并清除退避。 |
| 数据看起来过旧 | 对仓库执行更新/重新分析。不要手工改动 `AKA_HOME` 下的 generation、CAS、图或索引文件。 |

三个索引侧的调节项既可以写在 `$AKA_HOME/settings.json`，也可以用同名环境变量；两者都给出时环境变量优先，便于自动化脚本只影响单次运行。`indexMaxSecs` / `AKA_INDEX_MAX_SECS` 是单次索引的硬上限（秒）；`searchWriterThreads` / `AKA_SEARCH_WRITER_THREADS` 与 `searchWriterMemMb` / `AKA_SEARCH_WRITER_MEM_MB` 是搜索索引写入端的线程数与每线程内存（MiB）。不写或写 `0` 表示用默认档；超出支持范围的值会被夹到边界，写入端内存峰值始终是线程数乘每线程预算，不随仓库规模增长。

## pack 导入

| 现象 | 处理方式 |
| --- | --- |
| 导入被拒绝 | 确认选择的是签名 `.aka-pack`，不是任意 archive；确认 Pack ID、版本和平台匹配。C/C++ pack 只支持 `linux-x86_64`；Rust 有 `linux-x86_64`、`windows-x86_64` 与 `linux-aarch64` 三个目标，选择与本机一致的那个。 |
| 签名或哈希错误 | 产品文件从 GitHub `aka-releases` 重新下载，并用其 `SHA256SUMS` 核对；pack 文件仅从 GitHub `aka-packs` 重新下载，并用该 pack release 的 `SHA256SUMS` 核对。不要关闭签名校验。 |
| complete 包里的 pack 无法使用 | 确认导入的是解压后的 complete 包内的已签名 `.aka-pack`，且 C/C++、Rust 文件为本机平台。校验错误时，重新下载同一 Release 的 complete 包并核对 `SHA256SUMS`。 |
| complete 包之外需要补充 pack | 在联网机器下载签名 `.aka-pack` 和校验清单，再通过受控介质转移；在 Windows 使用 **Import local package**，在 Linux 通过受保护的 REST 管理面导入。 |

## Linux 访问与认证

| 现象 | 处理方式 |
| --- | --- |
| 远程 REST 写操作返回拒绝 | 默认只允许 loopback 管理。需要远程管理时，以 `aka serve --allow-remote-admin` 重启服务；AKA 不设密码，对外暴露时在前面加认证网关。 |
| MCP 可访问但 REST 管理仍被拒绝 | 这是预期的独立边界：`--allow-remote-admin` 只管 REST 管理面。为 `:4112/mcp` 限制网络访问，或部署独立认证网关。 |
| 门户给出的地址不正确 | 在反向代理或端口映射部署中设置 `--public-base-url` / `--public-mcp-url`，或等价环境变量。 |

## 收集信息

寻求支持时，提供产品版本、操作系统、发生时间、已采取的步骤、错误信息和是否使用 pack。

服务异常退出（例如被 OOM killer 杀掉）、索引失败或 panic 时，AKA 会把现场写到 `$AKA_HOME/diagnostics/crashes/`：文件名带 UTC 时间、仓库名与类型（`-killed`、`-failed`、`-interrupted`、`-panic`），内容包括当时的索引阶段、内存采样与最近日志；正常 `systemctl stop/restart` 只记为 `-interrupted`，不算失败。目录只保留最新 50 个文件。提供这些文件前请先检查其中的仓库路径与日志片段，不要整体打包 `AKA_HOME`。不要发送访问令牌、`AKA_HOME` 的完整内容或私有源码。Linux 管理员可提供服务日志中已脱敏的相关片段。
