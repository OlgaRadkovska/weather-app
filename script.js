let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

const dateContainer = document.querySelector(".card-header");
dateContainer.innerHTML = `${day} ${date} ${month} ${hours}:${minutes}`;

let form = document.querySelector("#change-city");
let currentCity = document.querySelector("h1").innerText;
form.addEventListener("submit", queryCity);
let iconElement = document.querySelector("#icon");

function displayCurrentWeather(response) {
  let temperatureElement = document.querySelector("#default-temp");
  document.querySelector("#city").innerHTML = response.data.name;
  celciusTemp = response.data.main.temp;
  temperatureElement.innerHTML = Math.round(celciusTemp);
  // document.querySelector("#default-temp").innerHTML = Math.round(
  //   response.data.main.temp

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
}

function search(city) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function queryCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
  document.querySelector("#city-input").value = "";
}

function searchLocation(position) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrentWeather);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#default-temp");
  //remove the active class from the celcius-link
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  let fahrenheitTemperature = (celciusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#default-temp");
  //remove the active class from the fahrenheit-link
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let currenLocationBtn = document.querySelector("#currentLocation-btn");
currenLocationBtn.addEventListener("click", showCurrentLocation);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
