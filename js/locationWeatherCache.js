
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

//Takes the weather information from the weather API and calls the response method
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
        return locations.length;
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
        //object of each new location is constructed
        var myLocation = {
            lat: latitude,
            long: longitude,
            nick: nickname,
            forecast: ""
        }
        string = JSON.stringify(myLocation);
        
    }

    // Removes the saved location at the given index.
    // 
    this.removeLocationAtIndex = function(index)
    {
        localStorage.removeItem(APP_PREFIX + index)
        location.href = 'index.html'
    }

    // This method is used by JSON.stringify() to serialise this class.
    // Note that the callbacks attribute is only meaningful while there 
    // are active web service requests and so doesn't need to be saved.
    //
    this.toJSON = function(input) {
        return JSON.stringify(input);
    };

    // Given a public-data-only version of the class (such as from
    // local storage), this method will initialise the current
    // instance to match that version.
    //
    this.initialiseFromPDO = function(locationWeatherCachePDO) {
    
    var nextId;    
      //Saves each location to a new local storage object using an id-well
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
        //URL is constructed for the forecast.io service
        var workingUrl = "https://api.forecast.io/forecast/56d73602d5f12f6ebecd4ee3684c816d/";
        workingUrl += lat + "," + long + "," + date + "/?units=si&exclude=[hourly]&callback=takeWeather()";
    
        //The URL is then called
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
    
        //Retrieving data from the weather API repsonse
		var day = response.daily.data
		var obje = day[0];
     
        //Weather data is stored in an object
        var weather = {
            sum: obje.summary,
            icon: obje.icon,
            precipProbability: "Probability of Precipitation: " + (Number(obje.precipProbability) * 100).toFixed(2) + "%",
            temperatureMin: "Min: " + obje.temperatureMin + "  \xB0C",
            temperatureMax: "Max: " + obje.temperatureMax + " \xB0C",
            humidity: "Humidity: " + (Number(obje.humidity) * 100).toFixed(2) + "%",
            windSpeed: "Wind Speed: " + obje.windSpeed + "km/h",
        }
       
       
        //Checks if on the home page or on the view location page
        if(localStorage.getItem(APP_PREFIX + "-Home") === "")
            {
                //ON the home page
                //Checks local storage for locations and adds the current days forecast to local storage 
                for (i=1; i<299; i++)
                {
                    if (localStorage.getItem(APP_PREFIX + i))
                    {
                       var prs = JSON.parse(localStorage.getItem(APP_PREFIX + i))
                       
                       //Checks if the coordinates of the weather response equal those saved in local storage
                       if(prs.lat == response.latitude && prs.long == response.longitude)
                           {
                               prs.forecast = weather
                               console.log(prs)
                               var str = JSON.stringify(prs)
                               localStorage.setItem(APP_PREFIX + i,str)
                                //Redirects the user to the launch page
                                location.href = 'index.html'
                           }
                    }
                }
            }
        
        //NOT on the home page (view location page)
        else
            {
                //Html of the view location page is updated with the weather
                document.getElementById("sum").textContent = weather.sum;
                document.getElementById("max").textContent = weather.temperatureMax;
                document.getElementById("min").textContent = weather.temperatureMin;;
                document.getElementById("hum").textContent = weather.humidity;
                document.getElementById("wind").textContent = weather.windSpeed;
                document.getElementById("precip").textContent = weather.precipProbability;
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
        for (i = 0; i<locations.length; i++)
            {
                if (locations[i].lat === latitude && locations[i].long === longitude)
                    {
                        return i;
                    }
                else
                    {
                        return -1;
                    }
            }
    }
}

// Restore the singleton locationWeatherCache from Local Storage.
//
function loadLocations()
{
    var load = localStorage.getItem(APP_PREFIX);
    if(load.forcast !== "")
        {
            
        }
    else
        {
            var initialise = new LocationWeatherCache;
            initialise.initialiseFromPDO();
        }
}

// Save the singleton locationWeatherCache to Local Storage.
//
function saveLocations()
{
    var cache = new LocationWeatherCache
    var out = cache.toJSON(cache);
    localStorage.setItem(APP_PREFIX, out);
}


loadLocations();

