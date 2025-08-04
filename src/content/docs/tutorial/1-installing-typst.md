---
title: 安装 Typst
description: 学习如何在你的电脑上安装 Typst
---

## 在线使用

使用 Typst 最简单便捷的方式就是使用官方在线编辑器。

只需要打开官网 [typst.app](https://typst.app/)，注册账号。新建文档即可。

适用场景：快速，免安装，多人协作。

## 本地安装

### VS Code (推荐)

适用场景：深度自定义，离线使用，顾及隐私。

[安装 VS Code](https://code.visualstudio.com/)。

点击左侧扩展图标，搜索 `Tinymist` 插件并安装

:::note

请勿安装 Typst LSP 插件和 Typst Preview 插件，这两个插件已废弃，其功能已经整合到 `Tinymist` 插件中。

如果之前安装了这两个插件请卸载，否则会导致冲突。

:::

请注意，字体配置在 Typst 中相当重要，Typst 会自动扫描到系统中安装的字体，你可以使用 `typst fonts` 命令列出所有可用的字体，以便未来在 Typst 中使用。

### 命令行 (CLI)

适用场景：进阶用户，需要高度自定义，或者在 CI/CD 中使用 Typst。

Typst 的命令行工具 (CLI) 可以通过多种方式获取：

- 你可以从 [发布页面][releases] 获取 Typst 最新版本的源代码和预编译二进制文件。下载适用于你平台的压缩包，并将其放置在 `PATH` 环境变量包含的目录中。为了在将来保持更新，你只需运行 `typst update` 命令即可。

- 你也可以通过不同的包管理器安装 Typst。请注意，包管理器中的版本可能会滞后于最新发布的版本。
  - Linux：
    - 查看 [Repology 上的 Typst][repology]
    - 查看 [Typst 的 Snap 包][snap]
  - macOS：使用 `brew install typst`
  - Windows：使用 `winget install --id Typst.Typst`

- 如果你已安装 [Rust][rust] 工具链，可以通过以下方式安装：
  - 安装最新发布的 Typst 版本：`cargo install --locked typst-cli`
  - 安装开发版本：`cargo install --git https://github.com/typst/typst --locked typst-cli`

- 使用 Nix 的用户可以：
  - 通过 `nix-shell -p typst` 使用 `typst` 软件包
  - 通过 `nix run github:typst/typst -- --version` 构建并运行开发版本

- 使用 Docker 的用户可以运行预构建镜像：`docker run ghcr.io/typst/typst:latest --help`

[releases]: https://github.com/typst/typst/releases

[repology]: https://repology.org/project/typst/versions

[snap]: https://snapcraft.io/typst

[rust]: https://www.rust-lang.org/