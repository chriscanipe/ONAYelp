var map;

var styles = [
      {
        stylers: [
          { hue: "#00ffe6" },
          // { saturation: -20 }
          // { hue: "#00ffe6" },
          { saturation: -70 },
          { lightness: 10 },
          { gamma: 1.0 },
          // { invert_lightness: true}
        ]
      },{
        featureType: "administrative",
        stylers: [
          { gamma: 0 },
          { visibility: "simplified" }
        ]
      },{
        featureType: "road.local",
        // elementType: "labels.text.stroke",
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

function initialize() {
  var mapOptions = { mapTypeId: google.maps.MapTypeId.ROADMAP,
    zoom: 12, center: new google.maps.LatLng(34.0554907, -118.41893235) };
  map = new google.maps.Map( document.getElementById('map') , mapOptions);

  map.setOptions({styles: styles});
}

initialize();

d3.csv("js/query.json", function(data){
  var overlay = new google.maps.OverlayView();



  // Add the container when the overlay is added to the map.
  overlay.onAdd = function() {
    var layer = d3.select(this.getPanes().overlayLayer).append("div")
        .attr("class", "stations");

    overlay.draw = function() {
      var projection = this.getProjection(),
          padding = 16;

      var marker = layer.selectAll("svg")
          .data(d3.entries(data))
          .each(transform) // update existing markers
          .enter().append("svg:svg")
            .each(transform)
            .attr("class", "marker");

      // 加入圓點
      marker.append("svg:circle")
          .attr("r", 6)
          .attr("cx", padding)
          .attr("cy", padding);

      // 加入標籤
      marker.append("svg:text")
          .attr("x", padding + 7)
          .attr("y", padding)
          .attr("dy", ".31em")
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
