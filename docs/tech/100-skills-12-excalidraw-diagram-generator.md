---
title: "100 个 Skills 第 12 期：Excalidraw Diagram Generator - 自然语言生成图表神器"
date: 2026-04-09
description: "用自然语言描述即可自动生成流程图、架构图、思维导图等 Excalidraw 图表，支持 9 种图表类型和 AWS/GCP 云架构图标库"
tags: [OpenClaw, Skill, 可视化，图表，Excalidraw]
readingTime: 8
---

# 100 个 Skills 第 12 期：Excalidraw Diagram Generator - 自然语言生成图表神器

> 🎨 **一图胜千言** - 用自然语言描述，自动生成专业图表

## 基本信息

| 项目 | 内容 |
|------|------|
| **Skill 名称** | excalidraw-diagram-generator |
| **类型** | 可视化/图表生成 |
| **安装方式** | 本地技能（工作空间内置） |
| **安全等级** | 🟢 LOW |
| **支持图表** | 9 种类型 |
| **输出格式** | .excalidraw JSON |
| **依赖** | 无（可选 Python 脚本增强） |

## 功能介绍

Excalidraw Diagram Generator 是一个强大的图表生成技能，能够将自然语言描述自动转换为专业的 Excalidraw 图表。无需手动绘制，只需描述你想要的内容，技能会自动生成结构清晰、布局合理的可视化图表。

### 支持的 9 种图表类型

| 图表类型 | 适用场景 | 示例关键词 |
|----------|----------|------------|
| 📊 **流程图 (Flowchart)** | 工作流程、决策树、操作步骤 | "流程"、"步骤"、"工作流" |
| 🔗 **关系图 (Relationship)** | 实体关系、系统组件、依赖关系 | "关系"、"连接"、"依赖" |
| 🧠 **思维导图 (Mind Map)** | 概念层级、头脑风暴、主题组织 | "思维导图"、"概念"、"想法" |
| 🏗️ **架构图 (Architecture)** | 系统设计、模块交互、数据流 | "架构"、"系统"、"组件" |
| 📈 **数据流图 (DFD)** | 数据处理、转换流程、数据源/目标 | "数据流"、"数据处理" |
| 🏊 **业务流程图 (Swimlane)** | 跨职能流程、角色职责 | "业务流程"、"泳道"、"角色" |
| 📦 **类图 (Class Diagram)** | 面向对象设计、类结构 | "类"、"继承"、"OOP" |
| 🔄 **时序图 (Sequence)** | 对象交互、消息流、时间线 | "时序"、"交互"、"消息" |
| 🗃️ **ER 图 (Entity-Relationship)** | 数据库设计、实体关系 | "数据库"、"实体"、"数据模型" |

### 核心特性

- ✅ **自然语言输入** - 用日常语言描述即可，无需学习复杂语法
- ✅ **智能布局** - 自动计算元素位置，避免重叠
- ✅ **多种样式** - 支持颜色、字体、形状自定义
- ✅ **图标库集成** - 支持 AWS/GCP/Azure 等云架构图标（需配置）
- ✅ **标准输出** - 生成标准 .excalidraw 文件，兼容 Excalidraw 所有工具
- ✅ **安全本地执行** - 无网络请求，纯本地文件操作

## 安装指南

### 方式 1：本地技能（已内置）

该技能已内置在工作空间中，无需额外安装：

```bash
# 技能位置
~/.openclaw/workspace/skills/excalidraw-diagram-generator/

# 目录结构
├── SKILL.md                    # 技能定义
├── references/                 # 参考文档
│   ├── excalidraw-schema.md
│   └── element-types.md
├── templates/                  # 图表模板
│   ├── flowchart-template.json
│   ├── relationship-template.json
│   └── mindmap-template.json
├── scripts/                    # Python 辅助脚本
│   ├── split-excalidraw-library.py
│   ├── add-icon-to-diagram.py
│   └── add-arrow.py
└── libraries/                  # 图标库（可选）
    └── aws-architecture-icons/
```

### 方式 2：配置图标库（可选增强）

如需使用 AWS/GCP 等专业图标，可配置图标库：

```bash
# 1. 访问 Excalidraw 图标库
# https://libraries.excalidraw.com/

# 2. 下载所需图标库（.excalidrawlib 文件）
# 例如：AWS Architecture Icons

# 3. 创建图标库目录
mkdir -p ~/.openclaw/workspace/skills/excalidraw-diagram-generator/libraries/aws-architecture-icons

# 4. 放置下载的文件
mv ~/Downloads/aws-architecture-icons.excalidrawlib \
   ~/.openclaw/workspace/skills/excalidraw-diagram-generator/libraries/aws-architecture-icons/

# 5. 运行分割脚本（生成独立图标文件）
cd ~/.openclaw/workspace/skills/excalidraw-diagram-generator/
python scripts/split-excalidraw-library.py libraries/aws-architecture-icons/
```

配置完成后，技能会自动检测并使用图标库中的专业图标。

## 使用场景

### 场景 1：技术文档配图

```
用户：帮我画一个微服务架构图，包含 API Gateway、用户服务、订单服务、支付服务和数据库
```

**技能输出**：
- 生成标准的微服务架构图
- 自动布局各组件位置
- 添加连接箭头表示调用关系
- 输出 `microservices-architecture.excalidraw`

### 场景 2：工作流程可视化

```
用户：创建一个用户注册流程图：填写邮箱 → 验证邮箱 → 设置密码 → 完成注册
```

**技能输出**：
- 生成 4 步流程图
- 添加决策点（如验证失败分支）
- 使用统一配色方案
- 输出 `user-registration-flow.excalidraw`

### 场景 3：会议/演示准备

```
用户：我需要一张思维导图来展示 Q2 产品规划，包含 3 个主要方向：新功能、性能优化、技术债务
```

**技能输出**：
- 生成中心辐射状思维导图
- 3 个主分支 + 子主题
- 使用不同颜色区分优先级
- 输出 `q2-product-roadmap.excalidraw`

### 场景 4：数据库设计

```
用户：画一个电商系统的 ER 图，包含用户、商品、订单、订单项、支付记录
```

**技能输出**：
- 生成标准 ER 图
- 标注主键/外键
- 显示关系基数（1:N, N:M 等）
- 输出 `ecommerce-er-diagram.excalidraw`

### 场景 5：云架构设计

```
用户：创建一个 AWS 架构图，包含 Internet Gateway、VPC、ELB、EC2 实例和 RDS 数据库
```

**技能输出**（需配置图标库）：
- 使用真实 AWS 图标
- 专业云架构布局
- 标注网络连接关系
- 输出 `aws-architecture.excalidraw`

## 使用例子

### 例子 1：简单流程图

**用户请求**：
```
创建一个用户登录流程图
```

**技能执行**：
1. 识别为流程图类型
2. 提取步骤：输入凭证 → 验证 → 成功/失败分支
3. 生成 Excalidraw JSON
4. 保存为 `user-login-flow.excalidraw`

**输出摘要**：
```
✅ 创建完成：user-login-flow.excalidraw
类型：流程图
元素：5 个矩形框，4 个箭头，1 个标题
总计：10 个元素

查看方式：
1. 访问 https://excalidraw.com
2. 拖拽文件到浏览器
3. 或使用 Excalidraw VS Code 扩展打开
```

### 例子 2：系统关系图

**用户请求**：
```
画一个图展示 User、Post、Comment 三个实体之间的关系
```

**技能执行**：
1. 识别为关系图类型
2. 提取实体：User, Post, Comment
3. 提取关系：User→Post (creates), User→Comment (writes), Post→Comment (contains)
4. 使用网格布局自动排列
5. 保存为 `user-content-relationships.excalidraw`

### 例子 3：AWS 架构图（带图标）

**用户请求**：
```
创建一个典型的三层 Web 应用 AWS 架构图
```

**技能执行**（配置图标库后）：
```bash
# 技能内部调用 Python 脚本添加图标
python scripts/add-icon-to-diagram.py diagram.excalidraw "Internet-gateway" 150 100 --label "Internet Gateway"
python scripts/add-icon-to-diagram.py diagram.excalidraw VPC 200 200
python scripts/add-icon-to-diagram.py diagram.excalidraw ELB 350 250 --label "Load Balancer"
python scripts/add-icon-to-diagram.py diagram.excalidraw EC2 500 300 --label "Web Server"
python scripts/add-icon-to-diagram.py diagram.excalidraw RDS 650 350 --label "Database"

# 添加连接箭头
python scripts/add-arrow.py diagram.excalidraw 200 150 250 200
python scripts/add-arrow.py diagram.excalidraw 265 230 350 250
python scripts/add-arrow.py diagram.excalidraw 415 280 500 300
python scripts/add-arrow.py diagram.excalidraw 565 330 650 350 --label "SQL" --style dashed
```

**输出**：
```
✅ 创建完成：aws-three-tier-architecture.excalidraw
类型：云架构图（带 AWS 图标）
元素：5 个 AWS 图标，4 个连接箭头，1 个标题
图标库：aws-architecture-icons

查看方式：
1. 访问 https://excalidraw.com
2. 拖拽文件到浏览器
3. 图标将显示为专业 AWS 架构图标
```

## 安全审查报告

### 审查结果：🟢 LOW 风险

| 检查项 | 状态 | 说明 |
|--------|------|------|
| **网络请求** | ✅ 无 | 纯本地操作，不访问外部 API |
| **凭证访问** | ✅ 无 | 不读取任何敏感信息 |
| **文件写入** | ✅ 安全 | 仅写入 .excalidraw 文件到工作空间 |
| **命令执行** | ✅ 安全 | 可选 Python 脚本为确定性文件操作 |
| **权限范围** | ✅ 最小 | 仅需工作空间读写权限 |

### 安全分析

该技能是**纯本地、无网络、无副作用**的安全技能：

1. **输入处理**：仅解析用户自然语言描述
2. **数据处理**：内存中计算图表布局和元素
3. **输出生成**：写入标准 JSON 文件到工作空间
4. **可选增强**：Python 脚本仅进行文件读取/合并，无网络调用

**推荐度**：⭐⭐⭐⭐⭐ 所有用户均可安全使用

## 优缺点分析

### ✅ 优点

| 优点 | 说明 |
|------|------|
| **零学习成本** | 自然语言描述即可，无需学习图表语法 |
| **快速生成** | 秒级生成专业图表，比手动绘制快 10 倍 + |
| **类型丰富** | 支持 9 种常见图表类型，覆盖 90% 使用场景 |
| **标准兼容** | 输出标准 Excalidraw 格式，可用任何工具打开 |
| **可扩展** | 支持自定义图标库，满足专业需求 |
| **完全免费** | 本地技能，无 API 调用费用 |
| **安全可靠** | 无网络请求，数据不出本地 |

### ⚠️ 局限性

| 局限 | 说明 | 解决方案 |
|------|------|----------|
| **复杂曲线支持有限** | 手绘风格曲线简化为标准曲线 | 可在 Excalidraw 中手动调整 |
| **无自动碰撞检测** | 元素过多时可能重叠 | 遵循建议的元素数量上限（<20） |
| **图标库需手动配置** | 默认无图标，需下载配置 | 按指南配置一次即可重复使用 |
| **不支持嵌入图片** | 无法自动嵌入外部图片 | 可在 Excalidraw 中手动添加 |

### 最佳实践建议

1. **元素数量控制**
   - 流程图：≤10 个步骤
   - 关系图：≤8 个实体
   - 思维导图：≤6 个主分支
   - 超出建议时，技能会主动建议拆分为多个图表

2. **描述清晰化**
   ```
   ❌ 模糊：画个系统图
   ✅ 清晰：画一个电商系统架构图，包含前端、API 网关、用户服务、商品服务、订单服务、MySQL 数据库、Redis 缓存
   ```

3. **迭代优化**
   - 先生成基础版本
   - 在 Excalidraw 中微调布局和样式
   - 复杂图表可分多次生成后合并

## 与其他工具对比

| 特性 | Excalidraw Skill | Mermaid | PlantUML | 手动绘制 |
|------|------------------|---------|----------|----------|
| **学习成本** | 零（自然语言） | 中（语法） | 中高（语法） | 高（工具使用） |
| **生成速度** | 秒级 | 秒级 | 秒级 | 分钟级 |
| **美观度** | 手绘风格 | 标准风格 | 标准风格 | 取决于技能 |
| **可编辑性** | ✅ 优秀 | ⚠️ 有限 | ⚠️ 有限 | ✅ 完全 |
| **图标支持** | ✅ 可扩展 | ⚠️ 有限 | ⚠️ 有限 | ✅ 完全 |
| **协作能力** | ✅ Excalidraw 协作 | ⚠️ 代码协作 | ⚠️ 代码协作 | ⚠️ 文件共享 |

## 总结

Excalidraw Diagram Generator 是一个**生产力倍增器**级别的技能：

- 🎯 **适合人群**：需要频繁创建图表的开发者、产品经理、技术写作者
- 💰 **ROI**：投入 0 成本（本地技能），节省 90% 绘图时间
- 🔒 **安全性**：最高等级，无任何风险
- 📈 **扩展性**：支持图标库扩展，满足专业场景

**推荐指数**：⭐⭐⭐⭐⭐

---

**系列进度**：12/100

**上一期**：[第 11 期：Notion - 知识库与工作空间集成](100-skills-11-notion.md)

**下一期**：敬请期待明日更新
