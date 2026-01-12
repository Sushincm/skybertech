document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".webleieve");
  const lines = gsap.utils.toArray(".webleieve .we-line");
  if (!section || lines.length < 2) return;

  gsap.set(lines, { opacity: 0, y: 18, filter: "blur(10px)" });
  gsap.set(lines[0], { opacity: 1, y: 0, filter: "blur(0px)" });

  const transitions = lines.length - 1;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top top",
      end: `+=${transitions * 140}%`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      anticipatePin: 1,
      pinType: "transform",   
      invalidateOnRefresh: true
      // markers: true
    },
    defaults: { ease: "none" }
  });

  for (let i = 1; i < lines.length; i++) {
    tl.to(lines[i - 1], { opacity: 0, y: -18, filter: "blur(10px)", duration: 1 }, "+=0.35");
    tl.to(lines[i],     { opacity: 1, y: 0,   filter: "blur(0px)",  duration: 1 }, "<");
  }
});
