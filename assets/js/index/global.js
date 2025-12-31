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
    navigation: {
      nextEl: ".music-slider .swiper-button-next",
      prevEl: ".music-slider .swiper-button-prev",
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
export function scrollToSection() {
  gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

  const menuLinks = document.querySelectorAll(".header-menu a");
  const sections = document.querySelectorAll("section[id]");

  // Click để scroll
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      menuLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");

      const targetId = this.getAttribute("href");

      gsap.to(window, {
        duration: 0.5,
        scrollTo: {
          y: targetId,
          offsetY: 0,
        },
        ease: "none",
      });
    });
  });

  // Tự động active khi scroll
  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => updateActiveLink(section.id),
      onEnterBack: () => updateActiveLink(section.id),
    });
  });

  function updateActiveLink(sectionId) {
    menuLinks.forEach((link) => link.classList.remove("active"));
    const activeLink = document.querySelector(
      `.header-menu a[href="#${sectionId}"]`
    );
    if (activeLink) activeLink.classList.add("active");
  }
}
