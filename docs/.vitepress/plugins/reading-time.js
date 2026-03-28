/**
 * 计算阅读时间
 * 假设平均阅读速度：300 字/分钟（中文）
 */

export function calculateReadingTime(content) {
  // 移除代码块、链接等 markdown 语法
  const text = content
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/`[^`]+`/g, '') // 行内代码
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '') // 图片
    .replace(/^[#\-*>]+/gm, '') // 列表和引用符号
    .trim();
  
  // 中文字符数
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  // 英文字符数（按单词计）
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  
  // 总字数（中文 + 英文单词）
  const totalWords = chineseChars + englishWords;
  
  // 阅读速度：300 字/分钟
  const minutes = Math.ceil(totalWords / 300);
  
  return Math.max(1, minutes); // 至少 1 分钟
}

/**
 * 格式化阅读时间显示
 */
export function formatReadingTime(minutes) {
  if (minutes < 1) return '1 分钟';
  if (minutes === 1) return '1 分钟';
  return `${minutes} 分钟`;
}
