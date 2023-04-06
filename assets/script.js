$(document).ready(function() {
  const now = dayjs();
console.log(now.format('YYYY-MM-DD HH:mm:ss'));

function displayDate (){
  const date = `
 <h2 class="text-warning">${now.format('YYYY-MM-DD')}</h2>

  
  `;
  $('#current-date').html(date);
 
};

displayDate();


const apiKey = "d089155c16f56fa0925e220f7c99f4cd";

let searchbtn = $("#search-btn");



$(searchbtn).on("click", function () {
 let cityName = $("#location-input").val();

//  set and get from local storage

// let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

// searchHistory.unshift(cityName);

// searchHistory = searchHistory.slice(0, 5);

// localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

// create buttons from search history


// createBtns(searchHistory);


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
           // Check if the data returned is valid and not an error
    if (data.cod === 200) {
      // Set the search history item only if data is valid
      let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
      searchHistory.unshift(cityName);
      searchHistory = searchHistory.slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
      // Call the displayWeather and get5DayWeather functions
      displayWeather(data);
      get5DayWeather(data.coord.lat, data.coord.lon);
      console.log(data);
      console.log(data.coord.lat + data.coord.lon)
      createBtns(searchHistory);

    
    } 
      
       
      },
      error: function (error) {
        console.error(error);
        $('.weather-info').html('<p class="text-danger">Unable to fetch weather data.</p>');
      }
    });
  }

  function displayWeather(data) {

    const unixTimestamp = data.dt; // example Unix timestamp
const date = dayjs.unix(unixTimestamp); // convert Unix timestamp to date
console.log(date.format('YYYY-MM-DD HH:mm:ss'));

    const weatherHtml = `
    <h2> ${date.format('dddd, MMM D')}</h2>
      <h2>${data.name}, ${data.sys.country}</h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt"${data.weather[0].description}">
      <p>${data.weather[0].main}</p>
      <p> ${data.main.temp}°C</p>

      <p>Min ${data.main.temp_min}°C</p>
      <p>Max ${data.main.temp_max}°C</p>

     
      
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    $('.weather-info').html(weatherHtml);

    $('.weather-info').addClass('border-bottom');
 

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
<p>Wind Speed ${fiveDay.list[3].wind.speed}m/s</p>
<p>Humidity ${fiveDay.list[3].main.humidity}%</p>
`;
$('#day-one').html(dayOneHtml);
const dayTwoHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[11].weather[0].icon}@2x.png" alt="${fiveDay.list[11].weather[0].description}" />
<h2>${dayjs(fiveDay.list[11].dt_txt).format('dddd, MMM D')}</h2>
<p>${fiveDay.list[11].weather[0].main}</P>
<p>${fiveDay.list[11].main.temp}°C</p>
<p>Wind Speed ${fiveDay.list[11].wind.speed}m/s</p>
<p>Humidity ${fiveDay.list[11].main.humidity}%</p>
`;
$('#day-two').html(dayTwoHtml);

const dayThreeHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[19].weather[0].icon}@2x.png" alt="${fiveDay.list[19].weather[0].description}" />
<h2>${dayjs(fiveDay.list[19].dt_txt).format('dddd, MMM D')}</h2>
<p>${fiveDay.list[19].weather[0].main}</P>
<p>${fiveDay.list[19].main.temp}°C</p>
<p>Wind Speed ${fiveDay.list[19].wind.speed}m/s</p>
<p>Humidity ${fiveDay.list[19].main.humidity}%</p>
`;
$('#day-three').html(dayThreeHtml);



const dayFourHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[27].weather[0].icon}@2x.png" alt="${fiveDay.list[27].weather[0].description}" />
<h2>${dayjs(fiveDay.list[27].dt_txt).format('dddd, MMM D')}</h2>

<p>${fiveDay.list[27].weather[0].main}</P>
<p>${fiveDay.list[27].main.temp}°C</p>
<p>Wind Speed ${fiveDay.list[27].wind.speed}m/s</p>
<p>Humidity ${fiveDay.list[27].main.humidity}%</p>
`;
$('#day-four').html(dayFourHtml);

const dayFiveHtml = `
<img src="https://openweathermap.org/img/wn/${fiveDay.list[35].weather[0].icon}@2x.png" alt="${fiveDay.list[35].weather[0].description}" />
<h2>${dayjs(fiveDay.list[35].dt_txt).format('dddd, MMM D')}</h2>

<p>${fiveDay.list[35].weather[0].main}</P>
<p>${fiveDay.list[35].main.temp}°C</p>
<p>Wind Speed ${fiveDay.list[35].wind.speed}m/s</p>
<p>Humidity ${fiveDay.list[35].main.humidity}%</p>
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