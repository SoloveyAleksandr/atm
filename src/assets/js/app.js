document.addEventListener("DOMContentLoaded", () => {
  class Menu {
    constructor(menu, header, btn) {
      this.menu = menu;
      this.header = header;
      this.btn = btn;
      this.bg = this.menu.querySelector(".menu__bg");
      this.isActive = false;

      if (this.menu && this.header && this.btn && this.bg) {
        this.init();
      }
    }

    init() {
      this.btn.addEventListener("click", this.handler.bind(this));
      this.bg.addEventListener("click", this.close.bind(this));
    }

    handler() {
      if (this.isActive) {
        this.close();
      } else {
        this.open();
      }
    }

    open() {
      this.isActive = true;
      this.header.classList.add("_active-menu");
      this.menu.classList.add("_active-menu");
    }

    close() {
      this.isActive = false;
      this.header.classList.remove("_active-menu");
      this.menu.classList.remove("_active-menu");
    }
  }

  const HEADER = document.querySelector(".header");
  const MENU = document.querySelector(".menu");

  if (HEADER && MENU) {
    const menuBtn = HEADER.querySelector(".header-menu__btn");

    new Menu(MENU, HEADER, menuBtn);
  }

  const mainTopSphere = document.querySelector(".main-top-sphere");
  if (mainTopSphere) {
    const pathList = mainTopSphere.querySelectorAll("path");

    const TL = gsap.timeline({
      repeat: -1,
    });

    pathList.forEach((path, i) => {
      TL.to(path, {
        stroke: "rgba(54, 169, 225, 1)",
        y: "1rem",
        repeat: -1,
        yoyo: true,
        duration: 2,
        delay: i * 0.8,
        ease: "none",
      }, "sin")
    })
  }

  const mainNews = document.querySelector(".main-news");
  if (mainNews) {
    const swiper = mainNews.querySelector(".main-news__swiper");
    const prewBtn = mainNews.querySelector(".swiper-btns__btn_prev");
    const nextBtn = mainNews.querySelector(".swiper-btns__btn_next");

    new Swiper(swiper, {
      enabled: false,
      navigation: {
        nextEl: nextBtn,
        prevEl: prewBtn,
        disabledClass: "_disabled",
      },
      breakpoints: {
        1025: {
          slidesPerView: 4,
          enabled: true,
        },
        501: {
          slidesPerView: 2,
          enabled: true,
        }
      }
    })
  }

  const mainPartners = document.querySelector(".main-partners");
  if (mainPartners) {
    const swiper = mainPartners.querySelector(".main-partners__swiper");
    const prewBtn = mainPartners.querySelector(".swiper-btns__btn_prev");
    const nextBtn = mainPartners.querySelector(".swiper-btns__btn_next");

    new Swiper(swiper, {
      slidesPerView: 2,
      enabled: false,
      navigation: {
        nextEl: nextBtn,
        prevEl: prewBtn,
        disabledClass: "_disabled",
      },
      breakpoints: {
        1025: {
          slidesPerView: 4,
          enabled: true,
        },
        501: {
          slidesPerView: 2,
          enabled: true,
        }
      }
    })
  }
})