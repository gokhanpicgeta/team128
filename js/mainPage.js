// Code for the main app page (locations list).

//Navigation - determines whether on the the viewLocationPage or not
if(localStorage.getItem(APP_PREFIX + "-Home"))
    {
        
    }
else
    {
        localStorage.setItem(APP_PREFIX + "-Home","")   
    }


//Navigating between pages
function viewLocation(locationName)
{
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}


if(localStorage.getItem(APP_PREFIX + "-currentLoc"))
    {
        //Update Weather on Launchp page for current location
        var current = document.getElementById("weather0");
        var currWeather = JSON.parse(localStorage.getItem(APP_PREFIX + "-currentLoc"))
        current.textContent = currWeather.temperatureMax + " " + currWeather.temperatureMin;
        document.getElementById("icon0").src = "images/" + currWeather.icon + ".png";
    }


    
// "For" loop to check local storage for saved locations, and dynamically display them as a list in HTML    
var listOut = document.getElementById("locationList");
for (i = 0; i<=299; i++)   
    {
        //If a location is found in local storage it is displayed
        if(localStorage.getItem(APP_PREFIX + i))
            {
                var locate = JSON.parse(localStorage.getItem(APP_PREFIX + i))
                var nick = locate.nick;
                var weather = locate.forecast
                var fore = weather.temperatureMax + " " + weather.temperatureMin
                var icon = weather.icon;


                //Code to add each individual list element to the launch screen
                var html = '<li onclick="viewLocation(' + i + ');" class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" src="images/'+ icon +'.png" class="list-avatar" /><span>' + nick + '</span><span id="fore" class="mdl-list__item-sub-title"> '+ fore+'</span></span></li>'
                listOut.innerHTML += html;
            }
    }