# 文章分享组件

在文章末尾添加分享按钮，支持：
- 复制链接
- 微信分享（生成二维码）

## 使用方法

在文章 frontmatter 中添加：

```yaml
---
share: true
---
```

## 实现方式

由于 VitePress 是静态站点，分享功能通过客户端 JavaScript 实现：

1. **复制链接**：使用 Clipboard API
2. **微信分享**：生成二维码，用户截图分享

## 代码示例

```html
<div class="article-share">
  <button class="share-button copy" onclick="copyLink()">
    🔗 复制链接
  </button>
  <button class="share-button wechat" onclick="showQRCode()">
    💬 微信分享
  </button>
</div>

<script>
function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert('链接已复制！');
}

function showQRCode() {
  // 显示二维码
}
</script>
```
