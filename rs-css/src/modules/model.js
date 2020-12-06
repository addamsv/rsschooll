import levels from './levels';

const SEND_SELECTOR_FIELD = document.getElementById('sendSelectorField');
const TASK_DESCRIPTION = document.getElementById('taskDescription');
const EXAMPLE_CONTAINER = document.getElementById('schemaContainer');
const CODE_CONTAINER = document.getElementById('htmlCodeExample');
const SEND_BTN = document.getElementById('checkButton');
const HINT = document.getElementById('hint');
const LEVELS_MENU = document.getElementById('levelsMenu');
const MENU = document.getElementById('menu');
const MENU_BTN = document.getElementById('menuBtn');
// const CLOSE_MENU_BTN = document.getElementById('closeMenuBtn');
// const DELL_RESULTS_BTN = document.getElementById('dellResultsBtn');

export default class Model {
  constructor() {
    this.curLevel = 0;
    this.lang = 'ru';
  }

  /**
   * Getters
   */

  getSelectorFieldValue() {
    return SEND_SELECTOR_FIELD.innerText;
  }

  getExpectedSelector(level) {
    return levels[level][0].selector;
  }

  getCurrentLevel() {
    return this.curLevel;
  }

  getHTMLForLevel(level, htmlAsText = false) {
    return (!htmlAsText) ? this.getParsedHTML(levels[level][0].code) : this.getParsedTextHTML(levels[level][0].codeExample);
  }

  getParsedHTML(code) {
    let id = 0;
    return this.getExtendedHTMLCode(code, false).split('>').map((el, i) => {
      if (el === '') {
        return '';
      }
      if (el.indexOf('</') !== -1) {
        return `${el}>`;
      }
      if (i !== 0) {
        return `${el.trim().replace(' ', ` data-synch="id_${id++}" `)}>`;
      }
      return `${el}>`;
    }).join('');
  }

  getParsedTextHTML(code) {
    let id = 0;
    let mountOfGapsesBeforeCodeElement = 0;
    function getGapsBeforeElement() {
      if (mountOfGapsesBeforeCodeElement === 0) {
        return '';
      }
      return Array(mountOfGapsesBeforeCodeElement).fill('&nbsp;').join('');
    }
    return this.getExtendedHTMLCode(code).split('>').map((el, i) => {
      if (el === '') {
        return '';
      }
      if (el.indexOf('</') !== -1) {
        if (mountOfGapsesBeforeCodeElement > 0) {
          mountOfGapsesBeforeCodeElement -= 1;
        }
        return `${getGapsBeforeElement()}${el.replaceAll('</', `&lt;/`)}&gt;</div>`;
      }
      if (el.indexOf(' /') !== -1) {
        return `<div class="code-item back-light" data-synch="id_${id++}">${getGapsBeforeElement()}${el.trim().replaceAll('<', `&lt;`)}&gt;</div>`;
      }
      if (i !== 0) {
        const html = `<div class="code-item back-light" data-synch="id_${id++}">${getGapsBeforeElement()}${el.replaceAll('<', `&lt;`)}&gt;`;
        mountOfGapsesBeforeCodeElement += 1;
        return html;
      }
      mountOfGapsesBeforeCodeElement += 1;
      return `<div class="first-code-item">${el.replaceAll('<', `&lt;`)}&gt;`;
    }).join('');
  }

  getExtendedHTMLCode(code) {
    return `<div class="parcel-box"> ${code} </div>`;
  }

  getNodes(selector) {
    try {
      return document.querySelectorAll(`#schemaContainer ${selector}`);
    } catch (err) {
      return false;
    }
  }

  getTaskDescription() {
    return levels[this.getCurrentLevel()][0].describe[this.lang];
  }

  getLevelsHTML() {
    return levels.reduce((out, el, l) => `${out}
    <div data-level="${l}" class="level-item ${l === this.getCurrentLevel() ? 'current-level' : ''}">
      ${l} ${el[0].shortDescribe[this.lang]}
    </div>`, '');
  }

  /**
   * Setters
   */

  setCurLevel(level) {
    if (level >= levels.length) {
      return false;
    }
    this.curLevel = level;
    return true;
  }

  /**
   * Boolean
   */

  isElExist(selector) {
    const node = this.getNodes(selector);
    if (node === 'false') {
      return false;
    }
    return this.isMountOfNodesRight(node.length) && this.isItCertainEl(node);
  }

  isMountOfNodesRight(nodesMount) {
    return nodesMount === levels[this.getCurrentLevel()][0].mount;
  }

  isItCertainEl(node) {
    return !Object.keys(node).some((key) => !(node[key].dataset && node[key].dataset.elemetSet));
  }

  /**
   * Average Functions
   */

  checSelector() {
    if (this.isElExist(this.getSelectorFieldValue())) {
      console.log('Yep!');
      SEND_BTN.classList.add('send-button-animated');
      setTimeout(() => SEND_BTN.classList.remove('send-button-animated'), 700);
      if (!this.setCurLevel(this.getCurrentLevel() + 1)) {
        console.log('There are not any levels!');
        return;
      }
      this.initLevel(this.getCurrentLevel());
      console.log(`Next Level: ${this.getCurrentLevel()}`);
      return;
    }
    SEND_SELECTOR_FIELD.classList.add('send-button-animated');
    setTimeout(() => SEND_SELECTOR_FIELD.classList.remove('send-button-animated'), 700);
    console.log('Wrong!');
  }

  putPropperSelectorToItsInputField() {
    SEND_SELECTOR_FIELD.innerText = levels[this.getCurrentLevel()][0].selector;
  }

  dellResultsData() {
    console.log('removing results...');
  }

  initLevel(level) {
    MENU_BTN.innerText = `Уровень: ${this.getCurrentLevel() + 1}/${levels.length}`;
    this.removeHTMLFromActiveContainers();
    EXAMPLE_CONTAINER.innerHTML = this.getHTMLForLevel(level);
    this.putAllNecessaryAttrs(level);
    CODE_CONTAINER.innerHTML = this.getHTMLForLevel(level, true);
    TASK_DESCRIPTION.innerHTML = this.getTaskDescription();
    this.renderLevelMenu();
    this.putNecessaryAttrsToTargetElements();
  }

  removeHTMLFromActiveContainers() {
    EXAMPLE_CONTAINER.innerHTML = '';
    CODE_CONTAINER.innerHTML = '';
    SEND_SELECTOR_FIELD.innerText = '';
  }

  revealPointedEl(obj) {
    const topShift = 60;
    document.querySelectorAll('[data-synch]').forEach((el) => {
      if (el.dataset.elemetSet === obj.dataset.synch) {
        el.classList.add('hovered');
        const box = el.getBoundingClientRect();
        HINT.style.display = 'block';
        HINT.style.left = `${box.left}px`;
        HINT.style.top = `${box.top - topShift}px`;
      }
      if (el.dataset.synch === obj.dataset.synch && el.classList.contains('code-item')) {
        el.classList.add('back-light-hovered');
        const hint = (el.innerText).split('>');
        HINT.innerText = `${hint[0].trim()}>${hint.length > 2 ? `${hint[hint.length - 2].trim()}>` : ''}`;
      }
    });
  }

  hidePointedEl(obj) {
    document.querySelectorAll('[data-synch]').forEach((el) => {
      if (el.dataset.elemetSet === obj.dataset.synch) {
        el.classList.remove('hovered');
        HINT.style.display = 'none';
      }
      if (el.dataset.synch === obj.dataset.synch && el.classList.contains('code-item')) {
        el.classList.remove('back-light-hovered');
      }
    });
  }

  putAllNecessaryAttrs() {
    const nodes = this.getNodes('.item');
    if (nodes === 'false') {
      return;
    }
    let idCounter = 0;
    Object.keys(nodes).some((key) => {
      nodes[key].setAttribute('data-elemet-set', `id_${idCounter}`);
      idCounter += 1;
      return false;
    });
  }

  putNecessaryAttrsToTargetElements() {
    const selector = this.getExpectedSelector(this.getCurrentLevel());
    const nodes = this.getNodes(selector);
    if (nodes === 'false') {
      return;
    }
    Object.keys(nodes).some((key) => {
      nodes[key].classList.add('target-el-animated');
      return false;
    });
  }

  renderLevelMenu() {
    LEVELS_MENU.innerHTML = '';
    LEVELS_MENU.innerHTML = this.getLevelsHTML();
  }

  toggleMenu() {
    const mSec = 250;
    if (this.closeMenu()) {
      return;
    }
    MENU.style.display = 'block';
    setTimeout(() => MENU.classList.add('aside-menu-open'), mSec);
  }

  closeMenu() {
    const mSec = 250;
    if (MENU.classList.contains('aside-menu-open')) {
      MENU.classList.remove('aside-menu-open');
      setTimeout(() => MENU.style.setProperty('display', 'none'), mSec);
      return true;
    }
    return false;
  }
}
