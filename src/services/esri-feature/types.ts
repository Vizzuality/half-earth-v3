export interface AddFeatureProps {
  features: any,
  url: string,
}

export interface GetFeauturesProps {
  geometry?: any,
  outFields: any,
  outSpatialReference?: any,
  returnGeometry: boolean;
  url: string,
  whereClause?: string,
}

export interface GetLayerProps {
  outFields?: any,
  slug: string,
}
