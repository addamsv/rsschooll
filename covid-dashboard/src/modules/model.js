const BASIC_DELAY = 250;
const MENU = document.getElementsByClassName('menu')[0];

export default class Model {
  init() {
    return true;
  }

  toggleMenu() {
    if (this.closeMenu()) {
      return;
    }
    setTimeout(() => MENU.classList.add('aside-menu-open'), BASIC_DELAY);
  }

  closeMenu() {
    if (MENU.classList.contains('aside-menu-open')) {
      MENU.classList.remove('aside-menu-open');
      setTimeout(() => MENU.classList.add('aside-menu-close'), BASIC_DELAY);
      return true;
    }
    return false;
  }
}