let now = new Date();
let h2 = document.querySelector("h2");
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
const currentDate = new Date();
const formattedTime = new Intl.DateTimeFormat("en-GB", {
  hour: "numeric",
  minute: "numeric",
  hour12: false,
}).format(currentDate);

console.log(formattedTime);

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "March",
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

h2.innerHTML = `${day} ${currentDate.getDate()} ${month}, ${hours}:${minutes}, ${year}`;

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;
  search(searchInput.value);
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f09d3949047ab6c9e3bcaf79cf61f619`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#weather");
  let description = document.querySelector("#description");
  temperatureElement.innerHTML = `${temperature}°C`;
  description.innerHTML = response.data.weather[0].description;
}

function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f09d3949047ab6c9e3bcaf79cf61f619&units=metric`;
  axios.get(apiUrl).then(showTemperature);
  console.log(apiUrl);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
