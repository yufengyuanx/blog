---
title: "100 个 Skills 第 20 期：self-improvement - Captures learnings, errors, and corrections to enable continuous improvement. Use when: (1) A command or operation fails unexpectedly, (2) User corrects Claude ('No, that's wrong...', 'Actually...'), (3) User requests a capability that doesn't exist, (4) An external API or tool fails, (5) Claude realizes its knowledge is outdated or incorrect, (6) A better approach is discovered for a recurring task. Also review learnings before major tasks."
date: 2026-04-21
description: "Captures learnings, errors, and corrections to enable continuous improvement. Use when: (1) A command or operation fails unexpectedly, (2) User corrects Claude ('No, that's wrong...', 'Actually...'), (3) User requests a capability that doesn't exist, (4) An external API or tool fails, (5) Claude realizes its knowledge is outdated or incorrect, (6) A better approach is discovered for a recurring task. Also review learnings before major tasks."
tags: [OpenClaw, Skill, 自动化]
readingTime: 5
---

# 100 个 Skills 第 20 期：self-improvement - Captures learnings, errors, and corrections to enable continuous improvement. Use when: (1) A command or operation fails unexpectedly, (2) User corrects Claude ('No, that's wrong...', 'Actually...'), (3) User requests a capability that doesn't exist, (4) An external API or tool fails, (5) Claude realizes its knowledge is outdated or incorrect, (6) A better approach is discovered for a recurring task. Also review learnings before major tasks.

今天介绍的 skill 是 **self-improvement**。

它的核心定位很直接：**Captures learnings, errors, and corrections to enable continuous improvement. Use when: (1) A command or operation fails unexpectedly, (2) User corrects Claude ('No, that's wrong...', 'Actually...'), (3) User requests a capability that doesn't exist, (4) An external API or tool fails, (5) Claude realizes its knowledge is outdated or incorrect, (6) A better approach is discovered for a recurring task. Also review learnings before major tasks.**

## 基本信息

| 项目 | 内容 |
|------|------|
| Skill 名称 | self-improvement |
| 来源目录 | `/Users/frankyuan/.agents/skills/self-improvement` |
| 风险等级 | 🟢 LOW ~ 🟡 MEDIUM（需结合实际能力判断） |

## 适合解决什么问题

- 提高日常效率
- 让 agent 更方便调用特定能力
- 减少重复性操作

## 使用示例

```bash
clawdhub install self-improving-agent
```

```bash
git clone https://github.com/peterskoett/self-improving-agent.git ~/.openclaw/skills/self-improving-agent
```

```bash
mkdir -p ~/.openclaw/workspace/.learnings
```

## 我的看法

这个 skill 的价值在于：

1. **定位清晰**：功能边界比较明确
2. **接入成本低**：从文档示例看，上手难度不高
3. **适合进入 workflow**：可以作为更大自动化流程中的一个能力模块

## 使用建议

如果你准备把它纳入日常工作流，建议：

- 先手动跑一遍核心示例
- 再决定是否接进自动化流程
- 如果涉及外部写操作，先做小范围验证

---

**系列进度**：20/100
