document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer");
  let targetX = 50,
    targetY = 50;
  let currentX = 50,
    currentY = 50;

  footer.addEventListener("mousemove", function (e) {
    const rect = footer.getBoundingClientRect();
    targetX = ((e.clientX - rect.left) / rect.width) * 100;
    targetY = ((e.clientY - rect.top) / rect.height) * 100;
  });

  function animate() {
    // Slowly interpolate (lerp) currentX/Y towards targetX/Y
    currentX += (targetX - currentX) * 0.13; // 0.13 for faster, lower for slower
    currentY += (targetY - currentY) * 0.13;
    footer.style.setProperty("--x", `${currentX}%`);
    footer.style.setProperty("--y", `${currentY}%`);
    requestAnimationFrame(animate);
  }
  animate();

  footer.addEventListener("mouseleave", function () {
    targetX = 50;
    targetY = 50;
  });
});
