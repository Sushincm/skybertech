document.addEventListener('DOMContentLoaded', function () {
  const panel = document.getElementById('mobileContactPanel');
  const openBtn = document.getElementById('phoneToggleBtn');
  const closeBtn = document.getElementById('panelCloseBtn');

  if (!panel || !openBtn || !closeBtn) return;

  function openPanel() {
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closePanel() {
    panel.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);

  panel.addEventListener('click', function (e) {
    if (e.target === panel) {
      closePanel();
    }
  });
});
