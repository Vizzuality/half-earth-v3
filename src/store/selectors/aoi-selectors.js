import { createSelector, createStructuredSelector } from 'reselect';

export const selectAoisGeometries = ({ aoisGeometries }) => aoisGeometries.data;
export const selectAoiId = ({ location }) => location.payload.id;
export const selectLocationAreaType = ({ location }) =>
  location.query && location.query.areaType;

export const getAoiGeometry = createSelector(
  [selectAoisGeometries, selectAoiId],
  (aoisGeometries, aoiId) => {
    if (!aoisGeometries[aoiId]) return null;
    return aoisGeometries[aoiId];
  }
);

export default createStructuredSelector({
  aoiGeometry: getAoiGeometry,
});
