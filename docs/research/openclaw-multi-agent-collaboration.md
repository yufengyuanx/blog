# OpenClaw 多智能体协作系统技术调研

> **摘要：** 深入分析 OpenClaw 的 Team 概念、任务池、任务分发机制、子智能体协作模式，以及与传统多智能体系统的区别。

---

## 1. 核心概念解析

### 1.1 什么是 Team？

在 OpenClaw 中，**Team 不是一个显式的配置对象**，而是一个**运行时形成的协作模式**。它通过以下机制实现：

```
主智能体 (Main Agent)
    ├── 子智能体 A (Sub-agent) — 负责研究
    ├── 子智能体 B (Sub-agent) — 负责编码
    └── 子智能体 C (Sub-agent) — 负责测试
```

**关键特征：**
- Team 是**动态形成**的，不是预先配置的
- 主智能体作为**协调器 (Orchestrator)** 负责任务分发
- 子智能体之间**不直接通信**，所有通信通过主智能体中转

### 1.2 会话键 (Session Key) 结构

OpenClaw 使用分层的会话键来标识智能体关系：

| 深度 | 会话键格式 | 角色 | 可Spawn子智能体 |
|------|-----------|------|----------------|
| 0 | `agent:<id>:main` | 主智能体 | ✅ 总是 |
| 1 | `agent:<id>:subagent:<uuid>` | 子智能体 (协调器) | ⚠️ 仅当 `maxSpawnDepth >= 2` |
| 2 | `agent:<id>:subagent:<uuid>:subagent:<uuid>` | 子子智能体 (工作节点) | ❌ 从不 |

---

## 2. 任务池与任务分发机制

### 2.1 任务池的本质

OpenClaw **没有集中式任务池**。任务分发采用 **请求 - 响应模式**：

```
┌─────────────┐     sessions_spawn      ┌──────────────┐
│  主智能体    │ ─────────────────────→  │  子智能体     │
│  (协调器)   │                         │  (执行者)     │
│             │ ←──── 完成通知 ───────── │              │
└─────────────┘      (Announce)         └──────────────┘
```

### 2.2 任务分发流程

**步骤 1：主智能体 spawn 子智能体**

```javascript
sessions_spawn({
  task: "分析这个 GitHub 仓库的代码结构",
  agentId: "researcher",  // 可选，指定特定 agent
  model: "cheaper-model",  // 可选，使用更便宜的模型
  thinking: "off",  // 可选，关闭思考模式
  runTimeoutSeconds: 900,  // 可选，15 分钟超时
  thread: false,  // 是否绑定到线程
  mode: "run",  // "run"=一次性，"session"=持久会话
  cleanup: "keep"  // 完成后保留还是删除会话
})
```

**步骤 2：子智能体独立执行**

- 子智能体在**隔离的会话**中运行
- 拥有自己的上下文和 token 预算
- **默认继承**主智能体的工具权限（会话工具除外）

**步骤 3：完成通知 (Announce)**

子智能体完成后，通过 **Announce 机制** 向主智能体汇报：

```
┌─────────────────────────────────────────────────┐
│ Announce 负载                                    │
├─────────────────────────────────────────────────┤
│ Result: "完成了代码结构分析，发现 3 个核心模块..."    │
│ Status: completed successfully                  │
│ Runtime: 5m12s                                  │
│ Tokens: 12,450 (input) / 3,200 (output)         │
│ Cost: $0.023                                    │
│ sessionKey: agent:main:subagent:abc123          │
└─────────────────────────────────────────────────┘
```

### 2.3 并发控制

OpenClaw 使用**专用队列车道 (Lane)** 管理并发：

```json5
{
  agents: {
    defaults: {
      subagents: {
        maxConcurrent: 8,  // 全局并发上限 (默认 8)
        maxChildrenPerAgent: 5,  // 每个智能体最多 5 个活跃子智能体
        maxSpawnDepth: 2,  // 最大嵌套深度 (默认 1，推荐 2)
        runTimeoutSeconds: 900,  // 默认超时时间
      }
    }
  }
}
```

**并发限制的意义：**
- 防止资源耗尽
- 避免 token 使用失控
- 保持系统稳定性

---

## 3. Team 间通信机制

### 3.1 通信模式

OpenClaw 中的智能体通信采用 **星型拓扑**：

```
        ┌──────────┐
        │ 主智能体  │
        └────┬─────┘
             │
    ┌────────┼────────┐
    │        │        │
┌───▼───┐ ┌──▼──┐ ┌──▼───┐
│子 A   │ │子 B  │ │子 C   │
└───────┘ └─────┘ └──────┘
```

**关键规则：**
- 子智能体之间**不能直接通信**
- 所有通信必须通过主智能体**中转**
- 子智能体完成后只能向**直接父节点**汇报

### 3.2 嵌套协作模式 (maxSpawnDepth >= 2)

当启用深度 2 时，可以实现**协调器模式**：

```
主智能体 (深度 0)
    │
    ├── 协调器子智能体 (深度 1)
    │       ├── 工作节点 A (深度 2)
    │       ├── 工作节点 B (深度 2)
    │       └── 工作节点 C (深度 2)
    │
    └── 其他子智能体...
```

**工具权限分层：**

| 深度 | 可用工具 |
|------|---------|
| 0 (主) | 所有工具 |
| 1 (协调器) | `sessions_spawn`, `subagents`, `sessions_list`, `sessions_history` + 继承工具 |
| 2 (工作节点) | 无会话工具，仅继承的基础工具 |

### 3.3 级联停止

停止主智能体会**自动级联**停止所有子智能体：

```bash
/stop  # 停止主智能体 + 所有子智能体
/subagents kill <id>  # 停止特定子智能体 + 它的子节点
/subagents kill all  # 停止所有子智能体
```

---

## 4. 技术优势

### 4.1 并行化

**传统方式：**
```
任务 A → 等待完成 → 任务 B → 等待完成 → 任务 C
总耗时：15 + 10 + 8 = 33 分钟
```

**OpenClaw 方式：**
```
任务 A ──┐
任务 B ──┼→ 并行执行 → 汇总结果
任务 C ──┘
总耗时：max(15, 10, 8) = 15 分钟
```

### 4.2 隔离性

每个子智能体拥有：
- **独立的会话上下文**（不会污染主会话）
- **独立的 token 预算**（可配置更便宜的模型）
- **独立的工作空间**（可选沙箱隔离）

### 4.3 成本优化

```json5
{
  agents: {
    defaults: {
      subagents: {
        model: "cheaper-model"  // 子智能体用便宜模型
      }
    }
  }
}
```

**策略：**
- 主智能体：高质量模型（如 `qwen3.5-plus`）
- 子智能体：经济型模型（如 `qwen3.5`）
- 成本可降低 **60-80%**

### 4.4 工具权限控制

可以精细控制子智能体的工具访问：

```json5
{
  tools: {
    subagents: {
      tools: {
        deny: ["gateway", "cron"],  // 禁止访问网关和定时任务
        allow: ["read", "exec", "process"]  // 仅允许基础工具
      }
    }
  }
}
```

---

## 5. 潜在问题与坑

### 5.1 Announce 丢失风险

**问题：** 如果网关重启，待处理的 Announce 会丢失

```
子智能体完成 → 网关重启 → Announce 未发送 → 主智能体永远等不到结果
```

**缓解措施：**
- 使用较短的 `runTimeoutSeconds`
- 避免在关键路径上依赖子智能体
- 定期检查子智能体状态：`/subagents list`

### 5.2 上下文隔离的代价

**问题：** 子智能体**不继承**以下文件：
- `SOUL.md`（人格定义）
- `IDENTITY.md`（身份定义）
- `USER.md`（用户信息）
- `HEARTBEAT.md`（心跳任务）
- `BOOTSTRAP.md`（引导文件）

**影响：**
- 子智能体可能表现不一致
- 需要显式传递关键上下文

**解决方案：**
```javascript
sessions_spawn({
  task: `
    基于以下上下文完成任务：
    - 用户偏好：${userPreferences}
    - 项目背景：${projectContext}
    
    具体任务：分析代码结构...
  `
})
```

### 5.3 嵌套深度的权衡

**maxSpawnDepth = 1（默认）：**
- ✅ 简单，易于调试
- ❌ 无法实现协调器模式

**maxSpawnDepth = 2（推荐）：**
- ✅ 支持协调器模式
- ✅ 适合复杂任务分解
- ⚠️ 调试复杂度增加

**maxSpawnDepth > 2：**
- ⚠️ 极少需要
- ❌ 调试困难
- ❌ Announce 链路过长

### 5.4 沙箱兼容性

**问题：** ACP 会话（如 Codex、Claude Code）**不能在沙箱中运行**

```
沙箱会话 → sessions_spawn(runtime: "acp") → ❌ 错误
```

**错误信息：**
```
Sandboxed sessions cannot spawn ACP sessions because 
runtime="acp" runs on the host.
```

**解决方案：**
- 从非沙箱会话 spawn ACP 会话
- 或使用 `runtime: "subagent"` 代替

### 5.5 认证隔离

**当前限制：** 子智能体的认证是** additive 合并**的

```
主智能体认证 + 子智能体认证 → 合并使用
```

**风险：** 子智能体可以访问主智能体的所有凭证

**未来改进方向：** 完全隔离的认证（目前不支持）

---

## 6. 与传统多智能体系统的对比

### 6.1 架构对比

| 特性 | 传统 MAS | OpenClaw |
|------|----------|----------|
| 任务池 | 集中式队列 | 无（请求 - 响应） |
| 通信 | 点对点 / 黑板 | 星型拓扑（仅父子） |
| 协调 | 专用协调器 | 主智能体兼任 |
| 状态管理 | 分布式 | 网关集中管理 |
| 部署 | 多进程/多机 | 单网关多会话 |

### 6.2 任务分发对比

**传统方式（如 Celery + Redis）：**
```python
# 任务发布到队列
task_id = task_queue.publish({
    'function': 'analyze_code',
    'args': [repo_url]
})

# Worker 从队列抢任务
worker.subscribe(task_queue)
task = worker.pop()
result = execute(task)
task_queue.publish_result(task_id, result)
```

**OpenClaw 方式：**
```javascript
// 直接 spawn 子智能体
const result = await sessions_spawn({
    task: 'analyze this code repository',
    agentId: 'code-analyst'
});
// 等待 Announce
```

**差异：**
- 传统方式：**异步 + 队列缓冲**
- OpenClaw：**同步 + 直接调用**

### 6.3 通信机制对比

| 维度 | 传统 MAS | OpenClaw |
|------|----------|----------|
| 协议 | FIPA-ACL / KQML | 内部 Announce |
| 消息路由 | 消息总线 / AMQP | 网关路由 |
| 持久化 | 消息队列 | JSONL 转录 |
| 实时性 | 取决于队列 | 即时 |

---

## 7. 实际应用场景

### 7.1 场景 1：研究 + 写作工作流

```
主智能体
├── 研究子智能体：搜索最新资料
├── 分析子智能体：整理关键信息
└── 写作子智能体：生成博客文章
```

**配置示例：**
```json5
{
  agents: {
    defaults: {
      subagents: {
        maxSpawnDepth: 2,
        maxChildrenPerAgent: 5,
        model: "qwen3.5",  // 子智能体用便宜模型
        runTimeoutSeconds: 600
      }
    }
  }
}
```

### 7.2 场景 2：代码审查流水线

```
主智能体 (协调器)
├── 静态分析子智能体：运行 linter
├── 安全审查子智能体：检查漏洞
└── 测试子智能体：运行单元测试
```

### 7.3 场景 3：客户支持团队

```
主智能体 (路由)
├── 技术支持子智能体：处理技术问题
├── 账单支持子智能体：处理支付问题
└── 产品咨询子智能体：处理功能咨询
```

---

## 8. 最佳实践

### 8.1 任务分解原则

**好的任务分解：**
```javascript
// ✅ 清晰、独立、可验证
sessions_spawn({
  task: "列出所有 API 端点，输出 JSON 格式"
})

sessions_spawn({
  task: "检查每个端点的认证机制"
})

sessions_spawn({
  task: "生成 API 文档草稿"
})
```

**不好的任务分解：**
```javascript
// ❌ 模糊、依赖隐式上下文
sessions_spawn({
  task: "处理一下这个"
})
```

### 8.2 超时设置

```json5
{
  runTimeoutSeconds: 300  // 5 分钟：简单查询
  runTimeoutSeconds: 900  // 15 分钟：代码分析
  runTimeoutSeconds: 3600 // 1 小时：大型重构
}
```

**原则：** 设置合理的超时，避免无限等待

### 8.3 监控与调试

```bash
# 查看所有子智能体状态
/subagents list

# 查看特定子智能体日志
/subagents log <id> 50

# 查看详细信息
/subagents info <id>

# 发送指导消息
/subagents send <id> "请专注于性能优化"

# 紧急停止
/subagents kill all
```

### 8.4 成本控制

```json5
// 配置子智能体使用便宜模型
{
  agents: {
    defaults: {
      subagents: {
        model: "qwen3.5",  // 便宜 70%
        thinking: "off"    // 关闭思考模式
      }
    }
  }
}
```

---

## 9. 总结

### 9.1 OpenClaw 多智能体系统的核心特点

1. **动态协作**：Team 是运行时形成的，不是预先配置
2. **星型通信**：所有通信通过主智能体中转
3. **隔离执行**：每个子智能体独立会话和上下文
4. **成本优化**：可为子智能体配置更便宜的模型
5. **简单优先**：默认深度 1，按需开启深度 2

### 9.2 适用场景

**适合：**
- 并行化独立任务
- 需要隔离上下文的工作
- 成本敏感的大规模任务

**不适合：**
- 需要子智能体实时协作的场景
- 强依赖共享状态的任务
- 超低延迟要求的应用

### 9.3 未来演进方向

1. **子智能体直接通信**（当前不支持）
2. **集中式任务池**（当前无）
3. **完全认证隔离**（当前 additive 合并）
4. **持久化 Team 配置**（当前动态形成）

---

## 附录：快速参考

### 常用命令

```bash
# 生成子智能体
/subagents spawn <agentId> <task>

# 查看状态
/subagents list

# 查看日志
/subagents log <id> [limit]

# 停止子智能体
/subagents kill <id|all>

# 发送指导
/subagents send <id> <message>
```

### 配置模板

```json5
{
  agents: {
    defaults: {
      subagents: {
        maxSpawnDepth: 2,
        maxChildrenPerAgent: 5,
        maxConcurrent: 8,
        model: "qwen3.5",
        thinking: "off",
        runTimeoutSeconds: 900,
        archiveAfterMinutes: 60
      }
    },
    list: [
      {
        id: "main",
        subagents: {
          allowAgents: ["*"],  // 允许 spawn 任何 agent
          model: "qwen3.5"
        }
      }
    ]
  },
  tools: {
    subagents: {
      tools: {
        deny: ["gateway", "cron"]
      }
    }
  }
}
```

---

**参考资料：**
- [OpenClaw Sub-Agents 文档](https://docs.openclaw.ai/tools/subagents)
- [OpenClaw ACP Agents 文档](https://docs.openclaw.ai/tools/acp-agents)
- [OpenClaw Session 管理](https://docs.openclaw.ai/concepts/session)
- [OpenClaw 多智能体沙箱](https://docs.openclaw.ai/tools/multi-agent-sandbox-tools)

---

*最后更新：2026-03-27*
*作者：Frank Yuan*
