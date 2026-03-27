#!/usr/bin/env node

/**
 * 将博客中的 Mermaid 代码块转换为手绘风格 PNG 图片
 * 
 * 流程：
 * 1. 读取 Markdown 文件
 * 2. 提取所有 mermaid 代码块
 * 3. 调用 mermaid.ink API 生成手绘风格 PNG
 * 4. 替换 Markdown 中的 mermaid 代码块为图片引用
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const crypto = require('crypto');

const BLOG_DIR = '/Users/frankyuan/.openclaw/workspace/blog';
const DIAGRAMS_DIR = path.join(BLOG_DIR, 'docs/assets/diagrams');
const MERMAID_TO_IMAGE = path.join(BLOG_DIR, 'skills/mermaid-image-generator/scripts/mermaid-to-image.js');

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
 * 将 Mermaid 代码转换为 PNG 图片
 */
function mermaidToPng(mermaidCode, outputPath) {
  try {
    // 使用 mermaid.ink API 生成手绘风格图片
    const theme = 'base';
    const backgroundColor = 'transparent';
    
    // 通过 mermaid-to-image 脚本转换
    const cmd = `node "${MERMAID_TO_IMAGE}" - "${outputPath}"`;
    
    execSync(cmd, {
      input: mermaidCode,
      stdio: ['pipe', 'inherit', 'inherit'],
      env: { ...process.env, MERMAID_THEME: theme, MERMAID_BACKGROUND: backgroundColor }
    });
    
    return true;
  } catch (error) {
    console.error(`转换失败：${error.message}`);
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
  
  while ((match = mermaidRegex.exec(originalContent)) !== null) {
    const fullMatch = match[0];
    const mermaidCode = match[1].trim();
    
    // 跳过包含配置指令的 mermaid 块
    if (mermaidCode.includes('%%{init:')) {
      console.log(`  ⏭️  跳过带配置的图表 #${count + 1}`);
      continue;
    }
    
    count++;
    console.log(`  📊 处理图表 #${count}`);
    
    // 生成文件名
    const filename = generateFilename(mermaidCode);
    const outputPath = path.join(DIAGRAMS_DIR, filename);
    const relativePath = path.relative(path.dirname(filePath), outputPath);
    
    // 如果图片已存在，跳过生成
    if (fs.existsSync(outputPath)) {
      console.log(`    ✅ 图片已存在：${filename}`);
    } else {
      // 生成图片
      console.log(`    🎨 生成图片：${filename}`);
      const success = mermaidToPng(mermaidCode, outputPath);
      
      if (!success) {
        console.log(`    ❌ 生成失败，保留原始 Mermaid 代码`);
        continue;
      }
    }
    
    // 替换为图片引用
    const imageMarkdown = `![Diagram](./${relativePath})`;
    content = content.replace(fullMatch, imageMarkdown);
  }
  
  // 保存修改后的文件
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ 文件已更新`);
  } else {
    console.log(`  ℹ️  无修改`);
  }
  
  return count;
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法：node convert-mermaid-to-png.js <markdown-file>');
    console.log('示例：node convert-mermaid-to-png.js docs/research/claude-code-auto-dream.md');
    process.exit(1);
  }
  
  const files = args.map(arg => path.resolve(arg));
  let totalDiagrams = 0;
  
  files.forEach(file => {
    if (fs.existsSync(file)) {
      const count = processMarkdown(file);
      totalDiagrams += count;
    } else {
      console.error(`文件不存在：${file}`);
    }
  });
  
  console.log(`\n✅ 完成！共处理 ${totalDiagrams} 个图表`);
  console.log(`📁 图片保存位置：${DIAGRAMS_DIR}`);
}

main();
