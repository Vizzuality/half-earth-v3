import { createSelector, createStructuredSelector } from 'reselect';
import { getActiveLayers, getRasters } from 'pages/data-globe/data-globe-selectors';
import { LAND_HUMAN_PRESSURES_IMAGE_LAYER } from 'constants/layers-slugs';

const getCountedActiveLayers = createSelector(
  [getActiveLayers, getRasters],
  (activeLayers, rasters) => {
 
    const biodiversityLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Biodiversity').length : 0;
    const protectionLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Existing protection').length : 0;
    const humanPressureLayer = activeLayers ? activeLayers.filter(({ title }) => title === LAND_HUMAN_PRESSURES_IMAGE_LAYER).length : 0;
    const humanPressureRasters = humanPressureLayer && Object.keys(rasters).filter(key => rasters[key]).length;

    return {
      'Biodiversity': biodiversityLayers,
      'Existing protection': protectionLayers,
      'Human pressures': humanPressureRasters
    };
  }
);


export default createStructuredSelector({ countedActiveLayers: getCountedActiveLayers });