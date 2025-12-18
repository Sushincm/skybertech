document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);
  const expandBg = document.querySelector(".expand-bg-img");
  const imageGap = document.querySelector(".image-gap");
  const toSide = document.querySelector(".to-side");
  const globalSide = document.querySelector(".global-side");
  const toGlobalRow = document.querySelector(".to-global-row");
  const bgImg = expandBg.querySelector(".nitex-bg-img");
  const heading = document.querySelector(".nitex-hero-heading");

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".nitex-hero-section",
      start: "top top",
      end: "bottom top",
      scrub: 0.8,
      pin: true,
      markers: false,
    },
  });

  tl.to(
    expandBg,
    {
      left: "50%",
      top: "50%",
      width: "100vw",
      height: "100vh",
      borderRadius: "0vw",
      boxShadow: "0 8px 64px rgba(0,0,0,0.22)",
      transform: "translate(-50%, -50%)",
      ease: "power2.out",
    },
    0
  );

  tl.to(imageGap, { width: "0em", ease: "power2.out" }, 0.1);
  tl.to(toGlobalRow, { gap: 0, ease: "power2.out" }, 0.1);

  tl.fromTo(
    toSide,
    { x: "-2lh", marginRight: "45px" },
    { x: "0lh", marginRight: "0px", ease: "power2.out" },
    0.1
  );
  tl.fromTo(globalSide, { x: "2lh" }, { x: "0lh", ease: "power2.out" }, 0.1);

  tl.to(heading, { color: "#fff", ease: "power2.inOut" }, 0.15);
});
