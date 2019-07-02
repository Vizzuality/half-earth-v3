import React from 'react';
import PropTypes from 'prop-types';
import { loadModules } from '@esri/react-arcgis';

import MultipleActiveLayers from 'components/multiple-active-layers';

import { humanPressuresLandUse } from 'constants/human-pressures';
import { HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';

const HumanImpactLayers = ({ map, rasters, setRasters, setLayerVisibility, activeLayers }) => {
  const humanImpactLayerActive = activeLayers.find(l => l.id === HUMAN_PRESSURE_LAYER_ID);
  const alreadyChecked = humanImpactLayerActive && (humanPressuresLandUse.reduce((acc, option) => ({
    ...acc, [option.value]: rasters[option.value]
  // eslint-disable-next-line no-mixed-operators
  }), {})) || {};

  const handleHumanPressureRasters = (rasters, option) => {
    const { layers } = map;
    const humanImpactLayer = layers.items.find(l => l.id === HUMAN_PRESSURE_LAYER_ID);
    setRasters(rasters);

    const hasRastersWithData = Object.values(rasters).some(raster => raster);
    setLayerVisibility(HUMAN_PRESSURE_LAYER_ID, hasRastersWithData);

    const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
    const rasterNames = activeRasters.map(value => `human_impact_${value}`)

    const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;

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