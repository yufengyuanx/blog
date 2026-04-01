---
title: "100 个 Skills 第 06 期：Spotify - macOS 音乐控制"
date: 2026-04-01
description: "使用 OpenClaw 的 Spotify Skill 控制 macOS 上的 Spotify 播放，无需 API 密钥，支持播放/暂停、切歌、音量调节和播放列表控制。"
tags: [OpenClaw, Skill, 媒体控制, macOS, Spotify]
readingTime: 5
---

# 100 个 Skills 第 06 期：Spotify - macOS 音乐控制

> 🎵 **一句话总结**：用自然语言控制你的 Spotify，让 AI 成为你的私人 DJ。

---

## 📊 基本信息

| 项目 | 内容 |
|------|------|
| **Skill 名称** | spotify |
| **作者** | @2mawi2 |
| **类别** | 媒体与流媒体 |
| **平台** | macOS (AppleScript) |
| **下载量** | 2.8K+ |
| **安全等级** | 🟢 LOW |
| **安装方式** | `clawhub install spotify` |
| **依赖** | Spotify 桌面应用 + shpotify (brew) |

---

## 🎯 功能介绍

这个 Skill 让 OpenClaw 能够直接控制 macOS 上的 Spotify 桌面应用，无需复杂的 API 配置或 OAuth 认证。它使用 AppleScript 与 Spotify 进行本地通信，实现零延迟的音乐控制。

### 核心能力

- **播放控制**：播放/暂停、上一曲/下一曲、停止
- **音量调节**：增减音量或设置具体百分比
- **状态查询**：获取当前播放的歌曲信息
- **内容播放**：通过 Spotify URI 播放艺术家/专辑/单曲

### 技术特点

- **零配置**：不需要 API 密钥或开发者账号
- **本地执行**：所有操作在本地完成，无网络延迟
- **轻量级**：仅依赖 shpotify 命令行工具
- **隐私友好**：不收集任何用户数据

---

## 📦 安装指南

### 前置条件

1. macOS 操作系统
2. 已安装 Spotify 桌面应用
3. Homebrew 包管理器

### 安装步骤

```bash
# 1. 安装依赖 (shpotify)
brew install shpotify

# 2. 安装 Skill
clawhub install spotify

# 3. 验证安装
openclaw skills list | grep spotify
```

### 验证安装

安装完成后，尝试对 OpenClaw 说：
> "播放音乐" 或 "Spotify 状态"

如果返回当前播放信息，说明安装成功。

---

## 💡 使用场景

### 日常工作

- **专注模式**：让 AI 自动播放专注音乐列表
- **休息提醒**：工作 1 小时后自动播放放松音乐
- **会议准备**：会议开始前播放轻音乐

### 生活场景

- **晨间唤醒**：起床时播放活力音乐
- **运动伴奏**：健身时播放高 BPM 歌单
- **睡前放松**：定时播放助眠音乐并自动停止

### 自动化场景

```yaml
# 示例：晨间例行程序
- 7:00 AM: 播放 "Morning Vibes" 播放列表
- 7:30 AM: 音量降至 30%
- 8:00 AM: 暂停播放（开始工作）
```

---

## 🎮 使用例子

### 基础控制

```bash
# 播放/暂停
spotify play
spotify pause

# 切歌
spotify next      # 下一曲
spotify prev      # 上一曲
spotify stop      # 停止

# 音量控制
spotify vol up    # +10%
spotify vol down  # -10%
spotify vol 50    # 设置为 50%

# 查看状态
spotify status
```

### 自然语言交互

```
用户：帮我放点音乐
AI: 好的，正在播放 Spotify... 🎵

用户：暂停一下
AI: 已暂停播放。

用户：音量太小了
AI: 已将音量提高 10%。

用户：下一首
AI: 已切换到下一曲。
```

### 播放特定内容

```bash
# 播放艺术家 (需要 Spotify URI)
osascript -e 'tell application "Spotify" to play track "spotify:artist:4tZwfgrHOc3mvqYlEYSvVi"'

# 播放专辑
osascript -e 'tell application "Spotify" to play track "spotify:album:4m2880jivSbbyEGAKfITCa"'

# 播放单曲
osascript -e 'tell application "Spotify" to play track "spotify:track:2KHRENHQzTIQ001nlP9Gdc"'
```

### 获取 Spotify URI

1. 在 Spotify 应用中右键点击歌曲/专辑/艺术家
2. 选择 "分享" → "复制链接"
3. 从 URL 中提取 ID：
   - `open.spotify.com/artist/4tZwfgrHOc3mvqYlEYSvVi` → ID: `4tZwfgrHOc3mvqYlEYSvVi`
   - 完整 URI: `spotify:artist:4tZwfgrHOc3mvqYlEYSvVi`

---

## 🔒 安全审查报告

| 检查项 | 结果 | 说明 |
|--------|------|------|
| **命令执行** | ✅ 安全 | 仅执行预定义的 AppleScript 命令 |
| **网络请求** | ✅ 无 | 完全本地操作，无外部通信 |
| **文件写入** | ✅ 无 | 不读写用户文件 |
| **权限范围** | ✅ 最小 | 仅控制 Spotify 应用 |
| **依赖风险** | ✅ 低 | shpotify 是知名开源项目 |
| **数据收集** | ✅ 无 | 不收集任何用户数据 |

**综合评级**: 🟢 **LOW** - 可安全安装使用

---

## ⚖️ 优缺点分析

### ✅ 优点

1. **零配置**：无需 API 密钥，安装即用
2. **响应快速**：本地 AppleScript 调用，无网络延迟
3. **隐私保护**：所有操作在本地完成
4. **轻量简洁**：代码量少，易于审计
5. **功能实用**：覆盖日常音乐控制需求

### ⚠️ 缺点

1. **平台限制**：仅支持 macOS，Windows/Linux 用户无法使用
2. **依赖应用**：需要 Spotify 桌面应用运行
3. **功能有限**：不支持搜索、创建播放列表等高级功能
4. **URI 繁琐**：播放特定内容需要手动获取 Spotify URI

### 🔮 改进建议

- 添加搜索功能，通过关键词查找歌曲
- 支持播放列表管理（创建、修改、删除）
- 增加跨平台支持（Windows/Linux）
- 添加歌词显示功能

---

## 📈 系列进度

**本期**: #06 / 100  
**已发布**: 6 篇  
**分类覆盖**: 安全审查、总结、能力进化、CLI 工具、游戏、媒体控制

**往期回顾**:
- #01: [skill-vetter](/blog/docs/tech/100-skills-01-skill-vetter.md) - 安全审查工具
- #02: [summarize](/blog/docs/tech/100-skills-02-summarize.md) - 内容总结
- #03: [capability-evolver](/blog/docs/tech/100-skills-03-capability-evolver.md) - 能力进化
- #04: [opencli-tool](/blog/docs/tech/100-skills-04-opencli-tool.md) - CLI 工具集成
- #05: [gog](/blog/docs/tech/100-skills-05-gog.md) - 游戏平台

---

**下一篇预告**: #07 将介绍一款效率工具类 Skill，敬请期待！

**安装命令**: `clawhub install spotify`

**Skill 来源**: [GitHub - openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/2mawi2/spotify)
