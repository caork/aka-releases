# Linux headless 服务包

Linux headless 服务包面向 x86_64 GNU/Linux。它提供 REST/Web 工作区（默认 `:4111`）和 Streamable HTTP MCP（默认 `:4112/mcp`），无需桌面环境或前端依赖。

## 安装与本机启动

从 [GitHub Releases](https://github.com/caork/aka-releases/releases) 或 [Gitee Releases](https://gitee.com/jscao/aka-releases/releases) 下载普通 `aka-headless-<版本>-x86_64-unknown-linux-gnu.tar.gz`，或同时下载 complete 的同版本 `base` 与 `packs` 两个 `.tar.gz`，并用同一 Release 的 `SHA256SUMS` 校验。只需要基础索引时选择普通包；隔离网络或需要五种语言的离线语义增强时选择 complete 包。普通包解压一次即可；complete 必须先解压 `base`，再把 `packs` 解压到同一目标目录。两个卷都是真正可独立解压的 tar 包、均严格小于 95 MiB，但只有叠加后的目录才是完整产品。计划中的 upstream-only `packs-v0.1.12` 完整目录含 `bin/aka`、README、systemd 示例、`THIRD_PARTY_NOTICES.md` 与适用于 Linux x86_64 的 Java、Python、TypeScript/JavaScript、C/C++、Rust 五个签名 packs；`packs-v0.1.11` 的派生包是已公开历史资产。

```bash
version=0.1.45 # 替换为 Release 版本
tar -xzf "aka-headless-${version}-x86_64-unknown-linux-gnu.tar.gz"
cd "aka-headless-${version}-x86_64-unknown-linux-gnu"
sudo install -m 0755 bin/aka /usr/local/bin/aka
sudo install -d -o "$USER" /var/lib/aka

AKA_HOME=/var/lib/aka aka serve \
  --addr 127.0.0.1:4111 \
  --mcp-addr 127.0.0.1:4112
```

complete 双卷的解压方式如下；两个归档内的顶层目录名相同，第二条命令只补入其余内容：

```bash
version=0.1.45 # 替换为 Release 版本
tar -xzf "aka-headless-complete-${version}-base-x86_64-unknown-linux-gnu.tar.gz"
tar -xzf "aka-headless-complete-${version}-packs-x86_64-unknown-linux-gnu.tar.gz"
cd "aka-headless-complete-${version}-x86_64-unknown-linux-gnu"
```

确认服务：

```bash
curl --fail http://127.0.0.1:4111/api/health
# {"status":"ok","service":"aka-server"}
```

REST/Web 工作区地址是 `http://127.0.0.1:4111/`，MCP 地址是 `http://127.0.0.1:4112/mcp`。将 `AKA_HOME` 放在持久磁盘上；其中保存注册表、不可变 generations、CAS、搜索索引、图和受管 checkout。

## 可信网络部署

只有在受控网络或已有反向代理/网关时才绑定到外部地址：

```bash
AKA_HOME=/var/lib/aka aka serve \
  --addr 0.0.0.0:4111 \
  --mcp-addr 0.0.0.0:4112 \
  --public-base-url https://aka.example.internal \
  --public-mcp-url https://aka-mcp.example.internal/mcp
```

`--public-base-url` 与 `--public-mcp-url` 用来声明用户实际访问的 HTTPS 地址；使用反向代理、TLS 终止或端口映射时必须设置它们。也可用 `AKA_PUBLIC_BASE_URL` 与 `AKA_PUBLIC_MCP_URL` 设置相同值。代理应保留原始 `Host` 并传递 `X-Forwarded-For`。

普通浏览、搜索和图查询可通过 REST/Web 工作区进行。浏览器写操作只接受精确同源 Origin；跨站请求会被拒绝。

## 远程 REST 管理与管理员密码

远程 REST 的导入、更新、删除、设置和 pack 管理默认关闭。需要从 Web 工作区管理仓库时，必须**同时**启用远程管理开关和设置有效的 Argon2id PHC 哈希：

```bash
AKA_ALLOW_REMOTE_ADMIN=1 \
AKA_ADMIN_PASSWORD_HASH='$argon2id$v=19$<salt>$<hash>' \
AKA_HOME=/var/lib/aka aka serve \
  --addr 0.0.0.0:4111 \
  --mcp-addr 127.0.0.1:4112 \
  --public-base-url https://aka.example.internal
```

`--allow-remote-admin` 与 `AKA_ALLOW_REMOTE_ADMIN=1` 等价。开关存在但哈希不是有效 Argon2id PHC 时，服务会拒绝启动。使用团队的密码/密钥管理工具生成哈希，并仅将哈希交给服务管理器的受保护环境；不要将明文密码或哈希写入命令历史、JSON、仓库或 unit 文件。

门户只会在 **HTTPS** 或 loopback HTTP 下显示和发送管理员密码，远程明文 HTTP 不允许输入密码。管理员认证仅保护 REST 管理面 `:4111`；它**不保护** `:4112/mcp`。MCP 仍可执行分析、导入、更新和自动索引，因此应只绑定可信网络，或在它前面放置独立的认证网关。

## complete 包的离线 packs

headless 服务包内置 Rust `aka-parse`，即使没有可选 pack 也能索引和查询。计划中的 upstream-only complete 包带有 Java、Python、TypeScript/JavaScript、C/C++、Rust 的适用签名 `.aka-pack`；Vue 仅有 Tier-0 和 `<script>` 内 TS/JS 能力。首次运行 `aka serve` 时会自动校验并导入，后续启动会幂等跳过相同版本，无需访问下载站或手工调用导入接口。单个 pack 导入失败不会阻止服务启动或基础索引，可用 `GET /api/semantic-packs` 查看状态。普通包在隔离网络中需要额外 pack 时，可在联网机器从 GitHub [AKA Packs Releases](https://github.com/caork/aka-packs/releases) 下载所需 `.aka-pack`，连同该 pack release 的 `SHA256SUMS` 一起转移到目标主机；当前没有 Gitee packs 镜像。

普通包手工导入 Java pack 的示例如下；将 `java` 和文件名替换为其他语言的 Pack ID 与对应文件。complete 包不需要执行此步骤。服务只接受与内置合同、目标平台和 Pack ID 匹配的已签名文件。

```bash
curl --fail-with-body \
  --request POST \
  --form 'file=@aka-pack-java-0.13.1-any-any.aka-pack;type=application/octet-stream' \
  http://127.0.0.1:4111/api/semantic-packs/java/import
```

用 `GET /api/semantic-packs` 查看状态。远程主机执行此操作时适用上一节的 REST 管理认证。选择 `.aka-pack`，不要导入任意 `.zip`、`.tgz` 或 `.tar.gz` 作为 pack。Python、C/C++ 与 Rust 选择 `linux-x86_64`；Java、TypeScript/JavaScript 使用 `any-any`。Vue 没有 SCIP pack。

## 更新

停掉服务、替换为同一产品 Release 解压后的 `bin/aka`，再启动服务。升级前备份 `AKA_HOME`，升级后先访问 health endpoint，再检查已注册仓库和 packs。产品更新来自 GitHub 或 Gitee 的 `aka-releases`；pack 更新来自 GitHub `aka-packs`，不使用 Gitee packs 镜像。各自使用其来源 Release 的 `SHA256SUMS` 验证。

更多诊断步骤见 [更新与故障排查](maintenance.md)，许可文件说明见 [许可证与通知](licenses.md)。
