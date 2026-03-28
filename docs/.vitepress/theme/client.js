/**
 * 全局客户端脚本
 * 在浏览器中运行，添加分享功能和阅读时间
 */

// 等待页面加载
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initShareButtons();
    initReadingTime();
  });
}

/**
 * 初始化分享按钮
 */
function initShareButtons() {
  // 检查是否有分享容器
  const shareContainer = document.querySelector('.article-share');
  if (!shareContainer) return;

  // 复制按钮
  const copyBtn = shareContainer.querySelector('.share-button.copy');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '✅ 已复制';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 2000);
      }).catch(() => {
        alert('复制失败，请手动复制链接');
      });
    });
  }

  // 微信分享按钮
  const wechatBtn = shareContainer.querySelector('.share-button.wechat');
  if (wechatBtn) {
    wechatBtn.addEventListener('click', () => {
      showQRCodeModal();
    });
  }
}

/**
 * 显示二维码弹窗
 */
function showQRCodeModal() {
  const url = window.location.href;
  const title = document.title;
  
  // 使用 QR Server API 生成二维码
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(url)}`;
  
  // 创建弹窗
  const modal = document.createElement('div');
  modal.className = 'qr-modal';
  modal.innerHTML = `
    <div class="qr-modal-content">
      <div class="qr-modal-header">
        <h3>💬 微信分享</h3>
        <button class="qr-modal-close">&times;</button>
      </div>
      <div class="qr-modal-body">
        <p>扫描二维码或截图分享</p>
        <img src="${qrCodeUrl}" alt="分享二维码" class="qr-code-image" />
        <p class="qr-modal-url">${url}</p>
      </div>
    </div>
  `;
  
  // 添加样式
  const style = document.createElement('style');
  style.textContent = `
    .qr-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .qr-modal-content {
      background: var(--vp-c-bg);
      border-radius: 12px;
      padding: 1.5rem;
      max-width: 400px;
      width: 90%;
    }
    .qr-modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .qr-modal-header h3 {
      margin: 0;
    }
    .qr-modal-close {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--vp-c-text-2);
    }
    .qr-modal-body {
      text-align: center;
    }
    .qr-code-image {
      max-width: 100%;
      border-radius: 8px;
      margin: 1rem 0;
    }
    .qr-modal-url {
      font-size: 0.75rem;
      color: var(--vp-c-text-3);
      word-break: break-all;
    }
  `;
  document.head.appendChild(style);
  document.body.appendChild(modal);
  
  // 关闭按钮
  modal.querySelector('.qr-modal-close').addEventListener('click', () => {
    modal.remove();
    style.remove();
  });
  
  // 点击背景关闭
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
      style.remove();
    }
  });
}

/**
 * 初始化阅读时间显示
 */
function initReadingTime() {
  // 查找文章内容
  const content = document.querySelector('.vp-doc');
  if (!content) return;
  
  // 计算字数
  const text = content.textContent || '';
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  const totalWords = chineseChars + englishWords;
  
  // 计算阅读时间（300 字/分钟）
  const minutes = Math.ceil(totalWords / 300) || 1;
  
  // 查找合适的位置插入阅读时间
  const h1 = content.querySelector('h1');
  if (h1) {
    const readingTime = document.createElement('span');
    readingTime.className = 'reading-time';
    readingTime.innerHTML = `⏱️ ${minutes} 分钟阅读`;
    h1.appendChild(readingTime);
  }
}
