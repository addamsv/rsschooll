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

const BASIC_DELAY = 250;
const MEDIUM_DELAY = 500;
const LONG_DELAY = 700;

const STORE_DATA_KEY = 'rsCssDATA';
const SAVED_POSITION_DATA_KEY = 'rsCssLevelPositionDATA';

export default class Model {
  constructor() {
    this.curLevel = 0;
    this.lang = 'ru';
    this.isTypingSelectorByHelp = false;
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
    const ob = JSON.parse(localStorage.getItem(STORE_DATA_KEY));
    const CURRENT_LEVEL = this.getCurrentLevel();
    return levels.reduce((out, element, level) => `${out}
    <div data-level="${level}" class="level-item ${level === CURRENT_LEVEL ? 'current-level' : ''}">
      <span data-level="${level}" class="level-done-sign ${this.getLevelStatus(ob, level)}"></span>
      ${level} ${element[0].shortDescribe[this.lang]}
    </div>`, '');
  }

  getLevelStatus(ob, currentLevel) {
    if (ob && ob[currentLevel]) {
      return ob[currentLevel].isDoneByUser ? 'level-done' : 'level-done-by-computer';
    }
    return 'pending-to-done-level';
  }

  /**
   * Setters
   */

  setCurrentLevel(level) {
    if (level >= levels.length) {
      return false;
    }
    localStorage.setItem(SAVED_POSITION_DATA_KEY, level);
    this.curLevel = level;
    return true;
  }

  setHintAttributes() {
    document.querySelectorAll('.block-html-code div').forEach((el) => {
      const hint = (el.innerText).split('>');
      const hintText = `${hint[0].trim()}>${hint.length > 2 ? `${hint[hint.length - 2].trim()}>` : ''}`;
      el.setAttribute('data-hint', hintText);
    });
  }

  setProperSelectorToItsInputField() {
    SEND_SELECTOR_FIELD.setAttribute("contenteditable", false);
    if (!this.isTypingSelectorByHelp) {
      this.isTypingSelectorByHelp = true;
      this.typeLetterOneByOne(levels[this.getCurrentLevel()][0].selector.split(''));
    }
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
  saveLevelAs(isDoneByUser) {
    const ob = JSON.parse(localStorage.getItem(STORE_DATA_KEY));
    if (ob) {
      if (ob[this.getCurrentLevel()] && ob[this.getCurrentLevel()].isDoneByUser) {
        return;
      }
      ob[this.getCurrentLevel()] = {};
      ob[this.getCurrentLevel()].isDoneByUser = isDoneByUser;
      localStorage.setItem(STORE_DATA_KEY, JSON.stringify(ob));
      return;
    }
    localStorage.setItem(STORE_DATA_KEY, `{"${this.getCurrentLevel()}":{"isDoneByUser":${isDoneByUser}}}`);
  }

  removeLevelsData() {
    localStorage.setItem(STORE_DATA_KEY, `{}`);
    this.initLevel(this.getCurrentLevel());
  }

  checkSelector(isDoneByUser = true) {
    if (this.isElExist(this.getSelectorFieldValue())) {
      console.log(`Yep! isDoneByUser: ${isDoneByUser}`);
      this.saveLevelAs(isDoneByUser);
      SEND_BTN.classList.add('send-button-animated');
      setTimeout(() => SEND_BTN.classList.remove('send-button-animated'), LONG_DELAY);
      if (!this.setCurrentLevel(this.getCurrentLevel() + 1)) {
        console.log(`There are not any levels! Check for Win: ${this.isUserWin()}`);

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

  isUserWin() {
    const ob = JSON.parse(localStorage.getItem(STORE_DATA_KEY));
    if (ob) {
      return !(Object.keys(ob).some((el, i) => !(ob[i] && ob[i].isDoneByUser)));
    }
    return false;
  }

  typeLetterOneByOne(letterArray) {
    let counter = 0;
    let letterNode;
    SEND_SELECTOR_FIELD.innerText = '';
    const INTERVAL_ID = setInterval(() => {
      if (counter < letterArray.length) {
        letterNode = document.createElement('span');
        letterNode.className = 'letter-animated';
        letterNode.textContent = letterArray[counter];
        SEND_SELECTOR_FIELD.appendChild(letterNode);
        counter += 1;
      } else {
        clearInterval(INTERVAL_ID);
        SEND_SELECTOR_FIELD.innerText = this.getExpectedSelector(this.getCurrentLevel());
        this.checkSelector(false);
        this.isTypingSelectorByHelp = false;
        SEND_SELECTOR_FIELD.setAttribute("contenteditable", true);
      }
    }, MEDIUM_DELAY);
  }

  initLevelFromSavedPosition() {
    let level = (localStorage.getItem(SAVED_POSITION_DATA_KEY));
    console.log(level);
    if (level) {
      level = parseInt(level, 10);
      this.initLevel(level);
      this.setCurrentLevel(level);
    }
    this.initLevel(this.getCurrentLevel());
  }

  initLevel(level) {
    MENU_BTN.innerText = `Level: ${this.getCurrentLevel() + 1}/${levels.length}`;
    this.removeHTMLFromActiveContainers();
    EXAMPLE_CONTAINER.innerHTML = this.getHTMLForLevel(level);
    this.putAllNecessaryAttrs(level);
    CODE_CONTAINER.innerHTML = this.getHTMLForLevel(level, true);
    this.setHintAttributes();
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
        HINT.innerText = el.dataset.hint;
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
