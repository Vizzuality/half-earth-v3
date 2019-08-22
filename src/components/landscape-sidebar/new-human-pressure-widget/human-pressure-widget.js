import React from 'react';
import { connect } from 'react-redux';
import { loadModules } from '@esri/react-arcgis';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';
import { handleLayerRendered } from 'utils/layer-manager-utils';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
import HumanPressureWidgetComponent from './human-pressure-widget-component';
import mapStateToProps from './human-pressure-selectors';
import { VIEW_MODE } from  'constants/google-analytics-constants';

const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent };

const HumanPressureWidgetContainer = props => {
  const {
    rasters,
    setLayerVisibility,
    setRasters,
    map,
    view,
    addLayerAnalyticsEvent,
    removeLayerAnalyticsEvent,
    handleGlobeUpdating
  } = props;
  // console.log('rasters: ',rasters);
  // const activeRect = Object.keys(rasters).filter(r => rasters[r]);

  // const handleTreemapClick = (checkedOptions, option) => {
  //   let newRasters;
  //   const { layers } = map;
  //   const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);

  //   if (!rasters[option.data.rasterId]) {
  //     newRasters = {...rasters, [option.data.rasterId]: true}
  //     setRasters(newRasters);
  //     addLayerAnalyticsEvent({ slug: option.data.slug })
  //   } else {
  //     newRasters = Object.assign({}, rasters);
  //     delete newRasters[option.data.rasterId];
  //     setRasters(newRasters);
  //     removeLayerAnalyticsEvent({ slug: option.data.slug })
  //   }

  //   const hasRastersWithData = Object.values(newRasters).some(raster => raster);
  //   if (hasRastersWithData) {
  //     handleGlobeUpdating(true);
  //   }

  //   handleLayerRendered(view, humanImpactLayer, handleGlobeUpdating);
  //   setLayerVisibility(LAND_HUMAN_PRESSURES_IMAGE_LAYER, hasRastersWithData);

  //   const rasterNames = Object.keys(newRasters).map(key => `human_impact_${key}`)
  //   const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;

  //   loadModules(["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {
  //     humanImpactLayer.mosaicRule = new MosaicRule({
  //       method: 'attribute',
  //       operation: 'sum',
  //       where: mosaicWhereClause
  //     });
  //   });
  // }

  const handleHumanPressureRasters = (rasters, option) => {
      const { layers } = map;
      const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
      
      const hasRastersWithData = Object.values(rasters).some(raster => raster);
      if (hasRastersWithData) {
        handleGlobeUpdating(true);
      }
      setRasters(rasters);
      handleLayerRendered(view, humanImpactLayer, handleGlobeUpdating);
  
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

  return <HumanPressureWidgetComponent {...props} rasters={rasters} handleOnClick={handleHumanPressureRasters}/>
}

export default connect(mapStateToProps, actions)(HumanPressureWidgetContainer);


// ==
// import React from 'react';
// import PropTypes from 'prop-types';
// import { loadModules } from '@esri/react-arcgis';

// import { handleLayerRendered } from 'utils/layer-manager-utils';
// import MultipleActiveLayers from 'components/multiple-active-layers';

// import { humanPressuresLandUse } from 'constants/human-pressures';
// import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';
// import { VIEW_MODE } from  'constants/google-analytics-constants';

// const HumanImpactLayers = ({ handleGlobeUpdating, view, map, rasters, setRasters, setLayerVisibility, activeLayers, addLayerAnalyticsEvent, removeLayerAnalyticsEvent }) => {
//   const humanImpactLayerActive = activeLayers.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
//   // eslint-disable-next-line no-mixed-operators
//   const alreadyChecked = humanImpactLayerActive && (humanPressuresLandUse.reduce((acc, option) => ({
//     ...acc, [option.value]: rasters[option.value]
//   }), {})) || {};

//   const handleHumanPressureRasters = (rasters, option) => {
//     const { layers } = map;
//     const humanImpactLayer = layers.items.find(l => l.title === LAND_HUMAN_PRESSURES_IMAGE_LAYER);
    
//     const hasRastersWithData = Object.values(rasters).some(raster => raster);
//     if (hasRastersWithData) {
//       handleGlobeUpdating(true);
//     }
//     setRasters(rasters);
//     handleLayerRendered(view, humanImpactLayer, handleGlobeUpdating);

//     setLayerVisibility(LAND_HUMAN_PRESSURES_IMAGE_LAYER, hasRastersWithData);

//     const activeRasters = Object.keys(rasters).filter(rasterName => rasters[rasterName])
//     const rasterNames = activeRasters.map(value => `human_impact_${value}`)

//     const mosaicWhereClause = `Name IN('${rasterNames.join("','")}')`;

//     const analyticsParams = { slug: option.slug, query: { viewMode: VIEW_MODE.LANDSCAPE }};
//     const isRasterActive = activeRasters.some(value => value === option.value);
//     if (isRasterActive) addLayerAnalyticsEvent(analyticsParams) 
//     else removeLayerAnalyticsEvent(analyticsParams);

//     loadModules(["esri/layers/support/MosaicRule"]).then(([MosaicRule]) => {
//       humanImpactLayer.mosaicRule = new MosaicRule({
//         method: 'attribute',
//         operation: 'sum',
//         where: mosaicWhereClause
//       });
//     });
//   }

//   return (
//     <MultipleActiveLayers
//       options={humanPressuresLandUse}
//       alreadyChecked={alreadyChecked}
//       handleClick={handleHumanPressureRasters}
//       title='Land use pressures'
//       description='Human pressures causing habitat loss and accelerating species extinction.'
//       activeLayers={activeLayers}
//     />
//   )}

// HumanImpactLayers.propTypes = {
//   map: PropTypes.object,
//   title: PropTypes.string,
//   description: PropTypes.string,
//   setLayerVisibility: PropTypes.func,
//   activeLayers: PropTypes.array
// };

// HumanImpactLayers.defaultProps = {
//   map: {},
//   title: '',
//   description: '',
//   setLayerVisibility: () => {},
//   activeLayers: []
// };

// export default HumanImpactLayers;