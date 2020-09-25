import React from 'react';
import PropTypes from 'prop-types';
// Constants
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { humanPressuresLandUse, humanPressuresMarine } from 'constants/human-pressures';
// Utils
import { layerManagerToggle, handleLayerCreation } from 'utils/layer-manager-utils';
// Components
import MultipleActiveLayers from 'components/multiple-active-layers';


const HumanImpactLayers = ({
  map,
  changeGlobe,
  activeLayers,
  alreadyCheckedLandPressures,
  alreadyCheckedMarinePressures,
}) => {

  
  const toggleLayer = async (e, option) => {
    const layerConfig = layersConfig[option.slug];
    await handleLayerCreation(layerConfig, map);
    layerManagerToggle(option.slug, activeLayers, changeGlobe, LAYERS_CATEGORIES.LAND_PRESSURES);
  }


  return (
    <>
      <MultipleActiveLayers
        options={humanPressuresLandUse}
        alreadyChecked={alreadyCheckedLandPressures}
        handleClick={toggleLayer}
        title='Land use pressures'
        description='Human pressures causing habitat loss and accelerating species extinction.'
      />
      <MultipleActiveLayers
        options={humanPressuresMarine}
        alreadyChecked={alreadyCheckedMarinePressures}
        handleClick={toggleLayer}
        title='Marine use pressures'
        description='Human pressures causing habitat loss and accelerating species extinction.'
      />
    </>
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