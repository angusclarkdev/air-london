import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5ndXNjbGFya2RldiIsImEiOiJjbHRqNjhrbHYwcWtoMmpuenJleHhpZHBwIn0.r8DZZEdOC4St5zKty-enFA";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v12", // style URL

  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});
