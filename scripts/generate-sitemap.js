#!/usr/bin/env node

/**
 * 生成 sitemap.xml 用于 SEO
 * 用法：node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://yufengyuanx.github.io/blog';
const DOCS_DIR = path.join(__dirname, '..', 'docs');

// 需要排除的文件和目录
const EXCLUDE_PATTERNS = [
  '.vitepress',
  'node_modules',
  'package.json',
  '404.md',
  'index.md', // 首页单独处理
];

// 扫描 markdown 文件
function scanMarkdownFiles(dir, relativePath = '') {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(relativePath, entry.name);

    // 跳过排除项
    if (EXCLUDE_PATTERNS.some(pattern => relPath.includes(pattern))) {
      continue;
    }

    if (entry.isDirectory()) {
      files.push(...scanMarkdownFiles(fullPath, relPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // 转换为 URL 路径
      let urlPath = relPath
        .replace(/\.md$/, '')
        .replace(/\\/g, '/');
      
      // index.md 转换为目录
      if (urlPath.endsWith('/index') || urlPath === 'index') {
        urlPath = urlPath.replace(/\/index$/, '') || '';
      }
      
      files.push(urlPath);
    }
  }

  return files;
}

// 生成 sitemap.xml
function generateSitemap() {
  const files = scanMarkdownFiles(DOCS_DIR);
  
  // 添加首页
  files.unshift('');
  
  const today = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const file of files) {
    const url = `${BASE_URL}/${file}`.replace(/\/+/g, '/');
    sitemap += `  <url>
    <loc>${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${file === '' ? '1.0' : file.includes('100-skills') ? '0.8' : '0.6'}</priority>
  </url>
`;
  }

  sitemap += `</urlset>
`;

  // 写入 public 目录（VitePress 构建时会复制到输出目录）
  const publicDir = path.join(DOCS_DIR, '.vitepress', 'dist');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }
  
  const outputPath = path.join(DOCS_DIR, 'public', 'sitemap.xml');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, sitemap, 'utf-8');
  
  console.log(`✅ sitemap.xml 已生成：${outputPath}`);
  console.log(`📊 共 ${files.length} 个页面`);
}

generateSitemap();
