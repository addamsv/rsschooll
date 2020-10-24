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
  4:{quoteText:'Be glad of life because it gives you the chance to love, to work, to play, and to look up at the stars.',quoteAuthor:'Henry Van Dyke'}
}

function getOwnCite(){
  const d = outData[outDataTimes];
  outDataTimes++;
  outDataTimes = outDataTimes % 5;
  return d;
}
  
 
  const blockquote = document.querySelector('blockquote');
  const figcaption = document.querySelector('figcaption');
  const btnQuote = document.querySelector('.btn-q');
   async function getQuote() { 
    let data;
    const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    const res = await fetch(url);
    try{
      data = await res.json();
    }
    catch{
      data = getOwnCite();
      console.log('returned own quoteText and quoteAuthor because of "Too Many Requests" - that service can return only 60 times per hour');
    }
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
  const city = document.querySelector('.city');
  
  async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=`+city.textContent+`&lang=en&appid=3b7c623e3b5cc952b10657b86fc25936&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    // const data = {weather:{0:{id:500,description:'wind'}},main:{temp:10,humidity:100},wind:{speed:1}}

    console.log(data.weather[0].id, data.weather[0].description, data.main.temp, data.main.humidity);
    console.log(data);
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `temp: ${data.main.temp}°C`;
    weatherHumidity.textContent = `humidity: ${data.main.humidity}%`;
    weatherWind.textContent = `wind: ${data.wind.speed}m/s`;
    weatherDescription.textContent = `description: `+data.weather[0].description;
  }

  function setCity(e) {
    if (e.code === 'Enter') {
      e.preventDefault();
      getWeather();
      city.blur();
    }
  }
  document.addEventListener('DOMContentLoaded', getWeather);
  city.onkeypress = setCity;

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