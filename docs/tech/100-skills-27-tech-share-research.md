---
title: "100 个 Skills 第 27 期：tech-share-research - 技术分享/会议想法记录与后续调研工作流。Use when: (1) 参加技术分享会需要快速记录想法，(2) 听到新工具/技术想后续了解，(3) 需要系统性调研某个技术主题，(4) 整理碎片化技术笔记为结构化知识。"
date: 2026-04-28
description: "技术分享/会议想法记录与后续调研工作流。Use when: (1) 参加技术分享会需要快速记录想法，(2) 听到新工具/技术想后续了解，(3) 需要系统性调研某个技术主题，(4) 整理碎片化技术笔记为结构化知识。"
tags: [OpenClaw, Skill, 自动化]
readingTime: 5
---

# 100 个 Skills 第 27 期：tech-share-research - 技术分享/会议想法记录与后续调研工作流。Use when: (1) 参加技术分享会需要快速记录想法，(2) 听到新工具/技术想后续了解，(3) 需要系统性调研某个技术主题，(4) 整理碎片化技术笔记为结构化知识。

今天介绍的 skill 是 **tech-share-research**。

它的核心定位很直接：**技术分享/会议想法记录与后续调研工作流。Use when: (1) 参加技术分享会需要快速记录想法，(2) 听到新工具/技术想后续了解，(3) 需要系统性调研某个技术主题，(4) 整理碎片化技术笔记为结构化知识。**

## 基本信息

| 项目 | 内容 |
|------|------|
| Skill 名称 | tech-share-research |
| 来源目录 | `/Users/frankyuan/.openclaw/workspace/skills/tech-share-research` |
| 风险等级 | 🟢 LOW ~ 🟡 MEDIUM（需结合实际能力判断） |

## 适合解决什么问题

- 提高日常效率
- 让 agent 更方便调用特定能力
- 减少重复性操作

## 使用示例

```bash
# 使用脚本快速记录
python3 ~/.openclaw/workspace/skills/tech-share-research/scripts/record_idea.py \
  --content "想法内容" \
  --tags "标签 1,标签 2" \
  --source "分享会名称/来源"
```

```bash
python3 ~/.openclaw/workspace/skills/tech-share-research/scripts/research_topic.py \
  --topic "技术/产品名" \
  --idea-id "关联想法 ID"
```

```bash
python3 ~/.openclaw/workspace/skills/tech-share-research/scripts/weekly_review.py
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

**系列进度**：27/100
