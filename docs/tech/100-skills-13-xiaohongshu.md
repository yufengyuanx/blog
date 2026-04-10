---
title: "100 个 Skills 第 13 期：xiaohongshu - 小红书内容工具"
date: 2026-04-10
description: "探索小红书 MCP Skill，实现笔记搜索、详情获取、评论互动、热点跟踪和长图导出等功能"
tags: [OpenClaw, Skill, 社交媒体，内容工具]
readingTime: 8
---

# 100 个 Skills 第 13 期：xiaohongshu - 小红书内容工具

今天介绍的是一个社交媒体内容工具——**xiaohongshu**，基于 [xiaohongshu-mcp](https://github.com/xpzouying/xiaohongshu-mcp) 封装的 shell 脚本工具集，让你可以通过命令行与小红书平台交互。

## 基本信息

| 项目 | 内容 |
|------|------|
| Skill 名称 | xiaohongshu |
| 类型 | 社交媒体/内容工具 |
| 依赖 | xiaohongshu-mcp, jq, python3 |
| 登录方式 | 扫码登录（小红书 App） |
| Cookies 有效期 | 约 30 天 |
| 安全等级 | 🟡 MEDIUM |

## 功能介绍

### 核心功能

1. **搜索笔记** - 按关键词搜索小红书笔记，支持多种过滤条件
2. **获取详情** - 获取帖子完整内容（正文、图片、评论）
3. **互动操作** - 点赞、收藏、发表评论、回复评论
4. **用户主页** - 获取用户信息和笔记列表
5. **热点跟踪** - 自动生成话题分析报告
6. **长图导出** - 将帖子导出为 JPG 长图
7. **内容发布** - 发布图文或视频笔记

### 数据流

```
search_feeds / list_feeds / user_profile
        │
        ▼
  返回 feeds 数组，每个 feed 包含:
  ├── id          → 用作 feed_id
  ├── xsecToken   → 用作 xsec_token
  └── noteCard    → 标题、作者、封面、互动数据
        │
        ▼
  get_feed_detail(feed_id, xsec_token)
        │
        ▼
  返回完整笔记：正文、图片列表、评论列表
```

**重要**：大多数操作需要 `feed_id` + `xsec_token` 配对，这两个值从搜索/推荐/用户主页结果中获取，**不可自行构造**。

## 安装指南

### 1. 检查依赖

```bash
cd scripts/
./install-check.sh    # 检查依赖（xiaohongshu-mcp、jq、python3）
```

### 2. 启动 MCP 服务

```bash
./start-mcp.sh        # 启动服务（默认端口 18060）
./status.sh           # 确认已登录
```

### 3. 登录（如未登录）

```bash
mcp-call.sh get_login_qrcode
```

获取二维码后，用小红书 App 扫码登录。

### 4. 环境变量（可选）

```bash
export MCP_URL="http://localhost:18060/mcp"  # 自定义端口
```

## 使用场景

### 场景 1：搜索特定话题

```bash
# 搜索"咖啡"相关笔记
./search.sh "咖啡"

# 带过滤条件（最新、图文、一周内）
mcp-call.sh search_feeds '{"keyword": "咖啡", "filters": {"sort_by": "最新", "note_type": "图文", "publish_time": "一周内"}}'
```

### 场景 2：获取帖子详情和评论

```bash
# 从搜索结果获取 feed_id 和 xsec_token
./post-detail.sh <feed_id> <xsec_token>

# 或使用 MCP 调用（加载所有评论）
mcp-call.sh get_feed_detail '{"feed_id": "...", "xsec_token": "...", "load_all_comments": true, "limit": 20}'
```

### 场景 3：发表评论

```bash
./comment.sh <feed_id> <xsec_token> "写得真好！"
```

### 场景 4：热点跟踪报告

```bash
# 生成 DeepSeek 话题报告（5 篇笔记）
./track-topic.sh "DeepSeek" --limit 5

# 输出到文件
./track-topic.sh "春节旅游" --limit 10 --output report.md

# 导出飞书格式
./track-topic.sh "iPhone 16" --limit 5 --feishu
```

报告包含：概览统计、热帖详情（正文 + 热评）、评论关键词、趋势分析。

### 场景 5：长图导出

```bash
# 准备 posts.json
cat > posts.json << 'EOF'
[{
  "title": "标题", "author": "作者", "stats": "1.3 万赞",
  "desc": "正文摘要", "images": ["https://..."],
  "per_image_text": {"1": "第 2 张图的说明"}
}]
EOF

# 导出长图
./export-long-image.sh --posts-file posts.json -o output.jpg
```

### 场景 6：发布内容

```bash
# 发布图文
mcp-call.sh publish_content '{"title": "标题", "content": "正文", "images": ["/path/to/img.jpg"], "tags": ["美食","旅行"]}'

# 发布视频
mcp-call.sh publish_with_video '{"title": "标题", "content": "正文", "video": "/path/to/video.mp4"}'

# 定时发布（1 小时~14 天内）
mcp-call.sh publish_content '{"title": "标题", "content": "正文", "images": ["/path/to/img.jpg"], "schedule_at": "2026-04-11T09:00:00+08:00"}'
```

## 安全审查报告

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 命令执行 | 🟡 | 调用外部 MCP 服务，启动本地进程 |
| 网络请求 | 🟡 | 连接小红书 API（功能所需） |
| 文件写入 | 🟡 | 可发布内容、导出文件（需授权） |
| 凭证处理 | 🟡 | 需要 cookies 登录（30 天有效期） |
| 恶意代码 | 🟢 | 无 obfuscated code，代码透明 |
| 权限合理 | 🟢 | 权限与功能匹配 |

**综合风险等级**：🟡 **MEDIUM**

**说明**：需要登录认证和发布权限，但这是功能所需，不是安全风险。代码透明，无恶意行为。

## 优缺点分析

### ✅ 优点

1. **功能全面** - 覆盖搜索、阅读、互动、发布全流程
2. **自动化友好** - 热点跟踪可自动生成报告
3. **长图导出** - 独特的导出功能，便于分享
4. **代码透明** - shell 脚本封装，易于审计
5. **支持定时发布** - 可计划内容发布时间

### ⚠️ 缺点

1. **需要登录** - 首次使用需扫码，cookies 30 天过期
2. **依赖较多** - 需要 xiaohongshu-mcp、jq、python3
3. **首次启动慢** - 下载 headless 浏览器（~150MB）
4. **发布限制** - 标题≤20 字符，正文≤1000 字符，日发布≤50 条
5. **单客户端** - 同一账号避免多客户端同时操作

### 📋 使用建议

- 首次使用预留 5-10 分钟完成依赖安装和登录
- Linux 服务器需安装 xvfb（`apt-get install xvfb`）
- 定期备份 cookies 文件，避免频繁重新登录
- 发布内容前确认符合平台规范

---

**系列进度**：13/100

**下一期预告**：继续探索实用 Skills，敬请期待！
