document.addEventListener('DOMContentLoaded', function () {
  const counters = document.querySelectorAll('.counter-up');

  const animate = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const value = Math.floor(progress * target);

      el.textContent = value + suffix;

      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target + suffix;
    };

    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  counters.forEach((el) => observer.observe(el));
});
