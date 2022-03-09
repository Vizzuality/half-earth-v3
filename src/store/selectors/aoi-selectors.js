import { createSelector, createStructuredSelector } from 'reselect';
import { selectGlobeUrlState } from 'selectors/location-selectors';

export const selectAoisGeometries = ({ aoisGeometries }) => aoisGeometries.data;
export const selectAoiId = ({location}) => location.payload.id;
export const selectLocationAreaType = ({location}) => location.query && location.query.areaType;
export const selectAreaTypeSelected = ({ aois }) => aois && aois.areaTypeSelected;


export const selectAreaType = createSelector([selectAreaTypeSelected, selectGlobeUrlState],
  (areaTypeSelected, globeURLState) => (globeURLState && globeURLState.areaType) || areaTypeSelected);

export const getAoiGeometry = createSelector(
  [selectAoisGeometries, selectAoiId],
  (aoisGeometries, aoiId) => {
    if (!aoisGeometries[aoiId]) return null;
    return aoisGeometries[aoiId];
  }
)

export default createStructuredSelector({
  aoiGeometry: getAoiGeometry
})
