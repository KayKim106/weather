let city="New York";
let country="US";
let temp ="";
let temp_max="";
let temp_min="";
const APIKey ="e1c38b5e12594066805d89123bed27be";

$("#submit").on('click',function(err){

		city = $("#location-city").val().trim().toLowerCase();
		country = $("#location-country").val().trim().toLowerCase();


const queryURL ="http://api.openweathermap.org/data/2.5/find?q="+city+","+country+"&units=imperialMultilingual support&appid="+APIKey;

$.ajax({
	url:queryURL,
	type:"GET"
}).done(function(response){

		console.log(response);
		console.log(response.list[0].main.humidity);
		const weatherImg=response.list[0].weather[0].icon;
		/*const temp = ((response.list[0].main.temp-273.15).toFixed(2));*/
		 temp = response.list[0].main.temp;
		 temp_max=response.list[0].main.temp_max;
		 temp_min=response.list[0].main.temp_min;
		const weatherIconURL="http://openweathermap.org/img/w/"+weatherImg+".png";
		document.getElementById("humidity").innerHTML=response.list[0].main.humidity;
		document.getElementById("high").innerHTML=(tempChange(temp_max).toFixed(2));
		document.getElementById("low").innerHTML=(tempChange(temp_min).toFixed(2));
		document.getElementById("current-temp").innerHTML=(tempChange(temp).toFixed(2));
		/*document.getElementById("weather-img").innerHTML=response.list[0].weather[0].icon;*/
		document.getElementById("placeInfo").innerHTML=response.list[0].name+", "+response.list[0].sys.country;
		$("#weather-img").html("<img class='wImg' src='"+weatherIconURL +"'>");
		const weather =response.list[0].weather[0].main;
		if(weather==="Clouds"){
			alert("weather is cloud");
			$("#weather-img").html("<img class='wImg' src="+weatherIconURL+">");
		}
			else{
				alert("Weather is not cloud");
			}		
			console.log(tempChange(temp));	
			runs();
		
});


});
function tempChange(kevintemp){
	
	const temp = kevintemp-273.15;
	return temp;
}


function runs(){
const queryURLHourly ="http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=xml&units=metric&cnt=7&appid="+APIKey;
$.ajax({
url:queryURLHourly,
method:"GET"
}).then(function(response){
	alert("whwhwhwh");
	console.log(response);
});
}
