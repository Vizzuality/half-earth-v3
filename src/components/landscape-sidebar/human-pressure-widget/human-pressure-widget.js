import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import HumanPressureWidgetComponent from './human-pressure-widget-component';
import mapStateToProps from './human-pressure-selectors';
// this forces the registration of redux module and sagas
import 'redux_modules/land-human-encroachment';
// Constants
import { GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE } from 'constants/layers-slugs';
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
// Utils
import { handleLayerCreation } from 'utils/layer-manager-utils';
import { layerManagerToggle } from 'utils/layer-manager-utils';
//Actions
import landHumanPressuresActions from 'redux_modules/land-human-encroachment';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import * as urlActions from 'actions/url-actions';
const actions = { ...landHumanPressuresActions, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, ...urlActions };


const HumanPressureWidgetContainer = props => {
  const {
    map,
    terrestrialCellData,
    activeLayers,
    SET_LAND_PRESSURES_DATA_READY,
    STORE_LAND_PRESSURES_DATA_ERROR,
    STORE_LAND_PRESSURES_DATA_LOADING
  } = props;

  const [landPressuresLayer, setLandPressuresLayer] = useState(null);

  // Create the layer to query against
  useEffect(() => {
    if (!landPressuresLayer) {
      loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
        const landPressuresLayer = new FeatureLayer({
          url: layersConfig[GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE].url
        });
        setLandPressuresLayer(landPressuresLayer)
      });
    }
  }, []);

  // Query data from selected terrestrial gridcells and add it to the store
  useEffect(() => {
    if (terrestrialCellData && landPressuresLayer) {
      STORE_LAND_PRESSURES_DATA_LOADING();
      const queryParams = landPressuresLayer.createQuery();
      const cellIds = terrestrialCellData.map(cell => cell.ID);
      queryParams.where = `ID IN (${cellIds.join(', ')})`;
      landPressuresLayer.queryFeatures(queryParams).then(function(results){
        const { features } = results;
        SET_LAND_PRESSURES_DATA_READY(features.map(c => c.attributes));
      }).catch((error) => STORE_LAND_PRESSURES_DATA_ERROR(error));
    }
  }, [terrestrialCellData])


    const toggleLayer = async (rasters, option) => {
      const { changeGlobe } = props;
      const layerConfig = layersConfig[option.slug];
      await handleLayerCreation(layerConfig, map);
      layerManagerToggle(option.slug, activeLayers, changeGlobe, LAYERS_CATEGORIES.LAND_PRESSURES);
  }

  return (
    <HumanPressureWidgetComponent
      handleOnClick={toggleLayer}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(HumanPressureWidgetContainer);