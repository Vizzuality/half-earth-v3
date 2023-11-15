import { loadModules } from 'esri-loader';

import intersection from 'lodash/intersection';

import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';
import {
  DEFAULT_OPACITY,
  LAYERS_CATEGORIES,
  layersConfig,
} from 'constants/mol-layers-configs';
// LEGAGY

// Toggles all the layers passed as ids on the first parameter
// Categories can be a string if its a common category or an object if its individual
export const batchToggleLayers = (
  layerIdsToToggle,
  activeLayers,
  callback,
  categories
) => {
  const activeLayersIds = activeLayers ? activeLayers.map((l) => l.title) : [];
  const layersToRemove =
    activeLayers && intersection(layerIdsToToggle, activeLayersIds);
  const layersToAdd = layerIdsToToggle.filter(
    (l) => !layersToRemove.includes(l)
  );
  let updatedLayers = activeLayers;
  if (layersToRemove.length) {
    updatedLayers = activeLayers.filter((layer) => {
      const hasToBeRemoved = layersToRemove.includes(layer.title);
      return !hasToBeRemoved;
    });
  }
  if (layersToAdd.length) {
    const updatedLayersToAdd = layersToAdd.map((title) => {
      const category =
        !categories || typeof categories === 'string'
          ? categories
          : categories[title];
      return { title, category, opacity: DEFAULT_OPACITY };
    });
    updatedLayers = updatedLayers.concat(updatedLayersToAdd);
  }
  callback({ activeLayers: updatedLayers });
};

export const layerManagerToggle = (
  layerTitle,
  activeLayers,
  callback,
  category
) => {
  const title = layerTitle;
  const isActive = activeLayers && activeLayers.some((l) => l.title === title);
  if (isActive) {
    const updatedLayers = activeLayers.filter((l) => l.title !== title);
    callback({ activeLayers: updatedLayers });
  } else if (category === LAYERS_CATEGORIES.LAND_PRESSURES) {
    const groupLayer = activeLayers.find(
      (l) => l.category === LAYERS_CATEGORIES.LAND_PRESSURES
    );
    const groupOpacity = groupLayer && groupLayer.opacity;
    if (activeLayers) {
      callback({
        activeLayers: [
          { title, category, opacity: groupOpacity || DEFAULT_OPACITY },
        ].concat(activeLayers),
      });
    } else {
      callback({
        activeLayers: [
          { title, category, opacity: groupOpacity || DEFAULT_OPACITY },
        ],
      });
    }
  } else if (activeLayers) {
    callback({
      activeLayers: [{ title, category, opacity: DEFAULT_OPACITY }].concat(
        activeLayers
      ),
    });
  } else {
    callback({
      activeLayers: [{ title, category, opacity: DEFAULT_OPACITY }],
    });
  }
};

export const addLayerToActiveLayers = ({
  slug,
  activeLayers,
  callback,
  category,
  opacity,
}) => {
  const newActiveLayer = [
    { title: slug, opacity: opacity || DEFAULT_OPACITY, category },
  ];
  callback({
    activeLayers: activeLayers
      ? newActiveLayer.concat(activeLayers)
      : newActiveLayer,
  });
};

export const replaceLayerFromActiveLayers = (
  slugToRemove,
  slugToAdd,
  activeLayers,
  callback,
  category
) => {
  const filteredLayers = activeLayers.filter(
    (layer) => layer.title !== slugToRemove
  );
  return callback({
    activeLayers: [
      { title: slugToAdd, category, opacity: DEFAULT_OPACITY },
      ...filteredLayers,
    ],
  });
};
export const layerManagerVisibility = (
  layerTitle,
  visible,
  activeLayers,
  callback
) => {
  const title = layerTitle;
  const isActive = activeLayers && activeLayers.some((l) => l.title === title);
  if (isActive && visible) return;
  if (isActive && !visible) {
    const updatedLayers = activeLayers.filter((l) => l.title !== title);
    callback({ activeLayers: updatedLayers });
  } else if (activeLayers) {
    callback({
      activeLayers: [{ title, opacity: DEFAULT_OPACITY }].concat(activeLayers),
    });
  } else {
    callback({ activeLayers: [{ title, opacity: DEFAULT_OPACITY }] });
  }
};

export const batchSetLayerManagerOpacity = (
  layerNamesArray,
  opacity,
  activeLayers,
  callback
) => {
  const setOpacity = (layer) =>
    layerNamesArray.includes(layer.title) ? { ...layer, opacity } : layer;
  callback({ activeLayers: [...activeLayers.map(setOpacity)] });
};

export const layerManagerOpacity = (
  layerTitle,
  opacity,
  activeLayers,
  callback
) => {
  const setOpacity = (layer) =>
    layer.title === layerTitle ? { ...layer, opacity } : layer;
  callback({ activeLayers: [...activeLayers.map(setOpacity)] });
};

export const layerManagerOrder = (legendLayers, activeLayers, callback) => {
  const updatedLayers = activeLayers.filter(({ title }) =>
    LEGEND_FREE_LAYERS.some((layer) => layer === title)
  );
  legendLayers.forEach((d) => {
    updatedLayers.push(activeLayers.find(({ title }) => d === title));
  });
  callback({ activeLayers: updatedLayers });
};
export const findLayerInMap = (layerTitle, map) =>
  map.layers.items.find((l) => l.title === layerTitle);

export const bringLayerToFront = (layerTitle, map) => {
  const layer = findLayerInMap(layerTitle, map);
  map.reorder(layer, map.layers.items.length + 1);
};

export const bringLayerToBack = (layerTitle, map) => {
  const layer = findLayerInMap(layerTitle, map);
  map.reorder(layer, 0);
};

export const createLayer = (layerConfig) => {
  const { url, slug, type, opacity, renderer } = layerConfig;
  const layerType = type || 'WebTileLayer';

  return loadModules([`esri/layers/${layerType}`]).then(([Layer]) => {
    const newLayer = new Layer({
      url,
      urlTemplate: url,
      title: slug,
      id: slug,
      outFields: ['*'],
      opacity: opacity || DEFAULT_OPACITY,
    });

    if (renderer) {
      newLayer.renderer = renderer;
    }

    return newLayer;
  });
};
export const addLayerToMap = (mapLayer, map) =>
  new Promise((resolve) => {
    map.add(mapLayer);
    resolve(mapLayer);
  });
export const isLayerInMap = (layerConfig, map) =>
  map.layers.items.some((l) => l.title === layerConfig.slug);

const createAndAddLayer = async (layerConfig, map) => {
  const isUrlArray = Array.isArray(layerConfig.url);

  if (isUrlArray) {
    const promises = layerConfig.url.map((url) =>
      createLayer({ ...layerConfig, url }, map)
    );
    const newLayers = await Promise.all(promises);
    newLayers.forEach((newLayer) => {
      addLayerToMap(newLayer, map);
    });
  } else {
    const newLayer = await createLayer(layerConfig, map);
    addLayerToMap(newLayer, map);
  }
};

export const activateLayersOnLoad = (map, activeLayers, config) => {
  const activeLayerIDs = activeLayers.map(({ title }) => title);
  activeLayerIDs.forEach(async (layerName) => {
    const layerConfig = config[layerName];
    if (layerConfig) {
      createAndAddLayer(layerConfig, map);
    }
  });
};

const handleLayerCreation = async (layerConfig, map) => {
  if (layerConfig && !isLayerInMap(layerConfig, map)) {
    createAndAddLayer(layerConfig, map);
  }
};

export const addActiveLayersToScene = (activeLayers, _layersConfig, map) => {
  if (activeLayers && activeLayers.length) {
    activeLayers.forEach((layer) => {
      const layerConfig = _layersConfig[layer.title];
      handleLayerCreation(layerConfig, map);
    });
  }
};

export const setBasemap = async ({
  map,
  surfaceColor,
  layersArray,
  landcoverBasemap,
}) => {
  map.ground.surfaceColor = surfaceColor || '#0A212E'; // set surface color, before basemap is loaded
  const baseLayers = await Promise.all(
    layersArray.map(async (layer) => createLayer(layersConfig[layer]))
  );

  loadModules(['esri/Basemap']).then(([Basemap]) => {
    const basemap = new Basemap({
      baseLayers,
      title: 'half-earth-basemap',
      id: 'half-earth-basemap',
      ...(landcoverBasemap && {
        portalItem: {
          id: 'aa5922ee948b41e0af7544e21682abcb',
        },
      }),
    });
    map.basemap = basemap;
  });
};

export const getActiveLayersFromLayerGroup = (layerGroup, activeLayers) =>
  intersection(
    activeLayers.map((l) => l.title),
    layerGroup
  );

export const flyToLayerExtent = (bbox, view) => {
  loadModules(['esri/geometry/Extent']).then(([Extent]) => {
    const [xmin, ymin, xmax, ymax] = bbox;
    const target = new Extent({
      xmin,
      xmax,
      ymin,
      ymax,
    });
    view.goTo({ target }).catch((error) => {
      // Avoid displaying console errors when transition is aborted by user interacions
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    });
  });
};
