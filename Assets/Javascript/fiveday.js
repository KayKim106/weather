


const APIKey= "e1c38b5e12594066805d89123bed27be";
const query ="http://api.openweathermap.org/data/2.5/forecast?q="+city+","+country"+&appid="+APIKey;

let length=0;
$.ajax({
	url:query,
	method:"GET"
}).done(function(response){

	console.log(response);
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


