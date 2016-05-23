// Code for the Add Location page.
var lat;
var long;


//This function displays the Google Map, it calls the geocoder fucntion when the address text field has changed.
function initMap() {
//Creating a map beginning at Monash University    
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: {lat: -37.9116, lng: 145.1340}
        });
    
    var geocoder = new google.maps.Geocoder();

    //When the address text box changes, it calls geocodeAddress()    
    document.getElementById('location').addEventListener('change', function() {
        geocodeAddress(geocoder, map);
        });      
}


//This function takes the address typed within the text field and locates it on the map
function geocodeAddress(geocoder, resultsMap) 
{
    var address = document.getElementById('location').value;
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
    resultsMap.setCenter(results[0].geometry.location);
    
        
    //A marker is positioned at the desired location
    var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
        })
        
    //The global variables (lat & long) are updated to be accessed elsewhere
        lat = marker.getPosition().lat();
        long  = marker.getPosition().lng();     
  }
    else 
    {
        console.log('Geocode was not successful for the following reason: ' + status);
    }
});
    
    //Once a Location is found, the "Add Location" Button is enabled
    var button = document.getElementById('saveMyLocation');
    button.removeAttribute("disabled");
    componentHandler.upgradeElement(button);
}


//The add function is run when the "Add Location" button is pressed. It calls methods in locationWeatherCache.js to save it to local storage.
function add()
{
    //Saves the location to local storage
    var newLocation = new LocationWeatherCache();
    var nick = document.getElementById("nickname").value;
    var id = newLocation.addLocation(lat,long,nick)
    
    //The location is then saved to local storage using the global variable; "string" 
    newLocation.initialiseFromPDO(string);
    
    //Calls the weather API to fill the forecast property of the local storage object
    var date = new Date ();
    newLocation.getWeatherAtIndexForDate(date.forecastDateString(),lat,long)
    
}







