export interface Boroughs {
  type: string;
  features: Feature[];
}

export interface Feature {
  type: string;
  properties: Properties;
  geometry: Geometry;
}

export interface Properties {
  name: string;
  color: string;
}

export interface Geometry {
  type: string;
  coordinates: number[][][];
}
