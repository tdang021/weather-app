let now = new Date();
let dateNow = document.querySelector(".date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

//let hours = now.getHours();
//let minutes = now.getMinutes();

let localTime = now.toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

dateNow.innerHTML = `${day} ${localTime}`;

function searchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-city-input");
  let newLocation = document.querySelector(".location");

  if (searchInput.value);
  newLocation.innerHTML = `${searchInput.value}`;

  function showTemperature(response) {
    let currentTemp = Math.round(response.data.main.temp);
    let locationTemp = document.querySelector(".current-temp");
    locationTemp.innerHTML = `${currentTemp}`;
  }

  let apiKey = "91d9a2c92e23f81f6af46fe1bf68b707";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(showTemperature);
}

let cityForm = document.querySelector("#city-input");
cityForm.addEventListener("submit", searchCity);

function changeLocalTemp(event) {
  function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    function changeLocalCity(response) {
      let changeCurrentCity = document.querySelector(".location");
      changeCurrentCity.innerHTML = response.data[0].name;
    }
    let apiKey = "91d9a2c92e23f81f6af46fe1bf68b707";
    let locationApiUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    axios.get(locationApiUrl).then(changeLocalCity);

    function showCurrentLocationTemp(response) {
      let currentLocationTemp = Math.round(response.data.main.temp);
      let currentLocalTemp = document.querySelector(".current-temp");
      currentLocalTemp.innerHTML = `${currentLocationTemp}`;
    }

    let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

    axios.get(currentApiUrl).then(showCurrentLocationTemp);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector(".current-location-button");
currentButton.addEventListener("click", changeLocalTemp);
