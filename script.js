var searchHistory = [];
var rootUrl = "https://api.openweathermap.org";
var apiKey = "c325d6aef2a68c4a92f8adac2d88149f";
var searchForm = document.querySelector("#search-form");
var searchInput = document.querySelector("#search-input");
var todayContainer = document.querySelector("#today");
var forecastContainer = document.querySelector("#forecast");
var searchHistoryContainer = document.querySelector("#history");
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// create function to display search history list
function displayHistory (){
    // clears out search container
    searchHistoryContainer.innerHTML = "";
    // looks over search history array, starting from the end to the front. looks at most recent searched cities first
    for (var i = searchHistory.length - 1; i >= 0; i --){
        // creates button for loop
        var btn = document.createElement("button");
        btn.setAttribute("type", "button");
        // creates classes
        btn.classList.add("history-btn", "btn-history");
        // set data search for where ever in index you are
        btn.setAttribute("data-search", searchHistory[i]);
        // gives button the search history, appends it to your search history container
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);
    }
}
// function to update history in local storage
function updateHistory (search){
    // checks to see if item we search is in local storage
    if (searchHistory.indexOf(search) !== -1){
        return
    }
    // adds searched item into search history array
    searchHistory.push(search);
    localStorage.setItem("cities", JSON.stringify(searchHistory));
    // rerun display history
    displayHistory();
}

function gethistory(){
    var storedHistory = localStorage.getItem("cities")
    if (searchHistory){
        searchHistory= JSON.parse(storedHistory)
    }
    displayHistory ()
}

// rendering function
function renderCurrentWeather(city, weather){
var date = dayjs().format("M/D/YYYY")
var temp = weather.main.temp
var wind = weather.wind.speed
var humidity = weather.main.humidity
var iconURL = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`
var iconDescription = weather.weather[0].description || weather[0].main

var card = document.createElement("div")
var cardbody = document.createElement("div")
var heading = document.createElement("h2")
var weatherIcon = document.createElement("img")
var tempEl = document.createElement("p")
var windEl = document.createElement("p")
var humidityEl = document.createElement("p")

// given all elements attributes
card.setAttribute("class", "card")
cardbody.setAttribute("class","card-body")
card.append(cardbody)
heading.setAttribute("class","h3 card-titile")
tempEl.setAttribute("class", "card-text")
windEl.setAttribute("class", "card-text")
humidityEl.setAttribute("class", "card-text")
weatherIcon.setAttribute("src", iconURL)
weatherIcon.setAttribute("alt", iconDescription)
weatherIcon.setAttribute("class", "weather-img")
heading.append(weatherIcon)
heading.textContent = `${city} ${date}`
tempEl.textContent = `temp: ${temp} F`
windEl.textContent = `wind: ${wind} MPH`
humidityEl.textContent = `humidity: ${humidity} %`
cardbody.append (heading, tempEl, windEl, humidityEl)
todayContainer.innerHTML = ""
todayContainer.append(card)
}


function renderForecastWeather(forecast){
var temp = forecast.main.temp
var wind = forecast.wind.speed
var humidity = forecast.main.humidity
var iconURL = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`
var iconDescription = forecast.weather[0].description

var col = document.createElement("div")
var card = document.createElement("div")
var cardBody = document.createElement("div")
var cardTitle = document.createElement("h5")
var weatherIcon = document.createElement("img")
var tempEl = document.createElement("p")
var windEl = document.createElement("p")
var humidityEl = document.createElement("p")

col.append(card)
card.append(cardBody)
cardBody.append(cardTitle, weatherIcon, tempEl, windEl, humidityEl)

col.setAttribute("class", "col-md 5-day-card")
card.setAttribute("class", "card bg-primary h-100 text-white")
cardBody.setAttribute("class", "card-body p-2")
cardTitle.setAttribute("class", "card-title")
tempEl.setAttribute("class", "card-text")
windEl.setAttribute("class", "card-text")
humidityEl.setAttribute("class", "card-text")

cardTitle.textContent = dayjs(forecast.dt_txt).format("M/D/YYYY")
weatherIcon.setAttribute("src", iconURL)
weatherIcon.setAttribute("alt", iconDescription)
tempEl.textContent = `temp: ${temp} F`
windEl.textContent = `wind: ${wind} MPH`
humidityEl.textContent = `humidity: ${humidity} %`
forecastContainer.append(col)

}

function renderForecast(dailyForecast){
    var start = dayjs().add(1, "day").startOf("day").unix()
    var end = dayjs().add(6, "day").startOf("day").unix()

    var headingCol = document.createElement("div")
    var heading = document.createElement("h4")

    headingCol.setAttribute("class", "col-12")
    heading.textContent= "5 day forecast"
    headingCol.append(heading)

    forecastContainer.innerHTML = ""
    forecastContainer.append(headingCol)

    for (var i = 0; i<dailyForecast.length; i++){
        if (dailyForecast[i].dt >= start && dailyForecast[i].dt<end){
            if(dailyForecast[i].dt_txt.slice(11, 13)=="12"){
                renderForecastWeather(dailyForecast[i])
            }
        }
    }
}
function renderItems(city, data){
    renderCurrentWeather(city, data.list[0], data.city.timezone)
    renderForecast(data.list)

}

function fetchWeather(location){
    var{lat} = location;
    var {lon} = location;
    var city = location.name;

    var apiUrl= `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

    fetch(apiUrl)
      .then(function (res){
        return res.json();
      })
      .then(function(data){
        renderItems(city, data);
      })
      .catch(function(err){
        console.error(err);
      })
}

function fetchCoords(search) {
var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
fetch(apiUrl)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (!data[0]) {
        alert('Location not found');
      } else {
        appendToHistory(search);
        fetchWeather(data[0]);
      }
    })
    .catch(function (err) {
      console.error(err);
    });
}


















// api calls
// functions that handle search form submit
// funciton that handles history button click
// event listners

// function getWeather(cityName) {
//             let queryURL = "var rootUrl = "https://api.openweathermap.org";
//             " + cityName + "&appid=" + APIKey;
//             axios.get(queryURL)
//             .then(function(response){
//                 console.log(response);

// gethistory();


// // function fetchWeather(location) {
//   var { lat } = location;
//   var { lon } = location;
//   var city = location.name;

//   var apiUrl = `${weatherApiRootUrl}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherApiKey}`;

//   fetch(apiUrl)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       renderItems(city, data);
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }


// // next fucntion below
// // function fetchCoords(search) {
// //   var apiUrl = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;

//   fetch(apiUrl)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (data) {
//       if (!data[0]) {
//         alert('Location not found');
//       } else {
//         appendToHistory(search);
//         fetchWeather(data[0]);
//       }
//     })
//     .catch(function (err) {
//       console.error(err);
//     });
// }

// local storage function- that gets items out of local storage

//  API calls functions
// functions to handle submittle of search form and clear presioulsy searched items
// put event listeners for the functions





