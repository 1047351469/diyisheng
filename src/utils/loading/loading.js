app.directive('loading', {
    mounted(el, binding) {
      if (binding.value) {
        el.classList.add('loading-active');
        el.style.position = 'relative';
  
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
          <div class="loading-spinner"></div>
          <p class="loading-text">加载中...</p>
        `;
        el.appendChild(overlay);
      } else {
        const overlay = el.querySelector('.loading-overlay');
        if (overlay) overlay.remove();
        el.classList.remove('loading-active');
      }
    },
    updated(el, binding) {
      const overlay = el.querySelector('.loading-overlay');
      if (binding.value && !overlay) {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
          <div class="loading-spinner"></div>
          <p class="loading-text">加载中...</p>
        `;
        el.appendChild(overlay);
      } else if (!binding.value && overlay) {
        overlay.remove();
      }
    },
  });
  