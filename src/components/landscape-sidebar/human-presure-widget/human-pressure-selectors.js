import { createSelector, createStructuredSelector } from 'reselect';
import { getHumanPressures } from 'selectors/grid-cell-selectors';

const getPressuresHierarchy = createSelector(getHumanPressures, humanPressures => {
  if (!humanPressures) return null;
  return {
    name: 'Human Pressures',
    children: [
      {
        name: 'Irrigated agriculture',
        value: humanPressures.irrigated
      },
      {
        name: 'Rainfed agriculture',
        value: humanPressures.rainfed
      },
      {
        name: 'Urban pressures',
        value: humanPressures.urban
      },
      {
        name: 'Not under pressure',
        value: humanPressures.pressureFree
      }
    ]
  }
})

export default createStructuredSelector({
  humanPressures: getHumanPressures,
  data: getPressuresHierarchy
});