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

  class CentersInfo {
    constructor(container, template) {
      this.container = container;
      this.template = template;
      this.title = this.template.content.querySelector(".centers-info__title");
      this.img = this.template.content.querySelector(".centers-info__img img");
      this.link = this.template.content.querySelector(".centers-info__link");
      this.contactsList = this.template.content.querySelector(".centers-info-contacts__list");
      this.map = this.template.content.querySelector(".centers-info__map iframe");

      // if (this.container && this.template && this.title && this.img && this.link && this.contactsList && this.map) {
      //   this.init();
      // }
    }

    // init() {

    // }

    setInfo(infoItem) {
      const title = infoItem.querySelector(".centers-nav-item__title");
      const titleText = title && title.innerText;
      const img = infoItem.querySelector(".centers-nav-item__img img");
      const imgSrc = img && img.getAttribute("src");
      const link = infoItem.querySelector(".centers-info__link");
      const linkText = link && link.innerText;
      const linkUrl = link && link.getAttribute("href");
      const mapSrc = infoItem.querySelector(".centers-info__map-src");
      const contactsList = infoItem.querySelectorAll(".centers-info-contacts__item");

      titleText && (this.title.innerText = titleText);
      imgSrc && (this.img.setAttribute("src", imgSrc));
      linkText && (this.link.innerText = linkText);
      linkText && (this.link.setAttribute("href", linkUrl));
      this.contactsList.innerHtml = "";
      contactsList.forEach(item => this.contactsList.appendChild(item));
      mapSrc && this.map.setAttribute("src", mapSrc);

      const fragment = this.template.cloneNode(true);
      this.container.innerHtml = "";
      this.container.appendChild(fragment.content);
    }
  }

  const HEADER = document.querySelector(".header");
  const MENU = document.querySelector(".menu");

  if (HEADER && MENU) {
    const menuBtn = HEADER.querySelector(".header-menu__btn");

    new Menu(MENU, HEADER, menuBtn);
  }

  const headerController = headerHandler();

  function headerHandler() {
    let prewScroll = window.scrollY;

    return () => {
      if (window.scrollY > 300 && !HEADER.classList.contains("_active-menu")) {
        if (window.scrollY > prewScroll) {
          HEADER.classList.add("_hidden");
        } else {
          HEADER.classList.remove("_hidden");
        }
      } else {
        HEADER.classList.remove("_hidden");
      }
      prewScroll = window.scrollY;
    }
  }

  window.addEventListener("scroll", headerController);


  const mainTop = document.querySelector(".main-top");
  if (mainTop) {
    const mainInner = mainTop.querySelector(".main-top__inner");
    const sphere = mainTop.querySelector(".main-top-sphere__inner");
    const tg = mainTop.querySelector(".main-top-tg");

    const tl = gsap.timeline();
    tl.to(sphere, {
      height: "100%",
      top: "0%",
      duration: 2,
    });

    tl.to(sphere, {
      rotateZ: 15,
      duration: 2,
    });

    tl.to(sphere, {
      height: "90%",
      top: "5%",
      duration: 1,
      ease: "elastic.out(1.2, 0.3)",
    }, "-=2");

    tl.to(sphere, {
      height: "100%",
      top: "0%",
      duration: 3,
      ease: "elastic.out(1.5, 0.3)",
    }, "-=1.8");

    tl.to(mainInner, {
      opacity: 1,
      duration: 2,
    }, "-=1");

    tl.to(tg, {
      opacity: 1,
      duration: 2,
    }, "-=2");

    // tl.to(sphere, {
    //   height: "100%",
    //   top: "0%",
    //   duration: 1,
    //   ease: "elastic.out(1, 0.3)",
    // }, "sin");
  }

  const mainOffice = document.querySelector(".main-office");
  if (mainOffice && window.matchMedia("(min-width: 1025px)").matches) {
    const list = mainOffice.querySelectorAll(".main-office__list");
    const items = mainOffice.querySelectorAll(".main-office-item");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainOffice,
        start: "50% bottom",
      }
    });

    tl.from(list, {
      height: 0,
      duration: 0,
    });

    items.forEach(item => {
      const img = item.querySelector(".main-office-item__img");
      tl.from(item, {
        height: "fit-content",
        duration: 1,
      }, "sin");

      tl.from(img, {
        height: 0,
        duration: 1,
      }, "sin");
    })
  }

  const mainNews = document.querySelector(".main-news");
  if (mainNews) {
    const swiperContainer = mainNews.querySelector(".main-news__swiper");
    const prewBtn = mainNews.querySelector(".swiper-btns__btn_prev");
    const nextBtn = mainNews.querySelector(".swiper-btns__btn_next");

    const swiper = new Swiper(swiperContainer, {
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

    if (window.matchMedia("(min-width: 1025px)").matches) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainNews,
          start: "50% bottom",
        }
      });

      swiper.slides.forEach(slide => {
        tl.from(slide, {
          x: "100vw",
          duration: 0.8,
        }, "-=0.4")
      });
    }
  }

  const mainPartners = document.querySelector(".main-partners");
  if (mainPartners) {
    const swiperContainer = mainPartners.querySelector(".main-partners__swiper");
    const prewBtn = mainPartners.querySelector(".swiper-btns__btn_prev");
    const nextBtn = mainPartners.querySelector(".swiper-btns__btn_next");

    const swiper = new Swiper(swiperContainer, {
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

    if (window.matchMedia("(min-width: 1025px)").matches) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainPartners,
          start: "50% bottom",
        }
      });

      swiper.slides.forEach(slide => {
        tl.from(slide, {
          x: "100vw",
          duration: 0.8,
        }, "-=0.4")
      });
    }
  }

  const aboutTargets = document.querySelector(".about-targets")
  if (aboutTargets && window.matchMedia("(min-width: 1025px)").matches) {
    const pathList = aboutTargets.querySelectorAll(".about-targets__sphere svg path");
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
    });

    pathList.forEach(item => {
      tl.to(item, {
        opacity: 1,
        duration: 0.8,
        ease: "none",
        repeat: 1,
        yoyo: true,
      }, "-=1.5")
    })
  }

  const centers = document.querySelector(".centers");
  if (centers) {
    const navContainer = centers.querySelector(".centers-nav");
    const navNextBtn = centers.querySelector(".swiper-btns__btn_next");
    const navPrevBtn = centers.querySelector(".swiper-btns__btn_prev");

    const centersInfoContainer = centers.querySelector(".centers-info");
    const centersInfoTemplate = centers.querySelector(".centers-info__template");

    if (navContainer && navNextBtn && navPrevBtn && centersInfoContainer && centersInfoTemplate) {
      const infoController = new CentersInfo(centersInfoContainer, centersInfoTemplate);
      const navSwiper = new Swiper(navContainer, {
        navigation: {
          nextEl: navNextBtn,
          prevEl: navPrevBtn,
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
        },
        on: {
          init: (swiper) => {
            infoController.setInfo(swiper.slides[0]);
          }
        }
      });
    }
  }
})