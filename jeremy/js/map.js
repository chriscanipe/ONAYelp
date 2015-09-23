
var theData;
var hotelLatLong;

$(document).ready(function() {
      
  $.getJSON("js/query.json", function(data) {
    theData = data;
    hotelLatLong = [data.region.center.latitude, data.region.center.longitude];
    // drawMap();
  });

});



////////////////////////////////////////////////
////////////////////////////////////////////////
// Global variables 
////////////////////////////////////////////////
////////////////////////////////////////////////
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



////////////////////////////////////////////////    
////////////////////////////////////////////////
//Map /////////////////////////////////
////////////////////////////////////////////////
////////////////////////////////////////////////

//   for (var i = 0; i < locations.length; i++) {
//     var bar = locations[i];
//     var myLatLng = new google.maps.LatLng(data.location.coordinate.latitude, data.location.coordinate.longitude);
//     var marker = new google.maps.Marker({
//         position: myLatLng,
//         map: map,
//         shadow: shadow,
//         // icon: image,
//         shape: shape,
//         // title: beach[0],
//         // zIndex: beach[3]
//     });
//   }
// }

function drawMap(){
    var map;
    function initialize() {
      // Create a base map.
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 34.0554907, lng: -118.41893235},
        // disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoomControl:true    
      });

      map.setOptions({styles: styles});

      // Load a GeoJSON from a local file
      map.data.loadGeoJson('js/query.json');

    }

    google.maps.event.addDomListener(window, 'load', initialize);
}





drawMap();

