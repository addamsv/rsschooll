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
const BASIC_DELAY = 250;
const MEDIUM_DELAY = 500;
const LONG_DELAY = 700;

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
    let mountOfSpaceBefore = 0;
    function getSpaceBeforeElement() {
      if (mountOfSpaceBefore === 0) {
        return '';
      }
      return Array(mountOfSpaceBefore).fill('&nbsp;').join('');
    }
    return this.getExtendedHTMLCode(code).split('>').map((el, i) => {
      if (el === '') {
        return '';
      }
      if (el.indexOf('</') !== -1) {
        if (mountOfSpaceBefore > 0) {
          mountOfSpaceBefore -= 1;
        }
        return `${getSpaceBeforeElement()}${el.replaceAll('</', `&lt;/`)}&gt;</div>`;
      }
      if (el.indexOf(' /') !== -1) {
        return `<div class="code-item back-light" data-synch="id_${id++}">${getSpaceBeforeElement()}${el.trim().replaceAll('<', `&lt;`)}&gt;</div>`;
      }
      if (i !== 0) {
        const html = `<div class="code-item back-light" data-synch="id_${id++}">${getSpaceBeforeElement()}${el.replaceAll('<', `&lt;`)}&gt;`;
        mountOfSpaceBefore += 1;
        return html;
      }
      mountOfSpaceBefore += 1;
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
    return !Object.keys(node).some((key) => !(node[key].dataset && node[key].dataset.elementSet));
  }

  /**
   * Average Functions
   */

  checkSelector() {
    if (this.isElExist(this.getSelectorFieldValue())) {
      console.log('Yep!');
      SEND_BTN.classList.add('send-button-animated');
      setTimeout(() => SEND_BTN.classList.remove('send-button-animated'), LONG_DELAY);
      if (!this.setCurLevel(this.getCurrentLevel() + 1)) {
        console.log('There are not any levels!');
        return;
      }
      this.initLevel(this.getCurrentLevel());
      console.log(`Next Level: ${this.getCurrentLevel()}`);
      return;
    }
    SEND_SELECTOR_FIELD.classList.add('send-button-animated');
    setTimeout(() => SEND_SELECTOR_FIELD.classList.remove('send-button-animated'), LONG_DELAY);
    console.log('Wrong!');
  }

  putProperSelectorToItsInputField() {
    SEND_SELECTOR_FIELD.setAttribute("contenteditable", false);
    this.typeLetterOneByOne(levels[this.getCurrentLevel()][0].selector.split(''));
  }

  typeLetterOneByOne(letterArray) {
    let counter = 0;
    let letterNode;
    const INTERVAL_ID = setInterval(() => {
      if (counter < letterArray.length) {
        letterNode = document.createElement('span');
        letterNode.className = 'letter-animated';
        letterNode.textContent = letterArray[counter];
        SEND_SELECTOR_FIELD.appendChild(letterNode);
        counter += 1;
      } else {
        clearInterval(INTERVAL_ID);
      }
    }, MEDIUM_DELAY);
  }

  dellResultsData() {
    console.log('removing results...');
  }

  initLevel(level) {
    MENU_BTN.innerText = `Level: ${this.getCurrentLevel() + 1}/${levels.length}`;
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
      if (el.dataset.elementSet === obj.dataset.synch) {
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
      if (el.dataset.elementSet === obj.dataset.synch) {
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
      nodes[key].setAttribute('data-element-set', `id_${idCounter}`);
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
    if (this.closeMenu()) {
      return;
    }
    MENU.style.display = 'block';
    setTimeout(() => MENU.classList.add('aside-menu-open'), BASIC_DELAY);
  }

  closeMenu() {
    if (MENU.classList.contains('aside-menu-open')) {
      MENU.classList.remove('aside-menu-open');
      setTimeout(() => MENU.style.setProperty('display', 'none'), BASIC_DELAY);
      return true;
    }
    return false;
  }
}
