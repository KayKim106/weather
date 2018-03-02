

let city="New York";
let country="US";
let temp ="";
let temp_max="";
let temp_min="";
let lat="";
let lon="";

// weather API key
const APIKey ="e1c38b5e12594066805d89123bed27be";



$("#submit").on('click',function(err){

//when on click submit button, city and country input values trim and store to
// each variables
		city = $("#location-city").val().trim().toLowerCase();
		country = $("#location-country").val().trim().toLowerCase();


// Weather URL
const queryURL ="http://api.openweathermap.org/data/2.5/find?q="+city+","+country+"&units=imperialMultilingual support&appid="+APIKey;

$.ajax({
	url:queryURL,
	type:"GET"
}).done(function(response){

		console.log(response);

   		//storeing each data to variables for making code to be clear
		 temp = response.list[0].main.temp;
		 temp_max=response.list[0].main.temp_max;
		 temp_min=response.list[0].main.temp_min;
		 humidity=response.list[0].main.humidity;
		 city = response.list[0].name;
		 country =response.list[0].sys.country;
		//storing current location weather image 
		const weatherImg=response.list[0].weather[0].icon;
		//pulling image from openWeatherURL by png extension
		const weatherIconURL="http://openweathermap.org/img/w/"+weatherImg+".png";


		document.getElementById("humidity").innerHTML=humidity;

		//display weather info to each div after cut off unnecessary decimal points
		document.getElementById("high").innerHTML=(tempChange(temp_max).toFixed(0));
		document.getElementById("low").innerHTML=(tempChange(temp_min).toFixed(0));
		document.getElementById("current-temp").innerHTML=(tempChange(temp).toFixed(0));

		//display the searched location info on the weather-info 
		document.getElementById("placeInfo").innerHTML=city+", "+country;

		//adding weatherIconURL image to weather-info by creating new img element
		$("#weather-img").html("<img class='wImg' src='"+weatherIconURL +"'>");
		const weather =response.list[0].weather[0].main;
		
		//storing location data for google map
		lat = response.list[0].coord.lat;
		lon= response.list[0].coord.lon;

		/*if(weather==="Clouds"){
			alert("weather is cloud");
			$("#weather-img").html("<img class='wImg' src="+weatherIconURL+">");
		}
			else{
				alert("Weather is not cloud");
			}		*/

			//calling tempchang function
			tempChange(temp);
		/*	runs();*/
			initMap(lat,lon);
		

});


});

//changing Kevin temp values to Celcius value
function tempChange(kevintemp){
	
	const temp = kevintemp-273.15;
	return temp;
}


/*function runs(){
const queryURLHourly ="http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid="+APIKey;
$.ajax({
url:queryURLHourly,
method:"GET"
}).then(function(response){
	console.log(response);
});
}*/


// google map API location callback function
function initMap(lat,lon){
	//getting location value by lat and lon
    var area ={lat:lat,lng:lon};
    //display map image to the "map-info"
    var map = new google.maps.Map(document.getElementById("map-info"),{
        zoom:11,
        center:area
    });
    //create google map pin
    var marker = new google.maps.Marker({
        position:area,
        map:map
    });
}
