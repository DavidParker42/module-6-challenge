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



// local storage function- that gets items out of local storage
// function that displays current weather data
// function that displays forcast data
//  API calls functions
// functions to handle submittle of search form and clear presioulsy searched items
// put event listeners for the functions





