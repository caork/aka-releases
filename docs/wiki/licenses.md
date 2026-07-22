# 许可证与通知

## 产品与第三方组件

AKA 包含多个第一方与第三方组件。不同组件可能使用不同许可证；请以安装包中的通知和各语义 pack 内的 `LICENSE`、`NOTICE` 为准。

- Linux headless 服务包在根目录提供 `THIRD_PARTY_NOTICES.md`，部署和再分发时应保留它。
- 每个签名 `.aka-pack` 都携带该 pack 的 `LICENSE` 与 `NOTICE`。导入时会校验其存在和完整性；离线转移时请一并保留原始容器。
- 某些解析、语言工具或导出器含 Apache-2.0、MIT、EPL-2.0、BSD-3-Clause、LLVM Exception 或其他上游许可义务。不要用一个泛称替代实际 notice。

## MIT 派生来源

AKA 的历史 legacy engine 含 MIT 派生代码。在其保留的显式 parity 回退窗口内，必要的 MIT 来源与许可说明必须保留。源码或发行渠道的变化不撤回历史已公开内容，也不会取消该许可说明义务。

默认运行时使用内置 Rust `aka-parse`，不需要启用 legacy parity 回退。无论是否使用该回退，分发者都应保留所附的第三方 notices，不得移除或篡改。

## 获取帮助

若组织的法务或安全审核需要具体组件、版本或 notice，请保留所下载 Release 的版本号、`SHA256SUMS`、`THIRD_PARTY_NOTICES.md` 和相关 `.aka-pack` 容器，再向发布方索取与该版本对应的材料。技术支持流程见 [更新与故障排查](maintenance.md)。
