//Navigation - determines whether on the the viewLocationPage or not
localStorage.removeItem(APP_PREFIX+"-Home")

//This code retrieves the desired location from local storage and saves its coordinates as global variables.
var locationIndex = localStorage.getItem(APP_PREFIX + "-selectedLocation"); 
var storage = JSON.parse(localStorage.getItem(APP_PREFIX + locationIndex));
var latitude = storage.lat;
var longitude = storage.long;


//This code runs as the page is loaded to display the current date and weather details (without needing to be called by movement of the slider)
var theDate = document.getElementById("date");
var initDate = new Date();
theDate.textContent = "The Date is: " + initDate.simpleDateString(); 

var initWeather = new LocationWeatherCache;
var wantedInitDate = initDate.forecastDateString();
initWeather.getWeatherAtIndexForDate(wantedInitDate,latitude,longitude);



// This code is used to navigate between pages, determining whether the selected page is current location or a saved location.
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





//This function is used to display the Google Map.
function initMap() {
  var myLatLng = {lat: latitude, lng: longitude};

  //Here a new map is constructed, with a centre of the desired location.
    var map = new google.maps.Map(document.getElementById('map2'), {
    zoom: 14,
    center: myLatLng
  });

//A marker is then positioned on the desired location.
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
  });
}




//This function is called when the slider is moved, it controls the date and its repective weather
function sliderInput()
{
    var slideMe = document.getElementById("slider");
    var num = slideMe.value;
    var theDate = document.getElementById("date");
    var date = new Date();
    var msTime = date.getTime();
    
    //This is to retrieve the amount of days between the slider date and the current date.
    var i = 30 - num;
    
    //The number of days between the dates is then subtracted from the current time (in milliseconds)
    msTime -= i * (24*60*60*1000);
    date.setTime(msTime);
    
   //The desired date is outputted to the HTML
    theDate.textContent = "The Date is: " + date.simpleDateString();  
    

    //The forecast of the displayed date is then called, and shown on HTML.
    var wantedDate = date.forecastDateString();
    var getWeather = new LocationWeatherCache;
    getWeather.getWeatherAtIndexForDate(wantedDate,latitude,longitude);
    
    
}
    

//This function is used to delete a location from local storage and the app itself.
function deleteMe()
{
    localStorage.removeItem(APP_PREFIX + locationIndex)
    location.href = 'index.html'
}






