---
title: "100 个 Skills 第 05 期：Gog - Google Workspace CLI"
date: 2026-03-31
description: "Gog 是 OpenClaw 的 Google Workspace 集成技能，提供 Gmail、Calendar、Drive、Contacts、Sheets 和 Docs 的命令行接口，让你用自然语言管理 Google 服务。"
tags: [OpenClaw, Skill, Google, 生产力，自动化]
readingTime: 8
---

# 100 个 Skills 第 05 期：Gog - Google Workspace CLI

> 📌 **本期主角**：Gog v1.0.0  
> 👤 **作者**：@steipete  
> 📊 **下载量**：14K+ | ⭐ **Stars**：773  
> 🔒 **安全等级**：🟡 MEDIUM（需 Google API 认证）

---

## 📋 基本信息

| 项目 | 内容 |
|------|------|
| Skill 名称 | gog |
| 版本 | v1.0.0 |
| 作者 | @steipete |
| 来源 | [GitHub - openclaw/skills](https://github.com/openclaw/skills/tree/main/skills/steipete/gog) |
| 分类 | 生产力 / Google 集成 |
| 下载量 | 14,000+ |
| 安全审查 | 🟡 MEDIUM |

---

## 🎯 功能介绍

Gog 是 OpenClaw 的 **Google Workspace 命令行集成工具**，让你可以通过自然语言直接操作：

- **📧 Gmail** - 搜索、读取、发送邮件
- **📅 Calendar** - 创建、查询、管理日程
- **📁 Drive** - 文件搜索、上传、下载、分享
- **👥 Contacts** - 联系人管理
- **📊 Sheets** - 读取、写入电子表格
- **📄 Docs** - 文档导出、复制、内容提取

### 核心能力

1. **统一接口** - 一个 skill 覆盖所有 Google 服务
2. **CLI 友好** - 支持 `--json`、`--no-input` 等脚本模式
3. **安全确认** - 发送邮件或创建事件前会要求确认
4. **批量操作** - 支持批量搜索和处理

---

## 📦 安装指南

### 方式 1：OpenClaw CLI（推荐）

```bash
openclaw skills install steipete/gog
```

### 方式 2：手动安装

```bash
# 克隆 skill 到本地
git clone https://github.com/openclaw/skills.git
cd skills/skills/steipete/gog

# 或使用 clawhub CLI
clawhub install steipete/gog
```

### 配置认证

安装后需要配置 Google API 认证：

```bash
# 设置默认账号（可选）
export GOG_ACCOUNT=your-email@gmail.com

# 首次运行会触发 OAuth 认证流程
gog gmail list --limit 5
```

**认证步骤**：
1. 运行任意 gog 命令
2. 浏览器打开 Google OAuth 授权页面
3. 授权 OpenClaw 访问你的 Google 服务
4. 认证信息会保存在本地 `~/.gog/credentials.json`

---

## 💡 使用场景

### 场景 1：快速查看今日日程

```
帮我看看今天下午有什么会议
```

**底层命令**：
```bash
gog calendar list --from "today 12:00" --to "today 18:00"
```

### 场景 2：搜索重要邮件

```
查找昨天收到的包含"项目报告"的邮件
```

**底层命令**：
```bash
gog gmail search "项目报告 after:2026/03/29 before:2026/03/31" --limit 10
```

### 场景 3：读取 Google Sheets 数据

```
读取我的销售数据表格的第一页
```

**底层命令**：
```bash
gog sheets read "销售数据 2026" --range "Sheet1!A1:D100"
```

### 场景 4：上传文件到 Drive

```
把今天的会议纪要上传到 Drive 的"会议记录"文件夹
```

**底层命令**：
```bash
gog drive upload ./meeting-notes-2026-03-31.md --folder "会议记录"
```

### 场景 5：快速创建日程

```
明天上午 10 点和团队开周会，1 小时
```

**底层命令**：
```bash
gog calendar create "团队周会" --start "tomorrow 10:00" --duration 60 --attendees team@company.com
```

---

## 🔒 安全审查报告

| 检查项 | 结果 | 说明 |
|--------|------|------|
| 命令执行 | ✅ 安全 | 仅调用 gog CLI，无危险命令 |
| 网络请求 | ⚠️ 需要 | 访问 Google API（预期行为） |
| 文件写入 | ⚠️ 有限 | 仅写入本地认证文件 |
| 权限范围 | ⚠️ 中等 | 需要 Google OAuth 授权 |
| 第三方依赖 | ✅ 可信 | 官方 openclaw/skills 仓库 |
| 代码混淆 | ✅ 无 | 源码公开透明 |

**综合评级**：🟡 **MEDIUM**

**原因**：
- ✅ 来源可信（官方仓库，773 stars）
- ✅ 代码透明，无混淆
- ⚠️ 需要 Google API 认证（OAuth 流程）
- ⚠️ 可访问用户 Gmail/Drive 等敏感数据

**建议**：
1. 仅在你信任的环境中使用
2. 定期检查 Google 账号的授权应用列表
3. 使用专用服务账号而非个人账号（如用于自动化）

---

## ⚖️ 优缺点分析

### ✅ 优点

| 优点 | 说明 |
|------|------|
| **功能全面** | 覆盖 6 大 Google 服务，一个 skill 搞定 |
| **CLI 友好** | 支持脚本模式，适合自动化工作流 |
| **社区活跃** | 14K+ 下载，773 stars，持续维护 |
| **安全确认** | 敏感操作（发邮件、创建事件）前会确认 |
| **文档完善** | GitHub 有详细的使用说明和示例 |

### ❌ 缺点

| 缺点 | 说明 |
|------|------|
| **认证复杂** | 首次使用需要 OAuth 流程，对新手不友好 |
| **依赖网络** | 必须联网才能使用，无法离线操作 |
| **API 限制** | 受 Google API 配额限制，高频使用可能触发限流 |
| **隐私顾虑** | 需要授权访问 Gmail/Drive 等敏感数据 |
| **学习成本** | 需要了解各服务的命令参数 |

---

## 📝 实用技巧

### 1. 设置默认账号

避免每次都要指定账号：

```bash
export GOG_ACCOUNT=your-email@gmail.com
# 或添加到 ~/.zshrc / ~/.bashrc
echo 'export GOG_ACCOUNT=your-email@gmail.com' >> ~/.zshrc
```

### 2. 使用 JSON 输出（适合脚本）

```bash
gog calendar list --json --limit 10 | jq '.[].summary'
```

### 3. 批量搜索邮件

```bash
# 搜索未读的重要邮件
gog gmail search "is:unread is:important" --limit 50
```

### 4. Sheets 批量写入

```bash
# 使用 JSON 文件批量写入数据
gog sheets write "销售数据" --values-json ./data.json --range "Sheet1!A1"
```

### 5. Drive 快速分享

```bash
# 分享文件给团队成员
gog drive share "项目计划.docx" --email team@company.com --role writer
```

---

## 🔗 相关资源

- **GitHub 仓库**：[openclaw/skills - gog](https://github.com/openclaw/skills/tree/main/skills/steipete/gog)
- **ClawHub 页面**：[clawhub.ai/skills](https://clawhub.ai/skills)
- **Google API 文档**：[developers.google.com](https://developers.google.com)
- **上一期**：[100-skills-04-opencli-tool](./100-skills-04-opencli-tool.md)
- **下一期**：敬请期待 #06

---

## 📢 系列进度

**100 个 Skills 系列**：5/100 完成 ✅

| 期数 | Skill | 日期 | 安全等级 |
|------|-------|------|----------|
| #01 | skill-vetter | 2026-03-27 | 🟢 LOW |
| #02 | summarize | 2026-03-28 | 🟢 LOW |
| #03 | capability-evolver | 2026-03-29 | 🟢 LOW |
| #04 | opencli-tool | 2026-03-30 | 🟡 MEDIUM |
| **#05** | **gog** | **2026-03-31** | **🟡 MEDIUM** |

---

_🎯 明天同一时间继续第 06 期！关注我，不错过任何一期。_
