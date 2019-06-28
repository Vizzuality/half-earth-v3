import { createSelector, createStructuredSelector } from 'reselect';
import { getActiveLayers, getRasters } from 'pages/data-globe/data-globe-selectors';
import { HUMAN_PRESSURE_LAYER_ID } from 'constants/human-pressures';

const getCountedActiveLayers = createSelector(
  [getActiveLayers, getRasters],
  (activeLayers, rasters) => {
 
    const biodiversityLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Biodiversity').length : 0;
    const protectionLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Existing protection').length : 0;
    const humanPressureLayer = activeLayers ? activeLayers.filter(({ id }) => id === HUMAN_PRESSURE_LAYER_ID).length : 0;
    const humanPressureRasters = humanPressureLayer && Object.keys(rasters).filter(key => rasters[key]).length;

    return {
      'Biodiversity': biodiversityLayers,
      'Existing protection': protectionLayers,
      'Human pressures': humanPressureRasters
    };
  }
);


export default createStructuredSelector({ countedActiveLayers: getCountedActiveLayers });