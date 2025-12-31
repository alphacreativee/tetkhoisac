export function scrollToTop() {
  document.querySelector(".back-to-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
export function swiperSong() {
  if (!document.querySelector(".swiper-music")) return;
  var swiper = new Swiper(".swiper-music", {
    slidesPerView: 3,
    spaceBetween: -10,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
export function swiperTickets() {
  if (!document.querySelector(".swiper-tickets")) return;
  var swiper = new Swiper(".swiper-tickets", {
    slidesPerView: 5,
    spaceBetween: 24,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}
