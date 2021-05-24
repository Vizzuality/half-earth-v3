import { createSelector, createStructuredSelector } from 'reselect';
import { uniqBy } from 'lodash';
import { getConfig } from 'utils/user-config-utils';
import { LEGEND_FREE_LAYERS, LAND_HUMAN_PRESURES_LAYERS, MARINE_HUMAN_PRESURES_LAYERS, COMMUNITY_PROTECTED_AREAS_LAYER_GROUP } from 'constants/layers-groups';
import { PLEDGES_LAYER, MARINE_AND_LAND_HUMAN_PRESSURES, COMMUNITY_AREAS_VECTOR_TILE_LAYER } from 'constants/layers-slugs';
import { DEFAULT_OPACITY } from 'constants/layers-config';
import { legendConfigs } from 'constants/biodiversity-layers-constants';
import { legendConfigs as humanPressureLegendConfigs, legendSingleRasterTitles } from 'constants/human-pressures';
import { legendConfigs as WDPALegendConfigs } from 'constants/protected-areas';
import { LEGEND_TUTORIAL, LEGEND_DRAG_TUTORIAL } from 'constants/tutorial';

const isLegendFreeLayer = layerId => LEGEND_FREE_LAYERS.some( l => l === layerId);
const isHumanPressureLayer = layerId => [...LAND_HUMAN_PRESURES_LAYERS, ...MARINE_HUMAN_PRESURES_LAYERS].some( l => l === layerId);
const isCommunityLayer = layerId => COMMUNITY_PROTECTED_AREAS_LAYER_GROUP.some( l => l === layerId);

const getActiveLayers = (state, props) => props.activeLayers;

const getVisibleLayers = createSelector(getActiveLayers, activeLayers => {
  if (!activeLayers.length) return null;
  return activeLayers.filter(layer => !isLegendFreeLayer(layer.title));
})

const getHumanPressuresDynamicTitle = createSelector(getVisibleLayers, visibleLayers => {
  if (!visibleLayers.length) return null;
  const humanPresuresLayers = visibleLayers.filter(layer => isHumanPressureLayer(layer.title));
  const titles = humanPresuresLayers.map(layer => legendSingleRasterTitles[layer.title]);
  if (titles.length === 5) return 'All pressures';
  if (titles.length > 2) return `human pressures (${titles.length})`; 
  const hasAgricultureRasters = titles.some(title => title.toLowerCase().endsWith('agriculture'));
  if (hasAgricultureRasters) return joinAgricultureTitles(titles);

  return titles.join(' and ');
})

const getLegendConfigs = createSelector(
  [getVisibleLayers, getHumanPressuresDynamicTitle],
  (visibleLayers, humanPressuresDynamicTitle) => {
  if (!visibleLayers.length) return null;
  const layersAfterNormalization = mergeCommunityIntoOne(mergeHumanPressuresIntoOne(visibleLayers));
    const configs = layersAfterNormalization.map(layer => {
    const sharedConfig = { layerId: layer.title, opacity: layer.opacity };
    if(legendConfigs[layer.title]) return { ...sharedConfig, ...legendConfigs[layer.title], molLogo: true }
    if(humanPressureLegendConfigs[layer.title]) return { ...sharedConfig, ...humanPressureLegendConfigs[layer.title], title: humanPressuresDynamicTitle }
    if(WDPALegendConfigs[layer.title]) return { ...sharedConfig, ...WDPALegendConfigs[layer.title] }
    if(layer.title === PLEDGES_LAYER) return { ...sharedConfig, title: 'Signed Pledges' }
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
  const nonAgricultureTitles = titles.filter(title => !title.toLowerCase().endsWith('agriculture'))
  const agricultureTitles = titles.filter(title => title.toLowerCase().endsWith('agriculture'));
  const trimmedTitles = agricultureTitles.map(title => title.split(" ")[0]);
  const formattedAgricultureTitles = `${trimmedTitles.join(' and ')} agriculture`;
  const formattedNonAgricultureTitles = `${nonAgricultureTitles.join(', ')}`;
  
  if(!formattedNonAgricultureTitles) return formattedAgricultureTitles;
  return `${[formattedNonAgricultureTitles, formattedAgricultureTitles].join(', ')}`;
}

const setGroupedLayersOpacity = (layers, defaultOpacity) => {
  return layers.reduce((acc, l) => (l.opacity !== defaultOpacity ? l.opacity : acc), defaultOpacity);
}

const mergeHumanPressuresIntoOne = layers => {
  const humanPressuresLayers = layers.filter(layer => isHumanPressureLayer(layer.title));
  if (!humanPressuresLayers.length) {
    return layers;
  } else {
    const opacity = setGroupedLayersOpacity(humanPressuresLayers, DEFAULT_OPACITY);
    const normalizedLayers = layers.map(layer => isHumanPressureLayer(layer.title) ? { title: MARINE_AND_LAND_HUMAN_PRESSURES, opacity }: layer);
    const uniqNormalizedLayers = uniqBy(normalizedLayers, 'title');
    return uniqNormalizedLayers;
  }
}

const mergeCommunityIntoOne = layers => {
  const communityLayers = layers.filter(layer => isCommunityLayer(layer.title));
  if (!communityLayers.length) {
    return layers;
  } else {
    const opacity = setGroupedLayersOpacity(communityLayers, DEFAULT_OPACITY);
    const normalizedLayers = layers.map(layer => isCommunityLayer(layer.title) ? { title: COMMUNITY_AREAS_VECTOR_TILE_LAYER, opacity }: layer);
    const uniqNormalizedLayers = uniqBy(normalizedLayers, 'title');
    return uniqNormalizedLayers;
  }
}

const getActiveTutorialData = createSelector(
  [getLegendConfigs],
  (datasets) => {
    const userConfig = getConfig();

    const enableLegendTutorial = userConfig[LEGEND_TUTORIAL] && datasets && datasets.length > 1;
    const enableLegendDragTutorial = userConfig[LEGEND_DRAG_TUTORIAL] && datasets && datasets.length > 2;

    const enabledTutorialIDs = [];

    if (enableLegendTutorial) enabledTutorialIDs.push(LEGEND_TUTORIAL);
    if (enableLegendDragTutorial) enabledTutorialIDs.push(LEGEND_DRAG_TUTORIAL);

    return {
      id: enabledTutorialIDs.join(','),
      showTutorial: enabledTutorialIDs.length > 0
    }
  }
);

export default createStructuredSelector({
  visibleLayers: getVisibleLayers,
  datasets: getLegendConfigs,
  tutorialData: getActiveTutorialData
});
