---
title: "100 个 Skills 第 3 期：Capability Evolver - 让 AI 自主进化能力"
date: 2026-03-29
description: 介绍 ClawHub 热门技能，让你的 OpenClaw 能够自主学习和进化能力
tags: [OpenClaw, Skill, 自动化，能力进化]
---

# 🧬 100 个 Skills 第 3 期：Capability Evolver

> **"不会进化的 AI 不是好助手"** - 这个 skill 让你的 OpenClaw 越用越聪明

---

## 📊 基本信息

| 项目 | 详情 |
|------|------|
| **Skill 名称** | `capability-evolver` |
| **作者** | @evolution-lab |
| **版本** | v2.1.0 |
| **ClawHub 下载量** | 35k+ |
| **GitHub Stars** | 1.2k ⭐ |
| **安全评级** | ⭐⭐⭐⭐⭐ (5/5) |

---

## 🎯 它是干什么的？

**Capability Evolver** 是一个**能力进化框架**，让你的 OpenClaw 能够通过反馈和学习不断优化自己的行为。

### 核心功能

1. **📝 行为记录** - 自动记录每次任务执行过程和结果
2. **🔄 反馈学习** - 根据用户反馈调整行为策略
3. **📈 能力进化** - 迭代优化常用任务的处理方式
4. **🧠 模式识别** - 发现并固化高效的工作模式

---

## 🚀 为什么需要它？

### 真实场景

想象一下：

```
第 1 次：你教 OpenClaw 如何整理每日邮件
         ↓
第 2 次：它记得你的偏好，但还需要一些指导
         ↓
第 5 次：它已经能自动按你的方式整理，只需要确认
         ↓
第 10 次：完全自动化，你只需要看结果
```

**Capability Evolver 的作用**就是让这个过程更系统、更高效！

---

## 📦 安装指南

### 方式一：通过 ClawHub（推荐）

```bash
openclaw skills install capability-evolver
```

### 方式二：从 GitHub 安装

```bash
git clone https://github.com/evolution-lab/capability-evolver.git
cd capability-evolver
openclaw skills link .
```

### 验证安装

```bash
openclaw skills list | grep capability-evolver
```

---

## 💡 使用场景

### 场景 1：自动化重复任务

```bash
# 启用任务学习模式
openclaw evolve start --task "daily-report"

# 执行任务（会被记录和分析）
openclaw run daily-report

# 查看学习进度
openclaw evolve status daily-report
```

### 场景 2：优化现有技能

```bash
# 分析某个 skill 的使用模式
openclaw evolve analyze skill-name

# 应用优化建议
openclaw evolve apply skill-name --optimization 1
```

### 场景 3：能力迁移

```bash
# 将学到的能力迁移到新任务
openclaw evolve transfer --from daily-report --to weekly-summary
```

---

## 🔧 使用例子

### 示例 1：学习一个新的工作流

```bash
# 开始记录
openclaw evolve record --session "morning-routine"

# 执行你的晨间例行任务
# ... OpenClaw 会记录每一步 ...

# 结束记录并分析
openclaw evolve stop --analyze

# 输出示例：
📊 会话分析完成
  • 记录步骤：12
  • 识别模式：3
  • 可自动化步骤：8
  • 预计节省时间：15 分钟/天

💡 建议：
  1. 步骤 2-5 可以合并为一个命令
  2. 步骤 7-9 可以完全自动化
  3. 步骤 11 需要保留人工确认

# 创建自动化脚本
openclaw evolve generate --session "morning-routine" --output morning.sh
```

### 示例 2：查看进化历史

```bash
# 查看某个任务的学习历史
openclaw evolve history daily-report

# 输出示例：
📈 daily-report 进化历史

v1.0 (2026-03-15): 初始版本
  • 手动执行所有步骤
  • 耗时：25 分钟

v1.5 (2026-03-20): 第一次优化
  • 自动化数据收集
  • 耗时：15 分钟 (-40%)

v2.0 (2026-03-25): 第二次优化
  • 自动生成摘要
  • 耗时：8 分钟 (-68%)

v2.1 (当前): 完全自动化
  • 一键执行
  • 耗时：2 分钟 (-92%)
```

### 示例 3：导出能力配置

```bash
# 导出学习到的能力配置
openclaw evolve export --format yaml > my-capabilities.yaml

# 分享给其他人
openclaw evolve share my-capabilities.yaml --public
```

---

## 🌐 用户评价

### GitHub 用户反馈

> **@automation_fan**: "用了 3 个月，我的 OpenClaw 现在能自动处理 80% 的日常工作。Capability Evolver 是真正的游戏改变者！" ⭐⭐⭐⭐⭐

> **@productivity_pro**: "学习曲线有点陡，但一旦掌握，效率提升惊人。强烈推荐给重度用户！" ⭐⭐⭐⭐⭐

### 社区讨论

> "Capability Evolver + Self-Improvement skill 的组合太强了，一个负责记录优化，一个负责主动改进。"

> "建议新手先从简单的任务开始学习，别一上来就搞复杂的工作流。"

---

## ⚖️ 优缺点分析

### ✅ 优点

| 优点 | 说明 |
|------|------|
| **持续优化** | 越用越聪明，不断进化 |
| **时间节省** | 自动化重复任务，节省大量时间 |
| **可迁移** | 学到的能力可以迁移到类似任务 |
| **透明可追溯** | 完整的进化历史记录 |
| **社区共享** | 可以分享和导入他人的能力配置 |

### ⚠️ 缺点

| 缺点 | 说明 |
|------|------|
| **学习成本** | 需要时间理解和使用 |
| **初期投入** | 前几次需要手动示范 |
| **存储占用** | 记录数据会占用一些空间 |
| **隐私考虑** | 记录包含工作习惯数据 |

---

## 🔒 隐私与安全

Capability Evolver 会记录你的工作模式，建议：

```bash
# 启用隐私模式（不记录敏感操作）
openclaw evolve config --privacy-mode on

# 设置自动清理（保留最近 30 天）
openclaw evolve config --retention-days 30

# 排除某些任务不被记录
openclaw evolve exclude --task "sensitive-task-*"
```

---

## 📚 相关资源

- **GitHub 仓库**: https://github.com/evolution-lab/capability-evolver
- **ClawHub 页面**: https://clawhub.ai/skills/evolution-lab/capability-evolver
- **官方文档**: https://evolution-lab.github.io/capability-evolver/docs
- **社区示例**: https://github.com/evolution-lab/capability-examples

---

## 🎯 总结

**Capability Evolver** 是让 OpenClaw 从"工具"变成"伙伴"的关键技能。

**推荐理由：**
1. ⭐ 35k+ 下载量，社区广泛使用
2. 🧠 真正让 AI 越用越聪明
3. 📈 可量化的效率提升
4. 🔓 开源透明，可自定义

**安装命令：**
```bash
openclaw skills install capability-evolver
```

**使用建议：**
> 从简单的重复任务开始，让它学习你的工作方式，然后逐步扩展到更复杂的场景！

---

*下期预告：第 4 期将介绍一个超实用的开发工具，敬请期待！*

---

**系列说明：** "100 个 Skills" 是一个技术科普系列，每天介绍一个热门 OpenClaw skill，帮助你发现和了解最有价值的工具。

*Last updated: 2026-03-29*
