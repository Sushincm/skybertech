document.addEventListener("DOMContentLoaded", () => {
  function wrapWords(el) {
    el.querySelectorAll("p").forEach((p) => {
      const words = p.textContent.trim().split(/\s+/);
      p.innerHTML =
        words.map((w) => `<span class="word">${w}</span>`).join(" ") + " ";
    });
  }

  document.querySelectorAll(".js-word-reveal").forEach((section) => {
    wrapWords(section);

    const words = section.querySelectorAll(".word");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 70%",
        end: "bottom 40%",
        scrub: true,
        pinSpacing: true,
      },
    });

    tl.fromTo(
      words,
      { opacity: 0, y: 10, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        ease: "none",
        stagger: 0.02,
      }
    );
  });
});
