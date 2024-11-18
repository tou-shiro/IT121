    let imageObjects = [
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image(),
      new Image()
    ];

    // Set image sources
    imageObjects[0].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/seattle_web-e07e580eca.jpg'; //Seattle
    imageObjects[1].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/berlin_web-42996a2587.jpg'; //Berlin
    imageObjects[2].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/new-york_web-99d9bb0809.jpg'; //New York
    imageObjects[3].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/manila_web-d60a05cd04.jpg'; //Manila
    imageObjects[4].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/london_web-e8502ca139.jpg'; //London
    imageObjects[5].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/paris_web-0a3c7314a5.jpg'; //Paris
    imageObjects[6].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/tokyo_web-7a20b5733f.jpg'; //Tokyo
    imageObjects[7].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/beijing_web-a6aa65e646.jpg'; //Beijing
    imageObjects[8].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/adelaide_web-e462ed5b74.jpg'; //Adelaide
    imageObjects[9].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/johannesburg_web-6d56b16404.jpg'; //Johannesburg
    imageObjects[10].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/cairo_web-52946f68c1.jpg'; //Cairo
    imageObjects[11].src = 'https://d13k13wj6adfdf.cloudfront.net/urban_areas/rio-de-janeiro_web-600ed3659c.jpg'; //Rio De Janeiro


    const apiKey = "5e992c389dc743c3a0d61343231611"; // Update with your key (and do not upload onto github)
    // const loadWeatherBtn = document.getElementById("load-weather");
    // const weatherEl = document.getElementById("weatherVisual");
    // This is the global object that we will access to display data from the API. Refer to apiInfo for properties that can be accessed

    var apiData;

    // Our list of cities to be called by API
    var cityList = [
      ["Seattle", "Washington"],
      ["Berlin", "Germany"],
      ["New York City", "New York"],
      ["Manila", "Phillipines"],
      ["London", "United Kingdom"],
      ["Paris", "France"],
      ["Tokyo", "Japan"],
      ["Beijing", "China"],
      ["Adelaide", "Australia"],
      ["Johannesburg", "South Africa"],
      ["Cairo", "Egypt"],
      ["Rio De Janeiro", "Brazil"]
    ]

    // Needs to be async because it takes time to pull JSON from API, async makes it so that this function needs to finish before anything is pulled
    async function loadWeather(cityListEl) {
      const city = cityListEl[0];
      const region = cityListEl[1];
      const URL = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city},${region}`;
      console.log(URL);
      let json;

      // Error handling for if the API is not able to be reached
      try {
        const response = await fetch(URL);
        json = await response.json();
      } catch (error) {
        console.log("There was an error: ", error)
        return undefined;
      }

      // Checks if JSON is null
      if (json) {
        // Error handling for if there is some issue parsing json, print error (e.g. region doesn't exist)
        try {
          //console.log(json);

          // Creates our data structure that contains desired information from API's JSON data
          var apiInfo = {
            temperature: "",
            feelsLike: "",
            currentConditions: "",
            humidity: "",
            precipitation: "",
            windConditions: "",
            visibility: "",
            uv: "",
            lat: "",
            lon: "",
            city: "",
            region: "",
            country: "",
            icon: ""
          }
          // Parses JSON for relevant information, binds it to apiInfo object
          const weatherCurrent = json["current"]
          apiInfo.temperature = weatherCurrent.temp_f;
          apiInfo.feelsLike = weatherCurrent.feelslike_f;
          apiInfo.currentConditions = weatherCurrent["condition"].text;
          apiInfo.humidity = weatherCurrent.humidity;
          apiInfo.precipitation = weatherCurrent.precip_in;
          apiInfo.windConditions = weatherCurrent.wind_mph; // Returns wind in miles per hour, can get direction too if we want
          apiInfo.visibility = weatherCurrent.vis_miles;
          apiInfo.uv = weatherCurrent.uv;
          apiInfo.icon = weatherCurrent["condition"].icon;

          console.log(apiInfo.icon);

          const locationInfo = json["location"]
          apiInfo.country = locationInfo.country;
          apiInfo.region = region;
          apiInfo.city = city;
          apiInfo.lat = locationInfo.lat;
          apiInfo.lon = locationInfo.lon;

          // Outputs the parsed information into console
          // console.log(apiInfo);

          // To be returned to our global variable apiData in later (in callRandom)
          return apiInfo;
        } catch (error) {
          console.error(error);
          return undefined;
        }
      }
      return undefined;
    }

    // Save previous city so we don't get it again
    let previousRandom = 0;

    // Will be called once we have API data
    async function callRandom(_callback) {
      // Have a random city that can be picked from our list
      randomCity = Math.floor(Math.random() * cityList.length);
      // Reroll city if we get previous city
      if (previousRandom == randomCity) {
        while (previousRandom == randomCity) {
          //console.log(previousRandom);
          randomCity = Math.floor(Math.random() * cityList.length);
          //console.log("Rerolling");
        }
      }
      // Save previous rolled city
      previousRandom = randomCity;
      //console.log("Number: " + previousRandom);
      
      // loadWeather needs to complete before callRandom can continue further, and we assign it to our global apiData
      apiData = await loadWeather(cityList[randomCity]);
      // If we don't await loadWeather, we will not be able to access the data with console.log command due to how events are called in JS (console.log gets called if first if no await)
      console.log(apiData);
      // Called once we have API data available.
      _callback();
    }

    // Addicon is an example function of how web icon can be accessed and displayed on page
    /*function addIcon() {
        let iconEl = document.createElement('img');
        iconEl.src = apiData.icon;
        weatherEl.append(iconEl);
    }

    // Addtemp is an example function of how temperature can be accessed and displayed on page
    function addTemp() {
        let tempEl = document.createElement('p');
        tempEl = apiData.temperature
        weatherEl.append(tempEl);
    }
    */

    // Load a random location when the page loads
    window.addEventListener('load', loadData());

    // Load a random location when the Enter key is pressed
    document.addEventListener('keydown', (event) => {
    // Check if the pressed key is Enter (key code 13)
        if (event.key === 'Enter') {
            loadData();
        }
    });

    // Load a random location when the Load Random Location button is clicked
    //loadWeatherBtn.addEventListener('click', loadData());

      // Essentially, this whole section of the code establishes dependencies to:
      // First allow the JSON to be pulled by loadWeather when given city, region
      // Then, call a random city from our cityList array to be displayed on the webpage
      // Finally, modify/display the data pulled from the API after the previous functions have been called
      // Dependencies need to be established with asynchronous functions so that we access defined API data,
      // and prevent accessing anything undefined.


      function loadData () {
      // CallRandom occurs after click happens
      callRandom(() => {
        // These are the callback functions of callRandom and happen after callRandom finishes
        // This is where we will plug in the visual functions of our web page
        //        addIcon();
        //        addTemp();

        document.getElementById("location").textContent = apiData.city + ",  " + apiData.country;
        if (apiData.lat > 0) {
          var lat_suffix = "N"
        } else if (apiData.lat < 0) {
          var lat_suffix = "S"
        } else {
          var lat_suffix = "At the Equator"
        }
        document.getElementById("lat").textContent = "Latitude: " + apiData.lat + "° " + lat_suffix;

        if (apiData.lon > 0 && apiData.lon < 180) {
          var lon_suffix = "E"
        } else if (apiData.lon < 0 && apiData.lon < 180) {
          var lon_suffix = "W"
        } else if (apiData.lon = 0) {
          var lon_suffix = "At the Prime Meridian"
        } else {
          var lon_suffix = "At the International Date Line"
        }
        document.getElementById("lon").textContent = "Longitude: " + apiData.lon + "° " + lon_suffix;

        if (randomCity == 4){
          document.getElementById("left-pane-image").style.objectPosition = "15% 100%";
          document.getElementById("left-pane-image").src = imageObjects[randomCity].src;
        } else {
          document.getElementById("left-pane-image").style.objectPosition = "initial";
          document.getElementById("left-pane-image").src = imageObjects[randomCity].src;
        }

        // document.getElementById("left-pane-image").src = imageObjects[randomCity].src;

        document.getElementById("temp").textContent = apiData.temperature + "°F";
        document.getElementById("feels").textContent = apiData.feelsLike + "°F";

        document.getElementById("curr_icon").src = "https:" + apiData.icon;

        document.getElementById("humidity").textContent = apiData.humidity + "%";
        document.getElementById("precip").textContent = apiData.precipitation + "\"";

        /*if (apiData.windConditions < 10) {
            var wind_suffix = "     ";
        } else {
            var wind_suffix = "";
        }
        */

        document.getElementById("wind").innerHTML = apiData.windConditions + "<br>mph";
        document.getElementById("viz").textContent = apiData.visibility + " mi";
        document.getElementById("uv_idx").textContent = apiData.uv;




      });
    }