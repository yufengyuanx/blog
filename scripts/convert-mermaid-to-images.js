#!/usr/bin/env node

/**
 * 将博客中的 Mermaid 代码块转换为手绘风格 PNG 图片
 * 
 * 流程：
 * 1. 读取 Markdown 文件
 * 2. 提取所有 mermaid 代码块（去除配置）
 * 3. 使用 mermaid-image-generator 生成 PNG
 * 4. 替换 Markdown 中的 mermaid 代码块为图片引用
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const BLOG_DIR = '/Users/frankyuan/.openclaw/workspace/blog';
const DIAGRAMS_DIR = path.join(BLOG_DIR, 'docs/assets/diagrams');
const MERMAID_TO_IMAGE = '/Users/frankyuan/.openclaw/workspace/skills/mermaid-image-generator/scripts/mermaid-to-image.js';

// 确保输出目录存在
if (!fs.existsSync(DIAGRAMS_DIR)) {
  fs.mkdirSync(DIAGRAMS_DIR, { recursive: true });
}

/**
 * 生成唯一的文件名
 */
function generateFilename(content) {
  const hash = crypto.createHash('md5').update(content).digest('hex').substring(0, 8);
  return `diagram-${hash}.png`;
}

/**
 * 清理 Mermaid 代码（移除配置指令）
 */
function cleanMermaidCode(code) {
  // 移除 %%{init:...}%% 配置
  return code.replace(/%%\{init:[\s\S]*?\}%%\s*/g, '').trim();
}

/**
 * 使用 mermaid-to-image 脚本生成 PNG
 */
function mermaidToPng(mermaidCode, outputPath) {
  try {
    const cmd = `node "${MERMAID_TO_IMAGE}" - "${outputPath}"`;
    
    execSync(cmd, {
      input: mermaidCode,
      stdio: ['pipe', 'pipe', 'pipe'],
      encoding: 'utf8'
    });
    
    return true;
  } catch (error) {
    console.error(`    ❌ 转换失败：${error.message}`);
    if (error.stderr) {
      console.error(`       ${error.stderr}`);
    }
    return false;
  }
}

/**
 * 处理 Markdown 文件
 */
function processMarkdown(filePath) {
  console.log(`\n📝 处理文件：${filePath}`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // 匹配所有 mermaid 代码块
  const mermaidRegex = /```mermaid\s*\n([\s\S]*?)\n```/g;
  let match;
  let count = 0;
  let replaced = 0;
  
  const matches = [];
  while ((match = mermaidRegex.exec(originalContent)) !== null) {
    matches.push({
      fullMatch: match[0],
      mermaidCode: match[1].trim(),
      index: match.index
    });
  }
  
  for (const item of matches) {
    count++;
    console.log(`  📊 处理图表 #${count}`);
    
    // 清理 Mermaid 代码（移除配置）
    const cleanCode = cleanMermaidCode(item.mermaidCode);
    
    console.log(`    📝 Mermaid 代码长度：${cleanCode.length} 字符`);
    
    // 生成文件名
    const filename = generateFilename(cleanCode);
    const outputPath = path.join(DIAGRAMS_DIR, filename);
    const relativePath = path.relative(path.dirname(filePath), outputPath);
    
    // 如果图片已存在，跳过生成
    if (fs.existsSync(outputPath)) {
      console.log(`    ✅ 图片已存在：${filename}`);
    } else {
      // 生成图片
      console.log(`    🎨 生成图片：${filename}`);
      const success = mermaidToPng(cleanCode, outputPath);
      
      if (!success) {
        console.log(`    ❌ 生成失败，保留原始 Mermaid 代码`);
        continue;
      }
      
      console.log(`    ✅ 图片生成成功：${filename}`);
    }
    
    // 替换为图片引用
    const imageMarkdown = `![Diagram](./${relativePath})`;
    content = content.replace(item.fullMatch, imageMarkdown);
    replaced++;
  }
  
  // 保存修改后的文件
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ 文件已更新，替换了 ${replaced}/${count} 个图表`);
  } else {
    console.log(`  ℹ️  无修改`);
  }
  
  return { total: count, replaced };
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法：node convert-mermaid-to-images.js <markdown-file>');
    console.log('示例：node convert-mermaid-to-images.js docs/research/claude-code-auto-dream.md');
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
    } else {
      console.error(`文件不存在：${file}`);
    }
  }
  
  console.log(`\n✅ 完成！共处理 ${totalDiagrams} 个图表，成功替换 ${totalReplaced} 个`);
  console.log(`📁 图片保存位置：${DIAGRAMS_DIR}`);
}

main();
