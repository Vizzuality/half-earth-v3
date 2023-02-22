import {
  esriGeometryPoint,
  esriGeometryMultipoint,
  esriGeometryPolyline,
  esriGeometryPolygon,
  esriGeometryEnvelope,
} from '@esri/arcgis-rest-feature-layer';
import type { IFeature } from '@esri/arcgis-rest-request';

interface Feat extends IFeature {
  attributes: {
    aoiId: string;
    area: number;
    areaName: string;
    elu: string;
    isCustom: boolean;
    per_global: number;
    percentage: number;
    population: number;
    pressures: string;
    protectedAreasList: string;
    species: string;
    speciesNumbers: {
      nspecies: number;
    };
    time_stamp: number;
  };
}

export interface AddFeatureProps {
  features: Feat;
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
