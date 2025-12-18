document.addEventListener("DOMContentLoaded", () => {
  // Banner pin parallax effect
  document.querySelectorAll(".footer-link").forEach((link) => {
    const text = link.textContent.trim();
    link.innerHTML = `<span>${text}</span>`;
    link.setAttribute("title", text);
  });

  gsap.to(".video-wrapper", {
    scrollTrigger: {
      trigger: ".hero-banner",
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: false,
    },
  });

  //  nav animation when scrolling

  // Hide header on scroll down, show on scroll up
  let lastScroll = 0;
  const header = document.getElementById("main-header");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll) {
      // Scrolling down - hide header
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up - show header
      header.style.transform = "translateY(0)";
    }

    // Always show header when back at the very top
    if (currentScroll <= 0) {
      header.style.transform = "translateY(0)";
    }

    lastScroll = currentScroll;
  });

  // header logo resize while scrolling
  document.addEventListener("DOMContentLoaded", function () {
    const logo = document.getElementById("logo-img");
    const banner = document.querySelector(".video-wrapper");

    function onScroll() {
      // Distance from top of viewport to bottom of the banner
      const bannerBottom = banner.getBoundingClientRect().bottom;

      if (bannerBottom <= 0) {
        // Scrolled past the banner - shrink logo
        logo.classList.add("shrink");
      } else {
        // Banner in view - default logo
        logo.classList.remove("shrink");
      }
    }

    window.addEventListener("scroll", onScroll);
  });

  //  nav link color changing by section
    const links = document.querySelectorAll(".header-links");
    const darkSections = document.querySelectorAll(".dark-bg");

    function updateHeaderLinksColor() {
      let shouldBeWhite = false;

      // Check if any dark section is at the top of the viewport
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 60 && rect.bottom >= 60) {
          // 60 = header height
          shouldBeWhite = true;
        }
      });

      links.forEach((link) => {
        if (shouldBeWhite) {
          link.classList.add("white");
          link.classList.remove("black");
        } else {
          link.classList.add("black");
          link.classList.remove("white");
        }
      });
    }

    window.addEventListener("scroll", updateHeaderLinksColor);
    updateHeaderLinksColor(); // On page load
});
