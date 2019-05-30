const bucketUrl = "https://storage.googleapis.com/cdn.mol.org/half-earth/tiles/phase2";
const templatePattern = "{level}/{col}/{row}";
const fishingTiles = "fishing-hours/gfw_purple";

export const layersConfig = [
  // Fishing activities
  {title: "All marine fishing types", slug: 'fishing_all', url: `${bucketUrl}/${fishingTiles}/all/${templatePattern}`},
  {title: "Drifting longlines", slug: 'fishing_longlines', url: `${bucketUrl}/${fishingTiles}/drifting_longlines/${templatePattern}`},
  {title: "Fixed gear", slug: 'fishing-fixed', url: `${bucketUrl}/${fishingTiles}/fixed_gear/${templatePattern}`},
  {title: "Other", slug: 'fishing-other', url: `${bucketUrl}/${fishingTiles}/other/${templatePattern}`},
  {title: "Purse seins", slug: 'fishing-purse', url: `${bucketUrl}/${fishingTiles}/purse_seines/${templatePattern}`},
  {title: "Trawlers", slug: 'fishing-trawlers', url: `${bucketUrl}/${fishingTiles}/trawlers/${templatePattern}`},
  // South Africa 
  {title: "Amphibians rarity", slug: 'amphibians-rarity-sa', url: `${bucketUrl}/rarity_1km/amphibians/${templatePattern}`},
  {title: "Amphibians richness", slug: 'amphibians-richness-sa', url: `${bucketUrl}/richness_1km/amphibians/${templatePattern}`},
  {title: "dragonflies rarity", slug: 'dragonflies-rarity-sa', url: `${bucketUrl}/rarity_1km/dragonflies/${templatePattern}`},
  {title: "dragonflies richness", slug: 'dragonflies-richness-sa', url: `${bucketUrl}/richness_1km/dragonflies/${templatePattern}`},
  {title: "mammals rarity", slug: 'mammals-rarity-sa', url: `${bucketUrl}/rarity_1km/mammals/${templatePattern}`},
  {title: "mammals richness", slug: 'mammals-richness-sa', url: `${bucketUrl}/richness_1km/mammals/${templatePattern}`},
  {title: "birds rarity", slug: 'birds-rarity-sa', url: `${bucketUrl}/rarity_1km/birds/${templatePattern}`},
  {title: "birds richness", slug: 'birds-richness-sa', url: `${bucketUrl}/richness_1km/birds/${templatePattern}`},
  {title: "restio rarity", slug: 'restio-rarity-sa', url: `${bucketUrl}/rarity_1km/restio/${templatePattern}`},
  {title: "restio richness", slug: 'restio-richness-sa', url: `${bucketUrl}/richness_1km/restio/${templatePattern}`},
  {title: "protea rarity", slug: 'protea-rarity-sa', url: `${bucketUrl}/rarity_1km/protea/${templatePattern}`},
  {title: "protea richness", slug: 'protea-richness-sa', url: `${bucketUrl}/richness_1km/protea/${templatePattern}`},
  {title: "reptiles rarity", slug: 'reptiles-rarity-sa', url: `${bucketUrl}/rarity_1km/reptiles/${templatePattern}`},
  {title: "reptiles richness", slug: 'reptiles-richness-sa', url: `${bucketUrl}/richness_1km/reptiles/${templatePattern}`},
  // 
]

export const legendConfigs = {
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
}