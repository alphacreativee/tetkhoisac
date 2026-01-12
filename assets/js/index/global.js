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
  const ctaTicketsLinks = document.querySelectorAll("#cta-tickets a");
  const sections = document.querySelectorAll("section[id]");
  const headerMenu = document.querySelector(".header-menu");
  const hambuger = document.querySelector(".header-hambuger");

  function handleScrollClick(e, link) {
    e.preventDefault();

    menuLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");

    if (window.innerWidth <= 991) {
      headerMenu?.classList.remove("active");
      hambuger?.classList.remove("active");
    }

    const targetId = link.getAttribute("href");

    gsap.to(window, {
      duration: 0.5,
      scrollTo: {
        y: targetId,
        offsetY: 0,
      },
      ease: "none",
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      handleScrollClick(e, this);
    });
  });

  ctaTicketsLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      handleScrollClick(e, this);
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
    const distance = element.getAttribute("data-parallax-distance") || 50;

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

    // gsap.to(element, {
    //   y: direction === "down" ? distance : -distance,
    //   scrollTrigger: {
    //     trigger: element,
    //     start: "top bottom",
    //     end: "bottom top",
    //     scrub: true,
    //   },
    // });
  });
}
export function countdownTimer() {
  if (!document.querySelector(".countdown")) return;

  const countdownEl = document.querySelector(".countdown");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  let targetDateString = countdownEl.getAttribute("data-time");
  const popupCountdown = document.querySelector(".popup-countdown");
  const popupContainer = document.querySelector(".popup-countdown-container");
  const icClosePopup = document.querySelector(".popup-ic-close");

  // Chuẩn hóa format date cho Safari/iOS
  targetDateString = targetDateString.trim();

  // Nếu chỉ có ngày (YYYY/MM/DD hoặc YYYY-MM-DD), thêm giờ mặc định
  if (!targetDateString.includes(":")) {
    targetDateString += " 00:00:00";
  }

  // Thay - thành / để Safari chấp nhận
  const formattedDateString = targetDateString.replace(/-/g, "/");
  const targetDate = new Date(formattedDateString).getTime();

  // Kiểm tra targetDate có hợp lệ không
  if (isNaN(targetDate)) {
    console.error("Invalid date format:", targetDateString);
    popupCountdown?.classList.add("d-none");
    return;
  }

  const now = new Date().getTime();

  if (targetDate < now) {
    popupCountdown?.classList.add("d-none");
    return;
  }

  function updateCountdown() {
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
      daysEl.textContent = 0;
      hoursEl.textContent = 0;
      minutesEl.textContent = 0;
      secondsEl.textContent = 0;
      popupCountdown?.classList.add("hidden");
      clearInterval(countdownInterval);
    }
  }

  const countdownInterval = setInterval(updateCountdown, 1000);
  updateCountdown();

  icClosePopup?.addEventListener("click", function () {
    popupCountdown?.classList.add("hidden");
  });

  popupContainer?.addEventListener("click", function (e) {
    e.stopPropagation();
  });
}
export function header() {
  const header = document.getElementById("header");
  if (!header) return null;

  let lastScroll = 0;

  const trigger = ScrollTrigger.create({
    start: "top top",
    end: 9999,
    onUpdate: (self) => {
      const currentScroll = self.scroll();

      if (currentScroll <= 0) {
        header.classList.remove("scrolled");
      } else if (currentScroll > lastScroll) {
        // Scroll down
        header.classList.add("scrolled");
      } else {
        // Scroll up
        header.classList.remove("scrolled");
      }

      lastScroll = currentScroll;
    },
  });

  return trigger;
}
