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

function submitingTheForm(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-name");
  let cityInput = document.querySelector("#city-input");

  cityElement.innerHTML = cityInput.value;

  let apiKey = "bbd9d0dee9c7371ea785d4c7f6f00b2e";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#temp");
  cityTemp.innerHTML = temperature + " °C";
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitingTheForm);
