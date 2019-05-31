const bucketUrl = "https://storage.googleapis.com/cdn.mol.org/half-earth/tiles/phase2";
const templatePattern = "{level}/{col}/{row}";
const fishingTiles = "fishing-hours/gfw_purple";

export const layersConfig = [
  // Fishing activities
  {title: "All marine fishing types", slug: 'fishing_all', url: `${bucketUrl}/${fishingTiles}/all/${templatePattern}`},
  {title: "Drifting longlines", slug: 'fishing_longlines', url: `${bucketUrl}/${fishingTiles}/drifting_longlines/${templatePattern}`},
  {title: "Fixed gear", slug: 'fishing_fixed', url: `${bucketUrl}/${fishingTiles}/fixed_gear/${templatePattern}`},
  {title: "Other", slug: 'fishing_other', url: `${bucketUrl}/${fishingTiles}/other/${templatePattern}`},
  {title: "Purse seins", slug: 'fishing_purse', url: `${bucketUrl}/${fishingTiles}/purse_seines/${templatePattern}`},
  {title: "Trawlers", slug: 'fishing_trawlers', url: `${bucketUrl}/${fishingTiles}/trawlers/${templatePattern}`},
  // South Africa 
  {title: "Amphibians rarity", slug: 'amphibians_rarity_sa', url: `${bucketUrl}/rarity_1km/amphibians/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "Amphibians richness", slug: 'amphibians_richness_sa', url: `${bucketUrl}/richness_1km/amphibians/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "dragonflies rarity", slug: 'dragonflies_rarity_sa', url: `${bucketUrl}/rarity_1km/dragonflies/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "dragonflies richness", slug: 'dragonflies_richness_sa', url: `${bucketUrl}/richness_1km/dragonflies/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "mammals rarity", slug: 'mammals_rarity_sa', url: `${bucketUrl}/rarity_1km/mammals/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "mammals richness", slug: 'mammals_richness_sa', url: `${bucketUrl}/richness_1km/mammals/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "birds rarity", slug: 'birds_rarity_sa', url: `${bucketUrl}/rarity_1km/birds/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "birds richness", slug: 'birds_richness_sa', url: `${bucketUrl}/richness_1km/birds/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "restio rarity", slug: 'restio_rarity_sa', url: `${bucketUrl}/rarity_1km/restio/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "restio richness", slug: 'restio_richness_sa', url: `${bucketUrl}/richness_1km/restio/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "protea rarity", slug: 'protea_rarity_sa', url: `${bucketUrl}/rarity_1km/protea/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "protea richness", slug: 'protea_richness_sa', url: `${bucketUrl}/richness_1km/protea/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "reptiles rarity", slug: 'reptiles_rarity_sa', url: `${bucketUrl}/rarity_1km/reptiles/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  {title: "reptiles richness", slug: 'reptiles_richness_sa', url: `${bucketUrl}/richness_1km/reptiles/${templatePattern}`, bbox: [13,-37,34,-27.7]},
  // Hummigbirds
  {title: "Hummigbirds rarity", slug: 'hummingbirds_richness', url: `${bucketUrl}/richness_1km/hummingbirds/${templatePattern}`, bbox: [-164,-40,-35,56]},
  {title: "Hummigbirds richness", slug: 'hummingbirds_rarity', url: `${bucketUrl}/rarity_1km/hummingbirds/${templatePattern}`, bbox: [-164,-40,-35,56]},
  // Global data
  {title: "mammals rarity", slug: 'mammals_rarity', url: `${bucketUrl}/rarity/mammals/${templatePattern}`},
  {title: "mammals richness", slug: 'mammals_richness', url: `${bucketUrl}/richness/mammals/${templatePattern}`},
  {title: "fishes rarity", slug: 'fishes_rarity', url: `${bucketUrl}/rarity/fishes/${templatePattern}`},
  {title: "fishes richness", slug: 'fishes_richness', url: `${bucketUrl}/richness/fishes/${templatePattern}`},
  {title: "conifers rarity", slug: 'conifers_rarity', url: `${bucketUrl}/rarity/conifers/${templatePattern}`},
  {title: "conifers richness", slug: 'conifers_richness', url: `${bucketUrl}/richness/conifers/${templatePattern}`},
  {title: "cacti rarity", slug: 'cacti_rarity', url: `${bucketUrl}/rarity/cacti/${templatePattern}`},
  {title: "cacti richness", slug: 'cacti_richness', url: `${bucketUrl}/richness/cacti/${templatePattern}`},
  {title: "amphibians rarity", slug: 'amphibians_rarity', url: `${bucketUrl}/rarity/amphibians/${templatePattern}`},
  {title: "amphibians richness", slug: 'amphibians_richness', url: `${bucketUrl}/richness/amphibians/${templatePattern}`},
  {title: "turtles rarity", slug: 'turtles_rarity', url: `${bucketUrl}/rarity/turtles/${templatePattern}`},
  {title: "turtles richness", slug: 'turtles_richness', url: `${bucketUrl}/richness/turtles/${templatePattern}`},
  {title: "birds rarity", slug: 'birds_rarity', url: `${bucketUrl}/rarity/birds/${templatePattern}`},
  {title: "birds richness", slug: 'birds_richness', url: `${bucketUrl}/richness/birds/${templatePattern}`},
  {title: "All groups rarity", slug: 'all_taxa_rarity', url: `${bucketUrl}/rarity/all/${templatePattern}`},
  {title: "All groups richness", slug: 'all_taxa_richness', url: `${bucketUrl}/richness/all/${templatePattern}`}
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
  amphibians_rarity_sa: {
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
  amphibians_richness_sa: {
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
  dragonflies_rarity_sa: {
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
    ]
  },
  dragonflies_richness_sa: {
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
    ]
  },
  mammals_rarity_sa: {
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
  mammals_richness_sa: {
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
  birds_rarity_sa: {
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
  birds_richness_sa: {
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
  restio_rarity_sa: {
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
  restio_richness_sa: {
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
  protea_rarity_sa: {
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
  protea_richness_sa: {
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
  reptiles_rarity_sa: {
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
  reptiles_richness_sa: {
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
  hummingbirds_richness: {
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
  hummingbirds_rarity: {
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
  mammals_rarity: {
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
  mammals_richness: {
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
  fishes_rarity: {
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
  fishes_richness: {
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
  conifers_rarity: {
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
  conifers_richness: {
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
  cacti_rarity: {
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
  cacti_richness: {
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
  amphibians_rarity: {
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
  amphibians_richness: {
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
  turtles_richness: {
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
  turtles_rarity: {
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
  birds_rarity: {
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
  birds_richness: {
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
  all_taxa_rarity: {
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
  all_taxa_richness: {
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