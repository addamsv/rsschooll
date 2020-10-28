/** 
 * MAIN USER SCRIPT
 *  
 */
new Momentum();







  
/** 
* Quote
*
  если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
  скопируйте код себе и запустите со своего компьютера
   
  если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
  префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 

* 
  This API enables cross-origin requests to anywhere.

  Usage:
  
  /               Shows help
  /iscorsneeded   This is the only resource on this host which is served without CORS headers.
  /<url>          Create a request to <url>, and includes CORS headers in the response.
  
  If the protocol is omitted, it defaults to http (https if port 443 is specified).
  
  Cookies are disabled and stripped from requests.
  
  Redirects are automatically followed. For debugging purposes, each followed redirect results
  in the addition of a X-CORS-Redirect-n header, where n starts at 1. These headers are not
  accessible by the XMLHttpRequest API.
  After 5 redirects, redirects are not followed any more. The redirect response is sent back
  to the browser, which can choose to follow the redirect (handled automatically by the browser).
  
  The requested URL is available in the X-Request-URL response header.
  The final URL, after following all redirects, is available in the X-Final-URL response header.
  
  
  To prevent the use of the proxy for casual browsing, the API requires either the Origin
  or the X-Requested-With header to be set. To avoid unnecessary preflight (OPTIONS) requests,
  it's recommended to not manually set these headers in your code.
  
  
  Demo          :   https://robwu.nl/cors-anywhere.html
  Source code   :   https://github.com/Rob--W/cors-anywhere/
  Documentation :   https://github.com/Rob--W/cors-anywhere/#documentation
 */

let outDataTimes = 0;
let outData= {
  0:{quoteText:'A single conversation across the table with a wise person is worth a months study of books',quoteAuthor:'Chinese Proverb'},
  1:{quoteText:'You were not born a winner, and you were not born a loser. You are what you make yourself be.',quoteAuthor:'Lou Holtz'},
  2:{quoteText:'Love does not consist of gazing at each other, but in looking together in the same direction.',quoteAuthor:'Antoine de Saint-Exupery'},
  3:{quoteText:'Love and kindness are never wasted. They always make a difference. They bless the one who receives them, and they bless you, the giver.',quoteAuthor:'Barbara De Angelis'},
  4:{quoteText:'Be glad of life because it gives you the chance to love, to work, to play, and to look up at the stars.',quoteAuthor:'Henry Van Dyke'},
  5:{quoteText:'Know, first, who you are, and then adorn yourself accordingly.',quoteAuthor:'Epictetus'},
  6:{quoteText:'To give ones self earnestly to the duties due to men, and, while respecting spiritual beings, to keep aloof from them, may be called wisdom.',quoteAuthor:'Confucius'},
  7:{quoteText:'Before you can inspire with emotion, you must be swamped with it yourself. Before you can move their tears, your own must flow. To convince them, you must yourself believe.',quoteAuthor:'Winston Churchill'},
  8:{quoteText:'Learning without reflection is a waste, reflection without learning is dangerous.',quoteAuthor:'Confucius'},
  9:{quoteText:'Your vision will become clear only when you look into your heart. Who looks outside, dreams. Who looks inside, awakens.',quoteAuthor:'Carl Jung'},
  10:{quoteText:'An idea that is developed and put into action is more important than an idea that exists only as an idea.',quoteAuthor:'Buddha'}
}
// 6:{quoteText:'.',quoteAuthor:''},



// function getOwnCite(){
  
//   const d = outData[outDataTimes];
//   outDataTimes++;
//   outDataTimes = outDataTimes % 5;
//   return d;
// }
function getOwnCite(){
  outDataTimes = (localStorage.getItem('qNum')) ? localStorage.getItem('qNum') : outDataTimes;
  outDataTimes = parseInt(outDataTimes);
  console.log(outDataTimes);
  const d = outData[outDataTimes];
  outDataTimes++;
  outDataTimes = outDataTimes % 11;
  localStorage.setItem('qNum', outDataTimes);
  return d;
}
   
 
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');
const btnQuote = document.querySelector('.btn-q');
async function getQuote() { 
    let 
    data,
    err=false,
    url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`,
    res;
  try{
    res = await fetch(url);
    data = await res.json();
  }
  catch{
    err = true;
    data = getOwnCite();
    console.log('returned own quoteText and quoteAuthor because of "Too Many Requests" - that service can return only 60 times per hour');
  }
  // let data;
  // const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  // const res = await fetch(url);
  // try{
  //   data = await res.json();
  // }
  // catch{
  //   data = getOwnCite();
  //   console.log('returned own quoteText and quoteAuthor because of "Too Many Requests" - that service can return only 60 times per hour');
  // }
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}
document.addEventListener('DOMContentLoaded', getQuote);
btnQuote.onclick = getQuote;

  

  
/** 
* Weather
*
* если пользователь вводит пустую строку, данные не меняются, 
* отображается прежний прогноз погоды. 
* Если пользователь вводит данные, для которых API погоды не возвращает результат, 
* выводится уведомление об ошибке в человекочитаемом формате
*/
  
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherHumidity = document.querySelector('.weather-humidity');
  const weatherWind = document.querySelector('.weather-wind');
  const weatherDescription = document.querySelector('.weather-description');
  const weatherErr = document.querySelector('.weatherErr');
  const city = document.querySelector('.city');
  
  async function getWeather() {  
    let 
      data,
      err = false,
      url = `https://api.openweathermap.org/data/2.5/weather?q=`+city.textContent+`&lang=en&appid=3b7c623e3b5cc952b10657b86fc25936&units=metric`,
      res;
    try{
      res = await fetch(url);
      data = await res.json();
    }
    catch{
      err = true;
      data = {weather:{0:{id:500,description:'-'}},main:{temp:'-',humidity:'-'},wind:{speed:'-'}};
    }
    try{
      data.weather[0].id;
    }
    catch{
      err = true;
      data = {weather:{0:{id:500,description:'-'}},main:{temp:'-',humidity:'-'},wind:{speed:'-'}};
    }
    // console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.main.humidity);
    // console.log(data);
    if(err){
      weatherDescription.innerHTML = `<span class='error'>Err: Failed to Load Data</span>`;
    }
    else {
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      weatherDescription.innerHTML = data.weather[0].description;
    }
    temperature.textContent = `temp: ${data.main.temp} °C`;
    weatherHumidity.textContent = `humidity: ${data.main.humidity} %`;
    weatherWind.textContent = `wind: ${data.wind.speed} m/s`;
  }

  function setCity(e) {
    if (e.type === 'keypress') {
      if (e.which == 13 || e.keyCode == 13) {// Make sure enter is pressed
        e.preventDefault();
        if(e.target.innerText!==''){
          getWeather();
          localStorage.setItem('city', e.target.innerText);
        }
        e.target.blur();
      }
    } else {
      if(e.target.textContent===''){//} && ){
        e.target.textContent = (localStorage.getItem('city')==='' || localStorage.getItem('city')===null) ? 'Minsk' : localStorage.getItem('city')//tempVal;
      }
    }
    // if (e.code === 'Enter') {
    //   e.preventDefault();
    //   getWeather();
    //   city.blur();
    // }
  }
  function getField(prop) {
    return localStorage.getItem(prop) === null ? 'Minsk' : localStorage.getItem(prop);
  }
  function temporaryStore(e){
    e.target.textContent = '';
    e.target.focus();

    var range = document.createRange();
    range.selectNodeContents(e.target);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    e.target.style.outlineColor = 'blue';
  }

  city.textContent = localStorage.getItem('city') === null ? 'Minsk' : localStorage.getItem('city');
  city.onkeypress = setCity;
  city.onblur = setCity;
  city.onfocus = temporaryStore;
  // document.addEventListener('DOMContentLoaded', getWeather);
  getWeather();
  /** 
      при клике в поле ввода текст, который там был, исчезает,
      если пользователь ничего не ввёл или ввёл пустую строку,
      текст восстанавливается  
  */
//  function setChangeTextFieldEvent(ob){
//   ent = this;
//   ob.textContent = getField(ob.id,this);
//   ob.onkeypress = setField;
//   ob.onblur = setField;
//   ob.onfocus = temporaryStore;


//   function getField(prop,contxt) {
//     return localStorage.getItem(prop) === null ? contxt.APP.strings.en['deflt'+prop] : localStorage.getItem(prop);
//   }

//   function setField(e) {
//     if (e.type === 'keypress') {
//       if (e.which == 13 || e.keyCode == 13) {// Make sure enter is pressed
//         e.preventDefault();
//         if(e.target.innerText!==''){
//           localStorage.setItem(e.target.id, e.target.innerText);
//         }
//         e.target.blur();
//       }
//     } else {
//       if(ob.textContent===''){//} && ){
//         ob.textContent = (localStorage.getItem(e.target.id)==='') ? ent.APP.strings.en['deflt'+e.target.id] : localStorage.getItem(e.target.id)//tempVal;
//       }
//       //localStorage.setItem(e.target.id, e.target.innerText);
//     }
//   }
//   function temporaryStore(e){
//     // tempVal = ob.textContent;
//     // console.log(tempVal);
//     ob.textContent = '';
//     e.target.focus();

//     var range = document.createRange();
//     range.selectNodeContents(e.target);
//     var sel = window.getSelection();
//     sel.removeAllRanges();
//     sel.addRange(range);
//     e.target.style.outlineColor = 'blue';
//   }
// }