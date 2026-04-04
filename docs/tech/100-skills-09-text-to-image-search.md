---
title: "100 个 Skills 第 09 期：Text-to-Image-Search - 智能图片搜索神器"
date: 2026-04-04
description: "Text-to-Image-Search 是 OpenClaw 的多引擎图片搜索 Skill，支持 Bing、百度、搜狗三引擎搜索，智能相关性排序，自动下载最佳匹配图片并发送给用户。"
tags: [OpenClaw, Skill, 图片搜索，多引擎，智能排序]
readingTime: 7
---

# 100 个 Skills 第 09 期：Text-to-Image-Search - 智能图片搜索神器

> **一句话总结**：让 AI 代理能够理解你的图片搜索意图，从多个搜索引擎智能筛选最佳结果，而不是简单返回第一个链接。

---

## 📊 基本信息

| 项目 | 内容 |
|------|------|
| **Skill 名称** | text-to-image-search |
| **作者** | @clawdbrunner / OpenClaw Community |
| **分类** | 图片搜索 / 多媒体处理 |
| **下载量** | 152,000+ |
| **GitHub Stars** | 3,400+ |
| **版本** | v0.3.0+ |
| **安装命令** | `clawhub install text-to-image-search` |
| **安全等级** | 🟡 MEDIUM |
| **依赖** | Python 3.10+, urllib, 网络访问权限 |

---

## 🎯 功能介绍

Text-to-Image-Search 是一个专为 AI 代理设计的智能图片搜索 Skill。与简单的"返回第一个搜索结果"不同，它采用**多引擎搜索 + 智能排序 + 质量过滤**的工作流，确保返回的图片真正符合用户需求。

### 核心能力

1. **多引擎搜索** - 同时搜索 Bing、百度、搜狗三个引擎，提高召回率
2. **意图识别** - 自动识别搜索意图（meme/official/wallpaper/avatar/portrait）
3. **智能排序** - 基于相关性、来源可信度、意图匹配度综合评分
4. **质量过滤** - 自动拒绝低质量图片（太小、水印、缩略图）
5. **参数解析** - 支持自然语言参数（数量、意图覆盖、分辨率偏好）
6. **置信度评估** - 高置信度发送单图，中低置信度返回多个候选
7. **自动下载** - 下载最佳匹配图片并作为附件发送
8. **优雅降级** - 下载失败时返回搜索链接和候选图片 URL

### 适用场景

- ✅ 查找品牌 Logo、校徽、吉祥物等官方图片
- ✅ 搜索 meme、表情包、反应图
- ✅ 寻找壁纸、高清背景图
- ✅ 获取头像、profile picture
- ✅ 查找人物、角色、动漫形象
- ✅ 搜索产品图片、参考图
- ✅ 快速生成图片搜索结果链接

---

## 📦 安装指南

### 前置条件

```bash
# 确保 Python 3.10+ 已安装
python3 --version  # 3.10.0 或更高

# 确保 pip 可用
pip3 --version
```

### 安装步骤

**方式 1：通过 ClawHub（推荐）**

```bash
clawhub install text-to-image-search
```

**方式 2：手动安装**

```bash
# 克隆或下载 skill 到本地
git clone https://github.com/clawhub/text-to-image-search.git ~/.openclaw/workspace/skills/text-to-image-search

# 无需额外依赖，使用 Python 标准库
```

### 验证安装

```bash
# 测试基本搜索
PYTHONPATH=skills/text-to-image-search/scripts python3 skills/text-to-image-search/scripts/fetch_best_image.py "cat meme"
```

---

## 💡 使用场景

### 场景 1：搜索官方 Logo

```
用户：搜一下清华大学的校徽，要官方的
```

Skill 行为：
- 识别意图：`official` + 子类型 `emblem`
- 优先搜索 edu 域名、百科页面
-  penalize 个人主页、新闻页面
- 返回高置信度的官方校徽图片

### 场景 2：搜索表情包

```
用户：找个搞笑的猫 meme
```

Skill 行为：
- 识别意图：`meme`
- 优先搜索 meme 聚合站点
- 返回有趣、高清晰度的表情包
- 如置信度中等，返回 2-3 个候选

### 场景 3：搜索壁纸

```
用户：搜一下极光壁纸 4k 风景
```

Skill 行为：
- 识别意图：`wallpaper` + 参数 `4k`、`landscape`
- 优先搜索大尺寸图片
- 过滤缩略图、小图
- 返回高清风景壁纸

### 场景 4：搜索头像

```
用户：找个动漫女生头像
```

Skill 行为：
- 识别意图：`avatar`
- 优先搜索方形或图标类图片
- 返回适合做头像的图片

### 场景 5：带数量参数

```
用户：搜一下特斯拉 logo，要 3 张图
```

Skill 行为：
- 解析参数：`count=3`
- 即使置信度高也返回 3 个候选
- 用户可选择最满意的一张

---

## 🔧 使用例子

### 基础用法

```bash
# 搜索并下载最佳匹配
PYTHONPATH=scripts python3 scripts/fetch_best_image.py "cat meme"
```

**输出示例**：
```json
{
  "ok": true,
  "path": "/home/mumu/clawd/tmp/search-image/cat_meme_abc123.jpg",
  "size": 245678,
  "content_type": "image/jpeg",
  "image_url": "https://...",
  "engine": "bing",
  "score": 87,
  "why": ["exact-match", "high-resolution", "trusted-source"],
  "quality": {
    "url": {"accept": true, "score_delta": 5},
    "file": {"accept": true, "score_delta": 3}
  }
}
```

### 搜索多个候选

```bash
# 搜索 3 个候选图片
PYTHONPATH=scripts python3 scripts/fetch_candidate_images.py "cat meme" 3
```

### 仅生成搜索链接

```bash
# 生成多个引擎的搜索 URL
PYTHONPATH=scripts python3 scripts/build_image_search_urls.py "official mascot"
```

### 在 OpenClaw 中使用

```
用户：搜一下小红书的 logo，要官方的

AI: [自动调用 text-to-image-search skill]
    Result: 已找到小红书官方 logo，正在发送...
    [附件：xiaohongshu_logo.png]
```

---

## 🔒 安全审查报告

| 检查项 | 结果 | 说明 |
|--------|------|------|
| **命令执行** | ✅ 无 | 不调用 shell 命令，使用 Python 标准库 |
| **网络请求** | ⚠️ 有 | 使用 urllib.request 访问图片搜索引擎 |
| **文件写入** | ⚠️ 有 | 下载到临时目录 `/tmp/search-image/` |
| **凭证处理** | ✅ 无 | 不处理任何认证信息 |
| **权限范围** | ✅ 合理 | 仅需网络访问和临时文件写入 |
| **数据外泄** | ✅ 无 | 不上传用户数据 |

**风险等级**：🟡 MEDIUM

**风险说明**：
- 网络请求是功能必需（搜索图片）
- 文件写入仅限于临时目录，且为下载的图片
- 无命令执行、无凭证处理、无数据外泄风险

**建议**：
- 在受信任环境中使用
- 定期清理临时下载目录
- 如需更高安全性，可配置网络白名单

---

## ⚖️ 优缺点分析

### 优点

| 优势 | 说明 |
|------|------|
| **多引擎搜索** | 不依赖单一来源，提高召回率 |
| **智能排序** | 基于相关性、来源、意图综合评分，不是简单返回第一个 |
| **意图识别** | 理解用户真正想要什么（meme/official/wallpaper 等） |
| **质量过滤** | 自动拒绝低质量图片，避免返回缩略图或水印图 |
| **置信度评估** | 高置信度发单图，中低置信度发多图，诚实不装懂 |
| **优雅降级** | 下载失败时返回搜索链接，用户体验不打断 |
| **参数解析** | 支持自然语言参数，无需记忆复杂语法 |

### 缺点

| 劣势 | 说明 |
|------|------|
| **依赖网络** | 需要访问外部搜索引擎，离线无法使用 |
| **搜索引擎变化** | 搜索引擎页面结构变化可能导致解析失败 |
| **图片版权** | 返回的图片可能有版权限制，商用需注意 |
| **隐私考虑** | 搜索查询会发送到第三方搜索引擎 |
| **下载速度** | 大图片下载可能较慢，受网络环境影响 |

### 与类似工具对比

| 特性 | text-to-image-search | 简单图片搜索 | Google Images API |
|------|---------------------|-------------|-------------------|
| 多引擎 | ✅ 3 个 | ❌ 1 个 | ❌ 1 个 |
| 智能排序 | ✅ 综合评分 | ❌ 按顺序 | ✅ 按相关性 |
| 意图识别 | ✅ 5 种意图 | ❌ 无 | ⚠️ 有限 |
| 质量过滤 | ✅ 多层过滤 | ❌ 无 | ✅ 基础过滤 |
| 置信度评估 | ✅ 高/中/低 | ❌ 无 | ❌ 无 |
| 免费使用 | ✅ 完全免费 | ✅ 免费 | ❌ 需 API Key |
| 隐私保护 | ⚠️ 查询发送第三方 | ⚠️ 同左 | ⚠️ 同左 |

---

## 📈 系列进度

| 期数 | 技能名称 | 安全等级 | 发布日期 |
|------|----------|----------|----------|
| #01 | skill-vetter | 🟢 LOW | 2026-03-27 |
| #02 | summarize | 🟢 LOW | 2026-03-28 |
| #03 | capability-evolver | 🟢 LOW | 2026-03-29 |
| #04 | opencli-tool | 🟡 MEDIUM | 2026-03-30 |
| #05 | gog | 🟡 MEDIUM | 2026-03-31 |
| #06 | spotify | 🟢 LOW | 2026-04-01 |
| #07 | rss-digest | 🟢 LOW | 2026-04-02 |
| #08 | agent-browser | 🟡 MEDIUM | 2026-04-03 |
| **#09** | **text-to-image-search** | **🟡 MEDIUM** | **2026-04-04** |

**进度**：9/100 (9%)

---

## 🔗 相关链接

- [ClawHub Skill 页面](https://clawhub.dev/skills/text-to-image-search)
- [GitHub 仓库](https://github.com/clawhub/text-to-image-search)
- [完整文档](https://clawhub.dev/docs/text-to-image-search)
- [100 Skills 系列首页](/tech/series/100-skills.md)

---

_**下期预告**：#10 将介绍一个效率工具类 Skill，敬请期待！**_
