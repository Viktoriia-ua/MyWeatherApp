function currentDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let date = new Date();

  let currentDay = days[date.getDay()];
  let currentateNumber = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let formattedDate =
    currentDay + " " + currentateNumber + ", " + hours + ":" + minutes;
  return formattedDate;
}

let today = currentDate();
document.getElementById("current-date").innerHTML = today;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city-name");
  let cityTemp = document.querySelector("#temp");
  let icon = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#description");

  cityTemp.innerHTML = temperature;
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;

  celsiusTemperature = response.data.main.temp;

  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );

  icon.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "bbd9d0dee9c7371ea785d4c7f6f00b2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function submitingTheForm(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitingTheForm);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Odesa");
