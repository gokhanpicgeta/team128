// Code for the main app page (locations list).

// This is sample code to demonstrate navigation.
// You need not use it for final app.

function viewLocation(locationName)
{
   // var locateObj = JSON.parse(localStorage.getItem(APP_PREFIX))
    // Save the desired location to local storage
    localStorage.setItem(APP_PREFIX + "-selectedLocation", locationName); 
    // And load the view location page.
    location.href = 'viewlocation.html';
}


 
var listOut = document.getElementById("locationList");
    
    
for (i = 0; i<=299; i++)   
    {
        if(localStorage.getItem(APP_PREFIX + i))
            {
                var locate = JSON.parse(localStorage.getItem(APP_PREFIX + i))
                var nick = locate.nick;
                var fore = locate.forecast;
                console.log(nick)
                var icon = "loading";

                var html = '<li onclick="viewLocation(' + i + ');" class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content"><img class="mdl-list__item-icon" src="images/'+ icon +'.png" class="list-avatar" /><span>' + nick + '</span><span id="' + nick + '" class="mdl-list__item-sub-title"></span>'+ fore +'</span></li>'
                listOut.innerHTML += html;
            }
    }






                /*
                var string = localStorage.getItem("weatherApp1");
                var obj = JSON.parse(string);
                var nickName = obj.nick;

                var locationOne = document.getElementById("loc1");
                locationOne.textContent= nickName; 
                */
