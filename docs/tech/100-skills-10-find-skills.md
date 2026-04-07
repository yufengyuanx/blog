---
title: "100 个 Skills 第 10 期：Find Skills - 技能发现与安装助手"
date: 2026-04-07
description: "发现并安装 OpenClaw 技能生态中的扩展包，让用户轻松扩展 AI 助手能力"
tags: [OpenClaw, Skill, 工具, 技能管理]
readingTime: 8
---

# 100 个 Skills 第 10 期：Find Skills - 技能发现与安装助手

> **本期主角**：`find-skills` - 帮你发现和安装 OpenClaw 技能的得力助手

在 OpenClaw 生态中，有数千个社区开发的技能可供使用。但如何找到适合你需求的技能？`find-skills` 就是为解决这个问题而生的。

---

## 📊 基本信息

| 项目 | 内容 |
|------|------|
| **Skill 名称** | find-skills |
| **作者** | OpenClaw Community |
| **类别** | 工具 / 技能管理 |
| **安装命令** | `npx skills add find-skills` |
| **依赖** | Skills CLI (`npx skills`) |
| **安全等级** | 🟢 LOW |
| **适用场景** | 技能发现、能力扩展、工作流增强 |

---

## 🎯 功能介绍

`find-skills` 是一个元技能（meta-skill），它的主要作用是帮助你发现和安装其他技能。想象一下它是 OpenClaw 世界的"应用商店搜索器"。

### 核心能力

1. **技能搜索**：根据用户需求搜索相关技能
2. **结果展示**：清晰呈现技能名称、功能和安装方式
3. **一键安装**：提供直接的安装命令
4. **分类浏览**：按领域（Web 开发、测试、DevOps 等）组织技能

### 触发场景

当用户说出以下类型的话时，`find-skills` 会被激活：

- "如何做到 X？"（X 可能是常见任务）
- "有没有技能可以帮我做 X？"
- "你能做 X 吗？"（X 是 specialized 能力）
- "我想扩展 XX 方面的能力"
- "有没有处理 XX 的工具？"

---

## 📦 安装指南

### 前置条件

确保已安装 Skills CLI：

```bash
# 检查是否已安装
npx skills --version

# 如未安装，先安装 CLI
npm install -g @anthropic-ai/skills
```

### 安装 find-skills

```bash
# 全局安装（推荐）
npx skills add find-skills -g -y

# 或项目级安装
npx skills add find-skills
```

### 验证安装

```bash
# 检查技能列表
npx skills check
```

---

## 💡 使用场景

### 场景 1：用户询问如何实现某功能

**用户**： "我想知道如何优化 React 应用的性能"

**find-skills 响应**：
```
我找到了一个可能帮到你的技能！

"vercel-react-best-practices" 技能提供了 Vercel 工程团队的 
React 和 Next.js 性能优化指南。

安装命令：
npx skills add vercel-labs/agent-skills@vercel-react-best-practices

了解更多：https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices
```

### 场景 2：用户寻找特定工具

**用户**： "有没有帮我写测试的技能？"

**find-skills 响应**：
```
我找到了几个测试相关的技能：

1. jest-testing-helper - Jest 测试助手
   npx skills add jest-testing-helper

2. playwright-e2e - Playwright 端到端测试
   npx skills add playwright-e2e

3. testing-best-practices - 测试最佳实践
   npx skills add testing-best-practices

你想安装哪个？
```

### 场景 3：没有找到匹配技能

**用户**： "有没有技能可以帮我管理植物浇水？"

**find-skills 响应**：
```
我搜索了 "plant watering" 相关的技能，但没有找到匹配的。

不过我可以直接帮你解决这个问题！你想让我：
1. 创建一个浇水提醒系统？
2. 帮你追踪植物的浇水记录？
3. 其他需求？

如果这是你经常需要的功能，你可以创建自己的技能：
npx skills init plant-watering-tracker
```

---

## 🔧 使用例子

### 示例 1：搜索 React 相关技能

```bash
# 用户触发搜索
用户："我想找 React 相关的技能"

# find-skills 执行
npx skills find react

# 输出示例
找到 5 个相关技能：

1. vercel-react-best-practices
   React 和 Next.js 最佳实践
   https://skills.sh/vercel-labs/agent-skills/vercel-react-best-practices

2. react-testing-patterns
   React 测试模式
   https://skills.sh/react-testing-patterns

3. react-performance-profiler
   React 性能分析工具
   https://skills.sh/react-performance-profiler

...
```

### 示例 2：安装技能

```bash
# 用户确认后执行安装
npx skills add vercel-labs/agent-skills@vercel-react-best-practices -g -y

# 输出
✅ 成功安装 vercel-react-best-practices
📍 安装位置：~/.skills/vercel-labs/agent-skills/vercel-react-best-practices
🔗 已添加到全局技能列表
```

### 示例 3：常见技能分类搜索

| 用户需求 | 搜索关键词 | 示例技能 |
|----------|-----------|----------|
| Web 开发 | react, nextjs, typescript | vercel-react-best-practices |
| 测试 | testing, jest, playwright | jest-testing-helper |
| DevOps | deploy, docker, kubernetes | docker-compose-helper |
| 文档 | docs, readme, changelog | auto-changelog |
| 代码质量 | review, lint, refactor | code-review-assistant |
| 设计 | ui, ux, design-system | accessibility-checker |
| 效率 | workflow, automation, git | git-automation |

---

## 🔒 安全审查报告

### 审查项目

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 命令执行 | ✅ 安全 | 仅调用 `npx skills` CLI，无直接 shell 执行 |
| 网络请求 | ✅ 安全 | 通过 CLI 进行，使用官方 skills.sh 源 |
| 文件写入 | ✅ 安全 | 仅写入用户技能目录，需用户确认 |
| 权限要求 | ✅ 合理 | 无需特殊权限 |
| 凭证处理 | ✅ 无 | 不处理敏感信息 |
| 代码混淆 | ✅ 无 | 源码清晰可读 |

### 风险等级：🟢 LOW

**结论**：该技能是安全的，可以安装使用。它本质上是一个搜索和推荐工具，所有实际操作（如安装技能）都需要用户明确确认。

---

## ⚖️ 优缺点分析

### ✅ 优点

1. **降低发现成本**：无需手动浏览技能网站，直接在对话中搜索
2. **即时安装**：找到技能后可一键安装，无需复制粘贴命令
3. **分类清晰**：按领域组织，便于快速定位
4. **失败处理**：找不到技能时提供替代方案
5. **生态友好**：促进技能生态的发现和采用

### ⚠️ 缺点

1. **依赖 CLI**：需要预先安装 Skills CLI
2. **搜索结果质量**：依赖技能元数据质量，可能有不准确情况
3. **网络依赖**：需要联网访问 skills.sh
4. **语言限制**：目前主要支持英文技能名称和描述

### 💡 改进建议

1. 支持本地技能缓存，减少网络请求
2. 增加技能评分和下载量排序
3. 支持中文技能搜索
4. 添加技能预览功能（查看 SKILL.md 再安装）

---

## 📈 系列进度

| 指标 | 数值 |
|------|------|
| 已发布期数 | 10/100 |
| 完成度 | 10% |
| 本期安全等级 | 🟢 LOW |
| 累计 LOW 风险 | 6 |
| 累计 MEDIUM 风险 | 4 |
| 累计 HIGH 风险 | 0 |

---

## 🔗 相关链接

- [Skills CLI 文档](https://skills.sh/docs)
- [技能市场](https://skills.sh/)
- [GitHub - Awesome Claude Skills](https://github.com/ComposioHQ/awesome-claude-skills)
- [上期回顾：#09 text-to-image-search](./100-skills-09-text-to-image-search.md)
- [系列首页](./series/100-skills.md)

---

**下期预告**：第 11 期将介绍一个实用的开发效率工具，敬请期待！

*本系列文章每日 9:00 自动发布，追踪 OpenClaw 技能生态中最实用、最安全的技能。*
