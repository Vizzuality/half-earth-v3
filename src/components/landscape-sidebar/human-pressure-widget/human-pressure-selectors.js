import { createSelector, createStructuredSelector } from 'reselect';
import { orderBy } from 'lodash';
import { format } from 'd3-format';
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
  const pressures = humanPressures.children.filter(p => p.name !== 'Pressure free' );
  const pressuresValues = pressures.map(p => p.value)
  const biggestPressure = orderBy(pressures, 'value', 'desc')[0].name;
  const totalPressure = pressuresValues.reduce((acc, current) => acc + current);
  console.log(pressuresValues)
  console.log(Number.isNaN(totalPressure))
  if (totalPressure === 0) return 'There is no human pressure on the selected area';
  return `Of the current landscape, ${format(".2%")(totalPressure / 100)} is under human pressure, the majority of which is pressure from ${biggestPressure}.`
})

export default createStructuredSelector({
  humanPressures: getHumanPressures,
  data: getPressuresHierarchy,
  pressureStatement: getPressureStatement
});