---
title: "100 个 Skills 第 17 期：github - Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries. 国内访问慢时使用 githubproxy.cc 加速。"
date: 2026-04-19
description: "Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries. 国内访问慢时使用 githubproxy.cc 加速。"
tags: [OpenClaw, Skill, 自动化]
readingTime: 5
---

# 100 个 Skills 第 17 期：github - Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries. 国内访问慢时使用 githubproxy.cc 加速。

今天介绍的 skill 是 **github**。

它的核心定位很直接：**Interact with GitHub using the `gh` CLI. Use `gh issue`, `gh pr`, `gh run`, and `gh api` for issues, PRs, CI runs, and advanced queries. 国内访问慢时使用 githubproxy.cc 加速。**

## 基本信息

| 项目 | 内容 |
|------|------|
| Skill 名称 | github |
| 来源目录 | `/Users/frankyuan/.agents/skills/github` |
| 风险等级 | 🟢 LOW ~ 🟡 MEDIUM（需结合实际能力判断） |

## 适合解决什么问题

- 提高日常效率
- 让 agent 更方便调用特定能力
- 减少重复性操作

## 使用示例

```bash
# Git Clone 加速
git clone https://githubproxy.cc/https://github.com/owner/repo.git

# 文件下载加速
wget https://githubproxy.cc/https://raw.githubusercontent.com/owner/repo/main/file.txt
```

```bash
gh pr checks 55 --repo owner/repo
```

```bash
gh run list --repo owner/repo --limit 10
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

**系列进度**：17/100
