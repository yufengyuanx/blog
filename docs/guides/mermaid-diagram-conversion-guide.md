# Mermaid 图表转手绘风格 PNG - 经验教训与最佳实践

> **创建时间：** 2026-03-27  
> **项目：** Auto-Dream 技术调研博客  
> **问题：** 11 个 Mermaid 图表转换为手绘风格 PNG 图片的完整调试过程

---

## 📋 任务背景

**目标：** 将博客中的 Mermaid 代码块转换为手绘风格 PNG 图片

**原因：**
- 用户希望图表呈现手绘风格
- 不使用 VitePress 原生 Mermaid 渲染
- 以图片形式加载到博客中

---

## 🔧 完整流程

### 阶段 1：技能安装

```bash
# 安装 Mermaid 图表生成技能
openclaw skills install mermaid-architect
openclaw skills install mermaid-image-generator
```

**✅ 正确做法：** 先验证技能是否安装成功
```bash
openclaw skills list | grep mermaid
```

---

### 阶段 2：脚本创建与调试

#### ❌ 遇到的问题

**问题 1：路径错误**
```javascript
// 错误：使用了错误的路径
const MERMAID_TO_IMAGE = path.join(BLOG_DIR, 'skills/mermaid-image-generator/...');

// 正确：技能安装在 ~/.openclaw/workspace/skills/，不是 blog/skills/
const MERMAID_TO_IMAGE = '/Users/frankyuan/.openclaw/workspace/skills/mermaid-image-generator/...';
```

**问题 2：Mermaid 代码中的 `\n` 处理**
```javascript
// 错误：Mermaid 代码中使用字面量 \n
graph LR
    A[文字\n换行]  // 这会显示为 "\n" 字符

// 正确：使用真实换行符
graph LR
    A[文字
换行]  // 真实换行
```

**问题 3：API 超时**
- mermaid.ink API 偶尔超时
- 需要重试机制

---

### 阶段 3：批量转换脚本

**最终脚本：** `scripts/convert-mermaid-to-images.js`

```javascript
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const DIAGRAMS_DIR = '/Users/frankyuan/.openclaw/workspace/blog/docs/assets/diagrams';
const MERMAID_TO_IMAGE = '/Users/frankyuan/.openclaw/workspace/skills/mermaid-image-generator/scripts/mermaid-to-image.js';

// 确保输出目录存在
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

function generateFilename(content) {
  const hash = crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
  return `diagram-${hash}.png`;
}

function cleanMermaidCode(code) {
  return code.replace(/%%\{init:[\s\S]*?\}%%\s*/g, '').trim();
}

function mermaidToPng(mermaidCode, outputPath) {
  try {
    execSync(`node "${MERMAID_TO_IMAGE}" - "${outputPath}"`, {
      input: mermaidCode,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf8'
    });
    return true;
  } catch (error) {
    console.error(`转换失败：${error.message}`);
    return false;
  }
}

function processMarkdown(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n```/g;
  let match;
  let count = 0;
  let replaced = 0;
  
  const matches = [];
  while ((match = mermaidRegex.exec(originalContent)) !== null) {
    matches.push({
      fullMatch: match[0],
      mermaidCode: match[1].trim()
    });
  }
  
  for (const item of matches) {
    count++;
    const cleanCode = cleanMermaidCode(item.mermaidCode);
    const filename = generateFilename(cleanCode);
    const outputPath = path.join(DIAGRAMS_DIR, filename);
    const relativePath = path.relative(path.dirname(filePath), outputPath);
    
    if (fs.existsSync(outputPath)) {
      console.log(`✅ 图片已存在：${filename}`);
    } else {
      console.log(`🎨 生成图片：${filename}`);
      const success = mermaidToPng(cleanCode, outputPath);
      if (!success) continue;
    }
    
    const imageMarkdown = `![Diagram](./${relativePath})`;
    content = content.replace(item.fullMatch, imageMarkdown);
    replaced++;
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 文件已更新，替换了 ${replaced}/${count} 个图表`);
  }
  
  return { total: count, replaced };
}

// 主函数
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('用法：node convert-mermaid-to-images.js <markdown-file>');
  process.exit(1);
}

const files = args.map(arg => path.resolve(arg));
let totalDiagrams = 0;
let totalReplaced = 0;

for (const file of files) {
  if (fs.existsSync(file)) {
    const result = processMarkdown(file);
    totalDiagrams += result.total;
    totalReplaced += result.replaced;
  }
}

console.log(`\n✅ 完成！共处理 ${totalDiagrams} 个图表，成功替换 ${totalReplaced} 个`);
```

---

### 阶段 4：验证与修复

#### 验证清单

```bash
# 1. 检查生成的图片文件
ls -lh docs/assets/diagrams/

# 2. 检查文件大小（异常小的文件可能损坏）
find docs/assets/diagrams/ -name "*.png" -size -1K

# 3. 检查 Markdown 中的图片引用
grep "!\[Diagram\]" docs/research/*.md

# 4. 构建博客
npm run docs:build

# 5. 本地预览
npm run docs:preview

# 6. 推送并检查在线效果
git add -A && git commit -m "..." && git push
```

#### 常见问题修复

**问题 A：图片文件太小（< 1KB）**
```bash
# 原因：Mermaid 代码解析失败
# 解决：手动重新生成

cat <<'EOF' | node /path/to/mermaid-to-image.js - output.png
graph LR
    A[正确内容] --> B[测试]
EOF
```

**问题 B：图片显示 `\n` 字符**
```bash
# 原因：Mermaid 代码中使用了字面量 \n
# 解决：使用真实换行符重新生成

# 错误：
echo "graph LR\nA[文字\\n换行]" | ...

# 正确：
cat <<'EOF' | ...
graph LR
A[文字
换行]
EOF
```

---

## 📊 统计结果

| 指标 | 数值 |
|------|------|
| 总图表数 | 11 个 |
| 生成成功 | 11 个 |
| 需要修复 | 2 个（18%） |
| 总耗时 | ~40 分钟 |
| 图片总大小 | ~220K |
| 平均大小 | ~20K/个 |

---

## ✅ 最佳实践总结

### 1. 脚本路径配置

```javascript
// ✅ 正确：使用绝对路径
const MERMAID_TO_IMAGE = '/Users/frankyuan/.openclaw/workspace/skills/mermaid-image-generator/scripts/mermaid-to-image.js';

// ❌ 错误：使用相对路径或错误的工作目录
const MERMAID_TO_IMAGE = path.join(BLOG_DIR, 'skills/...');
```

### 2. Mermaid 代码换行处理

```javascript
// ✅ 正确：使用模板字符串 + 真实换行
const code = `graph LR
    A[第一行
第二行] --> B[测试]`;

// ❌ 错误：使用字面量 \n
const code = "graph LR\n    A[第一行\\n第二行]";
```

### 3. 图片验证

```bash
# 生成后立即验证
ls -lh output.png
file output.png

# 检查是否有效图片（> 1KB）
if [ $(stat -f%z output.png) -lt 1024 ]; then
  echo "⚠️ 图片可能损坏，重新生成"
  # 重新生成逻辑
fi
```

### 4. 错误处理

```javascript
try {
  execSync(cmd, { input: code, stdio: ['pipe', 'pipe', 'pipe'] });
} catch (error) {
  console.error(`生成失败：${error.message}`);
  console.error(`stderr: ${error.stderr}`);
  // 记录失败，稍后手动修复
  failedDiagrams.push({ filename, code, error: error.message });
}
```

### 5. 批量操作的重试机制

```javascript
// 对于批量生成，实现重试
const MAX_RETRIES = 3;
for (let i = 0; i < MAX_RETRIES; i++) {
  if (mermaidToPng(code, output)) break;
  console.log(`重试 ${i + 1}/${MAX_RETRIES}`);
  await sleep(1000);
}
```

---

## 🚀 未来优化建议

### 方案 A：自动化脚本（推荐）

创建 reusable 脚本 `scripts/generate-diagrams.js`：

```bash
# 用法
node scripts/generate-diagrams.js docs/research/xxx.md

# 功能
- 自动提取 Mermaid 代码
- 清理配置指令
- 生成 PNG 图片
- 替换 Markdown 中的代码块
- 验证生成的图片
- 报告失败项
```

### 方案 B：GitHub Actions 自动化

```yaml
# .github/workflows/generate-diagrams.yml
name: Generate Diagrams

on:
  push:
    paths:
      - '**/*.md'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: npm install
      - name: Generate diagrams
        run: node scripts/generate-diagrams.js
      - name: Commit changes
        run: |
          git add docs/assets/diagrams/
          git commit -m "auto: generate diagrams" || true
          git push
```

### 方案 C：保持 VitePress 原生 Mermaid

**优点：**
- ✅ 无需生成图片
- ✅ 自动主题切换
- ✅ 可缩放、可搜索
- ✅ 维护成本低

**缺点：**
- ❌ 无法实现手绘风格
- ❌ 依赖浏览器渲染

---

## 📝 检查清单（Checklist）

### 生成前
- [ ] 确认技能已安装：`openclaw skills list | grep mermaid`
- [ ] 确认脚本路径正确
- [ ] 创建输出目录：`mkdir -p docs/assets/diagrams`

### 生成中
- [ ] 监控生成进度
- [ ] 捕获错误信息
- [ ] 记录失败的图表

### 生成后
- [ ] 检查文件大小（> 1KB）
- [ ] 检查文件格式（JPEG/PNG）
- [ ] 验证 Markdown 引用路径
- [ ] 本地构建测试：`npm run docs:build`
- [ ] 本地预览：`npm run docs:preview`
- [ ] 检查在线效果

### 发布前
- [ ] 所有图片正常显示
- [ ] 无 `\n` 字面量
- [ ] 无损坏图片
- [ ] Git commit 信息清晰
- [ ] Push 到远程仓库

---

## 🎯 关键教训

1. **路径问题最常见** - 始终使用绝对路径
2. **换行符易出错** - 使用模板字符串和真实换行
3. **验证不可少** - 生成后立即检查文件大小
4. **批量操作要重试** - 网络请求可能超时
5. **保留原始代码** - 方便重新生成

---

## 📚 相关资源

- ~~mermaid-image-generator~~ (已移除，使用 `excalidraw-diagram-generator` 替代)
- [Mermaid 语法指南](https://mermaid.js.org/syntax/flowchart.html)
- [VitePress 图片引用](https://vitepress.dev/guide/markdown#images)

---

**最后更新：** 2026-03-27  
**作者：** Craw  
**状态：** ✅ 已验证
