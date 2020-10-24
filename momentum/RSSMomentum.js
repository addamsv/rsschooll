/** 
 *  Class Momentum
 *  
 */
class Momentum {
  constructor(){
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
        changedPartOfDay: 0,
        hourFormat24: true,
        bgPath:'assets/images/',
        imgType:'jpg',
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
    // Output Date
    this.putHTMLinto(this.APP.ID.dayToday, DATE_OUTPUT_STING);
  
    if(this.getFormatedHour(TODAY) !== this.APP.SETS.changedHour){
    // if(MIN !== this.APP.SETS.changedHour){
      this.APP.SETS.changedHour = this.getFormatedHour(TODAY);
      // this.APP.SETS.changedHour = MIN;
      console.log('BG change time!! '+ this.getPartOfTheDay());
      this.setMomentumBg('', this.getImgName(true));
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
  
 
  
/* 
  Set Background and Greeting
  Фоновые изображения меняются каждый час, Основное требование - плавная смена фоновых изображений. их содержание соответствует времени суток (утро, день, вечер, ночь).
*/
  setBgGreet(){
    this.APP.ID.greeting.textContent = this.setGreetingOfDayPart(this.getPartOfTheDay());
    this.setMomentumBg();
  }
  
  setGreetingOfDayPart(dayPart){
    return this.APP.strings.en.greeting[dayPart] + this.APP.strings.en.dayPart[dayPart] + ', ';
  }
  
  setMomentumBg(path='', imgFullName=''){
    document.body.style.backgroundImage = "url('"+(path !== '' ? path : this.getImgPath()) + (imgFullName !== '' ? imgFullName : this.getImgName()) + "')";
  }
  
  getImgName(isNextEv=true){
    const NAME = ((this.APP.SETS.imageStartName % this.APP.SETS.imageTotall)+1) + "." + this.APP.SETS.imgType;
    if(isNextEv){
      this.APP.SETS.imageStartName++;
    }
    return NAME;
  }
  
  getImgPath(){
    return this.APP.SETS.bgPath + this.getPartOfTheDay() + "/";
  }

/* 
 Есть кнопка, при клике по которой можно пролистать все фоновые изображения за сутки. 
 Изображения пролистываются в том же порядке, в котором они менялись бы в реальном времени. 
*/
  getNextImgPath(){
    return this.APP.SETS.bgPath + this.getNextPartOfTheDay() + "/";
  }
  
  getNextPartOfTheDay(){
    if((this.APP.SETS.imageStartName % this.APP.SETS.imageTotall) == 0){
      this.APP.SETS.changedPartOfDay = (this.APP.SETS.changedPartOfDay !== 0 && this.APP.SETS.changedPartOfDay % 24 === 0) ? 0 : this.APP.SETS.changedPartOfDay + 6;
    }
    console.log(this.APP.SETS.changedPartOfDay+' '+this.getPartOfTheDay(this.APP.SETS.changedPartOfDay));
    return this.getPartOfTheDay();
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
  
  
  objectDelay(ob){
    ob.disabled = true;
    setTimeout(function(){ob.disabled = false}, 1000);
  }

  
  setCurrState(){
    const TODAY = this.getToDayObj();
    this.APP.SETS.changedHour = this.getFormatedHour(TODAY);//TODAY.getHours();
    // this.APP.SETS.changedHour = TODAY.getMinutes();
  }
  






  
  /* EVENTS */
  
  
  
  /** 
      при клике в поле ввода текст, который там был, исчезает,
      если пользователь ничего не ввёл или ввёл пустую строку,
      текст восстанавливается  
  */
  setChangeTextFieldEvent(ob){
  
    ob.textContent = getField(ob.id,this);
    ob.onkeypress = setField;
    ob.onblur = setField;

    function getField(prop,contxt) {
      return localStorage.getItem(prop) === null ? contxt.APP.strings.en['deflt'+prop] : localStorage.getItem(prop);
    }
  
    function setField(e) {
      if (e.type === 'keypress') {
        if (e.which == 13 || e.keyCode == 13) {// Make sure enter is pressed
          e.preventDefault();
          localStorage.setItem(e.target.id, e.target.innerText);
          e.target.blur();
        }
      } else {
        localStorage.setItem(e.target.id, e.target.innerText);
      }
    }
  }
  
  
  setChangingImgEv(ob){
    ob.onclick = showNextImage;
    ob.ontouchstart = showNextImage;

    let ent = this;
    function showNextImage(){
      ent.objectDelay(ent.APP.ID.imgChangeBtn);
      const IMG = document.createElement('img');
      IMG.src = ent.getImgPath() + ent.getImgName(false);//getNextImgPath() + ent.getImgName(false)
      IMG.onload = () => ent.setMomentumBg();//ent.setMomentumBg(getNextImgPath(), ent.getImgName(false));
      ent.getNextPartOfTheDay();
    }

  }
  
}



























// /** ANDROID STYLE DEFINITION */
// const APP = {
//   strings : {
//       en:{
//           dayPart:{
//               afternoon:'Afternoon',
//               night:'Night',
//               morning:'Morning',
//               evening:'Evening'
//           },
//           dayName:{
//               0:'Sunday',
//               1:'Monday',
//               2:'Tuesday',
//               3:'Wednesday',
//               4:'Thursday',
//               5:'Friday',
//               6:'Saturday',
//           },
//           monthName:{
//               0:'January',
//               1:'February',
//               2:'March',
//               3:'April',
//               4:'May',
//               5:'June',
//               6:'July',
//               7:'August',
//               8:'September',
//               9:'October',
//               10:'November',
//               11:'December'
//           },
//           greeting:{
//               afternoon:'Good ',
//               night:'Good ',
//               morning:'Good ',
//               evening:'Good '
//           },
//           defltname:'[Enter Name]',
//           defltfocus:'[Enter Focus]',
//       }
//   },
//   SETS:{
//     showAmPm: false,
//     changedHour: 0,
//     changedPartOfDay: '',
//     hourFormat24: true,
//     bgPath:'assets/images/',
//     imgType:'jpg',
//     imageStartName: 0,
//     imageTotall: 6
//   },
//   ID:{
//     time: document.getElementById('time'),
//     greeting: document.getElementById('greeting'),
//     name: document.getElementById('name'),
//     focus: document.getElementById('focus'),
//     dayToday: document.getElementById('day'),
//     imgChangeBtn: document.getElementById('imgChangeBtn'),
//     momentumContainer: document.getElementById('momentumContainer')
//   }
// }





// function getToDay(){
//   return new Date();//2019, 06 ,10, 20,33,30
// }
 
// // Show Time
// function showDateTime() {

//   const 
//     TODAY = getToDay(),
//     MIN = TODAY.getMinutes(),
//     SEC = TODAY.getSeconds(),
//     MONTH = TODAY.getMonth(),
//     DAY = TODAY.getDate(),
//     DAY_OF_WEEK = TODAY.getDay(),
//     TIME_OUTPUT_STING = `<span class="time-frmt">${getFormatedHour(TODAY)}:</span><span class="time-frmt">${addZero(MIN)}:</span><span class="time-frmt sec">${addZero(SEC)}</span>${APP.SETS.showAmPm ? getAMPM(TODAY) : ''}`,
//     DATE_OUTPUT_STING = APP.strings.en.dayName[DAY_OF_WEEK] + ' ' + APP.strings.en.monthName[MONTH] + ', ' + DAY;
//     console.log(DAY_OF_WEEK);

//   // Output Time
//   putHTMLinto(APP.ID.time, TIME_OUTPUT_STING);
//   // Output Date
//   putHTMLinto(APP.ID.dayToday, DATE_OUTPUT_STING);

//   if(getFormatedHour(TODAY) !== APP.SETS.changedHour){
//   // if(MIN !== APP.SETS.changedHour){
//     APP.SETS.changedHour = getFormatedHour(TODAY);
//     // APP.SETS.changedHour = MIN;
//     console.log('BG change time!! '+ getPartOfTheDay());
//     setMomentumBg('', getImgName(true));
//   }
//   setTimeout(showDateTime, 1000);
// }

// function putHTMLinto(ob, html){
//   ob.innerHTML = html;
// }

// // 12/24hr Format
// function getFormatedHour(today){
//   return APP.SETS.hourFormat24 ? (today.getHours()) : (today.getHours() % 12 || 12);
// }

// // Set AM or PM
// function getAMPM(today){
//   return today.getHours() >= 12 ? 'PM' : 'AM';
// }

// // Add Zeros To Time Digit
// function addZero(n) {
//   return (parseInt(n, 10) < 10 ? '0' : '') + n;
// }


// /* Set Background and Greeting
// Фоновые изображения меняются каждый час, Основное требование - плавная смена фоновых изображений. их содержание соответствует времени суток (утро, день, вечер, ночь).
 
// Есть кнопка, при клике по которой можно пролистать все фоновые изображения за сутки. 
// Изображения пролистываются в том же порядке, в котором они менялись бы в реальном времени. 

// */
// function setBgGreet() {
//   APP.ID.greeting.textContent = setGreetingOfDayPart(getPartOfTheDay());
//   setMomentumBg();
// }

// function setGreetingOfDayPart(dayPart){
//     return APP.strings.en.greeting[dayPart] + APP.strings.en.dayPart[dayPart] + ', ';
// }

// function setMomentumBg(path='', imgFullName=''){
//     document.body.style.backgroundImage = "url('"+(path !== '' ? path : getImgPath()) + (imgFullName !== '' ? imgFullName : getImgName()) + "')";
// }

// function getImgName(isNextEv=true){
//   const NAME = ((APP.SETS.imageStartName % APP.SETS.imageTotall)+1) + "." + APP.SETS.imgType;
//   // console.log(((APP.SETS.imageStartName % APP.SETS.imageTotall)+1));
//   if(isNextEv){
//     APP.SETS.imageStartName++;
//   }
//   return NAME;
// }

// function getImgPath(){
//     return APP.SETS.bgPath + getPartOfTheDay() + "/";
// }

// function getNextImgPath(){
//     APP.SETS.changedPartOfDay = getPartOfTheDay();
//     // console.log(APP.SETS.changedPartOfDay);
//     return APP.SETS.bgPath + getPartOfTheDay() + "/";
// }

// // четыре времени суток: утро 6:00-12:00, день 12:00-18:00, вечер 18:00-24:00, ночь 24:00-6:00.
// function getPartOfTheDay(hour=''){
//   if(hour===''){
//     const TODAY = getToDay();
//     hour =  TODAY.getHours();
//   }
//   if(0 <= hour && hour < 6){
//       return 'night';
//   }
//   if(hour < 12){
//       return 'morning';
//   }
//   if(hour < 18){
//       return 'afternoon';
//   }
//   return 'evening';
// }


// function objectDelay(ob){
//   ob.disabled = true;
//   setTimeout(function(){ob.disabled = false}, 1000);
// }

// function showNextImage(){
//   objectDelay(APP.ID.imgChangeBtn);
//   const IMG = document.createElement('img');
//   IMG.src = getImgPath() + getImgName(false);
//   IMG.onload = () => setMomentumBg(); 
// }

// function setCurrState(){
//   const TODAY = getToDay();
//   APP.SETS.changedHour = getFormatedHour(TODAY);//TODAY.getHours();
//   // APP.SETS.changedHour = TODAY.getMinutes();
// }


// /* EVENTS */



// /** 
//     при клике в поле ввода текст, который там был, исчезает,
//     если пользователь ничего не ввёл или ввёл пустую строку,
//     текст восстанавливается  
// */
// function setChangeTextFieldEvent(ob){

//   ob.textContent = getField(ob.id);
//   ob.onkeypress = setField;
//   ob.onblur = setField;

//   function getField(prop) {
//     return localStorage.getItem(prop) === null ? APP.strings.en['deflt'+prop] : localStorage.getItem(prop);
//   }

//   function setField(e) {
//     if (e.type === 'keypress') {
//       if (e.which == 13 || e.keyCode == 13) {// Make sure enter is pressed
//         e.preventDefault();
//         localStorage.setItem(e.target.id, e.target.innerText);
//         focus.blur();
//       }
//     } else {
//       localStorage.setItem(e.target.id, e.target.innerText);
//     }
//   }
// }


// function setChangingImgEv(ob){
//   ob.onclick = showNextImage;
//   ob.ontouchstart = showNextImage;
// }

// setChangingImgEv(APP.ID.imgChangeBtn);
// setChangeTextFieldEvent(APP.ID.name);
// setChangeTextFieldEvent(APP.ID.focus);


// /* Entry Point */
// setCurrState();
// showDateTime();
// setBgGreet();








// // если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
// // скопируйте код себе и запустите со своего компьютера
// const blockquote = document.querySelector('blockquote');
// const figcaption = document.querySelector('figcaption');
// const btnQuote = document.querySelector('.btn-q');

// // если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
// // префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
// async function getQuote() {  
//   // const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
//   // const res = await fetch(url);
//   // const outData = await res.json();
//   // blockquote.textContent = outData.quoteText;
//   // figcaption.textContent = outData.quoteAuthor;
// }
// document.addEventListener('DOMContentLoaded', getQuote);
// btnQuote.addEventListener('click', getQuote);
// /* 
// A single conversation across the table with a wise person is worth a months study of books
//                                         Chinese Proverb
// You were not born a winner, and you were not born a loser. You are what you make yourself be.
//                                         Lou Holtz
// Love does not consist of gazing at each other, but in looking together in the same direction.
//                                         Antoine de Saint-Exupery
// Love and kindness are never wasted. They always make a difference. They bless the one who receives them, and they bless you, the giver.
//                                         Barbara De Angelis
// Be glad of life because it gives you the chance to love, to work, to play, and to look up at the stars.
//                                         Henry Van Dyke
// */




// const weatherIcon = document.querySelector('.weather-icon');
// const temperature = document.querySelector('.temperature');
// const weatherDescription = document.querySelector('.weather-description');

// async function getWeather() {  
//     // const url = `https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=3b7c623e3b5cc952b10657b86fc25936&units=metric`;
//     // const res = await fetch(url);
//     // const data = await res.json(); 
//     // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
//     // weatherIcon.classList.add(`owf-${data.weather[0].id}`);
//     // temperature.textContent = `${data.main.temp}°C`;
//     // weatherDescription.textContent = data.weather[0].description;
// }
// getWeather()



