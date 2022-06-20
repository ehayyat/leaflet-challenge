// Create a map using Leaflet that plots all of the earthquakes from your data set based on their longitude and latitude.
// Your data markers should reflect the magnitude of the earthquake by their size and and depth of the earthquake by color. Earthquakes with higher magnitudes should appear larger and earthquakes with greater depth should appear darker in color.
// HINT: The depth of the earth can be found as the third coordinate for each earthquake.
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function(data) {
   createFeatures(data.features); 

});

function createFeatures (usgsdata) {

  function perFeature (feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  }

  var earthquake = L.geoJSON(usgsdata, {
    perFeature: perFeature
  });

  createMap (earthquake);
}

var layer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var overlay = {
  Earthquakes = earthquake
};

var myMap = L.map ("map", {
    center: [37749, -122.4194],
    zoom: 10
    layers: [layer]

});
// console.log("Map1");


// }).addTo(myMap);







// Include popups that provide additional information about the earthquake when a marker is clicked.




// Create a legend that will provide context for your map data.
var legend = L.control({
    position: "bottomright"
  });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  legend.addTo(myMap);





