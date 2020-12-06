import View from './view';

export default class Controller extends View {
  constructor() {
    super();
    this.initEvents();
  }

  init() {
    this.initLevel(this.getCurrentLevel());
    this.renderLevelMenu();
  }

  initEvents() {
    const context = this;

    function check(e) {
      if (e.keyCode === 13) {
        context.checSelector();
      }
      if (e.target.id === 'checkButton') {
        context.checSelector();
      }
      if (e.target.id === 'menuBtn') {
        context.toggleMenu();
        return;
      }
      if (e.target.id === 'closeMenuBtn') {
        context.closeMenu();
        return;
      }
      if (e.target.id === 'helpBtn') {
        context.putPropperSelectorToItsInputField();
        return;
      }
      if (e.target.id === 'dellResultsBtn') {
        context.dellResultsData();
        return;
      }
      if (e.target.dataset.level) {
        context.setCurLevel(parseInt(e.target.dataset.level, 10));
        context.initLevel(e.target.dataset.level);
      }
      context.closeMenu();
    }
    function hovers(e) {
      function leave(ev) {
        ev.target.removeEventListener('mouseleave', leave);
        context.hidePointedEl(ev.target);
      }
      if (e.target.dataset.synch) {
        e.target.addEventListener('mouseleave', leave);
        context.revealPointedEl(e.target);
      }
    }
    document.addEventListener('click', check);
    document.addEventListener('keyup', check);
    document.addEventListener('mouseover', hovers);
  }
}