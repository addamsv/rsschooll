import Functions from "./functions";
import Footer from './footer';

export default class App extends Functions {
  constructor() {
    super();
    this.initEvents();
    this.footer = new Footer().createFooter();
  }

  initEvents() {
    const THIS = this;

    function checkEvent(event) {
      switch (event.target.id) {
        case 'menuBtn':
          THIS.toggleMenu();
          return;
        default:
          THIS.closeMenu();
      }
    }
    /**
     * Add Event Listeners
     */
    document.addEventListener('click', checkEvent);
  }
}