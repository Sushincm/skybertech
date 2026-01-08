// spinner rotation
gsap.to(".spinner", {
  rotation: 360,
  repeat: -1,
  ease: "linear",
  duration: 1
});

// check localStorage
const hasLoadedBefore = localStorage.getItem("siteLoaded");

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");

  if (!hasLoadedBefore) {
    // first visit → show loader animation
    gsap.timeline()
      .to(".spinner", { scale: 0.6, duration: 0.3 })
      .to("#loader", {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          loader.style.display = "none";
          localStorage.setItem("siteLoaded", "true");
        }
      });
  } else {
    // already visited → skip loader
    loader.style.display = "none";
  }
});
