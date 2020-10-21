/** 
 * MAIN USER SCRIPT
 *  
 */

const STRING = {
    en:{
        dayPart:{
            afternoon:'Afternoon',
            night:'Night',
            morning:'Morning',
            evening:'Evening'
        },
        greeting:{
            afternoon:'Good ',
            night:'Good ',
            morning:'Good ',
            evening:'Good '
        },
        defltName:'[Enter Name]',
        defltFocus:'[Enter Name]',
    },
    bgPath:'assets/images/',
    imgType:'jpg'
}

// DOM Elements
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  focus = document.getElementById('focus');

// Options
const showAmPm = false;
const hourFormat24 = true;

// Show Time
function showTime() {
    // let today = new Date(2019, 06 ,10, 20,33,30),
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12/24hr Format
  hour = (hourFormat24) ? (hour) : (hour % 12 || 12);

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {

/* 
    при клике в поле ввода текст, который там был, исчезает,
     если пользователь ничего не ввёл или ввёл пустую строку,
    текст восстанавливается 

    четыре времени суток: утро 6:00-12:00, день 12:00-18:00, вечер 18:00-24:00, ночь 24:00-6:00.
 */



//   let today = new Date(2019, 06 ,10, 20,33,30),
  let today = new Date(),
    hour = today.getHours(),
    dayPart = getPartOfTheDay(hour);
    setGreetingOfDayPart(dayPart);
    setBgOfDayPart(dayPart);
}

function setGreetingOfDayPart(dayPart){
    greeting.textContent = STRING.en.greeting[dayPart] + STRING.en.dayPart[dayPart] + ', ';
}

function setBgOfDayPart(dayPart){
    document.body.style.backgroundImage = "url('"+getImgPath(dayPart) + getImgName() + "')";
}
function getImgName(n=true){
    return n ? "1." + STRING.imgType : "1." + STRING.imgType;/* if false should random name 1-10 may be */
}
function getImgPath(dayPart){
    return STRING.bgPath + dayPart + "/";
}

function getPartOfTheDay(hour){
    if(0 < hour && hour < 6){
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


// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = STRING.en.defltName;
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = STRING.en.defltFocus;
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();

