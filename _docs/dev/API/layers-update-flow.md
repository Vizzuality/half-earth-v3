---
layout: default
title: Add/update layers
parent: Working with layers
grand_parent: Developers 👩🏽‍💻
nav_order: 1
permalink: /_docs/dev/layers/add-update
---

# Layers update flow.

Adding layers to the project is just a matter of following some steps to create the proper entry in the `layersConfig` object. This config will be consumed by the code that will take care of creating and adding the layers to the globe (that is the `createLayer` and `addLayerToMap` functions on `utils/layer-manager-utils`).
In order to add a layer to the config we need to create some `constants` that will build up the needed data structure.
Lets explain the steps with an example on how we would add a layer with fishes priority data 🐟 🐠

- Create a new layer slug on the `constants/layers-slugs` for the layer to be added. This `slug` needs to be shared with the science team people of the project in order to add layer metadata to the metadata service.

    ```js
    export const FISHES_PRIORITY = 'fishes-priority';
    ```
- `import` the newly created slugs into `constants/layers-urls` and asign it the url string (inside the `LAYERS_URLS` object) from the ArcGIS online service.
    ```js
    import {
      FISHES_PRIORITY
    } from 'constants/layers-slugs';

    export const LAYERS_URLS = {
      [FISHES_PRIORITY]: 'https://tiles.arcgis.com/tiles/arcgis/rest/services/Global_marine_fish_prioritisation_TL/MapServer'
    }
    ```
- First of all we need to know if the type of layer we want to add is already present on the `LAYER_TYPES` constant on the `constants/mol-layers-config` file.
Find [in this link](https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-Layer.html){:target="_blank"} the list of the available layer types on the ArcGIS js API.
These are the layer types we are currently using in the platform:
    ```js
    const LAYER_TYPES = {
      FEATURE_LAYER: 'FeatureLayer',
      TILE_LAYER: 'TileLayer',
      VECTOR_TILE_LAYER: 'VectorTileLayer'
    }
    ```
- Now we are ready to add the layer to the `layerConfig` on `constants/mol-layers-config`. We first need to `import` the layer slug and layers urls to then create the entry for the layer on the config object.
    ```js
    import {
      FISHES_PRIORITY
    } from 'constants/layers-slugs';

    export const layersConfig = {
      [FISHES_PRIORITY]: {
        title: FISHES_PRIORITY,
        slug: FISHES_PRIORITY,
        type: LAYER_TYPES.TILE_LAYER,
        url: LAYERS_URLS[FISHES_PRIORITY],
        bbox: null
      }
    }
    ```
- Note that there's a `bbox` (bounding box) key on the layer object. This field serves to tell the app that this layer is restricted to a certain area of the globe. By providing a set of coordinates to this `bbox` whenever the layer is added to the map the camera will _travel_ to the specified location. Serve as an example the _hummingbirds rarity_ layer config , restricted to the Americas:
    ```js
    [HUMMINGBIRDS_RARITY]: {
      title: HUMMINGBIRDS_RARITY,
      slug: HUMMINGBIRDS_RARITY,
      type: LAYER_TYPES.TILE_LAYER,
      url: LAYERS_URLS[HUMMINGBIRDS_RARITY],
      bbox: [-164,-40,-35,56]
    }
    ```
- Add the metadata slug (usually the same layer slug) to the `constants/metadata.js` file
´´´js
  ...
  [RESIDENT_BIRDS_RICHNESS_1KM]: {
    slug: RESIDENT_BIRDS_RICHNESS_1KM,
  },
  ...
```

- If the layers are going to show on the map layers tab be sure to add a count of the layers on the respective section E.g. `getLayersToggleConfig` on `biodiversity-layers-constants` > `getBiodiversityCountedActiveLayer` on `biodiversity-sidebar-card-selectors`

And also add them to the main list on `category-layer-constants`