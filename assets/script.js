$(document).ready(function() {
  const now = dayjs();
console.log(now.format('YYYY-MM-DD HH:mm:ss'));


const apiKey = "d089155c16f56fa0925e220f7c99f4cd";

let searchbtn = $("#search-btn");



$(searchbtn).on("click", function () {
 let cityName = $("#location-input").val();

//  set and get from local storage

let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

searchHistory.unshift(cityName);

searchHistory = searchHistory.slice(0, 5);

localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

// create buttons from search history


createBtns(searchHistory);


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
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
   


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

const dayOneHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[3].weather[0].icon}@2x.png" alt="${fiveDay.list[3].weather[0].description}" />
<h2>${dayjs(fiveDay.list[3].dt_txt).format('dddd, MMM D')}</h2>
<p>${fiveDay.list[3].weather[0].main}</P>
<p>${fiveDay.list[3].main.temp}°C</p>
`;
$('#day-one').html(dayOneHtml);
const dayTwoHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[11].weather[0].icon}@2x.png" alt="${fiveDay.list[11].weather[0].description}" />
<h2>${dayjs(fiveDay.list[11].dt_txt).format('dddd, MMM D')}</h2>
<p>${fiveDay.list[11].weather[0].main}</P>
<p>${fiveDay.list[11].main.temp}°C</p>
`;
$('#day-two').html(dayTwoHtml);

const dayThreeHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[19].weather[0].icon}@2x.png" alt="${fiveDay.list[19].weather[0].description}" />
<h2>${dayjs(fiveDay.list[19].dt_txt).format('dddd, MMM D')}</h2>
<p>${fiveDay.list[19].weather[0].main}</P>
<p>${fiveDay.list[19].main.temp}°C</p>
`;
$('#day-three').html(dayThreeHtml);



const dayFourHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[27].weather[0].icon}@2x.png" alt="${fiveDay.list[27].weather[0].description}" />
<h2>${dayjs(fiveDay.list[27].dt_txt).format('dddd, MMM D')}</h2>

<p>${fiveDay.list[27].weather[0].main}</P>
<p>${fiveDay.list[27].main.temp}°C</p>
`;
$('#day-four').html(dayFourHtml);

const dayFiveHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[35].weather[0].icon}@2x.png" alt="${fiveDay.list[35].weather[0].description}" />
<h2>${dayjs(fiveDay.list[35].dt_txt).format('dddd, MMM D')}</h2>

<p>${fiveDay.list[35].weather[0].main}</P>
<p>${fiveDay.list[35].main.temp}°C</p>
`;
$('#day-five').html(dayFiveHtml);
}


function createBtns (searchHistory) {
 console.log(searchHistory);

 const $hsitoryDiv = $('#search-history')

 $hsitoryDiv.empty()

 for  (i=0; i<searchHistory.length; i++) {
  if (searchHistory[i] !== null &&
     searchHistory[i] !== undefined && 
     searchHistory[i] !== '' && 
     searchHistory.indexOf(searchHistory[i]) === i ){

//  Button element 
  const $button = $('<button>');


  $button.addClass("btn");
  $button.addClass("btn-secondary");
  $button.addClass("me-2");
  $button.addClass("my-2");
  $button.addClass("searched-city");

  // set the button's text to the current item in the searchHistory array
  $button.text(searchHistory[i]);
 
  
  $hsitoryDiv.append($button);
 

  }


 }
};

 // Call createBtns function on page load
 const searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
 createBtns(searchHistory);

 $('#search-history').on('click', '.searched-city', function() {
  // Code to handle the click event

  console.log("you clicked a searched city");
  let buttonValue = $(this).text();
  console.log(buttonValue);

  getWeather (buttonValue);
  
});




});