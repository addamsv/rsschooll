const BASIC_DELAY = 250;
const MENU = document.getElementsByClassName('menu')[0];

export default class Functions {
  init() {
    return true;
  }

  toggleMenu() {
    if (this.closeMenu()) {
      return;
    }
    setTimeout(() => MENU.classList.add('menu-open'), BASIC_DELAY);
    MENU.classList.remove('menu-close');
  }

  closeMenu() {
    if (MENU.classList.contains('menu-open')) {
      MENU.classList.remove('menu-open');
      setTimeout(() => MENU.classList.add('menu-close'), BASIC_DELAY);
      return true;
    }
    return false;
  }
}