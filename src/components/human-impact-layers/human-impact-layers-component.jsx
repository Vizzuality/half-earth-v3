import React from 'react';
import PropTypes from 'prop-types';
// Constants
// import { VIEW_MODE } from  'constants/google-analytics-constants';
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { humanPressuresLandUse } from 'constants/human-pressures';
// Utils
import { layerManagerToggle, handleLayerCreation } from 'utils/layer-manager-utils';
// import { dispatchLandPressuresLayersAnalyticsEvents } from 'utils/raster-layers-utils';
// Components
import MultipleActiveLayers from 'components/multiple-active-layers';


const HumanImpactLayers = ({ alreadyChecked, map, activeLayers, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, changeGlobe }) => {

  
  const toggleLayer = (rasters, option) => {
    const layerConfig = layersConfig[option.slug];
    handleLayerCreation(layerConfig, map);
    layerManagerToggle(option.slug, activeLayers, changeGlobe, LAYERS_CATEGORIES.LAND_PRESSURES);
    // dispatchLandPressuresLayersAnalyticsEvents(activeLayers, option, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, VIEW_MODE);
  }


  return (
    <MultipleActiveLayers
      options={humanPressuresLandUse}
      alreadyChecked={alreadyChecked}
      handleClick={toggleLayer}
      title='Land use pressures'
      description='Human pressures causing habitat loss and accelerating species extinction.'
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