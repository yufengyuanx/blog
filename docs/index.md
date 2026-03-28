---
layout: home
hero:
  name: "Frank's Blog"
  text: "技术学习笔记与生活记录"
  tagline: 保持好奇，持续学习
  image:
    src: /logo.png
    alt: Frank's Blog
  actions:
    - theme: brand
      text: 开始阅读 →
      link: /tech/
    - theme: alt
      text: 关于我
      link: /about
    - theme: alt
      text: 100 个 Skills
      link: /tech/series/100-skills

features:
  - icon: 🎯
    title: 100 个 Skills
    details: 每天介绍一个热门 OpenClaw skill，帮助你发现和了解最有价值的工具
    link: /tech/series/100-skills
  - icon: 💻
    title: 技术笔记
    details: Java、Python、AI/LLM 等技术学习心得与实战经验
    link: /tech/
  - icon: 🔬
    title: 技术调研
    details: 深度技术调研与架构设计文档
    link: /research/
  - icon: ☕
    title: 生活随笔
    details: 读书感悟、日常记录、工作之外的思考
    link: /life/
---

## 📰 最新文章

<div class="latest-posts">

### 🆕 最新发布

- **[100 个 Skills 第 2 期：Summarize - 全能内容摘要工具](/tech/100-skills-02-summarize)** `2026-03-28` `OpenClaw` `效率工具`  
  介绍 ClawHub 下载量 Top 1 (215k+) 的摘要工具，支持网页、PDF、图片、音频、YouTube 一键总结。

- **[100 个 Skills 第 1 期：Skill Vetter - 安全审查必备工具](/tech/100-skills-01-skill-vetter)** `2026-03-27` `OpenClaw` `安全`  
  介绍 ClawHub 下载量 Top 4 的安全审查工具，157k+ 下载，帮你避免安装恶意 skill。

</div>

---

## 📚 系列专栏

<div class="series-section">

### 🎯 100 个 Skills

每天介绍一个热门 OpenClaw skill，帮助你发现和了解最有价值的工具。

[查看系列专栏 →](/tech/series/100-skills)

</div>

---

## 🗂️ 浏览分类

<div class="categories-grid">

| 分类 | 描述 | 文章 |
|------|------|------|
| 💻 技术笔记 | Java、Python、AI/LLM 等技术学习心得 | [浏览 →](/tech/) |
| 🔬 技术调研 | 深度技术调研与架构设计 | [浏览 →](/research/) |
| ☕ 生活随笔 | 读书感悟、日常记录 | [浏览 →](/life/) |

</div>

---

## 🔍 快速搜索

使用页面右上角的搜索功能，快速找到你需要的内容。

---

## 📬 订阅更新

- [GitHub](https://github.com/yufengyuanx) - 关注我的开源项目
- [RSS](/blog/feed.xml) - 订阅最新文章（即将上线）

---

<style>
.latest-posts {
  margin: 2rem 0;
}

.latest-posts ul {
  list-style: none;
  padding-left: 0;
}

.latest-posts li {
  margin: 1.5rem 0;
  padding: 1rem;
  border-left: 4px solid var(--vp-c-brand);
  background: var(--vp-c-bg-soft);
  border-radius: 0 8px 8px 0;
}

.latest-posts a {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.latest-posts code {
  font-size: 0.85rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  background: var(--vp-c-bg-alt);
  margin-left: 0.5rem;
}

.series-section {
  margin: 2rem 0;
  padding: 1.5rem;
  background: linear-gradient(135deg, var(--vp-c-brand-soft) 0%, var(--vp-c-bg-soft) 100%);
  border-radius: 12px;
  border: 1px solid var(--vp-c-brand);
}

.series-section a {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--vp-c-brand);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
}

.series-section a:hover {
  background: var(--vp-c-brand-dark);
}

.categories-grid table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.categories-grid th,
.categories-grid td {
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.categories-grid th {
  background: var(--vp-c-bg-soft);
  font-weight: 600;
}

.categories-grid tr:hover {
  background: var(--vp-c-bg-soft);
}
</style>
