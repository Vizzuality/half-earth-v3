import { createSelector, createStructuredSelector } from 'reselect';
import { orderBy } from 'lodash';
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

const getPressureStatement = createSelector(getPressuresHierarchy, humanPressures => {
  if (!humanPressures) return null;
  const pressures = humanPressures.children.filter(p => p.name !== 'Not under pressure' );
  const biggestPressure = orderBy(pressures, 'value', 'desc')[0].name;
  const totalPressure = pressures.reduce((acc, current) => (acc.value || acc) + current.value);
  return `Of the current landscape, ${Math.floor(totalPressure)}% is under human pressure, the majority of which is pressure from ${biggestPressure}.`
})

export default createStructuredSelector({
  humanPressures: getHumanPressures,
  data: getPressuresHierarchy,
  pressureStatement: getPressureStatement
});