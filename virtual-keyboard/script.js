class RSSKeyBoard {



  /**
   *  
   *       Controller 
   *
   */

    constructor(id='rssKeyBoard') {
        this.APP = {
            keys:{
                ru:[
                    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
                    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
                    "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "/"
                  ],
                ruShifted:[
                    "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ",
                    "caps", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", "э", "enter",
                    "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?"
                  ],
                en:[
                    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
                    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
                    "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"
                  ],
                enShifted:[
                    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}",
                    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", "\"", "enter",
                    "shift", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?"
                  ],
                firstRow:{
                    common:["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-","=","backspace"],
                    enShifted:["!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace"],
                    ruShifted:["!", '"', "№", "%", ":", ",", ".", ";", "(", ")", "_", "+", "backspace"]
                },
                lastRow:["done","en/ru","space","left","right"],
                newLineAfter:["ъ", "enter", "backspace", "]", "?","}"],
            },
            prop:{
                textAreaCurrValue:"",
                capsLock:false,
                shift:false,
                lang:"en",
                speechRecLeng:'en',
                keySound:true,
                speech:false,
                fnKeys:{'en':'langChange','ru':'langChange','left':37,'right':'ArrowRight','space':32,'enter':13,'shift': 16,'caps': 20,'backspace': 8},
                notAlowedKeyCode:['Control','Alt','Meta','AltRight','AltLeft','MetaLeft','MetaRight','ControlLeft','ControlRight','IntlBackslash','ArrowDown','ArrowUp','Backslash'],
                fixCodeEnter:{'Comma':44,'Period':46,'Slash':47,'Minus':45,'Equal':61,'Quote':39,'Semicolon':59,'BracketRight':93,'BracketLeft':91}
            },
            ID:{
              textField:null,
              main: null,
              keysContainer: null,
              firstRow:null,
              mainRows:null,
              lastRow:null,
              musica:null,
              musica2:null,
              musica3:null,
              speechRecognBtn:null,
              speechRecognBtnLeng:null,
              clickSoundSwitchOffBtn: null,
              speechObj:null,
              keys: []
            }

        }

        this._makeKeyBoardContainer(id);
  
        this. _createKeys();

        this._setEvents();
    }



  _setEvents(){
    // window.onresize = this._scrSize;
    // document.addEventListener('contextmenu', event => event.preventDefault());
    // document.onmousedown = this._mainController;
    // document.oninput = _preventInput;
    document.ontransitionend = _remTransition;
    document.onchange = _mainControllerClick;
    document.onkeypress = _preventInput;
    document.onkeyup = _mainControllerClick;
    document.onclick = _mainControllerClick;
    document.ontouchend = _mainControllerClick;
    const CONTEXT = this;



    function _remTransition(e){
      if(e.propertyName==='background-color'){
        e.target.classList.remove('keyboard__quick-animated');
      }
    }


    function _mainControllerClick(e){
      // console.log(e);


      /* input STANDART kb */

      if(e.keyCode){

        if(!document.getElementById('id_'+e.keyCode) && e.code.substring(0,3)==='Key'){
          if(!document.getElementById('id_'+e.key.charCodeAt(0))){
            return;
          }

          CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,document.getElementById('id_'+e.key.charCodeAt(0)).dataset['val']);
          CONTEXT._keyAnimated(document.getElementById('id_'+e.key.charCodeAt(0)));
          return;
        }
         
        // console.log(e.code);
        switch(e.code){

         case 'ArrowRight':
          CONTEXT._right(0);
          CONTEXT._keyAnimated(document.getElementById('id_ArrowRight'));
          return;
         
         case 'ArrowLeft':
          CONTEXT._left(0);
          CONTEXT._keyAnimated(document.getElementById('id_37'));
          return;
         
         case 'Backspace':
          CONTEXT._backspace(CONTEXT.APP.ID.textField.selectionStart,CONTEXT.APP.ID.textField.selectionEnd,0,CONTEXT._separateValue(0));
          CONTEXT._keyAnimated(document.getElementById('id_8'));
          return;
         
         case 'Enter':
          CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,'\n');
          CONTEXT._keyAnimated(document.getElementById('id_13'));
          return;
         
         case 'Space':
          CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,' ');
          CONTEXT._keyAnimated(document.getElementById('id_32'));
          return;
         
         case 'ShiftLeft':
         case 'ShiftRightt':
          CONTEXT._setShift();
          return;

         case 'CapsLock':
          CONTEXT._setCaps();
          return;
         

         default:
          if(CONTEXT.APP.prop.notAlowedKeyCode.indexOf(e.code)==-1 ){
            if(e.code in CONTEXT.APP.prop.fixCodeEnter){
              CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,document.getElementById('id_'+CONTEXT.APP.prop.fixCodeEnter[e.code]).dataset['val']);
              CONTEXT._keyAnimated(document.getElementById('id_'+CONTEXT.APP.prop.fixCodeEnter[e.code]));
              return;
            }
            try{
              CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,document.getElementById('id_'+e.keyCode).dataset['val']);
              CONTEXT._keyAnimated(document.getElementById('id_'+e.keyCode));
            }
            catch(e){
            }
           return;
          }
         if( e.code.substring(0,3)==='Key' || e.code.substring(0,5)==='Digit' || e.code.substring(0,5)==='Minus' ){
           CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,document.getElementById('id_'+e.keyCode).dataset['val']);
           CONTEXT._keyAnimated(document.getElementById('id_'+e.keyCode));
           return;
         }

        }

         if(e.key==='Shift'){
          CONTEXT._setShift();
          return;
         }
      
        return;
      }



      /* Additional Buttons */
      switch(e.target.id){
        case 'speechRecognBtn':
            CONTEXT._speechRecognOnOf();
          return;
          case 'soundSwitchOffBtn':
            CONTEXT._soundSwitchOnOff();
          return;
          case 'speechLang':
            CONTEXT._changeSpeechLang(e.target.dataset['val']);
          return;
      }
      if(!e.target.dataset['val']){
        return;
      }


      /* input VIRTUAL kb */
      CONTEXT._keyAnimated(e.target);
      switch(e.target.dataset['val']){
        case 'left':
          CONTEXT._left();
          return;
        case 'right':
          CONTEXT._right();
        return
        case 'enter':
          CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,'\n');
        return
        case 'space':
          CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,' ');
        return
        case 'caps':
          CONTEXT._setCaps();
        return
        case 'done':
          CONTEXT._setDone();
        return
        case 'shift':
          CONTEXT._setShift();
        return
        case 'textField':
          CONTEXT._openKeyBoard();
        return
        case 'en':
        case 'ru':
          CONTEXT._setLang();
        return
        case 'backspace':
          CONTEXT._backspace(CONTEXT.APP.ID.textField.selectionStart,CONTEXT.APP.ID.textField.selectionEnd);
        return
      }
      CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,e.target.dataset['val']);
    }

    function _preventInput(e){
      e.preventDefault();
    }

  }











  /** 
   * 
   *          Model
   * 
  */

  _toggleCalss(ob,isNeddedToRem,cssClass){
    if(isNeddedToRem){
      ob.classList.remove(cssClass);
      return;
    }
    ob.classList.add(cssClass);
  }
  _changeSpeechLang(val='en'){
    this.APP.prop.speechRecLeng = 'en'===val ? 'ru' : 'en';
    this.APP.ID.speechRecognBtnLeng.dataset['val'] = this.APP.prop.speechRecLeng;
    this.APP.ID.speechRecognBtnLeng.innerText = this.APP.prop.speechRecLeng;
    // console.log(this.APP.prop.speechRecLeng);
  }

 _speechRecognOnOf(){
  this._setFocusOnTextField();
   this.APP.prop.speech = this.APP.prop.speech ? false : true;
   this._toggleCalss(this.APP.ID.speechRecognBtn,!this.APP.prop.speech,'speechRecognBtn--active');
   console.log('speech: '+this.APP.prop.speech);
   const cntx = this;
 
   let transcript = '';
   if(!this.APP.prop.speech){
    console.log('closed');
    //  this.APP.ID.speechObj.onresult = null;
    //  this.APP.ID.speechObj.onend = null;
    //  this.APP.ID.speechObj.interimResults = false;
    // this.APP.ID.speechObj.abort();
    this.APP.ID.speechObj.stop();
    this.APP.ID.speechObj.onend = null;
    //  this.APP.ID.speechObj = null;
   }
   if(this.APP.prop.speech){
     console.log('opened');
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    //  let recognition 
    if(this.APP.ID.speechObj){
      return;
    }
    this.APP.ID.speechObj = new webkitSpeechRecognition() || new SpeechRecognition();;
    this.APP.ID.speechObj.interimResults = true;
    this.APP.ID.speechObj.lang = this.APP.prop.lang;
     this.APP.ID.speechObj.onend = function() { 
      console.log('Speech recognition service disconnected'); 
     }
     console.log(this.APP.ID.speechObj.lang);
     this.APP.ID.speechObj.addEventListener('result', e => {
      transcript = Array.from(e.results).map(result => result[0]).map(result => result.transcript).join('');
      if(e.results[0].isFinal){
      this.APP.ID.textField.value = this.APP.ID.textField.value + '\n' + transcript;
      }
     });
     this.APP.ID.speechObj.addEventListener('end',this.APP.ID.speechObj.start);
     this.APP.ID.speechObj.start();
   }
   else{

   }
   
  return;
 }

 _soundSwitchOnOff(){
  this.APP.prop.keySound = this.APP.prop.keySound ? false : true;
  this._toggleCalss(this.APP.ID.clickSoundSwitchOffBtn,!this.APP.prop.keySound,'keySoundSwitch--active');
  return;
}



  _play(ob='musica'){
    if(this.APP.prop.keySound){
      ob = document.getElementById(ob);
      ob.currentTime = 0;
      ob.play();
    }
  }


  _keyAnimated(ob){
    ob.classList.add('keyboard__quick-animated');
  }


  _openKeyBoard() {
    document.getElementById('rssKeyBoard').classList.remove('keyboard--hidden');
  }



  _closeKeyBoard() {
    document.getElementById('rssKeyBoard').classList.add('keyboard--hidden');
  }


  _rebuildFnButtonsSyles(ob,name){
    if(this.APP.prop[name]){
      ob.classList.add('keyboard__key--active');
      return;
    }
    ob.classList.remove('keyboard__key--active');
  }

  _setCaps(){
    this._setAndToggleCaps();
    this._arraseFrgmnt(this.APP.ID.mainRows);
    this._createMainRows();
    if(this.APP.prop.capsLock){
      document.getElementById('id_20').classList.add("keyboard__key--active");//, "keyboard__quick-animated"
      // this._keyAnimated(document.getElementById('id_20'));
    }
    this._rebuildFnButtonsSyles(document.getElementById('id_16'),'shift');
    this._play('musica2');
  }

  _setAndToggleCaps(){
    this.APP.prop.capsLock = this.APP.prop.capsLock ? false : true;
  }

  _setDone(){
    this._play('musica2');
    this._closeKeyBoard();
  }



  _setShift(){
    this._play('musica2');
    this._setAndToggleShift();
    this._arraseFrgmnt(this.APP.ID.firstRow);
    this._createFirstRow();
    this._arraseFrgmnt(this.APP.ID.mainRows);
    this._createMainRows();
    if(this.APP.prop.shift){
      document.getElementById('id_16').classList.add("keyboard__key--active");//, "keyboard__quick-animated"
    }
    this._rebuildFnButtonsSyles(document.getElementById('id_20'),'capsLock');
  }

  _setAndToggleShift(){
    this.APP.prop.shift = this.APP.prop.shift ? false : true;
  }

  _setLang(){
    this._play('musica2');
    if(this.APP.ID.speechObj){
      this.APP.ID.speechObj.lang = this.APP.prop.lang;
    }
    this._setFocusOnTextField();

    this._setAndToggleLangName();

    this._arraseFrgmnt(this.APP.ID.firstRow);
    this._createFirstRow();
    this._arraseFrgmnt(this.APP.ID.mainRows);
    this._createMainRows();

    document.getElementById('id_langChange').innerText = this.APP.prop.lang;
    this._rebuildFnButtonsSyles(document.getElementById('id_16'),'shift');
    this._rebuildFnButtonsSyles(document.getElementById('id_20'),'capsLock');
  }


  _setAndToggleLangName(){
    this.APP.prop.lang = this.APP.prop.lang === 'ru' ? 'en' : 'ru';
  }


  _arraseFrgmnt(ob){
    ob.innerHTML='';
  }


  _left(n=1){
    this._play();
    this._setFocusOnTextField();
    this._setCursorOnPosition(n*(-1));
  }

  _right(n=1){
    this._play();
    this._setFocusOnTextField();
    this._setCursorOnPosition(n);
  }

  _backspace(startPos,finishPos,n=1,sep = this._separateValue()){
    this._play('musica3');
    this._setFocusOnTextField();
    if(startPos===0 && finishPos===0){
      return;
    }
    if(startPos===0 && finishPos!==0){
      this.APP.prop.textAreaCurrValue = sep.finish;
      this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
      this._setCursorOnPosition(0,0,0);
      return;
    }
    if(startPos !== finishPos){
      this.APP.prop.textAreaCurrValue = this._separateValue(n=0).start + sep.finish;
      this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
      this._setCursorOnPosition(0,startPos-n,startPos-n);
      return;
    }
    this.APP.prop.textAreaCurrValue = sep.start + sep.finish;
    this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
    this._setCursorOnPosition(1,startPos-n ,finishPos-n);
  }

  _setCursorOnPosition(n=1,start,fin){
    this.APP.ID.textField.setSelectionRange(start===undefined?this.APP.ID.textField.selectionStart+n:start ,fin===undefined?this.APP.ID.textField.selectionEnd+n:fin);
  }

  _isActualStateUpperCase(val=false){
    if(this.APP.prop.capsLock || this.APP.prop.shift){
      val = true;
    }
    if(this.APP.prop.capsLock && this.APP.prop.shift){
      val = false;
    }
    return val;
  }


  _setTextFieldValue(startPos, finishPos, val){
    this._play((val==='\n')?'musica2':'musica');

    if(val.length > 1){
      return;
    }
    this._setFocusOnTextField();
    if(this._isActualStateUpperCase()){
      val = val.toUpperCase();
    }


    let start = this.APP.ID.textField.value.slice(0,startPos);
    let finish = this.APP.ID.textField.value.slice(finishPos,this.APP.ID.textField.value.length);
    
    this.APP.prop.textAreaCurrValue = start + val +finish;
    this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
    this._setCursorOnPosition(1,startPos+1 ,finishPos+1);
  }

  _setFocusOnTextField(){
    this.APP.ID.textField.focus();
  }

  _separateValue(n=1){
    return { start: this.APP.ID.textField.value.slice(0,this.APP.ID.textField.selectionStart-n),finish: this.APP.ID.textField.value.slice( this.APP.ID.textField.selectionEnd,this.APP.ID.textField.value.length)};
  }







  /**
   *
   *           Wiew
   *  
   */

    _makeKeyBoardContainer(id) {
 
      this.APP.ID.textField = document.getElementById(id+'Textarea');
      this.APP.ID.main = document.getElementById(id);

      /* Additional el */
      this.APP.ID.musica = document.createElement('audio');
      this.APP.ID.musica.id = 'musica';
      this.APP.ID.musica.src = 'click.wav';
      this.APP.ID.main.appendChild(this.APP.ID.musica);
      this.APP.ID.musica2 = document.createElement('audio');
      this.APP.ID.musica2.id = 'musica2';
      this.APP.ID.musica2.src = 'vuiti.wav';
      this.APP.ID.main.appendChild(this.APP.ID.musica2);
      this.APP.ID.musica3 = document.createElement('audio');
      this.APP.ID.musica3.id = 'musica3';
      this.APP.ID.musica3.src = 'vshick.wav';
      this.APP.ID.main.appendChild(this.APP.ID.musica3);

      this.APP.ID.keysContainer = this._makeElement('div',"keyboard__keys");

      /* Additional BTNS */
      this.APP.ID.speechRecognBtn = this._makeElement('div',"keyboard__key addnl speechRecognBtn",'speech','','speechRecognBtn');
      this.APP.ID.clickSoundSwitchOffBtn = this._makeElement('div',"keyboard__key addnl keySoundSwitch keySoundSwitch--active",'sound','','soundSwitchOffBtn');
      this.APP.ID.keysContainer.appendChild(this.APP.ID.speechRecognBtn); 
      this.APP.ID.keysContainer.appendChild(this.APP.ID.clickSoundSwitchOffBtn);


      this.APP.ID.firstRow = this._makeElement('div',"keyboard__firstRow",'','','firstRow');
      this.APP.ID.mainRows = this._makeElement('div',"keyboard__mainRows",'','','mainRow');
      this.APP.ID.lastRow = this._makeElement('div',"keyboard__lastRow",'','','lastRow');

      this.APP.ID.keysContainer.appendChild(this.APP.ID.firstRow );
      this.APP.ID.keysContainer.appendChild(this.APP.ID.mainRows);
      this.APP.ID.keysContainer.appendChild(this.APP.ID.lastRow );

      this.APP.ID.main.appendChild(this.APP.ID.keysContainer);


    }


    
    _makeElement(el,cssClass,textVal='',_type='',_id=''){
      el = document.createElement(el);
      if(cssClass){
        cssClass = cssClass.split(' ');
        el.classList.add(...cssClass);
      }
      if(textVal){
        el.textContent =  this._getProperTextVal(textVal);
        /* RU firstRow Shifted */
        if(this.APP.prop.lang ==='ru' && this.APP.prop.shift && this.APP.keys.firstRow.ruShifted.indexOf(textVal)!==-1){
          el.id = 'id_'+ this._getProperIDVal(this.APP.keys.firstRow.common[this.APP.keys.firstRow.ruShifted.indexOf(textVal)]);
        }
        /* RU middlRows Shifted */
        else if(this.APP.prop.lang === 'ru' && this.APP.prop.shift){
          el.id = 'id_'+ this._getProperIDVal(this.APP.keys.en[this.APP.keys.ruShifted.indexOf(textVal)]);
        }
        /* EN firstRow Shifted */
        else if(this.APP.prop.lang ==='en' && this.APP.prop.shift && this.APP.keys.firstRow.enShifted.indexOf(textVal)!==-1){
          el.id = 'id_'+ this._getProperIDVal(this.APP.keys.firstRow.common[this.APP.keys.firstRow.enShifted.indexOf(textVal)]);
        }
        /* EN middlRows Shifted */
        else if(this.APP.prop.lang === 'en' && this.APP.prop.shift){
          el.id = 'id_'+ this._getProperIDVal(this.APP.keys.en[this.APP.keys.enShifted.indexOf(textVal)]);
        }
         /* RU firstRow */
        else if(this.APP.prop.lang ==='ru' && !this.APP.prop.shift && this.APP.keys.firstRow.common.indexOf(textVal)!==-1){
          el.id = 'id_'+ this._getProperIDVal(this.APP.keys.firstRow.common[this.APP.keys.firstRow.common.indexOf(textVal)]);
        } 
        /* RU middlRows */
        else if(this.APP.prop.lang === 'ru' && !this.APP.prop.shift){
          el.id = 'id_'+ this._getProperIDVal(this.APP.keys.en[this.APP.keys.ru.indexOf(textVal)]);
        }
      
        else{
          el.id = 'id_'+ this._getProperIDVal(textVal);
        }
        el.dataset.val = textVal;
      }
      if(_id){
        el.id = _id;
      }
      if(_type){
        el.type = _type;
      }
      return el;
    }


    _getProperIDVal(val){
      if(this.APP.prop.fnKeys[val]){
        return this.APP.prop.fnKeys[val];
      }
      return (val.length === 1) ? val.toUpperCase().charCodeAt(0) : val;
    }


    _getProperTextVal(val){
      switch(val){
        case 'en/ru':
          return this.APP.prop.lang; 
        case 'left':
        case 'right':
        case 'space':
          return '';
        default:
          return (val in this.APP.prop.fnKeys)    ?    val    :    this._isActualStateUpperCase() ? val.toUpperCase() : val;
      }
    }


    _createKeys(len='en') {
      this._createFirstRow(len);
      this._createMainRows(len);
      this._createLastRow(len);
    }

    _getPropShiftedRow(row){
      return this._isShiftedState() ?  this.APP.prop.lang+'Shifted' : row;
    }

    _isShiftedState(){
      return this.APP.prop.shift ? true : false;
    }


    _createFirstRow(len='en') {
      this.APP.keys.firstRow[this._getPropShiftedRow('common')].forEach(key => {
        this.APP.ID.firstRow.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),key,'button'));
      });
    }

    


    _createMainRows(){
      this.APP.keys[[this._getPropShiftedRow(this.APP.prop.lang)]].forEach(key => {
        this.APP.ID.mainRows.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),key,'button'));
        this._appendNewLine(key,this.APP.ID.mainRows);
      });
    }

    

    _createLastRow(len='en'){
      this.APP.keys.lastRow.forEach(key => {
        this.APP.ID.lastRow.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),(key=='en/ru'?len:key),'button'));
      });  
    }
 



    _getAdditionalCssClass(key){
      return (key.length > 1 ? " " + key : "")   +   (key === 'caps' || key === 'shift' ? " keyboard__key--activatable" : "");
    }


    
    _appendNewLine(key,ob){
      return (this.APP.keys.newLineAfter.indexOf(key) !== -1) ? ob.appendChild(this._makeElement('br')) : false;
    }
    // return (this.APP.keys.newLineAfter.indexOf(key) !== -1) ? this.APP.ID.keysContainer.appendChild(this._makeElement('br')) : false;



}










  window.addEventListener("DOMContentLoaded", function () {
    new RSSKeyBoard();
});