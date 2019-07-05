import { createSelector, createStructuredSelector } from 'reselect';
import { getActiveLayers, getRasters } from 'pages/data-globe/data-globe-selectors';
import { BIODIVERSITY_FACETS_LAYER } from 'constants/biodiversity';
import { FIREFLY_LAYER, FEATURES_LABELS_LAYER, GRID_LAYER } from 'constants/base-layers';
import { legendConfigs } from 'constants/mol-layers-configs';
import { legendConfigs as humanPressureLegendConfigs, legendSingleRasterTitles } from 'constants/human-pressures';
import { legendConfigs as WDPALegendConfigs } from 'constants/protected-areas';

const legendFreeLayers = [FIREFLY_LAYER, BIODIVERSITY_FACETS_LAYER, FEATURES_LABELS_LAYER, GRID_LAYER];
const isLegendFreeLayer = layerId => legendFreeLayers.some( l => l === layerId);

const getVisibleLayers = createSelector(getActiveLayers, activeLayers => {
  if (!activeLayers.length) return null;

  return activeLayers.filter(layer => !isLegendFreeLayer(layer.id));
})

const getHumanPressuresDynamicTitle = createSelector(getRasters, rasters => {
  if (!Object.values(rasters).length) return null;

  const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
  const titles = activeRasters.map(activeRaster => legendSingleRasterTitles[activeRaster]);

  if (titles.length === 3) return 'All pressures';

  const isOnlyAgricultureRasters = titles.every(title => title.toLowerCase().endsWith('agriculture'));
  if (isOnlyAgricultureRasters) return joinAgricultureTitles(titles);

  return titles.join(' AND ');
})

const getLegendConfigs = createSelector(
  [getVisibleLayers, getHumanPressuresDynamicTitle],
  (visibleLayers, humanPressuresDynamicTitle) => {
  if (!visibleLayers.length) return null;

  const configs = visibleLayers.map(layer => {
    if(legendConfigs[layer.id]) return { ...legendConfigs[layer.id], molLogo: true, layerId: layer.id, opacity: layer.opacity }
    if(humanPressureLegendConfigs[layer.id]) return { ...humanPressureLegendConfigs[layer.id], title: humanPressuresDynamicTitle, layerId: layer.id, opacity: layer.opacity }
    if(WDPALegendConfigs[layer.id]) return { ...WDPALegendConfigs[layer.id], layerId: layer.id, opacity: layer.opacity }
  })

  const parsed = configs.map(config => parseLegend(config));
  return parsed;
})

const parseLegend = (config) => {
  return {
    dataset: config.layerId,
    visibility: true,
    name: config && config.title,
    molLogo: config && config.molLogo,
    layers: [{
      active: true,
      opacity: config.opacity !== undefined ? config.opacity : 1,
      id: config.layerId,
      type: 'layer',
      legendConfig: {
        ...config
      }
    }]
  };
}

const joinAgricultureTitles = (titles) => {
  const trimmedTitles = titles.map(title => title.split(" ")[0]);
  return `${trimmedTitles.join(' AND ')} agriculture`;
}

export default createStructuredSelector({
  visibleLayers: getVisibleLayers,
  datasets: getLegendConfigs
});