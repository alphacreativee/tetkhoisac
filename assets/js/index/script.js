import { preloadImages } from "../../libs/utils.js";
import {
  swiperSong,
  swiperTickets,
  scrollToSection,
  animation,
  scrollToTop,
  countdownTimer,
  header,
} from "../../js/index/global.js";
("use strict");
$ = jQuery;

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

function getParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name) || "N/A";
}

function getReferrer() {
  return document.referrer && document.referrer !== ""
    ? document.referrer
    : "direct";
}

function formRegister() {
  const form = document.getElementById("form-register");
  if (!form) return;

  const submitBtn = form.querySelector("button[type='submit']");
  const acceptCheckbox = form.querySelector("#accept");
  const fields = form.querySelectorAll(".field-item input");
  const messageSuccess = document.querySelector(".message-success");

  form.querySelector('[name="utm_source"]').value = getParam("utm_source");
  form.querySelector('[name="utm_medium"]').value = getParam("utm_medium");
  form.querySelector('[name="ref_link"]').value = getReferrer() || "direct";

  console.log("ref_link:", getReferrer());

  submitBtn.disabled = true;

  acceptCheckbox.addEventListener("change", function () {
    submitBtn.disabled = !this.checked;
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    form
      .querySelectorAll(".field-item")
      .forEach((el) => el.classList.remove("error"));

    fields.forEach((input) => {
      if (input.type !== "checkbox" && input.value.trim() === "") {
        input.closest(".field-item").classList.add("error");
        isValid = false;
      }
    });

    if (!acceptCheckbox.checked) {
      acceptCheckbox.closest(".field-item").classList.add("error");
      isValid = false;
    }

    if (!isValid) return;

    submitBtn.classList.add("aloading");

    const formData = new FormData(form);
    const params = new URLSearchParams(formData);
    const formDataObj = Object.fromEntries(new FormData(form).entries());

    fetch(
      "https://script.google.com/macros/s/AKfycbzJSGh6G7qgh1TkXOkqoXuNJz0M7inCU5n9aD1pmAaAoBqJmxrrXtT3fvKKcOpoMGia/exec",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((data) => {
        submitBtn.classList.remove("aloading");
        if (data.status === "success") {
          form.reset();
          submitBtn.disabled = true;

          if (messageSuccess) {
            messageSuccess.style.display = "block";

            setTimeout(() => {
              messageSuccess.style.display = "none";
            }, 10000);
          }
        }
      })
      .catch(() => {
        submitBtn.classList.remove("aloading");
      });
  });
}

// Paste this code into your Google Apps Script project
// and replace "GOOGLE_SHEET_ID" with your actual Google Sheet ID
// Example link: ?utm_source=facebook&utm_medium=cpc

// function doPost(e) {
//   const sheet =
//     SpreadsheetApp.openById("GOOGLE_SHEET_ID").getSheetByName("Sheet1");

//   const d = e.parameter;

//   sheet.appendRow([
//     new Date(),
//     d.name || "",
//     d.phone || "",
//     d.email || "",
//     d.utm_source || "N/A",
//     d.utm_medium || "N/A"
//   ]);

//   return ContentService.createTextOutput(
//     JSON.stringify({ status: "success" })
//   ).setMimeType(ContentService.MimeType.JSON);
// }

function toggleMobileMenu() {
  if (!document.querySelector(".header-hambuger")) return;
  const hambuger = document.querySelector(".header-hambuger");
  const menu = document.querySelector(".header-menu");
  const body = document.querySelector("body");

  hambuger.addEventListener("click", function () {
    const isActive = this.classList.toggle("active");
    menu.classList.toggle("active");
    body.classList.toggle("overflow-hidden");

    if (isActive) {
      if (window.lenis) {
        lenis.stop();
      }
    } else {
      if (window.lenis) {
        lenis.start();
      }
    }
  });
}

const init = () => {
  gsap.registerPlugin(ScrollTrigger);
  animation();
  formRegister();
  swiperSong();
  swiperTickets();
  scrollToSection();
  toggleMobileMenu();
  scrollToTop();
  header();
};
// Gọi sau khi DOM ready
document.addEventListener("DOMContentLoaded", countdownTimer);
preloadImages("img").then(() => {
  init();
});

let isLinkClicked = false;
$("a").on("click", function (e) {
  if (this.href && !this.href.match(/^#/) && !this.href.match(/^javascript:/)) {
    isLinkClicked = true;
  }
});

$(window).on("beforeunload", function () {
  if (!isLinkClicked) {
    $(window).scrollTop(0);
  }
  isLinkClicked = false;
});
