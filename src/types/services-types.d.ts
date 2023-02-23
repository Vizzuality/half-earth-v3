import {
  esriGeometryPoint,
  esriGeometryMultipoint,
  esriGeometryPolyline,
  esriGeometryPolygon,
  esriGeometryEnvelope,
} from '@esri/arcgis-rest-feature-layer';
import type { IFeature } from '@esri/arcgis-rest-request';

interface Family {
  lang: string;
  name: string;
}

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

interface Info {
  content: string;
  lang: string;
  source: string;
}

interface Sys {
  id: string;
  linkType: string;
  type: string;
}

export interface AddFeatureProps {
  features: Feat;
  url: string;
}

export interface ConfigProps {
  baseUrl: string;
  space: string;
  token: string;
  env: string;
  imageHeight?: number;
  imageWidth?: number;
}

export interface FeaturePlaceItemProps {
  fields: {
    slug: string;
    picture: {
      sys: Sys;
    };
    description: {
      nodeType: string;
      data: unknown;
      content: unknown;
    };
    featureSlug: string;
    image: {
      sys: Sys;
    };
    language: string;
    nameSlug: string;
    title: string;
    layerSlug: string;
  };
  metadata: {
    tags: Record<unknown>;
    fields: {
      layerSlug: string;
    };
  };
  sys: {
    contentType: {
      sys: Sys;
    };
    createdAt: string;
    environment: {
      sys: Sys;
    };
    id: string;
    locale: string;
    revision: number;
    space: {
      sys: Sys;
    };
    type: string;
    updatedAt: string;
  };
}

export interface GenericItemProps {
  description: {
    nodeType: string;
    data: unknown;
    content: unknown;
  };
  featureSlug: string;
  image: {
    sys: Sys;
  };
  language: string;
  nameSlug: string;
}

export interface GetCrfDataProps {
  aoiFeatureGeometry: {
    rings: number[][];
    toJSON: () => isDefaultToJSON;
  };
  rings: number[][];
  toJSON: () => Record<string, unknown>;
  dataset: string;
}

export interface GetFeaturesProps {
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

export interface JSONGeometryProps {
  rings: number[][];
  spatialReference: {
    latestWkid: number;
    wkid: number;
  };
}

export interface JobInfoProps {
  jobId: number;
  fetchResultData: (outputParamKey: string) => function;
  waitForJobCompletion: (jobId: number) => function;
  catch: (error: Error) => unknown;
  then: () => unknown;
}

export interface SpeciesItemProps {
  map: () => void;
  bounds: {
    northEast: {
      lat: number;
      lng: number;
    };
    southWest: {
      lat: number;
      lng: number;
    };
  };
  commonname: string;
  family: Family[];
  image: string;
  info: Info[];
  rangemap: string;
  redlist_citation_full: string;
  redlist_citation_short: string;
  redlist_link: string;
  scientificname: string;
  sequenceid: number;
  taxa: string;
  tc_id: number;
  updated_at: string;
}
