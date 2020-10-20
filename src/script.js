function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours <10) {
 hours = `0${hours}`;
}
    let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
 }

    let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
];
let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}

function getTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");

    celsiusTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round
    (celsiusTemperature);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
}

function formatDays(timestamp) {
 let date = new Date(timestamp);
 let days = [
"Sunday",
"Monday",
"Tuesday",
"Wednesday",
"Thursday",
"Friday",
"Saturday",
];
let day = days[date.getDay()];
 return `${day}`;
}

function displayForecast(response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null;

for (let index = 0; index < 4; index++) {
forecast = response.data.list[index];
forecastElement.innerHTML += `
<div class="col-3">
                        <h7>${formatDays}</h7>
                        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2px.png" />
                        <div class="weather-forecast-temperature">
                          ${Math.round(forecast.main.temp_max)}° ${Math.round(forecast.main.temp_min)}°
                        </div>
                    </div>
`;
}
}

function search(city) {
    let apiKey = "09e17948a820fd836c62a5a99739be66";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getTemperature);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${apiKey}&units=metric&cnt=4`;
    axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);

function searchLocation(position) {
    let apiKey = "09e17948a820fd836c62a5a99739be66";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(getTemperature);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(
    "#current-location-button"
);
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Dallas");