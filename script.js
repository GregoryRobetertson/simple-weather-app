"use strict";

// Define Weather class
class Weather {
  constructor(city, temperature, description) {
    this.city = city;
    this.temperature = temperature;
    this.description = description;
  }

  displayWeather() {
    const weatherDataElement = document.getElementById("weatherData");
    weatherDataElement.innerHTML = `
            <h2>${this.city}</h2>
            <p>Temperature: ${this.temperature}°C</p>
            <p>Description: ${this.description}</p>
        `;
  }
}

// Function to fetch weather data from OpenWeatherMap API
async function getWeatherData(city) {
  const apiKey = "d05f4463c63e159b2e9043968acf56a8";
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
  );
  const data = await response.json();
  const city_name = data.name;
  const temp = data.main.temp;
  const description = data.weather[0].description;
  return new Weather(city_name, temp, description);
}

// Event listener for form submission
document.getElementById("weatherForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const locationInput = document.getElementById("locationInput").value;
  const weather = await getWeatherData(locationInput);
  weather.displayWeather();
});
