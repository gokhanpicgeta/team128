// Code for the View Location page.
var theDate = document.getElementById("date");
var initDate = new Date();
theDate.textContent = "The Date is: " + initDate.simpleDateString();  





// This is sample code to demonstrate navigation.
// You need not use it for final app.

var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
var storage = JSON.parse(localStorage.getItem(APP_PREFIX + locationIndex));
if (locationIndex !== null)
{
    if (locationIndex == 300)
        {
            document.getElementById("headerBarTitle").textContent = "Current Location";
        }
    else
        {
            var nickname = storage.nick;
            document.getElementById("headerBarTitle").textContent = nickname;
        }

}


var latitude = storage.lat;
var longitude = storage.long;

function initMap() {
  var myLatLng = {lat: latitude, lng: longitude};

  var map = new google.maps.Map(document.getElementById('map2'), {
    zoom: 14,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
}




function sliderInput()
{
    var slideMe = document.getElementById("slider");
    var num = slideMe.value;
    var theDate = document.getElementById("date");
    var date = new Date();
    var msTime = date.getTime();
    var i = 30 - num;
    
    msTime -= i * (24*60*60*1000);
    date.setTime(msTime);
    
    theDate.textContent = "The Date is: " + date.simpleDateString();  
    

    var wantedDate = date.forecastDateString();
    var getWeather = new LocationWeatherCache;
    getWeather.getWeatherAtIndexForDate(wantedDate,latitude,longitude);

    }
    






function deleteMe()
{
    
}






