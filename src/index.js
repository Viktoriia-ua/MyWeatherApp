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

function displayForecast(cityName) {
  let apiKey = "bbd9d0dee9c7371ea785d4c7f6f00b2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`;

  let forecastElement = document.querySelector("#forecast");

  // Fetch the weather data
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let forecastData = data.list;

      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map(function (
        dayName,
        index
      ) {
        let today = new Date();
        let day = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + index + 1
        );
        return day;
      });

      let forecastHTML = `<div class="row">`;
      days.forEach(function (day, index) {
        let DayofWeekforecast = data.list[index];

        let srcURL = `http://openweathermap.org/img/wn/${DayofWeekforecast.weather[0].icon}.png`;
        let maxTemp = Math.round(DayofWeekforecast.main.temp_max);
        let minTemp = Math.round(DayofWeekforecast.main.temp_min);

        forecastHTML =
          forecastHTML +
          `
      <div class="col-2">
        <div class="weather-forecast-date">${day.toLocaleDateString("en-US", {
          weekday: "short",
        })}
          <img src="${srcURL}" alt="${
            DayofWeekforecast.weather[0].description
          }" width="50" />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">${maxTemp}°</span>
            <span class="weather-forecast-temperature-min">${minTemp}°</span>
          </div>
        </div>
      </div>
    `;
      });

      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    });
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "bbd9d0dee9c7371ea785d4c7f6f00b2e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

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

  getForecast(response.data.coord);
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
  displayForecast(cityInput.value);
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
displayForecast("Odesa");
