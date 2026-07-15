# AKA

[简体中文](README.zh-CN.md)

AKA is a desktop code knowledge engine for understanding software projects. It turns a repository into a searchable, navigable knowledge base so developers and coding agents can answer questions about code with structure and context rather than isolated text matches.

This is AKA's public binary-release and update repository. The source repository is private; this repository intentionally contains only documentation, release metadata, and signed distribution assets.

## What AKA Does

- Indexes a local project into an immutable snapshot, so a search result, graph relationship, source location, and code preview stay consistent with one another.
- Finds symbols and code quickly with structured filters, full-text search, and exact source verification.
- Visualizes projects as an interactive graph of folders, files, modules, types, functions, imports, calls, and supported application relationships.
- Follows definitions and references, shows callers and callees, and estimates the downstream impact of a change.
- Brings together code context, repository structure, processes, routes, tools, and other supported project concepts in one desktop workspace.
- Exposes the same local knowledge base to Claude Code, Codex, and OpenCode through MCP integration packages.

AKA is designed for local work. The desktop application keeps its index and repository snapshots on the machine running it. Search uses BM25 by default; optional semantic search must be explicitly enabled by the user and uses a user-provided local model.

## Getting Started

1. Open [Releases](https://github.com/caork/aka-releases/releases) and download the formal release asset for your platform.
2. Install and start the AKA desktop application.
3. Import a local folder, Git repository, or archive from the desktop application.
4. Use Search, Graph, and Symbol views to explore the indexed project.
5. Optionally install the matching Claude Code, Codex, or OpenCode integration package from the same release. The integration connects to the desktop application's local MCP endpoint, so agents and the desktop app use the same index.

## Release Assets

Formal releases may include only the following assets:

- Windows: signed NSIS `setup.exe` and its updater signature. Portable and single-file Windows executables are not released.
- macOS: Developer ID-signed and notarized DMG, plus the signed update archive and signatures used to verify manual updates.
- Integrations: Claude Code, Codex, OpenCode, and other supported client configuration packages.
- Verification metadata: `SHA256SUMS` and `latest.json`.

Pre-release assets are clearly labeled. A macOS ad-hoc test build, for example, is for controlled testing only and is not a notarized production release or a manual-update asset.

## Manual Updates And Verification

AKA updates manually. When an update is available, download the appropriate asset from the release page and verify it before installation.

Release assets are collected in a draft release and published only when the Windows, macOS, integration, and update metadata are complete. This prevents users from downloading a partial version.

The desktop update feed is hosted directly on GitHub Releases:

`https://github.com/caork/aka-releases/releases/latest/download/latest.json`

You can verify downloaded files against the `SHA256SUMS` asset in the same release. Required third-party and MIT-derived notices are retained with applicable distributions.

## Source Availability

AKA's source code is maintained in a private repository. This public repository is deliberately limited to release documentation, metadata, and binary assets; GitHub-generated source archives here do not contain the AKA application source.

For installation, update, or release-asset questions, please open an issue in this repository.
