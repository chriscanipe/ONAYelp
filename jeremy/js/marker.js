var styles = [
      {
        stylers: [
          { hue: "#00ffe6" },
          { saturation: -70 },
          { lightness: 10 },
          { gamma: 1.0 }
        ]
      },{
        featureType: "administrative",
        stylers: [
          { gamma: 0 },
          { visibility: "simplified" }
        ]
      },{
        featureType: "road.local",
        stylers: [
          { gamma: -30 },
          { visibility: "on" },
          { strokeWeight: 3},
          { strokeColor: "black"}
        ]
      },
      {
        featureType: "landscape.man_made  ",
        stylers: [
          { visibility: "simplified" },

        ]
      },
      {
        featureType: "transit",
        stylers: [
          { visibility: "off" },
        ]
      }
    ];

// Create the Google Map…
var map = new google.maps.Map(d3.select("#map").node(), {
  zoom: 13,
  center: new google.maps.LatLng(34.0554907, -118.41893235),
  mapTypeId: google.maps.MapTypeId.ROADMAP,
});

map.setOptions({styles: styles});

var infoWindow = new google.maps.InfoWindow({map: map});
// Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('You are here!');
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
}




// Load the station data. When the data comes back, create an overlay.
d3.json("js/query.json", function(data) {

  // console.log(data.businesses[0].location.coordinate.latitude, data.businesses[0].location.coordinate.longitude);



  var overlay = new google.maps.OverlayView();


  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stations");

    // Draw each marker as a separate SVG element.
    // We could use a single SVG, but what size would it have?
  overlay.draw = function() {
    var projection = this.getProjection(),
        padding = 10;

    var flatData = [];

    $.each(data.businesses, function(i, item) {
    flatData.push({latitude: item.location.coordinate.latitude, 
      longitude: item.location.coordinate.longitude, 
      name: item.name
      });
    })  

    var marker = layer.selectAll("svg")
        // .data(d3.entries(data))
        .data(d3.entries(flatData))
        .each(transform) // update existing markers
        .enter()
        .append("svg")
        .each(transform)
        .attr("class", "marker");

      // Add circles
    marker.append("circle")
        .attr("r", 6)
        .attr("cx", padding)
        .attr("cy", padding);


    // Add labels
    marker.append("text")
        .attr("x", padding + 7)
        .attr("y", padding)
        .attr("dy", ".31em")
        .attr("class","text")
        .text(function(d) { return d.value.name; });


 

    function transform(d) {    
      d = new google.maps.LatLng(d.value.latitude, d.value.longitude);
      d = projection.fromLatLngToDivPixel(d);
      return d3.select(this)
          .style("left", (d.x - padding) + "px")
          .style("top", (d.y - padding) + "px");
    }
    };
  };

  // Bind our overlay to the map…
  overlay.setMap(map);
});
