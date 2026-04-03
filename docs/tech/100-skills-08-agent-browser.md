---
title: "100 个 Skills 第 08 期：Agent Browser - 无头浏览器自动化神器"
date: 2026-04-03
description: "Agent Browser 是 OpenClaw 的无头浏览器自动化 CLI 工具，支持页面导航、表单填充、截图、数据提取等功能，让 AI 代理能够与任何网站交互。"
tags: [OpenClaw, Skill, 浏览器自动化，Web 测试，数据抓取]
readingTime: 8
---

# 100 个 Skills 第 08 期：Agent Browser - 无头浏览器自动化神器

> **一句话总结**：让 AI 代理拥有"眼睛"和"手"，能够像人类一样浏览网页、点击按钮、填写表单、截取屏幕。

---

## 📊 基本信息

| 项目 | 内容 |
|------|------|
| **Skill 名称** | agent-browser |
| **作者** | @clawdbrunner / OpenClaw Community |
| **分类** | 浏览器自动化 / Web 测试 |
| **下载量** | 149,000+ |
| **GitHub Stars** | 3,200+ |
| **版本** | v0.2.0+ |
| **安装命令** | `clawhub install agent-browser` |
| **安全等级** | 🟡 MEDIUM |
| **依赖** | Node.js 18+, Playwright 或 Puppeteer |

---

## 🎯 功能介绍

Agent Browser 是一个专为 AI 代理设计的无头浏览器自动化 CLI 工具。它采用 **snapshot-and-ref** 工作流，让 AI 能够"看到"页面并精确操作。

### 核心能力

1. **页面导航** - 访问任意 URL，处理重定向和 SPA 路由
2. **元素交互** - 点击按钮、链接、复选框等任意页面元素
3. **表单填充** - 自动填写输入框、下拉菜单、日期选择器
4. **屏幕截图** - 截取整个页面或特定元素
5. **数据提取** - 从页面抓取结构化数据（文本、表格、列表）
6. **网络拦截** - 监控和修改 HTTP 请求/响应
7. **等待策略** - 智能等待元素加载、网络空闲、导航完成
8. **多标签页** - 管理多个浏览器标签页

### 适用场景

- ✅ Web 应用自动化测试
- ✅ 数据抓取与监控
- ✅ 表单自动填写
- ✅ 截图生成（报告、文档）
- ✅ 登录流程自动化
- ✅ 价格监控与比较
- ✅ 社交媒体自动化
- ✅ 端到端工作流测试

---

## 📦 安装指南

### 前置条件

```bash
# 确保 Node.js 18+ 已安装
node --version  # v18.0.0 或更高

# 确保 npm 可用
npm --version
```

### 安装步骤

**方式 1：通过 ClawHub（推荐）**

```bash
clawhub install agent-browser
```

**方式 2：手动安装**

```bash
# 克隆技能仓库
git clone https://github.com/clawdbrunner/skill-agent-browser.git ~/.openclaw/skills/agent-browser

# 安装依赖
cd ~/.openclaw/skills/agent-browser
npm install

# 重启 OpenClaw
openclaw gateway restart
```

**方式 3：通过 Smithery CLI**

```bash
npx @smithery/cli@latest skill add openclaw/agent-browser
```

### 验证安装

```bash
# 检查技能是否可用
openclaw skills list | grep agent-browser

# 测试基本功能
agent-browser navigate --url "https://example.com"
```

---

## 💡 使用场景

### 场景 1：Web 应用自动化测试

```bash
# 导航到登录页面
agent-browser navigate --url "https://app.example.com/login"

# 填写表单
agent-browser fill --selector "#email" --value "test@example.com"
agent-browser fill --selector "#password" --value "secret123"

# 点击登录按钮
agent-browser click --selector "button[type=submit]"

# 等待并验证登录成功
agent-browser wait-for --selector ".dashboard"
agent-browser screenshot --output "login-success.png"
```

### 场景 2：数据抓取

```bash
# 访问产品列表页
agent-browser navigate --url "https://shop.example.com/products"

# 提取所有产品名称和价格
agent-browser extract --selector ".product-card" \
  --fields "name:.product-name,price:.product-price,link:a@href" \
  --output "products.json"
```

### 场景 3：截图生成

```bash
# 截取整个页面
agent-browser screenshot --url "https://docs.example.com" \
  --output "docs-homepage.png" --full-page

# 截取特定元素
agent-browser screenshot --url "https://app.example.com/dashboard" \
  --selector "#revenue-chart" \
  --output "revenue-chart.png"
```

### 场景 4：表单自动提交

```bash
# 填写并提交联系表单
agent-browser navigate --url "https://company.example.com/contact"
agent-browser fill --selector "#name" --value "张三"
agent-browser fill --selector "#email" --value "zhangsan@example.com"
agent-browser fill --selector "#message" --value "咨询产品信息"
agent-browser click --selector "button[type=submit]"
agent-browser wait-for --selector ".success-message"
```

---

## 🔧 命令参考

### 导航命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `navigate` | 访问 URL | `agent-browser navigate --url "https://example.com"` |
| `go-back` | 后退 | `agent-browser go-back` |
| `go-forward` | 前进 | `agent-browser go-forward` |
| `refresh` | 刷新页面 | `agent-browser refresh` |

### 交互命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `click` | 点击元素 | `agent-browser click --selector "#submit-btn"` |
| `fill` | 填写输入框 | `agent-browser fill --selector "#email" --value "test@test.com"` |
| `select` | 选择下拉选项 | `agent-browser select --selector "#country" --value "CN"` |
| `check` | 勾选复选框 | `agent-browser check --selector "#agree-terms"` |
| `hover` | 悬停元素 | `agent-browser hover --selector ".dropdown-menu"` |

### 提取命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `screenshot` | 截图 | `agent-browser screenshot --output "page.png"` |
| `extract` | 提取数据 | `agent-browser extract --selector ".item" --fields "title,href"` |
| `html` | 获取 HTML | `agent-browser html --selector "#content"` |
| `text` | 获取文本 | `agent-browser text --selector "h1"` |

### 等待命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `wait-for` | 等待元素 | `agent-browser wait-for --selector ".loaded"` |
| `wait-network` | 等待网络空闲 | `agent-browser wait-network --idle 500` |
| `sleep` | 等待指定时间 | `agent-browser sleep --ms 2000` |

---

## 🔒 安全审查报告

| 检查项 | 结果 | 说明 |
|--------|------|------|
| **命令执行** | 🟡 中等 | 可执行系统命令（用于启动浏览器） |
| **网络请求** | ✅ 预期 | 浏览器需要访问网站（用户指定 URL） |
| **文件写入** | 🟡 中等 | 可保存截图和提取的数据（用户控制路径） |
| **环境变量** | ✅ 安全 | 仅读取标准浏览器配置 |
| **权限范围** | ✅ 合理 | 仅限浏览器自动化相关操作 |
| **来源可靠性** | ✅ 通过 | GitHub 公开仓库，社区维护 |

**综合风险等级**：🟡 **MEDIUM**

**安全建议**：
1. 仅访问可信网站
2. 不要在自动化流程中存储敏感凭据
3. 截图保存路径使用专用目录
4. 定期更新技能版本

---

## ⚖️ 优缺点分析

### ✅ 优点

1. **功能全面** - 覆盖 90% 的浏览器自动化需求
2. **AI 友好** - snapshot-and-ref 工作流专为 AI 设计
3. **易于使用** - 命令式接口，学习曲线低
4. **社区活跃** - 149k+ 下载，持续更新
5. **跨平台** - 支持 macOS、Linux、Windows
6. **可扩展** - 支持自定义脚本和插件

### ❌ 缺点

1. **资源消耗** - 无头浏览器占用内存较大（~200MB/实例）
2. **速度限制** - 相比纯 HTTP 请求较慢
3. **反爬虫** - 部分网站可能检测并阻止自动化访问
4. **依赖复杂** - 需要安装 Playwright/Puppeteer 及浏览器二进制

### 🆚 替代方案对比

| 工具 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **agent-browser** | 功能全面，AI 友好 | 资源消耗大 | 复杂交互、需要截图 |
| **opencli-tool** | 轻量快速 | 仅支持 API/静态页面 | 简单数据获取 |
| **curl/httpie** | 极简、快速 | 无法执行 JS | API 调用 |
| **Playwright 原生** | 最大灵活性 | 需要编程 | 自定义自动化脚本 |

---

## 📝 用户评价

> **@web_tester_pro**: "Agent Browser 是我们 QA 团队的秘密武器。以前需要写 100 行 Selenium 代码的测试，现在用 5 个命令就搞定。" ⭐⭐⭐⭐⭐

> **@data_scraper**: "抓取动态渲染的网站必备工具。配合 extract 命令，数据提取变得异常简单。" ⭐⭐⭐⭐⭐

> **@automation_fan**: "唯一的问题是内存占用有点高，但功能确实强大。希望未来能优化资源使用。" ⭐⭐⭐⭐

---

## 🔗 相关资源

- **GitHub 仓库**: https://github.com/clawdbrunner/skill-agent-browser
- **官方文档**: https://docs.openclaw.ai/tools/browser
- **ClawHub 页面**: https://clawhub.dev/skills/agent-browser
- **社区讨论**: https://github.com/openclaw/openclaw/discussions/topics/browser-automation
- **示例脚本**: https://github.com/clawdbrunner/skill-agent-browser/tree/main/examples

---

## 📌 总结

Agent Browser 是 OpenClaw 生态中最受欢迎的浏览器自动化技能，149k+ 下载量证明了它的价值。无论你是需要：

- 自动化 Web 测试
- 抓取动态网站数据
- 生成页面截图
- 填写复杂表单

Agent Browser 都能提供可靠、高效的解决方案。虽然资源消耗略高，但其强大的功能和易用性使其成为 AI 代理的必备工具。

**推荐指数**：⭐⭐⭐⭐⭐ (5/5)

**适合人群**：QA 工程师、数据分析师、自动化开发者、任何需要与网站交互的 AI 代理用户

---

_100 个 Skills 系列第 08 期 | 2026-04-03 | 进度：8/100 (8%)_
