function initMap(){
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