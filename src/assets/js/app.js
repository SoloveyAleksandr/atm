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
})