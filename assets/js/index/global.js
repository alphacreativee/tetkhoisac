export function scrollToTop() {
  document.querySelector(".back-to-top").addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
export function swiperSong() {
  if (!document.querySelector(".swiper-music")) return;
  var musicSwiper = new Swiper(".swiper-music", {
    slidesPerView: 1,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    speed: 600,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },

    breakpoints: {
      992: {
        slidesPerView: 3,
        spaceBetween: -10,
      },
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    navigation: {
      nextEl: ".music-slider .swiper-button-next",
      prevEl: ".music-slider .swiper-button-prev",
    },

    on: {
      init() {
        handleAutoplay(this);
      },
      resize() {
        handleAutoplay(this);
      },
    },
  });
}
export function handleAutoplay(musicSwiper) {
  if (window.innerWidth >= 992) {
    musicSwiper.autoplay.stop();
  } else {
    musicSwiper.autoplay.start();
  }
}
export function swiperTickets() {
  if (!document.querySelector(".swiper-tickets")) return;
  var swiper = new Swiper(".swiper-tickets", {
    slidesPerView: 5,
    spaceBetween: 24,
    slidesOffsetAfter: 0,
    breakpoints: {
      0: {
        slidesPerView: 2.8,
        spaceBetween: 13,
        slidesOffsetAfter: 13,
      },
      480: {
        slidesPerView: 3.5,
        slidesOffsetAfter: 13,
      },
      992: {
        slidesPerView: 5,
        spaceBetween: 24,
        slidesOffsetAfter: 0,
      },
    },

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
  const headerMenu = document.querySelector(".header-menu");
  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      menuLinks.forEach((item) => item.classList.remove("active"));
      this.classList.add("active");
      if (window.innerWidth <= 991) {
        headerMenu.classList.remove("active");
      }
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

  sections.forEach((section) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onEnter: () => updateActiveLink(section.id),
      onEnterBack: () => updateActiveLink(section.id),
      onLeave: () => {},
      onLeaveBack: () => {
        if (section === sections[0]) {
          menuLinks.forEach((link) => link.classList.remove("active"));
        }
      },
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
export function animation() {
  gsap.utils.toArray("[data-fade-in]").forEach((element) => {
    const direction = element.getAttribute("data-parallax-direction") || "up";
    const distance = element.getAttribute("data-parallax-distance") || 80;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 75%",
          end: "bottom 75%",
        },
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "sine.out",
      }
    );

    gsap.to(element, {
      y: direction === "down" ? distance : -distance,
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  });
}
export function countdownTimer() {
  const countdownEl = document.querySelector(".countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const targetDateString = countdownEl.getAttribute("data-time");
  const popupCountdown = document.querySelector(".popup-countdown");
  const popupContainer = document.querySelector(".popup-countdown-container");

  const targetDate = new Date(targetDateString).getTime();
  const now = new Date().getTime();

  if (targetDate < now) {
    popupCountdown.classList.add("d-none");
    return;
  }

  function updateCountdown() {
    const targetDate = new Date(targetDateString).getTime();
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = days;
      hoursEl.textContent = hours;
      minutesEl.textContent = minutes;
      secondsEl.textContent = seconds;
    } else {
      // Khi hết thời gian, ẩn popup
      daysEl.textContent = 0;
      hoursEl.textContent = 0;
      minutesEl.textContent = 0;
      secondsEl.textContent = 0;
      popupCountdown.classList.add("hidden");
    }
  }

  setInterval(updateCountdown, 1000);

  updateCountdown();

  popupCountdown.addEventListener("click", function (e) {
    if (!popupContainer.contains(e.target)) {
      popupCountdown.classList.add("hidden");
    }
  });

  popupContainer.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}
