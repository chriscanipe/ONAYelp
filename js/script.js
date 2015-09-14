

//GLOBAL VARIABLES.
var map = L.map('map');

//holders for our Yelp data.
var theData;
var hotelLatLong; 

$(document).ready(function() {
    	
	$.getJSON("js/query.json", function(data) {
		theData = data;
		hotelLatLong = [data.region.center.latitude, data.region.center.longitude];
		theMap.init();
	});

});



var theMap = {
	init : function() {

		//Set Centerpoint
		map.setView(hotelLatLong, 13);

		//Init tile layer. We probably want to use something other than the noisy Open Street Map tiles
		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
		}).addTo(map);

		//Attach label to center icon
		L.marker(hotelLatLong).addTo(map)
		    .bindPopup('The Conference Hotel')
		    .openPopup();

		//Draw an icon for the results in our array. 
		$.each(theData.businesses, function(i, item) {
			console.log(item.location.coordinate);
			var loc = [item.location.coordinate.latitude, item.location.coordinate.longitude];

			L.marker(loc).addTo(map)
			    .bindPopup(item.name);

		})	

	}
} 











