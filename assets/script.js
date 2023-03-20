$(document).ready(function() {

const apiKey = "d089155c16f56fa0925e220f7c99f4cd";

let searchbtn = $("#search-btn");



$(searchbtn).on("click", function () {
 let cityName = $("#location-input").val();

 console.log(cityName);

 getWeather(cityName);



});


function getWeather(cityName) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        displayWeather(data);
        console.log(data);
      },
      error: function (error) {
        console.error(error);
        $('.weather-info').html('<p class="text-danger">Unable to fetch weather data.</p>');
      }
    });
  }

  function displayWeather(data) {
    const weatherHtml = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p>Temperature Now: ${data.main.temp}°C</p>
      <p>MIN ${data.main.temp_min}°C</p>
      <p>MAX ${data.main.temp_max}°C</p>

      <p>Weather: ${data.weather[0].main}</p>
      <p>Description: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    $('.weather-info').html(weatherHtml);
  }







});