import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import HumanPressureWidgetComponent from './human-pressure-widget-component';
import mapStateToProps from './human-pressure-selectors';
// this forces the registration of redux module and sagas
import 'redux_modules/land-human-encroachment';
// Constants
import { LAND_HUMAN_PRESURES_LAYERS } from 'constants/layers-groups';
import { GRID_CELLS_LAND_HUMAN_PRESSURES_PERCENTAGE } from 'constants/layers-slugs';
import { layersConfig, LAYERS_CATEGORIES } from 'constants/mol-layers-configs';
import { VIEW_MODE } from  'constants/google-analytics-constants';
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
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent,
    activeLayers,
    SET_LAND_PRESSURES_DATA_READY,
    STORE_LAND_PRESSURES_DATA_ERROR,
    STORE_LAND_PRESSURES_DATA_LOADING
  } = props;

  const [landPressuresLayer, setLandPressuresLayer] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState({});

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

  useEffect(() => {
    const alreadyChecked = LAND_HUMAN_PRESURES_LAYERS.reduce((acc, option) => ({
      ...acc, [option]: activeLayers.some(layer => layer.title === option)
    }), {});
    setCheckedOptions(alreadyChecked);
  }, [activeLayers])


    const toggleLayer = (rasters, option) => {
      const { changeGlobe } = props;
      const layerConfig = layersConfig[option.slug];
      handleLayerCreation(layerConfig, map);
      layerManagerToggle(option.slug, activeLayers, changeGlobe, LAYERS_CATEGORIES.LAND_PRESSURES);
      // dispatchLandPressuresLayersAnalyticsEvents(activeLayers, option, addLayerAnalyticsEvent, removeLayerAnalyticsEvent, VIEW_MODE);
  }

  return (
    <HumanPressureWidgetComponent
      handleOnClick={toggleLayer}
      checkedRasters={checkedOptions}
      {...props}
    />
  )
}

export default connect(mapStateToProps, actions)(HumanPressureWidgetContainer);