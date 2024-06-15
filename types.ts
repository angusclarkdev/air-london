export interface Species {
  "@SpeciesCode": string;
  "@SpeciesDescription": string;
  "@AirQualityIndex": string;
  "@AirQualityBand": string;
  "@IndexSource": string;
}

export interface Site {
  SiteCode: string;
  SiteName: string;
  SiteType: string;
  Latitude: string;
  Longitude: string;
  Species: Species[];
}
