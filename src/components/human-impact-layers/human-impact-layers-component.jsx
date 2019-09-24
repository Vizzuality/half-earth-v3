import React from 'react';
import PropTypes from 'prop-types';
// Constants
import { VIEW_MODE } from  'constants/google-analytics-constants';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import { humanPressuresLandUse } from 'constants/human-pressures';
// Utils
import { handleLayerRendered, layerManagerVisibility, findLayerInMap } from 'utils/layer-manager-utils';
import { humanPressuresPreloadFixes, dispatchLandPressuresLayersAnalyticsEvents } from 'utils/raster-layers-utils';
// Components
import MultipleActiveLayers from 'components/multiple-active-layers';


const HumanImpactLayers = ({ alreadyChecked, handleGlobeUpdating, view, map, setRasters, activeLayers, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, changeGlobe }) => {

  const handleHumanPressureRasters = (rasters, option) => {
    const humanImpactLayer = findLayerInMap(LAND_HUMAN_PRESSURES_IMAGE_LAYER, map);
    const hasRastersWithData = Object.values(rasters).some(raster => raster);
    hasRastersWithData && handleGlobeUpdating(true);
    setRasters(rasters);
    handleLayerRendered(view, humanImpactLayer, handleGlobeUpdating);
    layerManagerVisibility(LAND_HUMAN_PRESSURES_IMAGE_LAYER, hasRastersWithData, activeLayers, changeGlobe);
    humanPressuresPreloadFixes(humanImpactLayer, rasters);
    dispatchLandPressuresLayersAnalyticsEvents(rasters, option, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, VIEW_MODE);
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