import {
  esriGeometryPoint,
  esriGeometryMultipoint,
  esriGeometryPolyline,
  esriGeometryPolygon,
  esriGeometryEnvelope,
  // IFeature,
} from '@esri/arcgis-rest-feature-layer';

export interface AddFeatureProps {
  features: any;
  url: string;
}

export interface GetFeauturesProps {
  geometry?:
    | esriGeometryPoint
    | esriGeometryMultipoint
    | esriGeometryPolyline
    | esriGeometryPolygon
    | esriGeometryEnvelope;
  outFields: string[];
  outSpatialReference?: number;
  returnGeometry: boolean;
  url: string;
  whereClause?: string;
}

export interface GetLayerProps {
  outFields?: string[];
  slug: string;
}
