#!/usr/bin/env node

/**
 * 将博客中的 Mermaid 代码块转换为手绘风格 PNG 图片
 * 
 * 流程：
 * 1. 读取 Markdown 文件
 * 2. 提取所有 mermaid 代码块（去除配置）
 * 3. 使用 mermaid.ink API 生成手绘风格 PNG
 * 4. 替换 Markdown 中的 mermaid 代码块为图片引用
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const BLOG_DIR = '/Users/frankyuan/.openclaw/workspace/blog';
const DIAGRAMS_DIR = path.join(BLOG_DIR, 'docs/assets/diagrams');

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
 * 使用 mermaid.ink API 生成手绘风格 PNG
 */
async function mermaidToPng(mermaidCode, outputPath) {
  try {
    // 使用 mermaid.ink API
    // 文档：https://github.com/mermaid-js/mermaid-ink
    
    // 构建 JSON 配置
    const config = {
      code: mermaidCode,
      mermaid: {
        theme: 'base',
        themeVariables: {
          fontFamily: 'Comic Sans MS',
          fontSize: '16px'
        },
        flowchart: {
          curve: 'basis' // 手绘风格曲线
        }
      },
      backgroundColor: 'transparent'
    };
    
    const postData = JSON.stringify(config);
    
    const options = {
      hostname: 'mermaid.ink',
      port: 443,
      path: '/img',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    return new Promise((resolve, reject) => {
      const req = https.request(options, (response) => {
        if (response.statusCode !== 200) {
          reject(new Error(`HTTP ${response.statusCode}`));
          return;
        }
        
        const chunks = [];
        response.on('data', chunk => chunks.push(chunk));
        response.on('end', () => {
          const buffer = Buffer.concat(chunks);
          fs.writeFileSync(outputPath, buffer);
          resolve(true);
        });
      });
      
      req.on('error', reject);
      req.write(postData);
      req.end();
    });
    
  } catch (error) {
    console.error(`    ❌ 转换失败：${error.message}`);
    return false;
  }
}

/**
 * 处理 Markdown 文件
 */
async function processMarkdown(filePath) {
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
    
    // 生成文件名
    const filename = generateFilename(cleanCode);
    const outputPath = path.join(DIAGRAMS_DIR, filename);
    const relativePath = path.relative(path.dirname(filePath), outputPath);
    
    // 如果图片已存在，跳过生成
    if (fs.existsSync(outputPath)) {
      console.log(`    ✅ 图片已存在：${filename}`);
    } else {
      // 生成图片
      console.log(`    🎨 生成手绘风格图片：${filename}`);
      const success = await mermaidToPng(cleanCode, outputPath);
      
      if (!success) {
        console.log(`    ❌ 生成失败，保留原始 Mermaid 代码`);
        continue;
      }
    }
    
    // 替换为图片引用
    const imageMarkdown = `![Diagram](./${relativePath})`;
    content = content.replace(item.fullMatch, imageMarkdown);
    replaced++;
    
    // 等待一下，避免 API 限流
    await new Promise(resolve => setTimeout(resolve, 500));
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
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('用法：node convert-mermaid-to-handrawn.js <markdown-file>');
    console.log('示例：node convert-mermaid-to-handrawn.js docs/research/claude-code-auto-dream.md');
    process.exit(1);
  }
  
  const files = args.map(arg => path.resolve(arg));
  let totalDiagrams = 0;
  let totalReplaced = 0;
  
  for (const file of files) {
    if (fs.existsSync(file)) {
      const result = await processMarkdown(file);
      totalDiagrams += result.total;
      totalReplaced += result.replaced;
    } else {
      console.error(`文件不存在：${file}`);
    }
  }
  
  console.log(`\n✅ 完成！共处理 ${totalDiagrams} 个图表，成功替换 ${totalReplaced} 个`);
  console.log(`📁 图片保存位置：${DIAGRAMS_DIR}`);
}

main().catch(console.error);
