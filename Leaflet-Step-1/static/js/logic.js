// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// console.log(queryUrl)
    
// Perform a GET request to the query URL
d3.json(queryUrl).then(function(data) {
    // Once we get a response, send the data.features object to the createFeatures function
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h3>" + feature.properties.place +
    //         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    // }

    function pointFunction(feature, layer) {
        // console.log(feature)
        return L.circleMarker(layer, { radius: feature.properties.mag * 10 });

    }


// day 2 activity 2 code example for heat map

// var heatArray = [];

//   for (var i = 0; i < earthquakeData.length; i++) {
//     var location = earthquakeData[i].location;

//     if (location) {
//       heatArray.push([location.coordinates[1], location.coordinates[0]]);
//     }
//   }

//   var heat = L.heatLayer(heatArray, {
//     radius: 20,
//     blur: 35
//   }).addTo(myMap);






    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        // onEachFeature: onEachFeature, //add popups
        pointToLayer: pointFunction // add circles

    });

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
    });

   

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
            };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [
            37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(myMap);
}
