
// create an API
const api = {
    API_KEY: "cfa89385db7dafc0915ea467d61fea54",
    url: "https://api.openweathermap.org/data/2.5/"
  }
  
  const searchbox = document.querySelector('.search-box');
  searchbox.addEventListener('keypress', setQuery);
  
  function setQuery(e) {
    if (e.keyCode == 13) {
        if(searchbox.value==""){
            alert("Please Write A City Name");
        } 
      getResults(searchbox.value);
    }
  }
  

  // make a query function

  function getResults (query) {
    fetch(`${api.url}weather?q=${query}&units=metric&APPID=${api.API_KEY}`)
      .then(response => {
        return response.json();
      }).then(displayResults);
  }
  

  //  fetch and display the result from databases :

  function displayResults (weather) {
    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather_status');
    weather_el.innerText = weather.weather[0].main;
  
    let hi_low = document.querySelector('.hi-low');
    hi_low.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
  }
  

// create date function
  function dateBuilder (dt) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
    let day = days[dt.getDay()];
    let date = dt.getDate();
    let month = months[dt.getMonth()];
    let year = dt.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }