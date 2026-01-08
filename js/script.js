document.addEventListener("DOMContentLoaded", () => {
  // ---------------- Lenis ----------------
  const lenis = new Lenis({
    duration: 1.2,
    smooth: true,
    autoRaf: true,
  });

  window.addEventListener("load", () => {
    lenis.resize();
  });

  document.querySelectorAll("img[loading='lazy']").forEach((img) => {
    img.addEventListener("load", () => lenis.resize());
  });

  gsap.registerPlugin(ScrollTrigger);

  // ---------------- ScrollTrigger <-> Lenis proxy ----------------
  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value) {
      if (arguments.length) {
        lenis.scrollTo(value, { immediate: true });
      }
      // return current scroll
      return document.documentElement.scrollTop || window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.documentElement.style.transform ? "transform" : "fixed",
  });

  function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // When the page resizes or loads, refresh ScrollTrigger so markers/positions are correct
  window.addEventListener("load", () => ScrollTrigger.refresh());
  window.addEventListener("resize", () => ScrollTrigger.refresh());

  const h3 = document.getElementById("animated-text");


  const fullText = h3.textContent
    .replace(/\s+/g, " ")
    .trim(); 

  h3.innerHTML = ""; 

 
  for (const ch of fullText) {
    const span = document.createElement("span");

    if (ch === " ") {
      span.innerHTML = "&nbsp;";
      span.classList.add("letter", "space");
    } else {
      span.textContent = ch;
      span.classList.add("letter");
    }

    h3.appendChild(span);
  }

  const letters = h3.querySelectorAll(".letter");

  // Ensure initial state
  gsap.set(letters, { opacity: 0.5, y: 6 });

  // ---------------- The scroll-based letter-by-letter opacity animation ----------------
  gsap.to(letters, {
    opacity: 1,
    ease: "none",
    stagger: 0.02,
    scrollTrigger: {
      scroller: document.documentElement,
      trigger: ".text-fade-para",
      start: "top 80%",
      end: "top 30%",
      scrub: true,
      markers: false,
      invalidateOnRefresh: true,
      onUpdate(self) {
        if (self.progress >= 1) {
          gsap.set(letters, { opacity: 1 });
        }
      },
    },
  });

  // Location fade

  gsap.registerPlugin(ScrollTrigger);

  const stops = [
    [255, 255, 255], // pure white highlight
    [220, 220, 220],
    [200, 200, 200],
    [180, 180, 180],
    [160, 160, 160], // light gray
  ];

  const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
  const lerp = (a, b, t) => a + (b - a) * t;

  function interpColor(progress) {
    const scaled = progress * (stops.length - 1);
    const i = Math.floor(clamp(scaled, 0, stops.length - 1));
    const t = clamp(scaled - i, 0, 1);
    const c1 = stops[i];
    const c2 = stops[i + 1] || c1;
    const r = Math.round(lerp(c1[0], c2[0], t));
    const g = Math.round(lerp(c1[1], c2[1], t));
    const b = Math.round(lerp(c1[2], c2[2], t));
    return `rgb(${r}, ${g}, ${b})`;
  }

  // handle custom scroller (if lenis used)
  let scrollerElement = document.documentElement;
  if (typeof lenis !== "undefined" && lenis && lenis.wrapper) {
    scrollerElement = lenis.wrapper;
  }

  const spans = document.querySelectorAll(".location-fade h2 span");

  spans.forEach((span) => {
    ScrollTrigger.create({
      trigger: span,
      start: "top 100%",
      end: "bottom 0%",
      scrub: true,
      scroller: scrollerElement,
      // markers: true,
      onUpdate: (self) => {
        const rect = span.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(rect.top + rect.height / 2 - viewportCenter);
        const maxDistance = window.innerHeight / 2;

        // map distance to progress
        const progress = 1 - clamp(distance / maxDistance, 0, 1);

        // only visible within "spotlight" (around center)
        const visibleRange = 0.35; // adjust to widen/narrow spotlight
        const fadeStrength = 1 - Math.abs(progress - 1) / visibleRange;

        // only show if within visible range (6–7 items around center)
        if (fadeStrength > 0) {
          span.style.opacity = fadeStrength;
          span.style.color = interpColor(progress);
        } else {
          span.style.opacity = 0;
        }
      },
    });
  });
});
