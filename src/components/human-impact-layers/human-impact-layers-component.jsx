import React from 'react';
import PropTypes from 'prop-types';
import { loadModules } from '@esri/react-arcgis';

import MultipleActiveLayers from 'components/multiple-active-layers';

import { humanPressuresLandUse } from 'constants/human-pressures';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { VIEW_MODE } from  'constants/google-analytics-constants';

const HumanImpactLayers = ({ map, rasters, setRasters, setLayerVisibility, activeLayers, addLayerAnalyticsEvent, removeLayerAnalyticsEvent }) => {
  const humanImpactLayerActive = activeLayers.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
  const alreadyChecked = humanImpactLayerActive && ((humanPressuresLandUse.reduce((acc, option) => ({
    ...acc, [option.value]: rasters[option.value]
  }), {})) || {});

  const handleHumanPressureRasters = (rasters, option) => {
    const { layers } = map;
    const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
    setRasters(rasters);

    const hasRastersWithData = Object.values(rasters).some(raster => raster);
    setLayerVisibility(LAND_HUMAN_PRESSURES_IMAGE_LAYER, hasRastersWithData);

    const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
    const rasterNames = activeRasters.map(value => `human_impact_${value}`)

    const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;

    const analyticsParams = { slug: option.slug, query: { viewMode: VIEW_MODE.LANDSCAPE }};
    const isRasterActive = activeRasters.some(value => value === option.value);
    if (isRasterActive) addLayerAnalyticsEvent(analyticsParams) 
    else removeLayerAnalyticsEvent(analyticsParams);

    loadModules(["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {
      humanImpactLayer.mosaicRule = new MosaicRule({
        method: 'attribute',
        operation: 'sum',
        where: mosaicWhereClause
      });
    });
  }

  return (
    <MultipleActiveLayers
      options={humanPressuresLandUse}
      alreadyChecked={alreadyChecked}
      handleClick={handleHumanPressureRasters}
      title='Land use pressures'
      description='Human pressures causing habitat loss and accelerating species extinction.'
      activeLayers={activeLayers}
    />
  )}

HumanImpactLayers.propTypes = {
  map: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  setLayerVisibility: PropTypes.func,
  activeLayers: PropTypes.array
};

HumanImpactLayers.defaultProps = {
  map: {},
  title: '',
  description: '',
  setLayerVisibility: () => {},
  activeLayers: []
};

export default HumanImpactLayers;