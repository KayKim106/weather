import {city,country} from 'weatherAPI.js';

		city = $("#location-city").val().trim().toLowerCase();
		country = $("#location-country").val().trim().toLowerCase();
	
console.log(city );
const APIKey= "e1c38b5e12594066805d89123bed27be";
const query ="http://api.openweathermap.org/data/2.5/forecast?q="+city+","+country+"&appid="+APIKey;

let length=0;
$.ajax({
	url:query,
	method:"GET"
}).done(function(response){

	console.log(response);
	/*console.log("--day--"+response.list[39].dt_txt);
	console.log("--temp--"+response.list[39].main.temp);
	console.log("--wind--"+response.list[39].wind.speed);*/

	length=response.list.length;


for(let i=0; i<length; i++){
	/*let tempChange = response.list[i].main.temp;
	let tempChangeF= tempChange-273.15;
	tempChangeF=tempChangeF.toFixed(2);*/
	let table =$("<li>"+"<td>"+response.list[i].dt_txt+"</td>");
	let tableT =$("<li>"+"<td>"+response.list[i].main.temp+"</td>");
	
	let tableW =$("<li>"+"<td>"+response.list[i].wind.speed+"</td>");
	let tableH =$("<li>"+"<td>"+response.list[i].main.humidity+"</td>");
	const weatherImg=response.list[i].weather[0].icon;
	const weatherIconURL="http://openweathermap.org/img/w/"+weatherImg+".png";

	let tableR =$("<li>" + "<td>" + "<img src='"+weatherIconURL+"'>" +"</td>");
	$(".table").addClass("table");
	$(".day").append(table);
	$(".temp").append(tableT);
	$(".wind").append(tableW);
	$(".humidity").append(tableH);
	$(".condition").append(tableR);
}
});

// google map 

/*function initMap(){
    var area ={lat:-25.363,lng:131.044};
    var map = new google.maps.Map(document.getElementById("map-info"),{
        zoom:4,
        center:area
    });
    var marker = new google.maps.Marker({
        position:area,
        map:map
    });
}
*/
