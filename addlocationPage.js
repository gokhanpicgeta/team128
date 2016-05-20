// Code for the Add Location page.
var lat;
var long;
function initMap() {
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 14,
  center: {lat: -37.9116, lng: 145.1340}
});
var geocoder = new google.maps.Geocoder();

document.getElementById('location').addEventListener('change', function() {
  geocodeAddress(geocoder, map);
    });      
}

function geocodeAddress(geocoder, resultsMap) 
{
    var address = document.getElementById('location').value;
    geocoder.geocode({'address': address}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
    resultsMap.setCenter(results[0].geometry.location);
    var marker = new google.maps.Marker({
      map: resultsMap,
      position: results[0].geometry.location
    })
    lat = marker.getPosition().lat();
    long  = marker.getPosition().lng();
  } else {
    console.log('Geocode was not successful for the following reason: ' + status);
  }
});
    
    var button = document.getElementById('saveMyLocation');
    button.removeAttribute("disabled");
    componentHandler.upgradeElement(button);
}


function add()
{
    
    var newLocation = new LocationWeatherCache();
    var nick = document.getElementById("nickname").value;
    var id = newLocation.addLocation(lat,long,nick)
    newLocation.initialiseFromPDO(string);
    window.open('index.html',"_self");

}







