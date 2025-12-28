document.addEventListener("DOMContentLoaded", function () {
  $(function () {
    $(".solutions-carousel").owlCarousel({
      loop: true,
      margin: 24,
      nav: true,
      dots: false,
      autoplay: true,
      responsive: {
        0: {
          // mobile: show 1 card
          items: 1,
        },
        576: {
          // small tablets: 2 cards
          items: 2,
        },
        992: {
          // desktops: 4 cards (like your row)
          items: 4,
        },
      },
    });
  });
  //  Header top  owl carousel
  $(function () {
    $(".studio-owl").owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 3500,
      autoplayHoverPause: true,

      stagePadding: 0,
      margin: 10,

      responsive: {
        0: { items: 1 },
        550: { items: 2 },
        991: { items: 3 },
      },
    });
  });
});
