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
  
});
