/** 
 *  Class Momentum
 *  
 */
class Momentum {
  constructor(){
    /** ANDROID STYLE DEFINITION */
    this.APP = {
      strings : {
          en:{
              dayPart:{
                  afternoon:'Afternoon',
                  night:'Night',
                  morning:'Morning',
                  evening:'Evening'
              },
              dayName:{
                  0:'Sunday',
                  1:'Monday',
                  2:'Tuesday',
                  3:'Wednesday',
                  4:'Thursday',
                  5:'Friday',
                  6:'Saturday'
              },
              monthName:{
                  0:'January',
                  1:'February',
                  2:'March',
                  3:'April',
                  4:'May',
                  5:'June',
                  6:'July',
                  7:'August',
                  8:'September',
                  9:'October',
                  10:'November',
                  11:'December'
              },
              greeting:{
                  afternoon:'Good ',
                  night:'Good ',
                  morning:'Good ',
                  evening:'Good '
              },
              defltname:'[Enter Name]',
              defltfocus:'[Enter Focus]'
          }
      },
      SETS:{
        showAmPm: false,
        changedHour: 0,
        changedMin: 0,
        changedPartOfDay: 0,
        hourFormat24: true,
        bgPath:'assets/images/',
        imgType:'jpg',
        imageCurrenttName: 0,
        imageStartName: 0,
        imageTotall: 6
      },
      ID:{
        time: document.getElementById('time'),
        greeting: document.getElementById('greeting'),
        name: document.getElementById('name'),
        focus: document.getElementById('focus'),
        dayToday: document.getElementById('day'),
        imgChangeBtn: document.getElementById('imgChangeBtn'),
        momentumContainer: document.getElementById('momentumContainer')
      }
    }

    this.setChangingImgEv(this.APP.ID.imgChangeBtn);
    this.setChangeTextFieldEvent(this.APP.ID.name);
    this.setChangeTextFieldEvent(this.APP.ID.focus);
    
    
    /* Entry Point */
    this.setCurrState();
    this.showDateTime();
    this.setBgGreet();
    
  }


  hideScrpt(){
    if(document.getElementById('momentumScript')){
      document.getElementById('momentumScript').remove();
    }
  }

  // Show Time
  showDateTime() {
    var
      TODAY = this.getToDayObj(),
      MIN = TODAY.getMinutes(),
      SEC = TODAY.getSeconds(),
      MONTH = TODAY.getMonth(),
      DAY = TODAY.getDate(),
      DAY_OF_WEEK = TODAY.getDay(),
      TIME_OUTPUT_STING = '<span class="time-frmt">' + this.getFormatedHour(TODAY) + ':</span><span class="time-frmt">' + this.addZero(MIN) + ':</span><span class="time-frmt sec">' + this.addZero(SEC) + '</span>' + (this.APP.SETS.showAmPm ? this.getAMPM(TODAY) : ""),
      DATE_OUTPUT_STING = this.APP.strings.en.dayName[DAY_OF_WEEK] + ' ' + this.APP.strings.en.monthName[MONTH] + ', ' + DAY;
  
    // Output Time
    this.putHTMLinto(this.APP.ID.time, TIME_OUTPUT_STING);
 
    
    if(MIN !== this.APP.SETS.changedMin){
      this.APP.SETS.changedMin = MIN;
      console.log('Greeting change time!! '+ this.getPartOfTheDay());
      // Output Date
      this.putHTMLinto(this.APP.ID.dayToday, DATE_OUTPUT_STING);
      // this.setMomentumBg('', this.getImgName(true));
      this.putHTMLinto(this.APP.ID.greeting, this.APP.strings.en.greeting[this.getPartOfTheDay()] + this.APP.strings.en.dayPart[this.getPartOfTheDay()] + ',');
    }
   

    if(this.getFormatedHour(TODAY) !== this.APP.SETS.changedHour){
      this.APP.SETS.changedHour = this.getFormatedHour(TODAY);
      // console.log('BG change time!! '+ this.getPartOfTheDay());
      this.setMomentumBg('', this.setImgName());
    }
    
    setTimeout(this.showDateTime.bind(this), 1000);
  }

  getToDayObj(){
    return new Date();//2019, 06 ,10, 20,33,30
  }
     
  putHTMLinto(ob, html){
    ob.innerHTML = html;
  }
  
  // 12/24hr Format
  getFormatedHour(today){
    return this.APP.SETS.hourFormat24 ? (today.getHours()) : (today.getHours() % 12 || 12);
  }
  
  // Set AM or PM
  getAMPM(today){
    return today.getHours() >= 12 ? 'PM' : 'AM';
  }
  
  // Add Zeros To Time Digit
  addZero(n) {
    return (parseInt(n, 10) < 10 ? '0' : '') + n;
  }
  
 
  

  setBgGreet(){
    this.APP.ID.greeting.textContent = this.setGreetingOfDayPart(this.getPartOfTheDay());
    this.setMomentumBg();
  }
 
  setGreetingOfDayPart(dayPart){
    return this.APP.strings.en.greeting[dayPart] + this.APP.strings.en.dayPart[dayPart] + ', ';
  }
/* 
  Set Background
  Фоновые изображения меняются каждый час, 
  Основное требование - плавная смена фоновых изображений. 
  их содержание соответствует времени суток (утро, день, вечер, ночь).
*/   
  setMomentumBg(path='', imgFullName=''){
    document.body.style.backgroundImage = "url('"+(path !== '' ? path : this.getImgPath()) + (imgFullName !== '' ? imgFullName : this.getImgName()) + "')";
    // console.log((path !== '' ? path : this.getImgPath()) + (imgFullName !== '' ? imgFullName : this.getImgName()));
  }
  
  getImgName(isNextEv=true){
    console.log(((this.APP.SETS.imageCurrenttName % this.APP.SETS.imageTotall)+1) + "." + this.APP.SETS.imgType);
    return ((this.APP.SETS.imageCurrenttName % this.APP.SETS.imageTotall)+1) + "." + this.APP.SETS.imgType;
  }
  setImgName(){
    this.APP.SETS.imageCurrenttName++;
  }
  getImgPath(){
    return this.APP.SETS.bgPath + this.getPartOfTheDay() + "/";
  }

/* 
 Solved Есть кнопка, при клике по которой можно пролистать все фоновые изображения за сутки. 
 Solved Изображения пролистываются в том же порядке, в котором они менялись бы в реальном времени. 
*/
  getNextImgPath(){
    return this.APP.SETS.bgPath + this.getNextPartOfTheDay() + "/";
  }
  
  getNextPartOfTheDay(){
    return this.getPartOfTheDay(this.APP.SETS.changedPartOfDay);
  }

  setNextPartOfTheDay(){
    const curr = this.APP.SETS.imageStartName;
    if(this.isOnClickDayPartShouldBeDischarged()){
      // console.log('comes true');
      this.APP.SETS.changedPartOfDay = 0;
      this.APP.SETS.imageCurrenttName = curr;
      // this.loadImageSeqnc();
      return true;
    }
    if(this.isOnClickNextPartOfDayEvComesTrue()){
      this.APP.SETS.changedPartOfDay = this.APP.SETS.changedPartOfDay + 6;
      if(this.APP.SETS.changedPartOfDay===24){
        this.APP.SETS.changedPartOfDay = 0;
      }
      this.APP.SETS.imageCurrenttName = curr;
      this.loadImageSeqnc();
      return true;
    }
    return false;// this.getPartOfTheDay(this.APP.SETS.changedPartOfDay);
  }
  isOnClickNextPartOfDayEvComesTrue(){
    // console.log(('imageCurrenttName('+ (this.APP.SETS.imageCurrenttName+1) +') == imageTotall('+ this.APP.SETS.imageTotall) +') -> '+( ((this.APP.SETS.imageCurrenttName+1) % (this.APP.SETS.imageTotall)) == 0));
    return ((this.APP.SETS.imageCurrenttName+1) % this.APP.SETS.imageTotall) === 0;
  }
  
  isOnClickDayPartShouldBeDischarged(){
    // console.log( 'part: ' +this.APP.SETS.changedPartOfDay+' - ' + (this.APP.SETS.changedPartOfDay !== 0  &&  this.APP.SETS.changedPartOfDay % 24 === 0));
    return this.APP.SETS.changedPartOfDay !== 0  &&  this.APP.SETS.changedPartOfDay % 24 === 0;
  }
/**
 * Retrieve one of the fourth time of the day: morning 6:00-12:00, afternoon 12:00-18:00, evening 18:00-24:00, night 24:00-6:00.
 *
 */ 
  getPartOfTheDay(hour=''){
    if(hour===''){
      const TODAY = this.getToDayObj();
      hour =  TODAY.getHours();
    }
    if(0 <= hour && hour < 6){
      return 'night';
    }
    if(hour < 12){
      return 'morning';
    }
    if(hour < 18){
      return 'afternoon';
    }
    return 'evening';
  }

  getStartPartOfDay(){
    switch (this.getPartOfTheDay()) {
      case 'night':
        return 0;
      case 'morning':
        return 6;
      case 'afternoon':
        return 12;
    }
    return 18;
  } 
  
  objectDelay(ob){
    ob.disabled = true;
    setTimeout(function(){ob.disabled = false}, 1000);
  }

  getField(prop) {
    return localStorage.getItem(prop);
  }

  setField(prop,val) {
    localStorage.setItem(prop,val);
  }
  setImagesNamesStartFin(){
    this.APP.SETS.imageTotall = this.getField('imageTotall') ? this.getField('imageTotall') : this.APP.SETS.imageTotall;
    this.APP.SETS.imageStartName = this.APP.SETS.imageTotall - 6;
    const cur = this.APP.SETS.imageStartName;
    this.APP.SETS.imageCurrenttName = cur;
    
    this.setField('imageTotall', (parseInt(this.APP.SETS.imageTotall)+6 > 18) ? 6 : parseInt(this.APP.SETS.imageTotall)+6);
    console.log(this.APP.SETS.imageStartName + ' ' + this.APP.SETS.imageTotall);
  }
  //this.getField('imageStartName') ? this.getField('imageStartName') : this.APP.SETS.imageStartName;
  // this.setField('imageStartName', (parseInt(this.APP.SETS.imageTotall)+6 > 18) ? 0 : parseInt(this.APP.SETS.imageStartName)+6);
  
  setCurrState(){
    this.setImagesNamesStartFin();
    const TODAY = this.getToDayObj();
    this.APP.SETS.changedHour = this.getFormatedHour(TODAY);//TODAY.getHours();
    this.APP.SETS.changedPartOfDay = this.getStartPartOfDay();
    this.loadImageSeqnc();
  }
  






  
  /* EVENTS */
  
  
  
  /** 
      при клике в поле ввода текст, который там был, исчезает,
      если пользователь ничего не ввёл или ввёл пустую строку,
      текст восстанавливается  
  */
  setChangeTextFieldEvent(ob){
    let 
    // tempVal = '',
    ent = this;
    ob.textContent = getField(ob.id,this);
    ob.onkeypress = setField;
    ob.onblur = setField;
    ob.onfocus = temporaryStore;


    function getField(prop,contxt) {
      return (localStorage.getItem(prop) === null || localStorage.getItem(prop) ==='') ? contxt.APP.strings.en['deflt'+prop] : localStorage.getItem(prop);
    }
  
    function setField(e) {
      if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {// Make sure enter is pressed
          e.preventDefault();
          if(e.target.innerText!==''){
            localStorage.setItem(e.target.id, e.target.innerText);
          }
          e.target.blur();
        }
      } else {
        if(ob.textContent===''){//} && ){
          ob.textContent = (localStorage.getItem(e.target.id) === null || localStorage.getItem(e.target.id)==='') ? ent.APP.strings.en['deflt'+e.target.id] : localStorage.getItem(e.target.id)//tempVal;
        }
        //localStorage.setItem(e.target.id, e.target.innerText);
      }
    }
    function temporaryStore(e){
      // tempVal = ob.textContent;
      // console.log(tempVal);
      ob.textContent = '';
      e.target.focus();

      var range = document.createRange();
      range.selectNodeContents(e.target);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      e.target.style.outlineColor = 'blue';
    }
  }
  
  loadImageSeqnc(start, fin){
    let img;
    start = (start === undefined) ?  parseInt(this.APP.SETS.imageStartName)+1 : start;
    fin = (fin === undefined) ? this.APP.SETS.imageTotall : fin;
    console.log(this.getNextImgPath()+' strat: '+start+'; fin: '+fin);
    /*
    * Should be (promise-then) like functionality
    */
    for(let i=start;i<=fin;i++){
      img = document.createElement('img');
      img.src =  this.getNextImgPath() + i + "." + this.APP.SETS.imgType;
    }
  }

  setChangingImgEv(ob){
    ob.onclick = showNextImage;
    ob.ontouchstart = showNextImage;

    let ent = this;
    function showNextImage(){
      ent.objectDelay(ent.APP.ID.imgChangeBtn);
      const IMG = document.createElement('img');
      // IMG.src = ent.getImgPath() + ent.getImgName();
      // IMG.onload = () => ent.setMomentumBg();//
      if(!ent.setNextPartOfTheDay()){
        ent.setImgName();
      }
      // console.log(ent.getImgName());
      IMG.src =  ent.getNextImgPath() + ent.getImgName();//ent.getImgPath() + ent.getImgName();
      // console.log(ent.getNextImgPath()+ ent.getImgName());
      IMG.onload = () => ent.setMomentumBg( ent.getNextImgPath(), ent.getImgName());//ent.setMomentumBg();//
    }

  }
  
}
