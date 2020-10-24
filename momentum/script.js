/** 
 * MAIN USER SCRIPT
 *  
 */
new Momentum();


  
  
  // если смена цитаты у вас не работает, вероятно, исчерпался лимит API. в консоли ошибка 403
  // скопируйте код себе и запустите со своего компьютера
  const blockquote = document.querySelector('blockquote');
  const figcaption = document.querySelector('figcaption');
  const btnQuote = document.querySelector('.btn-q');
  
  // если в ссылке заменить lang=en на lang=ru, цитаты будут на русском языке
  // префикс https://cors-anywhere.herokuapp.com используем для доступа к данным с других сайтов если браузер возвращает ошибку Cross-Origin Request Blocked 
  async function getQuote() {  
    // const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
    // const res = await fetch(url);
    // const outData = await res.json();
    // blockquote.textContent = outData.quoteText;
    // figcaption.textContent = outData.quoteAuthor;
  }
  document.addEventListener('DOMContentLoaded', getQuote);
  btnQuote.addEventListener('click', getQuote);
  /*
  A single conversation across the table with a wise person is worth a months study of books
                                          Chinese Proverb
  You were not born a winner, and you were not born a loser. You are what you make yourself be.
                                          Lou Holtz
  Love does not consist of gazing at each other, but in looking together in the same direction.
                                          Antoine de Saint-Exupery
  Love and kindness are never wasted. They always make a difference. They bless the one who receives them, and they bless you, the giver.
                                          Barbara De Angelis
  Be glad of life because it gives you the chance to love, to work, to play, and to look up at the stars.
                                          Henry Van Dyke
  */
  
  
  
  
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  
  async function getWeather(town='Минск') {  
      // const url = `https://api.openweathermap.org/data/2.5/weather?q=`+town+`&lang=en&appid=3b7c623e3b5cc952b10657b86fc25936&units=metric`;
      // const res = await fetch(url);
      // const data = await res.json(); 
      // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
      // weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      // temperature.textContent = `${data.main.temp}°C`;
      // weatherDescription.textContent = data.weather[0].description;
      // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
      weatherIcon.classList.add(`owf-701`);
      temperature.textContent = `10°C`;
      weatherDescription.textContent = 'mist';
  }
  getWeather()


//   Получаем погоду для определённого города

// В index.html создадим div с классом city со свойством contenteditable="true", которое позволяет пользователям редактировать его содержимое и укажем в нём название города, например, Минск

// <div class="city" contenteditable="true">Минск</div>
// В script.js найдём этот элемент

// const city = document.querySelector('.city');
// В функции getWeather() изменим ссылку

// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
// Теперь у нас отображается погода того города, который указан в блоке city. Напишем функцию setCity(event), для обновлении прогноза погоды при изменении содержания блока city

// function setCity(event) {
//   if (event.code === 'Enter') {
//     getWeather();
//     city.blur();
//   }
// }
// Если в блоке city нажали клавишу Enter, запускаем функцию getWeather() и убираем фокус с блока city.

// В функции getWeather() перед добавлением иконке погоды дополнительного класса укажем строку

// weatherIcon.className = 'weather-icon owf';
// Этой строкой мы удаляем все лишние классы перед добавлением нового, чтобы иконка погоды обновлялась корректно.

// Строки

// document.addEventListener('DOMContentLoaded', getWeather);
// city.addEventListener('keypress', setCity);
// запускают отображение прогноза погоды при загрузки страницы и при нажатии на Enter в блоке city при вводе нового города

// Добавим немного стилей и приложение погоды готово.