import { createSelector } from 'reselect';
import { getActiveLayers, getRasters } from 'pages/data-globe/data-globe-selectors';

export const getCountedActiveLayers = createSelector(
  [getActiveLayers, getRasters],
  (activeLayers, rasters) => {
 
    const biodiversityLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Biodiversity').length : 0;
    const protectionLayers = activeLayers ? activeLayers.filter(({ category }) => category === 'Existing protection').length : 0;
    const humanPressuresLayers = rasters ? Object.keys(rasters).filter(key => rasters[key]).length : 0;

    return {
      'Biodiversity': biodiversityLayers,
      'Existing protection': protectionLayers,
      'Human pressures': humanPressuresLayers
    };
  }
);
