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
                    "shift", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "?"
                  ],
                en:[
                    "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]",
                    "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter",
                    "shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?"
                  ]
                ,
                firstRow:{
                    common:["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-","=","backspace"],
                    en:[ "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace"],
                    ru:["!", "\"", "№", "%", ":", ",", ".", ";", "(", ")", "_", "+", "backspace"]
                },
                lastRow:["done","en/ru","space","left","right"],
                newLineAfter:["ъ", "enter", "backspace", "]", "?"],
              },
              prop:{
                textAreaCurrValue:"",
                capsLock:false,
                lang:"en",
                fnKeys:{'en':'langChange','ru':'langChange','left':37,'right':'ArrowRight','space':32,'enter':13,'shift': 16,'caps': 20,'backspace': 8},
            },
            ID:{
              textField:null,
              main: null,
              keysContainer: null,
              firstRow:null,
              mainRows:null,
              lastRow:null,
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
    document.onchange = _mainControllerClick;
    
    document.onkeypress = _preventInput;
    document.onkeyup = _mainControllerClick;
    document.onclick = _mainControllerClick;
    document.ontouchend = _mainControllerClick;
    const CONTEXT = this;

    function _mainControllerClick(e){
      console.log(e);
 
      if(e.keyCode){
        if(!document.getElementById('id_'+e.keyCode) && e.code.substring(0,3)==='Key'){
          if(!document.getElementById('id_'+e.key.charCodeAt(0))){
            return;
          }
          e.target.value = e.target.value + document.getElementById('id_'+e.key.charCodeAt(0)).dataset['val'];
          return;
        }
         console.log(e.keyCode);
        /* input stanadrt kb arrow */
        switch(e.code){

        
         case 'ArrowRight':
          CONTEXT._right(0);
          return;
         
         case 'ArrowLeft':
          CONTEXT._left(0);
          return;
         
         case 'Backspace':
          CONTEXT._backspace(CONTEXT.APP.ID.textField.selectionStart,CONTEXT.APP.ID.textField.selectionEnd,0,CONTEXT._separateValue(0));
          return;
         
         case 'Enter':
          CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,'\n');
          return;
         
         case 'Space':
          CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,' ');
          return;

         case 'CapsLock':
          CONTEXT._setCaps();
          return;
         

         default:
         if(e.code.substring(0,3)==='Key'){
           CONTEXT._setTextFieldValue(CONTEXT.APP.ID.textField.selectionStart, CONTEXT.APP.ID.textField.selectionEnd,document.getElementById('id_'+e.keyCode).dataset['val']);
           return;
         }

        }

         if(e.key==='Shift'){
          CONTEXT._setShift();
          return;
         }
      
        return;
      }
      if(!e.target.dataset['val']){
        return;
      }

      /* input virtual kb arrow */
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



  _openKeyBoard() {
  console.log('open');
  }


  _setCaps(){
    console.log('CaaapsLock');
    this.APP.prop.capsLock = true;
  }


  _setDone(){
    this._closeKeyBoard();
    console.log('dooone');
  }

  _closeKeyBoard() {
    console.log('Close');
  }


  _setShift(){
    console.log('Shiiift');
  }


  _setLang(){
    console.log('lang');
    this._arraseFrgmnt(this.APP.ID.mainRows);
    this._createMainRows(this._getAndToggleLangName());
  }

  _getAndToggleLangName(leng){
    leng = this.APP.prop.lang === 'ru' ? 'en' : 'ru';
    this.APP.prop.lang = leng;
    return leng;
  }


  _arraseFrgmnt(ob){
    ob.innerHTML='';
  }


  _left(n=1){
    this._setFocusOnTextField();
    this._setCursorOnPosition(n*(-1));
  }

  _right(n=1){
    this._setFocusOnTextField();
    this._setCursorOnPosition(n);
  }

  _backspace(startPos,finishPos,n=1,sep = this._separateValue()){
    this._setFocusOnTextField();
    if(startPos===0){
      return;
    }
    
    this.APP.prop.textAreaCurrValue = sep.start+sep.finish;
    this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue;
    this._setCursorOnPosition(1,startPos-n ,finishPos-n);
  }

  _setCursorOnPosition(n=1,start,fin){
    this.APP.ID.textField.setSelectionRange(!start?this.APP.ID.textField.selectionStart+n:start ,!fin?this.APP.ID.textField.selectionEnd+n:fin);
  }


  _setTextFieldValue(startPos, finishPos, val){
    this._setFocusOnTextField();
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

  // ;	 	186	0xBA
  // =	 	187	0xBB
  // ,	 	188	0xBC
  // -	 	189	0xBD
  // .	 	190	0xBE
  // /	 	191	0xBF
  // ~	 	192	0xC0
  // [	 	219	0xDB
  // \	 	220	0xDC
  // ]	 	221	0xDD
  // '	 	222	0xDE
  // _enter(sep=this._separateValue()){
  //   this.APP.ID.textField.focus();
  //   this.APP.prop.textAreaCurrValue = this.APP.ID.textField.value;
  //   this.APP.ID.textField.value = this.APP.prop.textAreaCurrValue + '\n';
  //   this.APP.ID.textField.setSelectionRange(this.APP.ID.textField.selectionStart+1 , this.APP.ID.textField.selectionEnd+1);
  // }



  /**
   *
   *           Wiew
   *  
   */

    _makeKeyBoardContainer(id) {
      this.APP.ID.textField = document.getElementById(id+'Textarea');
      this.APP.ID.main = document.getElementById(id);
      this.APP.ID.keysContainer = this._makeElement('div',"keyboard__keys");
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
        el.id = 'id_'+ this._getProperIDVal(textVal);
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
      return (val.length == 1) ? val.toUpperCase().charCodeAt(0) : val;
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
          return val;
      }
    }


    _createKeys(len='en') {
      this._createFirstRow(len);
      this._createMainRows(len);
      this._createLastRow(len);
    }



    _createFirstRow(len='en') {
      this.APP.keys.firstRow.common.forEach(key => {
        this.APP.ID.firstRow.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),key,'button'));
        // this.APP.ID.keysContainer.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),key,'button'));
      });
      // this._appendNewLine('enter');
    }




    _createMainRows(len){
      this.APP.keys[len].forEach(key => {
        this.APP.ID.mainRows.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),key,'button'));
        // this.APP.ID.keysContainer.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),key,'button'));
        this._appendNewLine(key,this.APP.ID.mainRows);
      });}



    _createLastRow(len='en'){
      this.APP.keys.lastRow.forEach(key => {
        this.APP.ID.lastRow.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),(key=='en/ru'?len:key),'button'));
        // this.APP.ID.keysContainer.appendChild(this._makeElement('button',"keyboard__key"+this._getAdditionalCssClass(key),(key=='en/ru'?len:key),'button'));
      });  
    }



    _getAdditionalCssClass(key){
      return (key.length > 1 ? " " + key : "")   +   (key === 'caps' || key === 'shift' ? " keyboard__key--activatable" : "");
    }


    
    _appendNewLine(key,ob){
      return (this.APP.keys.newLineAfter.indexOf(key) !== -1) ? ob.appendChild(this._makeElement('br')) : false;
      // return (this.APP.keys.newLineAfter.indexOf(key) !== -1) ? this.APP.ID.keysContainer.appendChild(this._makeElement('br')) : false;
    }



}










  window.addEventListener("DOMContentLoaded", function () {
    new RSSKeyBoard();
});