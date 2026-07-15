# AKA Releases

Public, signed release assets and update metadata for the AKA desktop application.

This repository does not contain the AKA source code. Its Git history intentionally contains only release metadata and documentation, so GitHub's automatically generated source archives do not expose the private source repository.

Formal releases contain only:

- Windows NSIS installer and Tauri updater signature
- macOS DMG, Tauri updater archive, and signatures
- Claude Code/OpenCode/client integration packages
- `SHA256SUMS` and `latest.json`

Desktop updates are served directly by GitHub Releases:

`https://github.com/caork/aka-releases/releases/latest/download/latest.json`
