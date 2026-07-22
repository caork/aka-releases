# 更新与故障排查

## <a id="updates"></a>更新

| 现象 | 处理方式 |
| --- | --- |
| Windows 没有更新按钮 | 更新检查在启动时和每 30 分钟运行一次。确认能访问 GitHub 或 Gitee 的 `aka-releases`，重启后等待检查完成。没有新版本时不会显示按钮。普通包与 complete 包分别只接受对应产品形态的更新。 |
| Windows 更新校验失败 | 不要绕过签名校验。重新从官方 Release 下载对应 `setup.exe`，用 `SHA256SUMS` 核对；持续失败时切换 GitHub/Gitee 镜像。 |
| Linux 升级后无法启动 | 保留上一版 `bin/aka`，检查启动日志和 `AKA_HOME` 的访问权限。确认下载的是 Linux x86_64 headless 服务包，并先用 `/api/health` 验证新版本。 |
| pack 显示有更新 | pack 的更新提示不会自动下载。到 **Settings > Semantic packs** 选择安装，或在离线环境导入受信 `.aka-pack`。 |

不要把 Windows 安装程序、Linux 服务包和 packs 与不同版本的 `SHA256SUMS` 混用。产品更新仅来自 `aka-releases`；可选语言 packs 仅来自 `aka-packs`。

## <a id="indexing"></a>索引

| 现象 | 处理方式 |
| --- | --- |
| 首次索引超过 1500 秒 | Windows 在 **Settings > Indexing** 提高时间预算，或为本次启动设置 `AKA_INDEX_MAX_SECS`。Linux 检查服务的环境变量、磁盘空间与 `AKA_HOME` 所在磁盘性能。 |
| 索引只显示部分语义关系 | 基础 Rust `aka-parse` generation 已可用；检查该仓库的 Semantic packs 是否已安装、启用并满足项目运行条件。语义 pack 超时或跳过不会破坏基础索引。 |
| Java/Python/TS/C++/Rust 结果不完整 | 检查对应 pack 与前置工具：JDK 21、Node.js 16+/18+、Python 虚拟环境、`compile_commands.json`、Cargo/Rust toolchain。然后重新分析仓库。 |
| 数据看起来过旧 | 对仓库执行更新/重新分析。不要手工改动 `AKA_HOME` 下的 generation、CAS、图或索引文件。 |

默认 embedding 关闭；未配置本地模型时搜索仍是 BM25。这不是索引故障。

## pack 导入

| 现象 | 处理方式 |
| --- | --- |
| 导入被拒绝 | 确认选择的是 `.aka-pack`，不是 raw exporter；确认 Pack ID、版本和平台匹配。C/C++、Rust 要选择正确的 `windows-x86_64` 或 `linux-x86_64`。 |
| 签名或哈希错误 | 删除下载文件，从官方 GitHub/Gitee 镜像重新下载，并按同一 Release 的 `SHA256SUMS` 核对。不要关闭签名校验。 |
| complete 包里的 pack 无法使用 | 确认导入的是解压后的 complete 包内的已签名 `.aka-pack`，且 C/C++、Rust 文件为本机平台。校验错误时，重新下载同一 Release 的 complete 包并核对 `SHA256SUMS`。 |
| 普通包的离线环境无法安装 pack | 在联网机器下载签名 `.aka-pack` 和校验清单，再通过受控介质转移；在 Windows 使用 **Import local package**，在 Linux 通过受保护的 REST 管理面导入。 |

## Linux 访问与认证

| 现象 | 处理方式 |
| --- | --- |
| 远程 REST 写操作返回拒绝 | 默认只允许 loopback 管理。需要远程管理时，同时配置 `AKA_ALLOW_REMOTE_ADMIN=1`（或 `--allow-remote-admin`）与有效 `AKA_ADMIN_PASSWORD_HASH` Argon2id PHC。 |
| 管理员密码表单不可用 | 远程访问必须使用 HTTPS；明文 HTTP 不会发送密码。确认 `--public-base-url` 是 HTTPS 的公开地址。 |
| MCP 可访问但 REST 管理仍被拒绝 | 这是预期的独立保护边界。REST 管理密码不保护 MCP；为 `:4112/mcp` 限制网络访问，或部署独立认证网关。 |
| 门户给出的地址不正确 | 在反向代理或端口映射部署中设置 `--public-base-url` / `--public-mcp-url`，或等价环境变量。 |

## 收集信息

寻求支持时，提供产品版本、操作系统、发生时间、已采取的步骤、错误信息和是否使用 pack。不要发送管理员密码、Argon2id 哈希、访问令牌、`AKA_HOME` 的完整内容或私有源码。Linux 管理员可提供服务日志中已脱敏的相关片段。
