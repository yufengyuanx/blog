---
title: "100 个 Skills 第 23 期：tmux - Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output."
date: 2026-04-24
description: "Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output."
tags: [OpenClaw, Skill, 自动化]
readingTime: 5
---

# 100 个 Skills 第 23 期：tmux - Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output.

今天介绍的 skill 是 **tmux**。

它的核心定位很直接：**Remote-control tmux sessions for interactive CLIs by sending keystrokes and scraping pane output.**

## 基本信息

| 项目 | 内容 |
|------|------|
| Skill 名称 | tmux |
| 来源目录 | `/Users/frankyuan/.agents/skills/tmux` |
| 风险等级 | 🟢 LOW ~ 🟡 MEDIUM（需结合实际能力判断） |

## 适合解决什么问题

- 提高日常效率
- 让 agent 更方便调用特定能力
- 减少重复性操作

## 使用示例

```bash
SOCKET_DIR="${NANOBOT_TMUX_SOCKET_DIR:-${TMPDIR:-/tmp}/vikingbot-tmux-sockets}"
mkdir -p "$SOCKET_DIR"
SOCKET="$SOCKET_DIR/vikingbot.sock"
SESSION=vikingbot-python

tmux -S "$SOCKET" new -d -s "$SESSION" -n shell
tmux -S "$SOCKET" send-keys -t "$SESSION":0.0 -- 'PYTHON_BASIC_REPL=1 python3 -q' Enter
tmux -S "$SOCKET" capture-pane -p -J -t "$SESSION":0.0 -S -200
```

```bash
SOCKET="${TMPDIR:-/tmp}/codex-army.sock"

# Create multiple sessions
for i in 1 2 3 4 5; do
  tmux -S "$SOCKET" new-session -d -s "agent-$i"
done

# Launch agents in different workdirs
tmux -S "$SOCKET" send-keys -t agent-1 "cd /tmp/project1 && codex --yolo 'Fix bug X'" Enter
tmux -S "$SOCKET" send-keys -t agent-2 "cd /tmp/project2 && codex --yolo 'Fix bug Y'" Enter

# Poll for completion (check if prompt returned)
for sess in agent-1 agent-2; do
  if tmux -S "$SOCKET" capture-pane -p -t "$sess" -S -3 | grep -q "❯"; then
    echo "$sess: DONE"
  else
    echo "$sess: Running..."
  fi
done

# Get full output from completed session
tmux -S "$SOCKET" capture-pane -p -t agent-1 -S -500
```

```bash
{baseDir}/scripts/wait-for-text.sh -t session:0.0 -p 'pattern' [-F] [-T 20] [-i 0.5] [-l 2000]
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

**系列进度**：23/100
