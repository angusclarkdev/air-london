import mapboxgl from "mapbox-gl";
import { FeatureCollection } from "geojson";
import airQualityData from "./data/airQualityData.json";
import londonBoroughs from "./data/londonBoroughsData.json";
import {
  transformJSONKeys,
  getAverageAirQualityIndexForSite,
} from "./utils/index";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5ndXNjbGFya2RldiIsImEiOiJjbHRqNjhrbHYwcWtoMmpuenJleHhpZHBwIn0.r8DZZEdOC4St5zKty-enFA";

const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-0.127647, 51.507322], // starting position [lng, lat]
  zoom: 10, // starting zoom
});

function addBoroughsLayer(data: FeatureCollection) {
  console.log(data);

  map.addSource("boroughs", {
    type: "geojson",
    data,
  });

  // Add the boroughs data and fill it
  map.addLayer({
    id: "boroughs-layer",
    type: "fill",
    source: "boroughs",
    paint: {
      "fill-color": "floralwhite",
      "fill-opacity": 0.5,
      "fill-outline-color": "black",
    },
  });

  // Add another layer for the outline of the boroughs
  map.addLayer({
    id: "boroughs-outline",
    type: "line",
    source: "boroughs",
    layout: {},
    paint: {
      "line-color": "black",
      "line-width": 2,
    },
  });
}

function addHeatMapLayer(data: FeatureCollection) {
  map.addSource("airQuality", {
    type: "geojson",
    data,
  });

  map.addLayer({
    id: "heatmap-layer",
    type: "heatmap",
    source: "airQuality",
    maxzoom: 15,
    paint: {
      // increase weight as diameter breast height increases
      "heatmap-weight": {
        property: "airQualityIndex",
        type: "exponential",
        stops: [
          [1, 10],
          [10, 1],
        ],
      },
      // assign color values be applied to points depending on their density
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(236,222,239,0)",
        0.2,
        "rgb(208,209,230)",
        0.4,
        "rgb(166,189,219)",
        0.6,
        "rgb(103,169,207)",
        0.8,
        "rgb(28,144,153)",
      ],
    },
  });
}

map.on("load", () => {
  const transformedData = transformJSONKeys(airQualityData);

  const locationsGeoJson =
    transformedData.HourlyAirQualityIndex.LocalAuthority.map((item) => {
      const { LaCentreLatitude, LaCentreLongitude, Site } = item;

      const averageAQI = getAverageAirQualityIndexForSite(Site ?? []);

      return {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [LaCentreLongitude, LaCentreLatitude],
        },
        properties: {
          color: "red",
          airQualityIndex: averageAQI ?? 0,
        },
      };
    });

  const geoJsonCollection = {
    type: "FeatureCollection",
    features: locationsGeoJson,
  };

  addBoroughsLayer(londonBoroughs as FeatureCollection);
  addHeatMapLayer(geoJsonCollection as FeatureCollection);
});
