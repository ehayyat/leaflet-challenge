// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.
// HINT: The depth of the earth can be found as the third coordinate for each earthquake.


console.log("Start:");


var myMap = L.map ("map", {
  center: [30,-110],
  zoom: 2

});

var map1 = L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
  {
    attribution: "© Mapbox https://www.mapbox.com/about/maps/, © OpenStreetMap http://www.openstreetmap.org/copyright, https://www.mapbox.com/map-feedback/",
    tileSize:512,
    maxZoom: 20,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

map1.addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(url).then(function(data) {
  function mapStyle (feature) {
    return{
      fillOpacity: 1,
      fillColor: depthColor(feature.geometry.coordinates[2]),
      color: 'black',
      radius: getSize (feature.properties.mag),
      stroke: true,
      weight: 0.4


    };
  }
  function depthColor (depth){
    switch(true) {
    case depth > 90:
      return "red";
    case depth > 70:
      return "orange";
    case depth > 50:
      return "yellow"
    case depth > 30:
      return "green"
    case depth > 10:
      return "blue"
    default:
      return "purple";
    }
  }


  function getSize (magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude*4;
  }

   L.geoJson(data, {
    pointToLayer: function(feature, latling){
      return L.circleMarker(latling)
    },
    style: mapStyle,
    onEachFeature: function(feature, layer){
      layer.bindPopup(
        "Magnitude of Earthquake: "
          + feature.properties.mag
          + "<br>Depth of Earthquake: "
          + feature.geometry.coordinates[2]
          + "<br> Location of Earthquake: "
          + feature.properties.place
      );
    }
  }).addTo(myMap)


  var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    var firstkey = [-10, 10, 30, 50, 70, 90]
    var secondkey = [
      "red",
      "orange",
      "yellow",
      "green",
      "blue",
      "purple"
    ];

  // for (var i= 0; i<firstkey; i++) {
  //   div.innterHTML +=
  // }
    return div;
  };
  legend.addTo(myMap);
});


// var earthquake = new L.LayerGroup();



// function createFeatures (usgsdata) {

//   function perFeature (feature, layer) {
//     layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
//   }

//   var earthquake = L.geoJSON(usgsdata, {
//     perFeature: perFeature
//   });

//   createMap (earthquake);
// }

// var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// });

// var overlay = {
//   Earthquakes = earthquake
// };


// // console.log("Map1");


// // }).addTo(myMap);







// // Include popups that provide additional information about the earthquake when a marker is clicked.




// // Create a legend that will provide context for your map data.
