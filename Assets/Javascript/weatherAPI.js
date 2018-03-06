let city = "new york";
let country = "us";
let tempC = "";
let temp_max = "";
let temp_min = "";
let lat = "";
let lon = "";

// weather API key
const APIKey = "e1c38b5e12594066805d89123bed27be";



$("#submit").on('click', function(err) {

    //when on click submit button, city and country input values trim and store to
    // each variables
    city = $("#location-city").val().trim();
    country = $("#location-country").val().trim();

    // Weather URL
    const queryURL = "https://api.openweathermap.org/data/2.5/find?q=" + city + "," + country + "&units=imperialMultilingual support&appid=" + APIKey;
    $.ajax({
        url: queryURL,
        type: "GET"
    }).done(function(response) {

        console.log(response);

        //storeing each data to variables for making code to be clear
        tempC = response.list[0].main.temp;
        temp_max = response.list[0].main.temp_max;
        temp_min = response.list[0].main.temp_min;
        humidity = response.list[0].main.humidity;
        city = response.list[0].name;
        country = response.list[0].sys.country;
        wind = response.list[0].wind.speed;
        pressure = response.list[0].main.pressure;
        //storing current location weather image 
        const weatherImg = response.list[0].weather[0].icon;
        //pulling image from openWeatherURL by png extension
        const weatherIconURL = "https://openweathermap.org/img/w/" + weatherImg + ".png";
        document.getElementById("humidity").innerHTML = humidity;
     document.getElementById("wind").innerHTML =wind;
         document.getElementById("pressure").innerHTML =pressure;
        //display weather info to each div after cut off unnecessary decimal points

        document.getElementById("high").innerHTML = (tempFahrenheitChange(temp_max).toFixed(0));
        document.getElementById("low").innerHTML = (tempFahrenheitChange(temp_min).toFixed(0));
        document.getElementById("current-temp").innerHTML = (tempFahrenheitChange(tempC).toFixed(0));

        //display the searched location info on the weather-info 
        document.getElementById("placeInfo").innerHTML = city + ", " + country;

        //adding weatherIconURL image to weather-info by creating new img element
        $("#weather-img").html("<img class='wImg' src='" + weatherIconURL + "'>");
        const weather = response.list[0].weather[0].main;
        console.log(weather);
        if (weather === "Clouds") {

            $('.weatherinfo').css("background-image", "url(../images/foggy.gif)");

        }

        //storing location data for google map
        lat = response.list[0].coord.lat;
        lon = response.list[0].coord.lon;

        tempFahrenheitChange(tempC);
        let tempCondition = false;
        $("#tempCe").on('click', function(event) {
            document.getElementById("high").innerHTML = (tempCelsiusChange(temp_max).toFixed(0));
            document.getElementById("low").innerHTML = (tempCelsiusChange(temp_min).toFixed(0));
            document.getElementById("current-temp").innerHTML = (tempCelsiusChange(tempC).toFixed(0));
            return tempCondition = true;
        });

        $("#tempF").on('click', function(event) {
            document.getElementById("high").innerHTML = (tempFahrenheitChange(temp_max).toFixed(0));
            document.getElementById("low").innerHTML = (tempFahrenheitChange(temp_min).toFixed(0));
            document.getElementById("current-temp").innerHTML = (tempFahrenheitChange(tempC).toFixed(0));
            return tempCondition = false;
        });




        initMap(lat, lon);

        $(".tenDaysBtn").on('click', function(event) {

            daily(APIKey, city, country);

        })

    });



});

function daily(api, city, country) {

    let length = 0;
    const urldaily = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + country + "&appid=" + api;
    $.ajax({
        url: urldaily,
        method: "GET"
    }).done(function(reponsedaily) {
        length = reponsedaily.list.length;



        for (let i = 0; i < length; i++) {
            const temp = (9 / 5) * reponsedaily.list[i].main.temp - 459.67;
            const currentTemp = temp.toFixed(0);

            let table = $("<li>" + "<td>" + reponsedaily.list[i].dt_txt + "</td>");
            let tableT = $("<li>" + "<td>" + currentTemp + "</td>");

            let tableW = $("<li>" + "<td>" + reponsedaily.list[i].wind.speed + "</td>");
            let tableH = $("<li>" + "<td>" + reponsedaily.list[i].main.humidity + "</td>");
            const weatherImg = reponsedaily.list[i].weather[0].icon;
            const weatherIconURL = "https://openweathermap.org/img/w/" + weatherImg + ".png";

            let tableR = $("<li>" + "<td>" + "<img src='" + weatherIconURL + "'>" + "</td>");
            $(".table").addClass("table");
            $(".day").append(table);
            $(".temp").append(tableT);
            $(".wind").append(tableW);
            $(".humidity").append(tableH);
            $(".condition").append(tableR);
        };
    });

};

//changing Kevin temp values to Celcius value
function tempCelsiusChange(kevintemp) {

    const temp = kevintemp - 273.15;
    return temp;
};

function tempFahrenheitChange(kevintemp) {
    const temp = (9 / 5) * kevintemp - 459.67;
    return temp;

};



// google map API location callback function
function initMap(lat, lon) {
    //getting location value by lat and lon
    var area = { lat: lat, lng: lon };
    //display map image to the "map-info"
    var map = new google.maps.Map(document.getElementById("map-info"), {
        zoom: 11,
        center: area
    });
    //create google map pin
    var marker = new google.maps.Marker({
        position: area,
        map: map
    });
};




$(document).ready(function() {
    $(".downBtn").click(function() {
        $(".extra-info").slideToggle();
    });
});