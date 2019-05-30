import sortBy from 'lodash/sortBy';

function parseLayer(layer) {
  return {
    ...layer,
    // necessary by the layer manager
    id: layer.slug,
    active: false,
    visibility: true,
    opacity: 1
  };
}

export function parseCartoLayersToWRI(layers = [], datasets = []) {
  return layers.reduce(
    (acc, layer) => {
      const parsedLayer = parseLayer(layer);
      if (!parsedLayer) return acc;

      // Filtering layers without url
      if (parsedLayer.layerConfig.body && !parsedLayer.layerConfig.body.url) return acc;

      const { dataset: layerDataset } = parsedLayer;
      const dataset = datasets.find(d => d.slug === layerDataset);
      if (!dataset) return acc;

      const newDataset = !acc[layerDataset]
        ? { ...dataset, dataset: dataset.slug, layers: [ parsedLayer ] }
        : { ...acc[layerDataset], layers: [ ...acc[layerDataset].layers, parsedLayer ] };
      newDataset.layers = sortBy(newDataset.layers, 'name');
      return { ...acc, [layerDataset]: newDataset };
    },
    {}
  );
}

export function getLayersActiveMerged(newLayers = [], activeLayers = []) {
  const layersToAdd = newLayers
    .filter(l => l.active)
    .map(l => ({
      slug: l.slug,
      opacity: l.opacity || 1,
      landscapeOpacity: l.landscapeOpacity || null,
      layerCategory: l.layerCategory || null
    }));
  const layersToRemove = newLayers
    .filter(l => !l.active)
    .map(l => l.slug);
  return activeLayers.filter(layer => !layersToRemove.includes(layer.slug)).concat(layersToAdd);
}
