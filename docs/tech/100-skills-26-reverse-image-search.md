---
title: "100 个 Skills 第 26 期：reverse-image-search - >"
date: 2026-04-27
description: ">"
tags: [OpenClaw, Skill, 自动化]
readingTime: 5
---

# 100 个 Skills 第 26 期：reverse-image-search - >

今天介绍的 skill 是 **reverse-image-search**。

它的核心定位很直接：**>**

## 基本信息

| 项目 | 内容 |
|------|------|
| Skill 名称 | reverse-image-search |
| 来源目录 | `/Users/frankyuan/.openclaw/workspace/skills/reverse-image-search` |
| 风险等级 | 🟢 LOW ~ 🟡 MEDIUM（需结合实际能力判断） |

## 适合解决什么问题

- 提高日常效率
- 让 agent 更方便调用特定能力
- 减少重复性操作

## 使用示例

```bash
# Search by image URL
python3 {baseDir}/scripts/lens_search.py "https://example.com/photo.jpg"

# Search by local file (auto-uploads to get a URL)
python3 {baseDir}/scripts/lens_search.py /path/to/image.png

# Refine with text query (e.g., find red version of a product)
python3 {baseDir}/scripts/lens_search.py "https://example.com/bag.jpg" --query "red"

# Product search (returns prices)
python3 {baseDir}/scripts/lens_search.py "https://example.com/sneakers.jpg" --type products

# Find exact matches (where this image appears online)
python3 {baseDir}/scripts/lens_search.py "https://example.com/photo.jpg" --type exact_matches

# Raw JSON output for programmatic use
python3 {baseDir}/scripts/lens_search.py "https://example.com/photo.jpg" --json

# Localized results (e.g., Japanese products with ¥ prices)
python3 {baseDir}/scripts/lens_search.py "https://example.com/laptop.jpg" --type products --country jp
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

**系列进度**：26/100
