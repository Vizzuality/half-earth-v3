import { createSelector, createStructuredSelector } from 'reselect';
import { getActiveLayers, getRasters } from 'pages/data-globe/data-globe-selectors';
import { LEGEND_FREE_LAYERS } from 'constants/layers-groups';
import { legendConfigs } from 'constants/mol-layers-configs';
import { legendConfigs as humanPressureLegendConfigs, legendSingleRasterTitles } from 'constants/human-pressures';
import { legendConfigs as WDPALegendConfigs } from 'constants/protected-areas';

const isLegendFreeLayer = layerId => LEGEND_FREE_LAYERS.some( l => l === layerId);

const getVisibleLayers = createSelector(getActiveLayers, activeLayers => {
  if (!activeLayers.length) return null;
  return activeLayers.filter(layer => !isLegendFreeLayer(layer.title));
})

const getHumanPressuresDynamicTitle = createSelector(getRasters, rasters => {
  if (!Object.values(rasters).length) return null;

  const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
  const titles = activeRasters.map(activeRaster => legendSingleRasterTitles[activeRaster]);

  if (titles.length === 3) return 'All pressures';

  const isOnlyAgricultureRasters = titles.every(title => title.toLowerCase().endsWith('agriculture'));
  if (isOnlyAgricultureRasters) return joinAgricultureTitles(titles);

  return titles.join(' and ');
})

const getLegendConfigs = createSelector(
  [getVisibleLayers, getHumanPressuresDynamicTitle],
  (visibleLayers, humanPressuresDynamicTitle) => {
  if (!visibleLayers.length) return null;

  const configs = visibleLayers.map(layer => {
    const sharedConfig = { layerId: layer.title, opacity: layer.opacity };
    if(legendConfigs[layer.title]) return { ...sharedConfig, ...legendConfigs[layer.title], molLogo: true }
    if(humanPressureLegendConfigs[layer.title]) return { ...sharedConfig, ...humanPressureLegendConfigs[layer.title], title: humanPressuresDynamicTitle }
    if(WDPALegendConfigs[layer.title]) return { ...sharedConfig, ...WDPALegendConfigs[layer.title] }
    return sharedConfig;
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
      title: config.layerId,
      type: 'layer',
      legendConfig: {
        ...config
      }
    }]
  };
}

const joinAgricultureTitles = (titles) => {
  const trimmedTitles = titles.map(title => title.split(" ")[0]);
  return `${trimmedTitles.join(' and ')} agriculture`;
}

export default createStructuredSelector({
  visibleLayers: getVisibleLayers,
  datasets: getLegendConfigs
});