import View from './view';

export default class Controller extends View {
  constructor() {
    super();
    this.initEvents();
  }

  initEvents() {
    const context = this;

    function checkEvent(event) {
      switch (event.target.id) {
        case 'menuBtn':
          context.toggleMenu();
          return;
        case 'closeMenuBtn':
          context.toggleMenu();
          return;
        default:
          context.closeMenu();
      }
    }
    document.addEventListener('click', checkEvent);
  }
}