export function getAverageAirQualityIndexForSite(site: any[]) {
  // debugger;
  if (!site.length) return;
  const firstSite = site[0];
  const { Species } = firstSite;

  if (Array.isArray(Species)) {
    const totalAQI = Species.map((i) => parseInt(i["AirQualityIndex"])).reduce(
      (acc, curr) => acc + curr,
      0
    );
    const averageAQI = totalAQI / Species.length;
    return parseFloat(averageAQI.toFixed(2));
  } else {
    return parseFloat(parseInt(Species["AirQualityIndex"]).toFixed(2));
  }
}

export function transformJSONKeys(json: any) {
  if (typeof json !== "object" || json === null) {
    return json;
  }

  if (Array.isArray(json)) {
    return json.map(transformJSONKeys);
  }

  return Object.keys(json).reduce((acc, key) => {
    const newKey = key.replace(/^@/, ""); // Remove the @ symbol
    acc[newKey] = transformJSONKeys(json[key]);
    return acc;
  }, {});
}

// export function transformAirQualityToGeoJson(originalData: string) {
//   console.log(typeof originalData);

//   const jsonData = convertXMLToJSon.xml2json(originalData, {
//     compact: true,
//     spaces: 4,
//   });
//   const features = originalData.LocalAuthority.map((site: any) => {
//     const { Latitude, Longitude } = site;
//     const averageAQI = getAverageAirQualityIndexForSite(site);

//     return {
//       type: "Feature",
//       geometry: {
//         type: "Point",
//         coordinates: [Longitude, Latitude],
//       },
//       properties: {
//         averageAQI,
//       },
//     };
//   });

//   return {
//     type: "FeatureCollection",
//     features,
//   };
// }
