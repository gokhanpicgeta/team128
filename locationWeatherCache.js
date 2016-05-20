
// Returns a date in the format "YYYY-MM-DD".
Date.prototype.simpleDateString = function() {
    function pad(value)
    {
        return ("0" + value).slice(-2);
    }

    var dateString = this.getFullYear() + "-" + 
            pad(this.getMonth() + 1, 2) + '-' + 
            pad(this.getDate(), 2);
    
    return dateString;
}
// Date format required by forecast.io API.
// We always represent a date with a time of midday,
// so our choice of day isn't susceptible to time zone errors.
Date.prototype.forecastDateString = function() {
    return this.simpleDateString() + "T12:00:00";
}



// Code for LocationWeatherCache class and other shared code.
var string = "";
var response;



function takeWeather(input)
{
    var getWeather = new LocationWeatherCache;
    getWeather.weatherResponse(input);
}


// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "weatherApp";

function LocationWeatherCache()
{
    // Private attributes:

    var locations = [];
    var callbacks = {};

    // Public methods:
    
    // Returns the number of locations stored in the cache.
    //
    this.length = function() {
        
        var num = locations.length;
        return num;
    };
    
    // Returns the location object for a given index.
    // Indexes begin at zero.
    //
    this.locationAtIndex = function(index) {
        return locations[index]; 
    };

    // Given a latitude, longitude and nickname, this method saves a 
    // new location into the cache.  It will have an empty 'forecasts'
    // property.  Returns the index of the added location.
    //
    this.addLocation = function(latitude, longitude, nickname)
    {
        var myLocation = {
            lat: latitude,
            long: longitude,
            nick: nickname,
            forecast: []
        }
        string = JSON.stringify(myLocation);
        
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        locations[index].myLocation.delete()
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function() {
        //string = JSON.stringify(locations);
        //console.log(string);
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
    
    var nextId;    
       if(localStorage.getItem(APP_PREFIX))
            { 
                var nextLocation = JSON.parse(locationWeatherCachePDO);
                nextId = Number(localStorage.getItem(APP_PREFIX)) + 1
                localStorage.setItem(APP_PREFIX,nextId)
                localStorage.setItem(APP_PREFIX + nextId, locationWeatherCachePDO);
            }
        else
            {
                var prs = JSON.parse(locationWeatherCachePDO);
                var nick = prs.nick;
                localStorage.setItem(APP_PREFIX,"1");
                localStorage.setItem(APP_PREFIX + "1",locationWeatherCachePDO);
                nextId = 1
            }
        
        
        
    };

    // Request weather for the location at the given index for the
    // specified date.  'date' should be JavaScript Date instance.
    //
    // This method doesn't return anything, but rather calls the 
    // callback function when the weather object is available. This
    // might be immediately or after some indeterminate amount of time.
    // The callback function should have two parameters.  The first
    // will be the index of the location and the second will be the 
    // weather object for that location.
    // 
    this.getWeatherAtIndexForDate = function(date, lat, long) {
        var workingUrl = "https://api.forecast.io/forecast/56d73602d5f12f6ebecd4ee3684c816d/";
        workingUrl += lat + "," + long + "," + date + "/?units=si&exclude=[hourly]&callback=takeWeather()";
    
        var script = document.createElement('script');
        script.src = workingUrl;
        document.body.appendChild(script);    
    };
    
    // This is a callback function passed to forecast.io API calls.
    // This will be called via JSONP when the API call is loaded.
    //
    // This should invoke the recorded callback function for that
    // weather request.
    //
    this.weatherResponse = function(response) {

		var day = response.daily.data
		var obje = day[0];
        var time = response.currently.time
        
        var weather = {
            sum: obje.summary,
            icon: obje.icon,
            precipProbability: obje.precipProbability,
            temperatureMin: "Min: " + obje.temperatureMin + " oC",
            temperatureMax: "Max: " + obje.temperatureMax + " oC",
            humidity: obje.humidity,
            windSpeed: "Wind Speed: " + obje.windSpeed + "km/h",
            time : time
        }

        
        var summaryDiv = document.getElementById("sum");
        var maxDiv = document.getElementById("max");
        var minDiv = document.getElementById("min");
        var humDiv = document.getElementById("hum");
        var windDiv = document.getElementById("wind");
        var precipDiv = document.getElementById("precip");
        
        var prob = Number(weather.precipProbability) * 100;
        var hum = Number(weather.humidity) * 100;
        
        var probOut = "Probability of Precipitation: " + prob + "%";
        var humOut = "Humidity: " + hum + "%"
        
       
        
        var theLat = response.latitude;
        
        for (i = 0; i<=30; i++)   
        {
        if(localStorage.getItem(APP_PREFIX + i))
            {
                
                var locate = JSON.parse(localStorage.getItem(APP_PREFIX + i))
                var forecastArray = locate.forecast;
                var latitudeMe = locate.lat
                if (latitudeMe === theLat)
                    {
                        forecastArray.push(weather)
                        localStorage.removeItem(APP_PREFIX + i)
                        localStorage.setItem(APP_PREFIX + i, locate)
                        
                        summaryDiv.textContent = weather.sum;
                        maxDiv.textContent = weather.temperatureMax;
                        minDiv.textContent = weather.temperatureMin;
                        humDiv.textContent = humOut;
                        windDiv.textContent = weather.windSpeed;
                        precipDiv.textContent = probOut;  
                    }
            }
        }
        

          


        

        
        
        
    };

    // Private methods:
    
    // Given a latitude and longitude, this method looks through all
    // the stored locations and returns the index of the location with
    // matching latitude and longitude if one exists, otherwise it
    // returns -1.
    //
    function indexForLocation(latitude, longitude)
    {
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
}



