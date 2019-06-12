import { createSelector, createStructuredSelector } from 'reselect';
import { orderBy } from 'lodash';
import { humanPressuresLandscapeWidget } from 'constants/human-pressures';
import { getHumanPressures } from 'selectors/grid-cell-selectors';

const getPressuresHierarchy = createSelector(getHumanPressures, humanPressures => {
  if (!humanPressures) return null;
  return {
    name: 'Human Pressures',
    children: humanPressuresLandscapeWidget.map(pressure => (
      {
        name: pressure.name,
        slug: pressure.slug,
        value: humanPressures[pressure.value],
        rasterId: pressure.value
      }
    ))
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