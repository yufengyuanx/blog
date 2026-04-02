---
title: 100 个 Skills 系列专栏
description: 每天介绍一个热门 OpenClaw skill，帮助你发现和了解最有价值的工具
---

# 🎯 100 个 Skills 系列专栏

> **每天一个 skill，发现 OpenClaw 生态中的宝藏工具**

本系列每天介绍一个 ClawHub 上的热门 skill，包含详细的功能介绍、安装指南、使用场景和真实评价。

---

## 📚 系列说明

- **更新频率**：每天早上 9 点更新
- **选择标准**：按下载量、Stars、用户评价综合排序
- **内容结构**：基本信息、功能介绍、安装指南、使用场景、示例、用户评价、优缺点

---

## 📖 文章列表

<div class="skills-series-list">

### 2026 年 4 月

| 期数 | 标题 | 发布日期 | 标签 |
|------|------|----------|------|
| **第 7 期** | [RSS Feed Digest - 自动聚合订阅源](/tech/100-skills-07-rss-digest) | 2026-04-02 | `RSS` `自动化` `新闻聚合` |
| **第 6 期** | [Spotify - macOS 音乐控制](/tech/100-skills-06-spotify) | 2026-04-01 | `媒体控制` `macOS` `音乐` |
| **第 5 期** | [Gog - Google Workspace CLI](/tech/100-skills-05-gog) | 2026-03-31 | `Google` `生产力` `自动化` |

---

### 2026 年 3 月

| 期数 | 标题 | 发布日期 | 标签 |
|------|------|----------|------|
| **第 5 期** | [Gog - Google Workspace CLI](/tech/100-skills-05-gog) | 2026-03-31 | `Google` `生产力` `自动化` |
| **第 4 期** | [OpenCLI - 30+ 平台数据获取神器](/tech/100-skills-04-opencli-tool) | 2026-03-30 | `数据获取` `自动化` `多平台` |
| **第 3 期** | [Capability Evolver - 让 AI 自主进化能力](/tech/100-skills-03-capability-evolver) | 2026-03-29 | `自动化` `能力进化` `AI` |
| **第 2 期** | [Summarize - 全能内容摘要工具](/tech/100-skills-02-summarize) | 2026-03-28 | `效率` `摘要` `多模态` |
| **第 1 期** | [Skill Vetter - 安全审查必备工具](/tech/100-skills-01-skill-vetter) | 2026-03-27 | `安全` `审查` `必备` |

</div>

---

## 🏆 热门推荐

<div class="featured-skills">

### 🔥 本期推荐：RSS Feed Digest

**自动聚合多个 RSS 订阅源**，打造你的每日新闻简报！

- ✅ 多源聚合 + 关键词过滤 + 自动去重
- ✅ 支持 Markdown/纯文本输出
- ✅ 可集成 cron/heartbeat 实现自动化

[阅读详细介绍 →](/tech/100-skills-07-rss-digest)

---

### 🛡️ 安全必备：Skill Vetter

**安装任何 skill 前必用** 的安全审查工具！

- ✅ 危险信号检测
- ✅ 权限范围分析
- ✅ 代码行为审查

[阅读详细介绍 →](/tech/100-skills-01-skill-vetter)

</div>

---

## 📊 统计信息

<div class="stats-grid">

| 统计项 | 数值 |
|--------|------|
| 已发布期数 | 7 期 |
| 覆盖技能 | 7 个 |
| 系列总阅读量 | 持续更新中 |
| 平均评分 | ⭐⭐⭐⭐⭐ |

</div>

---

## 🔔 订阅更新

- 每天早上 9 点自动发布新一期
- 关注 [GitHub](https://github.com/yufengyuanx/blog) 获取更新通知
- RSS 订阅即将上线

---

## 💡 投稿建议

如果你有想推荐的 skill，欢迎通过以下方式告诉我：

- [GitHub Issues](https://github.com/yufengyuanx/blog/issues)
- 微信直接留言

---

<style>
.skills-series-list table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.skills-series-list th,
.skills-series-list td {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.skills-series-list th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.skills-series-list tr:hover {
  background: var(--vp-c-bg-soft);
}

.skills-series-list code {
  font-size: 0.85rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  margin-left: 0.3rem;
}

.featured-skills {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.featured-skills > div {
  padding: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
}

.featured-skills h3 {
  margin-top: 0;
  color: var(--vp-c-brand);
}

.featured-skills ul {
  list-style: none;
  padding-left: 0;
}

.featured-skills li {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.featured-skills li:before {
  content: "✅";
  position: absolute;
  left: 0;
}

.featured-skills a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
}

.featured-skills a:hover {
  background: var(--vp-c-brand-dark);
}

.stats-grid table {
  width: 100%;
  max-width: 400px;
  border-collapse: collapse;
  margin: 1rem 0;
}

.stats-grid th,
.stats-grid td {
  padding: 0.75rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.stats-grid th {
  background: var(--vp-c-bg-soft);
  width: 60%;
}
</style>
