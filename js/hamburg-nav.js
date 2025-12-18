document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.hamburg');
  const menu = document.querySelector('.hamburg-menu');
  const closeButton = document.querySelector('.ham-close');

  menuButton.addEventListener('click', function () {
    menu.classList.add('active');
  });

  closeButton.addEventListener('click', function () {
    menu.classList.remove('active');
  });
});
