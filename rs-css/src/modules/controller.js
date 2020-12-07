import Model from './model';

export default class Controller extends Model {
  constructor() {
    super();
    this.initEvents();
  }

  init() {
    this.initLevelFromSavedPosition();
  }

  initEvents() {
    const context = this;

    function check(e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        context.checkSelector();
      }
      if (e.target.id === 'checkButton') {
        context.checkSelector();
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
        context.setProperSelectorToItsInputField();
        return;
      }
      if (e.target.id === 'dellResultsBtn' || e.target.id === 'newGameBtn') {
        context.removeLevelsData();
        return;
      }
      if (e.target.dataset.level) {
        context.setCurrentLevel(parseInt(e.target.dataset.level, 10));
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
    document.addEventListener('keydown', check);
    document.addEventListener('mouseover', hovers);
  }
}