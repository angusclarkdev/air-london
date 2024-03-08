import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import data from "./data.json";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5ndXNjbGFya2RldiIsImEiOiJjbHRqNjhrbHYwcWtoMmpuenJleHhpZHBwIn0.r8DZZEdOC4St5zKty-enFA";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/dark-v10",

  // style: "mapbox://styles/mapbox/dark-v10",
  center: [-0.127647, 51.507322], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

map.on("load", () => {
  map.addSource("admin-3", {
    type: "vector",
    // Use any Mapbox-hosted tileset using its tileset id.
    // Learn more about where to find a tileset id:
    // https://docs.mapbox.com/help/glossary/tileset-id/
    url: "mapbox://mapbox.boundaries-adm3-v4",
    promoteId: "mapbox_id",
  });

  map.addLayer({
    id: "admin-3",
    type: "fill",
    source: "admin-3",
    "source-layer": "contour",
    layout: {},
    paint: {},
  });
});

const locations = data.DailyAirQualityIndex.LocalAuthority.map((item) => {
  return {
    site: item["@LocalAuthorityName"],
    lat: item["@LaCentreLatitude"],
    long: item["@LaCentreLongitude"],
  };
});

console.log(locations);

locations.forEach((location) => {
  new mapboxgl.Marker({
    color: "red",
  })
    .setLngLat([parseFloat(location.long), parseFloat(location.lat)])
    .addTo(map);
});
// console.log(data.DailyAirQualityIndex.LocalAuthority.map((item) => item. ));

// const url =
//   "http://api.erg.ic.ac.uk/AirQuality/Daily/MonitoringIndex/Latest/GroupName=London/Json";

// function fetchData() {
//   fetch(url)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json(); // Assuming the response is JSON
//     })
//     .then((data) => {
//       // Handle the data here, for example, log it to the console
//       console.log(data.localAuthority);
//     })
//     .catch((error) => {
//       console.error("There was a problem with the fetch operation:", error);
//     });
// }

// fetchData();
