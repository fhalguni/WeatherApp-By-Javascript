const inputBox = document.querySelector(".input-box");
const searchButton = document.getElementById("search-btn");

const weather_img = document.querySelector(".weather-image");
const temperature = document.querySelector(".temperature");
const discription = document.querySelector(".discription");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "a62f8ac086c4abc918f252560c2578cc";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );
  console.log(weather_data);

  if (weather_data.cod === "404") {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none";
    return;
  }
  location_not_found.style.display = "none";
  weather_body.style.display = "flex";

  temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  discription.innerHTML = `${weather_data.weather[0].description}`;
  switch (weather_data.weather[0].main) {
    case "Clouds": {
      weather_img.src = "/assets/cloud.png";
      break;
    }
    case "Mist": {
      weather_img.src = "/assets/mist.png";
      break;
    }
    case "Clear": {
      weather_img.src = "/assets/clear.jpeg";
      break;
    }
    case "Rain": {
      weather_img.src = "/assets/rain.jpeg";
      break;
    }
    case "Snow": {
      weather_img.src = "/assets/snow.png";
      break;
    }
  }
}
searchButton.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
