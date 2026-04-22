---
title: 100 个 Skills 系列专栏
description: 持续更新的 OpenClaw Skills 系列文章
---

# 🎯 100 个 Skills 系列

> 持续整理 OpenClaw / Agent 工作流中值得长期使用的 skill。重点不是“堆工具”，而是理解它们在真实工作流中的位置。

---

## 这个系列写什么

这个系列重点回答三个问题：

1. **这个 skill 是干什么的？**
2. **它适合接进什么工作流？**
3. **它是否值得长期使用？**

所以每一期都尽量围绕：
- 功能定位
- 使用场景
- 接入建议
- 风险与边界

而不是只做简单的功能罗列。

---

## 最新发布

<!-- AUTO:skills-latest:start -->
| 期数 | 标题 | 发布日期 | 标签 |
|------|------|----------|------|
| **第 21 期** | [skill-creator - Create or update AgentSkills. Use when designing, structuring, or packaging skills with scripts, references, and assets.](/tech/100-skills-21-skill-creator) | 2026-04-22 | `自动化` `OpenClaw` `skill-creator` |
| **第 20 期** | [self-improvement - Captures learnings, errors, and corrections to enable continuous improvement. Use when: (1) A command or operation fails unexpectedly, (2) User corrects Claude ('No, that's wrong...', 'Actually...'), (3) User requests a capability that doesn't exist, (4) An external API or tool fails, (5) Claude realizes its knowledge is outdated or incorrect, (6) A better approach is discovered for a recurring task. Also review learnings before major tasks.](/tech/100-skills-20-self-improvement) | 2026-04-21 | `自动化` `OpenClaw` `self-improvement` |
| **第 19 期** | [mem-search - Search claude-mem's persistent cross-session memory database. Use when user asks "did we already solve this?", "how did we do X last time?", or needs work from previous sessions.](/tech/100-skills-19-mem-search) | 2026-04-20 | `自动化` `OpenClaw` `mem-search` |
| **第 18 期** | [make-plan - Create a detailed, phased implementation plan with documentation discovery. Use when asked to plan a feature, task, or multi-step implementation — especially before executing with do.](/tech/100-skills-18-make-plan) | 2026-04-19 | `自动化` `OpenClaw` `make-plan` |
| **第 17 期** | [github - Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries. 国内访问慢时使用 githubproxy.cc 加速。](/tech/100-skills-17-github) | 2026-04-19 | `自动化` `OpenClaw` `github` |
| **第 16 期** | [do - Execute a phased implementation plan using subagents. Use when asked to execute, run, or carry out a plan — especially one created by make-plan.](/tech/100-skills-16-do) | 2026-04-16 | `自动化` `OpenClaw` `do` |
| **第 15 期** | [cron - Schedule reminders and recurring tasks.](/tech/100-skills-15-cron) | 2026-04-16 | `自动化` `OpenClaw` `cron` |
| **第 14 期** | [weather - 零配置天气查询工具](/tech/100-skills-14-weather) | 2026-04-16 | `自动化` `OpenClaw` `weather` |
| **第 13 期** | [xiaohongshu - 小红书内容工具](/tech/100-skills-13-xiaohongshu) | 2026-04-10 | `自动化` `OpenClaw` `xiaohongshu` |
| **第 12 期** | [Excalidraw Diagram Generator - 自然语言生成图表神器](/tech/100-skills-12-excalidraw-diagram-generator) | 2026-04-09 | `自动化` `OpenClaw` `excalidraw-diagram-generator` |
| **第 11 期** | [Notion - 知识库与工作空间集成](/tech/100-skills-11-notion) | 2026-04-08 | `自动化` `OpenClaw` `notion` |
| **第 10 期** | [Find Skills - 技能发现与安装助手](/tech/100-skills-10-find-skills) | 2026-04-07 | `自动化` `OpenClaw` `find-skills` |
| **第 9 期** | [Text-to-Image-Search - 智能图片搜索神器](/tech/100-skills-09-text-to-image-search) | 2026-04-04 | `自动化` `OpenClaw` `text-to-image-search` |
| **第 8 期** | [Agent Browser - 无头浏览器自动化神器](/tech/100-skills-08-agent-browser) | 2026-04-03 | `自动化` `OpenClaw` `agent-browser` |
| **第 7 期** | [RSS Feed Digest - 自动聚合订阅源](/tech/100-skills-07-rss-digest) | 2026-04-02 | `自动化` `OpenClaw` `rss-digest` |
| **第 6 期** | [Spotify - macOS 音乐控制](/tech/100-skills-06-spotify) | 2026-04-01 | `自动化` `OpenClaw` `spotify` |
| **第 5 期** | [Gog - Google Workspace CLI](/tech/100-skills-05-gog) | 2026-03-31 | `自动化` `OpenClaw` `gog` |
| **第 4 期** | [OpenCLI - 30+ 平台数据获取神器](/tech/100-skills-04-opencli-tool) | 2026-03-30 | `自动化` `OpenClaw` `opencli-tool` |
| **第 3 期** | [Capability Evolver - 让 AI 自主进化能力](/tech/100-skills-03-capability-evolver) | 2026-03-29 | `自动化` `OpenClaw` `capability-evolver` |
| **第 2 期** | [Summarize - 全能内容摘要工具](/tech/100-skills-02-summarize) | 2026-03-28 | `自动化` `OpenClaw` `summarize` |
<!-- AUTO:skills-latest:end -->

---

## 当前统计

<!-- AUTO:skills-stats:start -->
- **已发布**：21 期
- **当前进度**：21 / 100
- **最新一期**：[skill-creator - Create or update AgentSkills. Use when designing, structuring, or packaging skills with scripts, references, and assets.](/tech/100-skills-21-skill-creator)
<!-- AUTO:skills-stats:end -->

---

## 适合谁看

如果你：
- 正在搭建自己的 agent 工作流
- 想快速筛选哪些 skill 值得接入系统
- 想看一个工具除了“能不能用”之外，还“适不适合长期维护”

这个系列会比单纯的功能介绍更有用。

---

## 相关入口

- [Skills / Notes 总入口](/tech/)
- [Research 调研](/research/)
- [Archive](/archive)
