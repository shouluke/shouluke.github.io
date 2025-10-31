(function() {
  // ----------------------
  // 相对时间功能
  // ----------------------
  function formatRelativeTime(dateStr) {
    const now = new Date();
    const past = new Date(dateStr);
    const diff = (now - past) / 1000; // 秒

    if (diff < 60) return `${Math.floor(diff)}秒前`;
    if (diff < 3600) return `${Math.floor(diff / 60)}分钟前`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}小时前`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}天前`;

    const year = past.getFullYear();
    const month = past.getMonth() + 1;
    const day = past.getDate();
    if (year !== now.getFullYear()) {
      return `${year}年${month}月${day}日`;
    }
    return `${month}月${day}日`;
  }

  function updateRelativeTime(container = document) {
    container.querySelectorAll('.datetime').forEach(el => {
      const timeStr = el.getAttribute('datetime');
      if (timeStr) el.textContent = formatRelativeTime(timeStr);
    });
  }

  // ----------------------
  // 评论按钮跳转 Waline 功能
  // ----------------------
  function getWalineTextarea() {
    return document.querySelector('#waline textarea') || document.querySelector('#waline input[type="text"]');
  }

  function bindCommentButtons(container = document) {
    container.querySelectorAll('.essay-comment-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const momentText = btn.getAttribute('data-moment-text');
        const textarea = getWalineTextarea();
        if (!textarea) return;

        // 滚动到评论框
        textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // 自动填充引用文本
        textarea.value = `> ${momentText}\n\n`;
        textarea.focus();
      });
    });
  }

  // ----------------------
  // 初始化函数
  // ----------------------
  function init(container = document) {
    updateRelativeTime(container);
    bindCommentButtons(container);
  }

  // 页面首次加载
  init(document);

  // PJAX 切换后重新初始化
  document.addEventListener('pjax:success', () => {
    init(document);
  });
})();
