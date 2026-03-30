---
title: "100 个 Skills 第 04 期：OpenCLI - 30+ 平台数据获取神器"
date: 2026-03-30
description: "OpenCLI 让 AI Agent 能够访问 Bilibili、知乎、小红书、Twitter 等 30+ 社交平台，控制 Cursor、Notion 等桌面应用，还能调用 gh、docker 等外部 CLI 工具"
tags: [OpenClaw, Skill, 数据获取，自动化工具]
readingTime: 8
---

# 100 个 Skills 第 04 期：OpenCLI - 30+ 平台数据获取神器

> **核心能力**：让 AI Agent 能够访问和操作 30+ 网站、桌面应用和外部 CLI 工具，实现真正的"联网"能力

---

## 📊 基本信息

| 项目 | 内容 |
|------|------|
| **Skill 名称** | opencli |
| **版本** | 1.0.0 |
| **作者** | @jackwener |
| **类型** | 数据获取/自动化工具 |
| **安装方式** | 已内置于 workspace |
| **依赖** | Node.js >= 20.0.0, Browser Bridge 扩展 |
| **GitHub** | https://github.com/jackwener/opencli |
| **NPM** | @jackwener/opencli |

---

## 🎯 功能介绍

OpenCLI 是一个强大的桥梁工具，让 AI Agent 能够：

### 1. 网站数据获取（30+ 平台）

**社交媒体**：Twitter/X, Reddit, 微博，即刻
**视频平台**：Bilibili, YouTube, 小红书
**问答社区**：知乎，V2EX, StackOverflow, Linux-Do
**新闻资讯**：BBC, Bloomberg, Reuters, HackerNews, Dev.to
**求职招聘**：Boss 直聘，LinkedIn
**电商购物**：Coupang, 什么值得买
**金融财经**：雪球，Yahoo Finance, Barchart
**其他**：微信读书，携程，Wikipedia, arXiv, Steam

### 2. 桌面应用控制

控制本地正在运行的桌面应用：
- **Cursor**：控制 Composer、提取代码、历史记录
- **Codex**：驱动 OpenAI Codex CLI
- **ChatGPT**：自动化 ChatGPT macOS 应用
- **Notion**：搜索、读取、写入 Notion 页面
- **Discord**：消息、频道、服务器操作

### 3. 外部 CLI Hub

发现、自动安装和传递命令到外部 CLI：
- `gh` - GitHub CLI
- `docker` - Docker 命令行
- `kubectl` - Kubernetes 工具
- `obsidian` - Obsidian vault 管理
- `readwise` - Readwise & Reader CLI

### 4. 媒体下载

下载图片、视频和文章：
- 小红书：图片、视频
- Bilibili：视频（需要 yt-dlp）
- Twitter：图片、视频
- 知乎：文章（Markdown 格式）

---

## 📦 安装指南

### 前置要求

1. **Node.js >= 20.0.0**
   ```bash
   node --version  # 检查版本
   ```

2. **安装 OpenCLI**
   ```bash
   npm install -g @jackwener/opencli
   ```

3. **安装 Browser Bridge 扩展**
   - 访问 GitHub Releases 页面下载最新扩展
   - 在 Chrome 打开 `chrome://extensions`
   - 启用开发者模式
   - 拖放 .crx 文件或解压后的文件夹

### 验证安装

```bash
opencli list          # 查看所有可用命令
opencli doctor        # 检查扩展和守护进程连接
opencli doctor --live # 测试实时浏览器命令
```

---

## 💡 使用场景

### 场景 1：获取热门内容做日报

```bash
# 获取 Bilibili 热门视频
opencli bilibili hot --limit 10

# 获取知乎热榜
opencli zhihu hot

# 获取 Hacker News 热门
opencli hackernews top --limit 5

# 获取微博热搜
opencli weibo hot
```

### 场景 2：搜索特定主题

```bash
# Bilibili 搜索 AI 教程
opencli bilibili search --keyword "AI 教程" --limit 10

# 知乎搜索机器学习
opencli zhihu search --keyword "机器学习"

# arXiv 搜索论文
opencli arxiv search --keyword "transformer"

# 小红书搜索美食
opencli xiaohongshu search --keyword "美食"
```

### 场景 3：下载媒体内容

```bash
# 下载 Bilibili 视频
opencli bilibili download --bvid BV1xxx --output ./videos

# 下载小红书笔记
opencli xiaohongshu download --note-id abc123 --output ./xhs

# 导出知乎文章
opencli zhihu download "https://zhuanlan.zhihu.com/p/xxx" --output ./zhihu
```

### 场景 4：控制桌面应用

```bash
# Cursor 状态检查
opencli cursor status

# Notion 搜索
opencli notion search --query "项目"

# ChatGPT 发送消息
opencli chatgpt send --message "Hello"

# Discord 读取消息
opencli discord-app read
```

### 场景 5：调用外部 CLI

```bash
# GitHub PR 列表
opencli gh pr list --limit 5

# Docker 容器状态
opencli docker ps

# Kubernetes Pods
opencli kubectl get pods
```

---

## 🔧 使用例子

### 示例 1：创建每日技术新闻简报

```bash
# 获取多个平台的热门内容
opencli hackernews top --limit 5 -f md > hn.md
opencli devto top --limit 5 -f md >> devto.md
opencli bilibili hot --limit 5 -f md >> video.md

# 合并整理后发送给用户
```

### 示例 2：监控竞品动态

```bash
# 监控竞品在社交媒体上的动态
opencli twitter search --keyword "竞品名称" --limit 20
opencli zhihu search --keyword "竞品名称"
opencli xiaohongshu search --keyword "竞品名称"
```

### 示例 3：自动化内容收集

```bash
# 收集特定主题的学习资料
opencli youtube search --keyword "Python 教程" --limit 10 -f json
opencli bilibili search --keyword "Python 教程" --limit 10 -f json
opencli zhihu search --keyword "Python 学习" --limit 10 -f json
```

### 示例 4：输出格式转换

```bash
# 表格输出（默认）
opencli bilibili hot -f table

# JSON 输出（适合程序处理）
opencli bilibili hot -f json

# YAML 输出（适合人类阅读）
opencli bilibili hot -f yaml

# Markdown 输出（适合文档）
opencli bilibili hot -f md

# CSV 输出（适合 Excel）
opencli bilibili hot -f csv
```

---

## 🔒 安全审查报告

| 审查项 | 结果 | 说明 |
|--------|------|------|
| **代码混淆** | ✅ 通过 | 无混淆代码，逻辑清晰 |
| **隐藏脚本** | ✅ 通过 | 无隐藏脚本或后门 |
| **网络请求** | ⚠️ 注意 | 会访问外部网站（功能必需） |
| **文件写入** | ⚠️ 注意 | 可下载文件到指定目录（需用户同意） |
| **浏览器访问** | ⚠️ 注意 | 需要 Browser Bridge 扩展访问 Chrome 状态 |
| **桌面应用控制** | ⚠️ 注意 | 可控制正在运行的桌面应用 |
| **权限透明度** | ✅ 通过 | 所有权限在文档中明确说明 |
| **来源可靠性** | ✅ 通过 | npm 官方包，作者公开 |

**风险等级**：🟡 **MEDIUM**

**说明**：风险主要来自浏览器访问和桌面应用控制权限，但这些是功能必需的，且文档中已明确说明。无隐藏风险。

---

## ⚖️ 优缺点分析

### ✅ 优点

1. **覆盖范围广**：支持 30+ 平台和桌面应用，几乎覆盖所有主流场景
2. **复用登录状态**：通过浏览器扩展复用 Chrome 登录状态，无需单独认证
3. **输出格式灵活**：支持 table/json/yaml/md/csv 多种格式
4. **易于扩展**：支持自定义注册新 CLI 和网站适配器
5. **文档完善**：使用示例丰富，故障排除指南详细
6. **开源透明**：GitHub 公开源码，社区可审查

### ⚠️ 缺点

1. **依赖较多**：需要 Node.js 20+、Chrome 扩展、部分功能需 yt-dlp
2. **浏览器依赖**：浏览器命令需要 Chrome 正在运行且已登录
3. **权限较大**：浏览器和桌面应用控制权限需要用户信任
4. **学习曲线**：命令格式和选项较多，需要时间熟悉
5. **平台变化**：目标网站改版可能导致部分命令失效

### 📋 适用场景推荐

**非常适合**：
- 需要定期获取多平台内容的自动化任务
- 需要控制桌面应用的 AI 工作流
- 需要调用外部 CLI 的统一接口

**不太适合**：
- 只需要单一平台功能的简单场景
- 对浏览器权限敏感的环境
- 无法安装 Chrome 扩展的环境

---

## 🚀 最佳实践

1. **先检查登录状态**：浏览器命令前确保已在 Chrome 登录目标网站
2. **使用合适的输出格式**：JSON 适合管道处理，YAML 适合人类阅读
3. **限制结果数量**：使用 `--limit` 避免返回过多数据
4. **定期验证安装**：使用 `opencli doctor` 定期检查连接状态
5. **探索新功能**：定期运行 `opencli list` 发现新增的命令

---

## 📝 故障排除

| 问题 | 解决方案 |
|------|----------|
| 扩展未连接 | 确保 Browser Bridge 扩展已安装并启用 |
| 空数据/未授权 | 在 Chrome 中打开目标网站并登录 |
| Node API 错误 | 确保使用 Node.js >= 20.0.0 |
| 守护进程问题 | `curl localhost:19825/status` 检查状态 |

---

## 🔗 相关链接

- **GitHub 仓库**：https://github.com/jackwener/opencli
- **NPM 包**：https://www.npmjs.com/package/@jackwener/opencli
- **Browser Bridge 扩展**：GitHub Releases 下载
- **100 Skills 系列**：
  - #01: [skill-vetter](./100-skills-01-skill-vetter.md)
  - #02: [summarize](./100-skills-02-summarize.md)
  - #03: [capability-evolver](./100-skills-03-capability-evolver.md)

---

**系列进度**：4/100 ✅

**下期预告**：继续探索实用的 AI Agent Skills，敬请期待！
