import {
  LANDSCAPE_FEATURES_LABELS_LAYER,
  CITIES_LABELS_LAYER
} from 'constants/layers-slugs'

import { LAYERS_URLS } from 'constants/layers-urls';

const bucketUrl = "https://storage.googleapis.com/cdn.mol.org/half-earth/tiles/phase2";
const templatePattern = "{level}/{col}/{row}";
const fishingTiles = "fishing-hours/gfw_purple";

export const biodiversityCategories = [
  {
    name: 'TERRESTRIAL SPECIES',
    description: 'Global, ~110 km cell size mapping of terrestrial species. ',
    subcategories: false,
    taxa: [
      {
        value: 'all groups',
        name: 'all groups',
        layers: { rarity: 'all-taxa-rarity', richness: 'all-taxa-richness' }
      },
      {
        value: 'amphibians',
        name: 'amphibians',
        layers: { rarity: 'amphib-rarity', richness: 'amphib-rich' }
      },
      {
        value: 'birds',
        name: 'birds',
        layers: { rarity: 'birds-rarity', richness: 'birds-rich' }
      },
      {
        value: 'cacti',
        name: 'cacti',
        layers: { rarity: 'cacti-rarity', richness: 'cacti-richness' }
      },
      {
        value: 'conifers',
        name: 'conifers',
        layers: { rarity: 'conifers-rarity', richness: 'conifers-rich' }
      },
      {
        value: 'mammals',
        name: 'mammals',
        layers: { rarity: 'mammals-rare', richness: 'mammals-rich' }
      },
      {
        value: 'turtles',
        name: 'turtles',
        layers: { rarity: 'turtles-rare', richness: 'turtles-rich' }
      }
    ] 
  },
  {
    name: 'MARINE SPECIES',
    description: 'Global, ~50 km cell size mapping of marine species. ',
    subcategories: false,
    taxa: [
      {
        value: 'fishes',
        name: 'fishes',
        layers: { rarity: 'fishes-rarity', richness: 'fishes-rich' }
      }
    ]
  },
  {
    name: 'FINE SCALE DATA',
    description: 'Maps with 1km cell size for select species.',
    subcategories: [
      {
        name: 'hummingbirds',
        taxa: [
          {
            value: 'hummingbirds',
            name: 'hummingbirds',
            layers: { rarity: 'hummingbirds-rare', richness: 'hummingbirds-rich' }
          }
        ]
      },
      {
        name: 'south africa',
        taxa: [
          {
            value: 'sa_amphibians',
            name: 'amphibians',
            layers: { rarity: 'amphib-rarity-sa', richness: 'amphib-rich-sa' }
          },
          {
            value: 'sa_dragonflies',
            name: 'dragonflies',
            layers: { rarity: 'dragonflies-rare-sa', richness: 'dragonflies-rich-sa' }
          },
          {
            value: 'sa_mammals',
            name: 'mammals',
            layers: { rarity: 'mammals-rare-sa', richness: 'mammals-rich-sa' }
          },
          {
            value: 'sa_birds',
            name: 'birds',
            layers: { rarity: 'birds-rare-sa', richness: 'birds-rich-sa' }
          },
          {
            value: 'sa_restio',
            name: 'restio',
            layers: { rarity: 'restio-rare-sa', richness: 'restio-rich-sa' }
          },
          {
            value: 'sa_protea',
            name: 'protea',
            layers: { rarity: 'protea-rare-sa', richness: 'protea-rich-sa' }
          },
          {
            value: 'sa_reptiles',
            name: 'reptiles',
            layers: { rarity: 'reptiles-rare-sa', richness: 'reptiles-rich-sa' }
          },
          
        ]
      }
    ]
  }
]

export const config = {
  [LANDSCAPE_FEATURES_LABELS_LAYER]: {
    title: LANDSCAPE_FEATURES_LABELS_LAYER,
    slug: LANDSCAPE_FEATURES_LABELS_LAYER,
    type: 'FeatureLayer',
    url: LAYERS_URLS[LANDSCAPE_FEATURES_LABELS_LAYER]
  },
  [CITIES_LABELS_LAYER]: {
    title: CITIES_LABELS_LAYER,
    slug: CITIES_LABELS_LAYER,
    type: 'FeatureLayer',
    url: LAYERS_URLS[CITIES_LABELS_LAYER]
  }
}

export const layersConfig = [
  // Labels layers
  {title: 'Protected Areas', slug: 'protected_areas_vector_tile_layer', type: 'VectorTileLayer', url: 'https://tiles.arcgis.com/tiles/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA_pro_vectortile/VectorTileServer'},
  {title: 'Protected Areas', slug: 'protected_areas_vector_tile_layer', type: 'VectorTileLayer', url: 'https://tiles.arcgis.com/tiles/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA_pro_vectortile/VectorTileServer'},
  //Protected Areas Layers
  {title: 'Protected Areas', slug: 'protected_areas_vector_tile_layer', type: 'VectorTileLayer', url: 'https://tiles.arcgis.com/tiles/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA_pro_vectortile/VectorTileServer'},
  {title: 'Protected Areas', slug: 'protected_areas_feature_layer', type: 'FeatureLayer', url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA3_view/FeatureServer'},
  {title: 'Community Areas', slug: 'community_areas_vector_tile_layer', type: 'VectorTileLayer', url: 'https://tiles.arcgis.com/tiles/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA_pro_vectortile2/VectorTileServer'},
  {title: 'Community Areas', slug: 'community_areas_feature_layer', type: 'FeatureLayer', url: 'https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/WDPA3_view2/FeatureServer'},
  // Human impact layers
  {title: 'All pressures', slug: 'land_human_pressures', type: 'ImageryLayer', url: 'https://geoxc-imagery.bd.esri.com/arcgis/rest/services/MOL/Human_Impact/ImageServer'},
  // Fishing activities
  {title: "All marine fishing types", slug: 'fishing_all', url: `${bucketUrl}/${fishingTiles}/all/${templatePattern}`},
  {title: "Drifting longlines", slug: 'fishing_longlines', url: `${bucketUrl}/${fishingTiles}/drifting_longlines/${templatePattern}`},
  {title: "Fixed gear", slug: 'fishing_fixed', url: `${bucketUrl}/${fishingTiles}/fixed_gear/${templatePattern}`},
  {title: "Other", slug: 'fishing_other', url: `${bucketUrl}/${fishingTiles}/other/${templatePattern}`},
  {title: "Purse seins", slug: 'fishing_purse', url: `${bucketUrl}/${fishingTiles}/purse_seines/${templatePattern}`},
  {title: "Trawlers", slug: 'fishing_trawlers', url: `${bucketUrl}/${fishingTiles}/trawlers/${templatePattern}`},
  // South Africa 
  {title: "sa amphibians rarity", slug: 'amphib-rarity-sa', url: `${bucketUrl}/rarity_1km/amphibians/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa amphibians richness", slug: 'amphib-rich-sa', url: `${bucketUrl}/richness_1km/amphibians/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa dragonflies rarity", slug: 'dragonflies-rare-sa', url: `${bucketUrl}/rarity_1km/dragonflies/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa dragonflies richness", slug: 'dragonflies-rich-sa', url: `${bucketUrl}/richness_1km/dragonflies/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa mammals rarity", slug: 'mammals-rare-sa', url: `${bucketUrl}/rarity_1km/mammals/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa mammals richness", slug: 'mammals-rich-sa', url: `${bucketUrl}/richness_1km/mammals/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa birds rarity", slug: 'birds-rare-sa', url: `${bucketUrl}/rarity_1km/birds/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa birds richness", slug: 'birds-rich-sa', url: `${bucketUrl}/richness_1km/birds/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa restio rarity", slug: 'restio-rare-sa', url: `${bucketUrl}/rarity_1km/restio/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa restio richness", slug: 'restio-rich-sa', url: `${bucketUrl}/richness_1km/restio/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa protea rarity", slug: 'protea-rare-sa', url: `${bucketUrl}/rarity_1km/protea/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa protea richness", slug: 'protea-rich-sa', url: `${bucketUrl}/richness_1km/protea/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa reptiles rarity", slug: 'reptiles-rare-sa', url: `${bucketUrl}/rarity_1km/reptiles/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "sa reptiles richness", slug: 'reptiles-rich-sa', url: `${bucketUrl}/richness_1km/reptiles/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  // Hummigbirds
  {title: "hummingbirds rarity", slug: 'hummingbirds-rich', url: `${bucketUrl}/richness_1km/hummingbirds/${templatePattern}`, bbox: [-164,-40,-35,56]},
  {title: "hummingbirds richness", slug: 'hummingbirds-rare', url: `${bucketUrl}/rarity_1km/hummingbirds/${templatePattern}`, bbox: [-164,-40,-35,56]},
  // Global data
  {title: "mammals rarity", slug: 'mammals-rare', type:'TileLayer', url: `https://utility.arcgis.com/usrsvcs/servers/31951614b11c472f8e327971008d23b2/rest/services/mammals_rarity/MapServer`},
  {title: "mammals richness", slug: 'mammals-rich', type:'TileLayer', url: `https://utility.arcgis.com/usrsvcs/servers/11f7eef1d863487091afeade6ed6d918/rest/services/mammals_richness/MapServer`},
  {title: "fishes rarity", slug: 'fishes-rarity', url: `${bucketUrl}/rarity/fishes/${templatePattern}`},
  {title: "fishes richness", slug: 'fishes-rich', url: `${bucketUrl}/richness/fishes/${templatePattern}`},
  {title: "conifers rarity", slug: 'conifers-rarity', url: `${bucketUrl}/rarity/conifers/${templatePattern}`},
  {title: "conifers richness", slug: 'conifers-rich', url: `${bucketUrl}/richness/conifers/${templatePattern}`},
  {title: "cacti rarity", slug: 'cacti-rarity', url: `${bucketUrl}/rarity/cacti/${templatePattern}`},
  {title: "cacti richness", slug: 'cacti-richness', url: `${bucketUrl}/richness/cacti/${templatePattern}`},
  {title: "amphibians rarity", slug: 'amphib-rarity', type:'TileLayer', url: `https://utility.arcgis.com/usrsvcs/servers/ad01787b2880446c8ed7acb75735fcba/rest/services/amphibians_rarity/MapServer`},
  {title: "amphibians richness", slug: 'amphib-rich', type:'TileLayer', url: `https://utility.arcgis.com/usrsvcs/servers/58e9d41955c74788bac974a48540ed23/rest/services/amphibians_richness/MapServer`},
  {title: "turtles rarity", slug: 'turtles-rare', url: `${bucketUrl}/rarity/turtles/${templatePattern}`},
  {title: "turtles richness", slug: 'turtles-rich', url: `${bucketUrl}/richness/turtles/${templatePattern}`},
  {title: "birds rarity", slug: 'birds-rarity', type:'TileLayer', url: `https://utility.arcgis.com/usrsvcs/servers/bf99f1090e2b4bf0853046740fda247a/rest/services/birds_rarity/MapServer`},
  {title: "birds richness", slug: 'birds-rich', type:'TileLayer', url: `https://utility.arcgis.com/usrsvcs/servers/68ce2c44f8884a12b6908f2a740e87ae/rest/services/birds_richness/MapServer`},
  {title: "all groups rarity", slug: 'all-taxa-rarity', type:'TileLayer', url: `https://utility.arcgis.com/usrsvcs/servers/1ee94bc415424bde91750ce703b2d8d6/rest/services/all_rarity/MapServer`},
  {title: "all groups richness", slug: 'all-taxa-richness', type:'TileLayer', url: `https://tiles.arcgis.com/tiles/IkktFdUAcY3WrH25/arcgis/rest/services/all_richness/MapServer`}
]

export const legendConfigs = {
  // Fishing activities
  fishing_all: {
    type: "gradient",
    items: [
      {
        color: "#282052",
        value: "0"
      },
      {
        color: "#3f3576",
        value: ""
      },
      {
        color: "#52478d",
        value: ""
      },
      {
        color: "#63589f",
        value: ""
      },
      {
        color: "#826dba",
        value: ""
      },
      {
        color: "#9f82ce",
        value: ""
      },
      {
        color: "#b998dd",
        value: ""
      },
      {
        color: "#d1afe8",
        value: ""
      },
      {
        color: "#f3e0f7",
        value: "122 hours/km²"
      }
    ],
    title: "All marine fishing types"
  },
  fishing_longlines: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "8 hours/km²"
    }
    ],
    title: "Drifting longline fishing"
  },
  fishing_fixed: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "40 hours/km²"
    }
    ],
    title: "Fixed-gear fishing"
  },
  fishing_other: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "13 hours/km²"
    }
    ],
    title: "Other fishing types"
  },
  fishing_purse: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "5 hours/km²"
    }
    ],
    title: "Purse seins fishing"
  },
  fishing_trawlers: {
    type: "gradient",
    items: [
    {
    color: "#282052",
    value: "0"
    },
    {
    color: "#3f3576",
    value: ""
    },
    {
    color: "#52478d",
    value: ""
    },
    {
    color: "#63589f",
    value: ""
    },
    {
    color: "#826dba",
    value: ""
    },
    {
    color: "#9f82ce",
    value: ""
    },
    {
    color: "#b998dd",
    value: ""
    },
    {
    color: "#d1afe8",
    value: ""
    },
    {
    color: "#f3e0f7",
    value: "88 hours/km²"
    }
    ],
    title: "Fishing trawlers"
  },
  // South Africa
  'amphib-rarity-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Amphibian regional rarity"
  },
  'amphib-rich-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "25 species"
    }
    ],
    title: "Amphibian regional richness"
  },
  'dragonflies-rare-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    },
    ],
    title: "Dragonflies rarity"
  },
  'dragonflies-rich-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "3"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "68 species"
    }
    ],
    title: "Dragonflies richness"
  },
  'mammals-rare-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Mammals regional rarity"
  },
  'mammals-rich-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "49 species"
    }
    ],
    title: "Mammals regional richness"
  },
  'birds-rare-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Birds regional rarity"
  },
  'birds-rich-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "375"
    }
    ],
    title: "Birds regional richness"
  },
  'restio-rare-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Restio regional rarity"
  },
  'restio-rich-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "1"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "166 species"
    }
    ],
    title: "Restio regional richness"
  },
  'protea-rare-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "-10.9"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "-6.2"
    }
    ],
    title: "Protea regional rarity"
  },
  'protea-rich-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "68 species"
    }
    ],
    title: "Protea regional richness"
  },
  'reptiles-rare-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Reptiles regional rarity"
  },
  'reptiles-rich-sa': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "57 species"
    }
    ],
    title: "Reptiles regional richness"
  },
  // Hummingbirds
  'hummingbirds-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "1"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "92 species"
    }
    ],
    title: "Hummingbirds richness"
  },
  'hummingbirds-rare': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Hummingbirds rarity"
  },
  // Global data
  'mammals-rare': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Mammals rarity"
  },
  'mammals-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "225 species"
    }
    ],
    title: "Mammals richness"
  },
  'fishes-rarity': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Fishes rarity"
  },
  'fishes-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "3,469 species"
    }
    ],
    title: "Fishes richness"
  },
  'conifers-rarity': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Conifers rarity"
  },
  'conifers-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "49 species"
    }
    ],
    title: "Conifers richness"
  },
  'cacti-rarity': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Cacti rarity"
  },
  'cacti-richness': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "93 species"
    }
    ],
    title: "Cacti richness"
  },
  'amphib-rarity': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Amphibian rarity"
  },
  'amphib-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "180 species"
    }
    ],
    title: "Amphibian richness"
  },
  'turtles-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "22 species"
    }
    ],
    title: "Turtle richness"
  },
  'turtles-rare': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Turtle rarity"
  },
  'birds-rarity': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "Birds rarity"
  },
  'birds-rich': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "0"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "1,010 species"
    }
    ],
    title: "Birds richness"
  },
  'all-taxa-rarity': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "low"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "high"
    }
    ],
    title: "All groups rarity"
  },
  'all-taxa-richness': {
    type: "gradient",
    items: [
    {
    color: "#0664f6",
    value: "1"
    },
    {
    color: "#0572d6",
    value: ""
    },
    {
    color: "#0380b5",
    value: ""
    },
    {
    color: "#028e95",
    value: ""
    },
    {
    color: "#009c74",
    value: ""
    },
    {
    color: "#3fae57",
    value: ""
    },
    {
    color: "#7fc03a",
    value: ""
    },
    {
    color: "#bed11d",
    value: ""
    },
    {
    color: "#fde300",
    value: "3,469 species"
    }
    ],
    title: "All groups richness"
  }
}