---
title: "100 个 Skills 第 07 期：RSS Feed Digest - 自动聚合订阅源"
date: 2026-04-02
description: "使用 rss-digest skill 自动聚合多个 RSS/Atom 订阅源，支持关键词过滤、去重、定时摘要，打造你的每日新闻简报"
tags: [OpenClaw, Skill, RSS, 自动化，新闻聚合]
readingTime: 8
---

# 100 个 Skills 第 07 期：RSS Feed Digest

在信息爆炸的时代，如何高效获取有价值的资讯？RSS Feed Digest 帮你自动聚合多个订阅源，生成干净的每日/每周摘要。

---

## 📋 基本信息

| 项目 | 内容 |
|------|------|
| **Skill 名称** | `rss-digest` |
| **作者** | @zacjiang |
| **版本** | 1.0.0 |
| **分类** | 自动化/新闻聚合 |
| **依赖** | Python 3 + feedparser |
| **安全等级** | 🟢 LOW |

---

## 🎯 功能介绍

RSS Feed Digest 是一个强大的订阅源聚合工具，核心功能包括：

- **多源聚合**：同时抓取多个 RSS/Atom 订阅源
- **时间过滤**：只看最近 N 小时的内容（默认 24h）
- **关键词过滤**：只保留包含特定关键词的文章
- **自动去重**：跨订阅源自动识别并去除重复内容
- **多种输出**：支持 Markdown 或纯文本格式
- **订阅列表**：支持从文件批量管理订阅源

---

## 📦 安装指南

### 1. 安装 Skill

```bash
# 通过 ClawHub 安装
claw skill install rss-feed-digest
```

### 2. 安装依赖

```bash
pip3 install feedparser
```

### 3. 验证安装

```bash
# 测试获取 Hacker News 最近 5 条
python3 ~/.openclaw/workspace/skills/rss-feed-digest/scripts/rss_digest.py fetch \
  --feeds "https://hnrss.org/frontpage" \
  --hours 24 \
  --limit 5
```

---

## 💡 使用场景

### 场景 1：每日 AI 新闻简报

创建 `ai-feeds.txt`：
```
https://hnrss.org/frontpage
https://www.artificialintelligence-news.com/feed/
https://openai.com/blog/rss.xml
https://www.anthropic.com/rss/latest
```

每日运行：
```bash
python3 rss_digest.py fetch \
  --feed-file ai-feeds.txt \
  --keywords "AI,LLM,GPT,Claude,agent,OpenClaw" \
  --hours 24 \
  --output /tmp/daily-ai-digest.md
```

### 场景 2：技术博客追踪

```bash
python3 rss_digest.py fetch \
  --feeds "https://blog.acolyer.org/feed/" \
         "https://martinfowler.com/feed.atom" \
         "https://cacm.acm.org/feed" \
  --hours 168 \
  --limit 20 \
  --output weekly-tech-roundup.md
```

### 场景 3：竞品监控

```bash
python3 rss_digest.py fetch \
  --feeds "https://competitor-a.com/news/rss" \
         "https://competitor-b.com/blog/feed" \
  --keywords "product,launch,update" \
  --exclude "job,career,hiring" \
  --hours 72 \
  --output competitor-watch.md
```

### 场景 4：集成到 OpenClaw 心跳

在 `HEARTBEAT.md` 中添加：
```markdown
- [ ] 检查 AI 新闻（rss-digest）
```

心跳时自动运行，获取最新动态。

---

## 🔧 使用示例

### 基础用法：获取最近 24 小时内容

```bash
python3 rss_digest.py fetch \
  --feeds "https://hnrss.org/frontpage" \
  --hours 24 \
  --limit 20
```

**输出示例**：
```markdown
# Feed Digest
*Generated: 2026-04-02 09:00*
*20 items*

### 1. [Show HN: A new AI agent framework](https://example.com)
**Hacker News** · 04/02 08:30

> We built an agent framework that supports multi-step reasoning...

### 2. [The future of LLMs](https://example.org)
**AI News** · 04/02 07:15

> Recent advances in model architecture suggest...
```

### 进阶用法：关键词过滤 + 输出文件

```bash
python3 rss_digest.py fetch \
  --feeds "https://hnrss.org/frontpage" \
         "https://feeds.arstechnica.com/arstechnica/technology-lab" \
  --keywords "OpenClaw,agent,automation" \
  --hours 48 \
  --output openclaw-news.md \
  --format markdown
```

### 批量订阅源管理

创建 `my-feeds.txt`：
```
# 技术新闻
https://hnrss.org/frontpage
https://feeds.arstechnica.com/arstechnica/technology-lab

# AI 研究
https://openai.com/blog/rss.xml
https://www.anthropic.com/rss/latest

# 博客
https://martinfowler.com/feed.atom
```

运行：
```bash
python3 rss_digest.py fetch \
  --feed-file my-feeds.txt \
  --hours 24 \
  --limit 50 \
  --output daily-digest.md
```

---

## 🔒 安全审查报告

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 命令执行 | ✅ 无 | 无 eval/exec/subprocess 调用 |
| 网络请求 | ⚠️ 仅读取 | 只读取公开 RSS feeds |
| 文件写入 | ⚠️ 用户指定 | 需要 --output 参数明确指定路径 |
| 文件读取 | ⚠️ 用户指定 | 只读取 --feed-file 指定的文件 |
| 凭证处理 | ✅ 无 | 不处理任何密钥/凭证 |
| 权限要求 | ✅ 低 | 仅需网络访问和用户目录写入 |

**风险等级**：🟢 **LOW**

---

## ⚖️ 优缺点分析

### ✅ 优点

1. **高效聚合**：一次运行抓取多个订阅源，节省时间
2. **智能过滤**：关键词过滤 + 自动去重，只看相关内容
3. **灵活输出**：Markdown 格式可直接发布，纯文本适合邮件
4. **易于集成**：可配合 cron/heartbeat 实现自动化
5. **轻量依赖**：仅需 feedparser 一个库

### ❌ 缺点

1. **需要 Python 环境**：不如纯 JS skill 方便
2. **无 GUI 界面**：纯命令行工具
3. **无持久化存储**：每次运行重新抓取（可通过输出文件解决）
4. **不支持付费订阅**：仅支持公开 RSS/Atom feeds

---

## 📊 系列进度

| 期数 | 累计 | 进度 |
|------|------|------|
| #07 | 7/100 | 7% |

**往期回顾**：
- [#06 Spotify](/tech/100-skills-06-spotify) - 音乐控制
- [#05 GoG](/tech/100-skills-05-gog) - 游戏启动器
- [#04 OpenCLI](/tech/100-skills-04-opencli-tool) - 多平台数据获取

---

## 🎯 总结

RSS Feed Digest 是信息管理的利器，特别适合：

- 📰 需要追踪多个信息源的从业者
- 🤖 想自动化新闻聚合的开发者
- 📧 需要定期发送简报的团队
- 🔍 想监控特定关键词的研究者

安装后配合定时任务，让你每天自动收到定制化的资讯摘要，不再被信息洪流淹没。

---

_下期预告：#08 将介绍一个提升效率的开发工具类 Skill_
