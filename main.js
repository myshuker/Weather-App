// create an API
const api = {
  API_KEY: "cfa89385db7dafc0915ea467d61fea54",
  url: "https://api.openweathermap.org/data/2.5/",
};

// get user position

navigator.geolocation.getCurrentPosition(setPosition);

function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(latitude, longitude);
  getWeather(latitude, longitude);
}

// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude) {
  let my_api = `${api.url}weather?lat=${latitude}&lon=${longitude}&appid=${api.API_KEY}`;

  fetch(my_api)
    .then((response) => response.json())
    .then(renderOutput);
}

// get input info

const search_box = document.querySelector(".search-box");
search_box.addEventListener("keypress", setQuery);

function setQuery(e) {
  const query = search_box.value;
  if (e.keyCode == 13) {
    if (query == "") {
      alert("Please Write A City Name");
    }
    getResults(query);
  }
}

// make a query function

function getResults(query) {
  fetch(`${api.url}weather?q=${query}&units=metric&appid=${api.API_KEY}`)
    .then((response) => response.json())
    .then(renderOutput);
}

//  fetch and display the result from databases :

function renderOutput(data) {
  console.log(data);
  let icon = document.querySelector(".weather-icon");
  icon.innerHTML = ` <img src="icons/${data.weather[0].icon}.png" />`;

  let city = document.querySelector(".location .city");
  city.innerText = `${data.name}, ${data.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(data.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather_status");
  weather_el.innerText = data.weather[0].main;

  let hi_low = document.querySelector(".hi-low");
  hi_low.innerText = `${Math.round(data.main.temp_min)}°c / ${Math.round(
    data.main.temp_max
  )}°c`;
}

// create date function
function dateBuilder(dt) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dt.getDay()];
  let date = dt.getDate();
  let month = months[dt.getMonth()];
  let year = dt.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
