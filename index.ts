import mapboxgl from "mapbox-gl";
import data from "./data.json";
import londonBoroughs from "./london-boroughs.json";
import { Feature } from "./types";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5ndXNjbGFya2RldiIsImEiOiJjbHRqNjhrbHYwcWtoMmpuenJleHhpZHBwIn0.r8DZZEdOC4St5zKty-enFA";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-0.127647, 51.507322], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

const locations = data.HourlyAirQualityIndex.LocalAuthority.map((item) => {
  return {
    site: item["@LocalAuthorityName"],
    lat: item["@LaCentreLatitude"],
    long: item["@LaCentreLongitude"],
  };
});

locations.forEach((location) => {
  new mapboxgl.Marker({
    color: "red",
  })
    .setLngLat([parseFloat(location.long), parseFloat(location.lat)])
    .addTo(map);
});

function addBoroughsLayer(feature: Feature) {
  const { properties } = feature;
  debugger;
  map.addSource(properties.name, {
    type: "geojson",
    data: {
      properties: properties,
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: feature.geometry.coordinates,
      },
    },
  });

  map.addLayer({
    id: properties.name,
    type: "fill",
    source: properties.name,
    layout: {},
    paint: {
      "fill-color": properties.color,
      "fill-opacity": 0.5,
    },
  });
}

map.on("load", () => {
  londonBoroughs.features.forEach((feature) => addBoroughsLayer(feature));
});
