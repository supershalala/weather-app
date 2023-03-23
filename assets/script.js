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

    // const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?q=${cityName&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`;


    $.ajax({
      url: apiUrl,
      method: 'GET',
      dataType: 'json',
      success: function (data) {
        displayWeather(data);
        console.log(data);
        get5DayWeather(data.coord.lat, data.coord.lon);
        console.log(data.coord.lat + data.coord.lon)
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
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt"${data.weather[0].description}">
      <p> ${data.main.temp}°C</p>
      <p>Min ${data.main.temp_min}°C</p>
      <p>Max ${data.main.temp_max}°C</p>

      <p>Weather: ${data.weather[0].main}</p>
      <p>Description: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    $('.weather-info').html(weatherHtml);
 

  }

function get5DayWeather (lat, lon) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric}`
   

//  const oneCallApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${apiKey}`

    $.ajax({
        url: apiUrl,
        method: "Get",
        dataType: "JSON",
        success: function (fiveDay) {
            display5DayWeather(fiveDay);
            console.log("5 day forecast");
            console.log(fiveDay);
          },
    })

}

function display5DayWeather(fiveDay) {

const fiveDayHtml = `

<p>${fiveDay.list[0].dt_txt}</P>
<p>${fiveDay.list[1].main.temp}</p>
<h1>"hello world"</h1>





`;

$('.five-day').html(fiveDayHtml);
}





});