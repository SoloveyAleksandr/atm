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

  class FilterItem {
    constructor(container) {
      this.container = container;
      this.input = this.container.querySelector("input[type=checkbox]");

      if (this.container && this.input) this.init();
    }

    init() {
      this.input.addEventListener("input", this.checkHandler.bind(this));

      this.checkHandler();
    }

    checkHandler() {
      if (this.input.checked) {
        this.container.classList.add("_checked");
      } else {
        this.container.classList.remove("_checked");
      }
    }
  }

  class QuestionItem {
    constructor(container, controller) {
      this.container = container;
      this.btn = this.container.querySelector(".questions-item__btn");
      this.content = this.container.querySelector(".questions-item__content");
      this.maxHeight = null;
      this.isOpen = true;
      this.controller = controller;

      if (this.container && this.btn && this.content) {
        this.init();
      }
    }

    init() {
      this.maxHeight = this.content.offsetHeight * 2 + "px";
      this.close();

      if (this.controller) {
        this.controller.items.push(this);
        this.btn.addEventListener("click", () => {
          if (this.isOpen) {
            this.close();
          } else {
            this.controller.setActive(this);
          }
        });
      }

    }

    open() {
      this.isOpen = true;
      this.container.classList.remove("_close");
      this.content.style.maxHeight = this.maxHeight;
    }

    close() {
      this.isOpen = false;
      this.container.classList.add("_close");
      this.content.style.maxHeight = 0;
    }
  }

  class QuestionsController {
    constructor(swiper) {
      this.swiper = swiper;
      this.items = [];
    }

    setActive(currentItem) {
      this.items.forEach((item, index) => {
        if (currentItem === item) {
          item.open();
          this.swiper.slideTo(index);
        } else {
          item.close();
        }
      })
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
    const navWrapper = navContainer.querySelector(".swiper-wrapper");
    const navTemplate = navContainer.querySelector(".centers-nav-template");

    const infoContainer = centers.querySelector(".centers-info");

    const navNextBtn = centers.querySelector(".swiper-btns__btn_next");
    const navPrevBtn = centers.querySelector(".swiper-btns__btn_prev");

    const infoItems = infoContainer.querySelectorAll(".centers-info-item");

    const navFragment = document.createDocumentFragment();
    infoItems.forEach(item => {
      const navItem = navTemplate.content.cloneNode(true);

      const img = navItem.querySelector(".centers-nav-item__img img");
      const title = navItem.querySelector(".centers-nav-item__title");
      const text = navItem.querySelector(".centers-nav-item__text");

      img.setAttribute("src", item.querySelector(".centers-info-item__img img") ? item.querySelector(".centers-info-item__img img").getAttribute("src") : "");
      title.textContent = item.querySelector(".centers-info-item__title") ? item.querySelector(".centers-info-item__title").textContent : "";
      text.textContent = item.getAttribute("data-address") || "";

      navFragment.appendChild(navItem);
    });

    navWrapper.innerHTML = "";
    navWrapper.appendChild(navFragment);

    const navSwiper = new Swiper(navContainer, {
      freeMode: true,
      watchSlidesProgress: true,
      allowTouchMove: false,
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
    });

    const infoSwiper = new Swiper(infoContainer, {
      speed: 0,
      spaceBetween: 100,
      allowTouchMove: false,
      autoHeight: true,
      navigation: {
        nextEl: navNextBtn,
        prevEl: navPrevBtn,
        disabledClass: "_disabled",
      },
      thumbs: {
        swiper: navSwiper,
      },
    });
  }

  const eventsFilter = document.querySelector(".events-filter");
  if (eventsFilter) {
    const items = eventsFilter.querySelectorAll(".events-filter__item");

    items.forEach(item => new FilterItem(item));
  }

  const questions = document.querySelector(".questions");
  if (questions) {
    const questionItems = questions.querySelectorAll(".questions-item");
    const swiperContainer = questions.querySelector(".questions-swiper");

    const swiper = new Swiper(swiperContainer, {
      spaceBetween: 100,
      speed: 500,
      autoHeight: true,
      effect: "creative",
      creativeEffect: {
        prev: {
          translate: [0, "-100%", -200],
          opacity: 0,
        },
        next: {
          translate: [0, "100%", -200],
          opacity: 0,
        },
      }
    });

    const questionsController = new QuestionsController(swiper);

    questionItems.forEach(item => {
      const newItem = new QuestionItem(item, questionsController);

      const newSlide = document.createElement("div");
      newSlide.className = "swiper-slide questions-swiper-slide";
      newSlide.innerHTML = `
        <h3 class="questions-swiper-slide__title">${newItem.btn.textContent}</h3>
        <div class="questions-swiper-slide__text">${newItem.content.innerHTML}</div>
      `;

      swiper.appendSlide(newSlide);
    });

    questionsController.setActive(questionsController.items[0]);

  }
})