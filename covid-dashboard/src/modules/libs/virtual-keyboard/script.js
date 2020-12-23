class RSSKeyBoard {
  /**
   *
   *       Controller
   *
   */
  constructor() { // id = 'rssKeyBoard'
    this.APP = {
      keys: {
        ru: [
          "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
          "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
          "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/",
        ],
        ruShifted: [
          "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
          "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
          "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?",
        ],
        en: [
          "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
          "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
          "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/",
        ],
        enShifted: [
          "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
          "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "enter",
          "shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?",
        ],
        firstRow: {
          common: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
          enShifted: ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace"],
          ruShifted: ["!", '"', "№", "%", ":", ",", ".", ";", "(", ")", "_", "+", "backspace"],
        },
        lastRow: ["hide", "en/ru", "space", "left", "right"],
        newLineAfter: ["ъ", "enter", "backspace", "]", "?", "}"],
      },
      prop: {
        textAreaCurrValue: "",
        capsLock: false,
        shift: false,
        lang: "en",
        speechRecLeng: 'en',
        speechRecTranscript: '',
        keySound: true,
        speech: false,
        fnKeys: {
          en: 'langChange', ru: 'langChange', left: 37, right: 'ArrowRight', space: 32, enter: 13, shift: 16, caps: 20, backspace: 8,
        },
        notAlowedKeyCode: [
          'Control', 'Alt', 'Meta', 'AltRight', 'AltLeft', 'MetaLeft', 'MetaRight', 'ControlLeft', 'ControlRight', 'IntlBackslash', 'ArrowDown', 'ArrowUp', 'Backslash'],
        fixCodeEnter: {
          Comma: 44, Period: 46, Slash: 47, Minus: 45, Equal: 61, Quote: 39, Semicolon: 59, BracketRight: 93, BracketLeft: 91,
        },
      },
      ID: {
        textField: null,
        main: null,
        keysContainer: null,
        firstRow: null,
        mainRows: null,
        lastRow: null,
        musica: null,
        speechRecognBtn: null,
        speechRecognBtnLeng: null,
        clickSoundSwitchOffBtn: null,
        speechObj: null,
        keys: [],
      },
      string: {
        ru: {
          changeSpeechRecLangAlert: `Для того чтобы изменить язык распознования голоса,
           необходимо девктивировать кнопку микрофон, затем надо изменить 'ru'->'en' клавишу и снова активировать кнопку микрофон`,
        },
        en: {
          changeSpeechRecLangAlert: `Для того чтобы изменить язык распознования голоса, 
            необходимо девктивировать кнопку микрофон, затем надо изменить 'en'->'ru' клавишу и снова активировать кнопку микрофон`,
        },
      },

    };

    this.makeKeyBoardContainer();

    this.createKeys();

    this.setEvents();
  }

  setEvents() {
    const CONTEXT = this;

    function mainControllerClick(e) {
      // console.log(e);

      /* input STANDART kb */

      if (e.keyCode) {
        if (!document.getElementById(`id_${e.keyCode}`) && e.code.substring(0, 3) === 'Key') {
          if (!document.getElementById(`id_${e.key.charCodeAt(0)}`)) {
            return;
          }
          const SELECTION_START = CONTEXT.APP.ID.textField.selectionStart;
          const SELECTION_END = CONTEXT.APP.ID.textField.selectionEnd;
          CONTEXT.setTextFieldValue(SELECTION_START, SELECTION_END, document.getElementById(`id_${e.key.charCodeAt(0)}`).dataset.val);
          CONTEXT.keyAnimated(document.getElementById(`id_${e.key.charCodeAt(0)}`));
          return;
        }

        // console.log(e.code);
        switch (e.code) {
          case 'ArrowRight':
            CONTEXT.right(0);
            CONTEXT.keyAnimated(document.getElementById('id_ArrowRight'));
            return;

          case 'ArrowLeft':
            CONTEXT.left(0);
            CONTEXT.keyAnimated(document.getElementById('id_37'));
            return;

          case 'Backspace':
            CONTEXT.backspace(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, 0, CONTEXT.separateValue(0));
            CONTEXT.keyAnimated(document.getElementById('id_8'));
            return;

          case 'Enter':
            CONTEXT.setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, '\n');
            CONTEXT.keyAnimated(document.getElementById('id_13'));
            return;

          case 'Space':
            CONTEXT.setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, ' ');
            CONTEXT.keyAnimated(document.getElementById('id_32'));
            return;

          case 'ShiftLeft':
          case 'ShiftRight':
            CONTEXT.setShift();
            return;

          case 'CapsLock':
            CONTEXT.setCaps();
            return;

          default:
            if (CONTEXT.APP.prop.notAlowedKeyCode.indexOf(e.code) === -1) {
              if (e.code in CONTEXT.APP.prop.fixCodeEnter) {
                const SELECTION_START = CONTEXT.APP.ID.textField.selectionStart;
                const SELECTION_END = CONTEXT.APP.ID.textField.selectionEnd;
                CONTEXT.setTextFieldValue(SELECTION_START, SELECTION_END, document.getElementById(`id_${CONTEXT.APP.prop.fixCodeEnter[e.code]}`).dataset.val);
                CONTEXT.keyAnimated(document.getElementById(`id_${CONTEXT.APP.prop.fixCodeEnter[e.code]}`));
                return;
              }
              try {
                CONTEXT.setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, document.getElementById(`id_${e.keyCode}`).dataset.val);
                CONTEXT.keyAnimated(document.getElementById(`id_${e.keyCode}`));
              } catch (error) {
                return;
              }
              return;
            }
            if (e.code.substring(0, 3) === 'Key' || e.code.substring(0, 5) === 'Digit' || e.code.substring(0, 5) === 'Minus') {
              CONTEXT.setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, document.getElementById(`id_${e.keyCode}`).dataset.val);
              CONTEXT.keyAnimated(document.getElementById(`id_${e.keyCode}`));
              return;
            }
        }

        if (e.key === 'Shift') {
          CONTEXT.setShift();
          return;
        }

        return;
      }

      /* Additional Buttons */
      switch (e.target.id) {
        case 'speechRecognBtn':
          // CONTEXT.startSpeechRec();
          return;
        case 'soundSwitchOffBtn':
          CONTEXT.soundSwitchOnOff();
          return;
          /* depricated */
        case 'speechLang':
          CONTEXT.changeSpeechLang(e.target.dataset.val);
          return;
        default:
      }
      if (!e.target.dataset.val) {
        return;
      }

      /* input VIRTUAL kb */
      CONTEXT.keyAnimated(e.target);
      switch (e.target.dataset.val) {
        case 'left':
          CONTEXT.left();
          return;
        case 'right':
          CONTEXT.right();
          return;
        case 'enter':
          CONTEXT.setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, '\n');
          return;
        case 'space':
          CONTEXT.setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, ' ');
          return;
        case 'caps':
          CONTEXT.setCaps();
          return;
        case 'hide':
          CONTEXT.setDone();
          return;
        case 'shift':
          CONTEXT.setShift();
          return;
        case 'textField':
          CONTEXT.openKeyBoard();
          return;
        case 'en':
        case 'ru':
          CONTEXT.setLang();
          return;
        case 'backspace':
          CONTEXT.backspace(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd);
          return;
        default:
      }
      CONTEXT.setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd, e.target.dataset.val);
    }

    function preventInput(e) {
      e.preventDefault();
    }
    document.onchange = mainControllerClick;
    document.onkeypress = preventInput;
    document.onkeyup = mainControllerClick;
    document.onclick = mainControllerClick;
    document.ontouchend = mainControllerClick;
  }

  /**
   *
   *          Model
   *
  */

  toggleCalss(ob, isNeddedToRem, cssClass) {
    if (isNeddedToRem) {
      ob.classList.remove(cssClass);
      return;
    }
    ob.classList.add(cssClass);
  }

  soundSwitchOnOff() {
    this.APP.prop.keySound = !this.APP.prop.keySound;
    this.toggleCalss(this.APP.ID.clickSoundSwitchOffBtn, !this.APP.prop.keySound, 'keySoundSwitch--active');
  }

  changeSpeechLang(val = 'en') {
    this.APP.prop.speechRecLeng = val === 'en' ? 'ru' : 'en';
    this.APP.ID.speechRecognBtnLeng.dataset.val = this.APP.prop.speechRecLeng;
    this.APP.ID.speechRecognBtnLeng.innerText = this.APP.prop.speechRecLeng;
  }

  keyAnimated(ob) {
    ob.classList.add('keyboard__quick-animated');
    setTimeout(() => { ob.classList.remove('keyboard__quick-animated'); }, 80);
  }

  openKeyBoard() {
    document.getElementById('rssKeyBoard').classList.remove('keyboard--hidden');
  }

  closeKeyBoard() {
    document.getElementById('rssKeyBoard').classList.add('keyboard--hidden');
  }

  rebuildFnButtonsStyles(ob, name) {
    if (this.APP.prop[name]) {
      ob.classList.add('keyboard__key--active');
      return;
    }
    ob.classList.remove('keyboard__key--active');
  }

  setCaps() {
    this.setAndToggleCaps();
    this.arraseFrgmnt(this.APP.ID.mainRows);
    this.createMainRows();
    if (this.APP.prop.capsLock) {
      document.getElementById('id_20').classList.add("keyboard__key--active");// , "keyboard__quick-animated"
      // this.keyAnimated(document.getElementById('id_20'));
    }
    this.rebuildFnButtonsStyles(document.getElementById('id_16'), 'shift');
  }

  setAndToggleCaps() {
    this.APP.prop.capsLock = !this.APP.prop.capsLock;
  }

  setDone() {
    this.closeKeyBoard();
  }

  setShift() {
    this.setAndToggleShift();
    this.arraseFrgmnt(this.APP.ID.firstRow);
    this.createFirstRow();
    this.arraseFrgmnt(this.APP.ID.mainRows);
    this.createMainRows();
    if (this.APP.prop.shift) {
      document.getElementById('id_16').classList.add("keyboard__key--active");// , "keyboard__quick-animated"
    }
    this.rebuildFnButtonsStyles(document.getElementById('id_20'), 'capsLock');
  }

  setAndToggleShift() {
    this.APP.prop.shift = !this.APP.prop.shift;
  }

  setLang() {
    this.setFocusOnTextField();

    this.setAndToggleLangName();

    this.arraseFrgmnt(this.APP.ID.firstRow);
    this.createFirstRow();
    this.arraseFrgmnt(this.APP.ID.mainRows);
    this.createMainRows();

    document.getElementById('id_langChange').innerText = this.APP.prop.lang;
    this.rebuildFnButtonsStyles(document.getElementById('id_16'), 'shift');
    this.rebuildFnButtonsStyles(document.getElementById('id_20'), 'capsLock');
  }

  setAndToggleLangName() {
    this.APP.prop.lang = this.APP.prop.lang === 'ru' ? 'en' : 'ru';
  }

  arraseFrgmnt(ob) {
    const object = ob;
    object.innerHTML = '';
  }

  left(n = 1) {
    this.setFocusOnTextField();
    this.setCursorOnPosition(n * (-1));
  }

  right(n = 1) {
    this.setFocusOnTextField();
    this.setCursorOnPosition(n);
  }

  backspace(startPos, finishPos, num = 1, sep = this.separateValue()) {
    let n = num;
    this.setFocusOnTextField();
    if (startPos === 0 && finishPos === 0) {
      return;
    }
    if (startPos === 0 && finishPos !== 0) {
      this.APP.prop.textAreaCurrValue = sep.finish;
      this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
      this.setCursorOnPosition(0, 0, 0);
      return;
    }
    if (startPos !== finishPos) {
      this.APP.prop.textAreaCurrValue = this.separateValue(n = 0).start + sep.finish;
      this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
      this.setCursorOnPosition(0, startPos - n, startPos - n);
      return;
    }
    this.APP.prop.textAreaCurrValue = sep.start + sep.finish;
    this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
    this.setCursorOnPosition(1, startPos - n, finishPos - n);
  }

  setCursorOnPosition(n = 1, start, fin) {
    this.APP.ID.textField.setSelectionRange(
      start === undefined ? this.APP.ID.textField.selectionStart + n : start, fin === undefined ? this.APP.ID.textField.selectionEnd + n : fin,
    );
  }

  isActualStateUpperCase(val = false) {
    let returnValue = val;
    if (this.APP.prop.capsLock || this.APP.prop.shift) {
      returnValue = true;
    }
    if (this.APP.prop.capsLock && this.APP.prop.shift) {
      returnValue = false;
    }
    return returnValue;
  }

  setTextFieldValue(startPos, finishPos, iVal, past = false) {
    let val = iVal;
    if (val.length > 1 && !past) {
      return;
    }

    this.setFocusOnTextField();
    if (this.isActualStateUpperCase()) {
      val = val.toUpperCase();
    }

    const start = this.APP.ID.textField.value.slice(0, startPos);
    const finish = this.APP.ID.textField.value.slice(finishPos, this.APP.ID.textField.value.length);

    this.APP.prop.textAreaCurrValue = start + val + finish;
    this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
    this.setCursorOnPosition(1, startPos + 1, finishPos + 1);
  }

  setFocusOnTextField() {
    this.APP.ID.textField.focus();
  }

  separateValue(n = 1) {
    return {
      start: this.APP.ID.textField.value.slice(0, this.APP.ID.textField.selectionStart - n),
      finish: this.APP.ID.textField.value.slice(this.APP.ID.textField.selectionEnd, this.APP.ID.textField.value.length),
    };
  }

  /**
   *
   *           Wiew
   *
   */

  makeKeyBoardContainer() {
    this.APP.ID.textField = document.getElementById(`countriesSearch`);
    this.APP.ID.main = document.getElementById('rssKeyBoard');

    this.APP.ID.keysContainer = this.makeElement('div', "keyboard__keys");

    this.APP.ID.firstRow = this.makeElement('div', "keyboard__firstRow", '', '', 'firstRow');
    this.APP.ID.mainRows = this.makeElement('div', "keyboard__mainRows", '', '', 'mainRow');
    this.APP.ID.lastRow = this.makeElement('div', "keyboard__lastRow", '', '', 'lastRow');

    this.APP.ID.keysContainer.appendChild(this.APP.ID.firstRow);
    this.APP.ID.keysContainer.appendChild(this.APP.ID.mainRows);
    this.APP.ID.keysContainer.appendChild(this.APP.ID.lastRow);

    this.APP.ID.main.appendChild(this.APP.ID.keysContainer);
  }

  makeElement(elmnt, cssClass, textVal = '', _type = '', _id = '') {
    const el = document.createElement(elmnt);
    if (cssClass) {
      el.classList.add(...cssClass.split(' '));
    }
    if (textVal) {
      el.textContent = this.getProperTextVal(textVal);
      if (this.APP.prop.lang === 'ru' && this.APP.prop.shift && this.APP.keys.firstRow.ruShifted.indexOf(textVal) !== -1) {
        el.id = `id_${this.getProperIDVal(this.APP.keys.firstRow.common[this.APP.keys.firstRow.ruShifted.indexOf(textVal)])}`;
      } else if (this.APP.prop.lang === 'ru' && this.APP.prop.shift) {
        el.id = `id_${this.getProperIDVal(this.APP.keys.en[this.APP.keys.ruShifted.indexOf(textVal)])}`;
      } else if (this.APP.prop.lang === 'en' && this.APP.prop.shift && this.APP.keys.firstRow.enShifted.indexOf(textVal) !== -1) {
        el.id = `id_${this.getProperIDVal(this.APP.keys.firstRow.common[this.APP.keys.firstRow.enShifted.indexOf(textVal)])}`;
      } else if (this.APP.prop.lang === 'en' && this.APP.prop.shift) {
        el.id = `id_${this.getProperIDVal(this.APP.keys.en[this.APP.keys.enShifted.indexOf(textVal)])}`;
      } else if (this.APP.prop.lang === 'ru' && !this.APP.prop.shift && this.APP.keys.firstRow.common.indexOf(textVal) !== -1) {
        el.id = `id_${this.getProperIDVal(this.APP.keys.firstRow.common[this.APP.keys.firstRow.common.indexOf(textVal)])}`;
      } else if (this.APP.prop.lang === 'ru' && !this.APP.prop.shift) {
        el.id = `id_${this.getProperIDVal(this.APP.keys.en[this.APP.keys.ru.indexOf(textVal)])}`;
      } else {
        el.id = `id_${this.getProperIDVal(textVal)}`;
      }
      el.dataset.val = textVal;
    }
    if (_id) {
      el.id = _id;
    }
    if (_type) {
      el.type = _type;
    }
    return el;
  }

  getProperIDVal(val) {
    if (this.APP.prop.fnKeys[val]) {
      return this.APP.prop.fnKeys[val];
    }
    return (val.length === 1) ? val.toUpperCase().charCodeAt(0) : val;
  }

  getProperTextVal(val) {
    switch (val) {
      case 'en/ru':
        return this.APP.prop.lang;
      case 'left':
      case 'right':
      case 'space':
        return '';
      default:
        if (val in this.APP.prop.fnKeys) {
          return val;
        }
        return this.isActualStateUpperCase() ? val.toUpperCase() : val;
    }
  }

  createKeys(len = 'en') {
    this.createFirstRow(len);
    this.createMainRows(len);
    this.createLastRow(len);
  }

  getPropShiftedRow(row) {
    return this.isShiftedState() ? `${this.APP.prop.lang}Shifted` : row;
  }

  isShiftedState() {
    return !!this.APP.prop.shift;
  }

  createFirstRow() {
    this.APP.keys.firstRow[this.getPropShiftedRow('common')].forEach((key) => {
      this.APP.ID.firstRow.appendChild(this.makeElement('button', `keyboard__key${this.getAdditionalCssClass(key)}`, key, 'button'));
    });
  }

  createMainRows() {
    this.APP.keys[[this.getPropShiftedRow(this.APP.prop.lang)]].forEach((key) => {
      this.APP.ID.mainRows.appendChild(this.makeElement('button', `keyboard__key${this.getAdditionalCssClass(key)}`, key, 'button'));
      this.appendNewLine(key, this.APP.ID.mainRows);
    });
  }

  createLastRow(len = 'en') {
    this.APP.keys.lastRow.forEach((key) => {
      this.APP.ID.lastRow.appendChild(this.makeElement('button', `keyboard__key${this.getAdditionalCssClass(key)}`, (key === 'en/ru' ? len : key), 'button'));
    });
  }

  getAdditionalCssClass(key) {
    return (key.length > 1 ? ` ${key}` : "") + (key === 'caps' || key === 'shift' ? " keyboard__key--activatable" : "");
  }

  appendNewLine(key, ob) {
    return (this.APP.keys.newLineAfter.indexOf(key) !== -1) ? ob.appendChild(this.makeElement('br')) : false;
  }
}

export default RSSKeyBoard;
