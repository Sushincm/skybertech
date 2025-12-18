document.addEventListener("DOMContentLoaded", () => {
  // Timer display logic
  function formatTime(sec) {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(Math.floor(sec % 60)).padStart(2, "0");
    return `${h}:${m}:${s}`;
  }

  const playBtn = document.getElementById("play-trigger");
  const overlay = document.getElementById("video-overlay");
  const closeBtn = document.getElementById("close-overlay");
  const video = document.getElementById("full-video");
  const timer = document.getElementById("custom-timer");

  playBtn.onclick = function () {
    video.currentTime = 0;
    overlay.style.display = "flex";
    gsap.set(overlay, { y: "100%", opacity: 1, pointerEvents: "all" });
    gsap.to(overlay, {
      y: "0%",
      duration: 1.1,
      ease: "power4.inOut",
      onComplete: () => {
        video.play();
      },
    });
  };

  closeBtn.onclick = function () {
    gsap.to(overlay, {
      y: "100%",
      duration: 1,
      ease: "power4.inOut",
      onComplete: () => {
        overlay.style.display = "none";
        overlay.style.opacity = 0;
        overlay.style.pointerEvents = "none";
        video.pause();
        video.currentTime = 0;
      },
    });
  };

  // Custom timer logic
  video.addEventListener("timeupdate", () => {
    timer.textContent = formatTime(video.currentTime);
  });
  video.addEventListener("loadeddata", () => {
    timer.textContent = formatTime(0);
  });
});
