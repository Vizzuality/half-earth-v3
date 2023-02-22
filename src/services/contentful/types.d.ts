interface Sys {
  id: string;
  linkType: string;
  type: string;
}

export interface ConfigProps {
  baseUrl: string;
  space: string;
  token: string;
  env: string;
  imageHeight?: number;
  imageWidth?: number;
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
