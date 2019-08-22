import { createSelector, createStructuredSelector } from 'reselect';
import { orderBy } from 'lodash';
import { format } from 'd3-format';
import { humanPressuresLandscapeWidget } from 'constants/human-pressures';
import { getTerrestrialHumanPressures } from 'selectors/grid-cell-selectors';

const getRastersFromProps = (state, props) =>
  props.rasters

const getPressureOptions = createSelector(getTerrestrialHumanPressures, humanPressures => {
  if (!humanPressures) return null;
  const data = humanPressuresLandscapeWidget
    .filter(p => p.slug !== 'human-pressures-free')
    .map(pressure => (
      {
        name: `${pressure.name} ${format(".0%")(humanPressures[pressure.value] / 100)}`,
        slug: pressure.slug,
        value: pressure.value,
        pressureValue: humanPressures[pressure.value],
      }
    )
  );
  console.log('data: ',data)
  return data;
})

const getTotalPressure = createSelector(getPressureOptions, humanPressures => {
  if (!humanPressures) return null;
  const pressures = humanPressures.filter(p => p.name !== 'Pressure free' );
  const pressuresValues = pressures.map(p => p.pressureValue)
  const totalPressure = pressuresValues.reduce((acc, current) => acc + current);
  return totalPressure
})

const getBiggestPressureName = createSelector(
  [getPressureOptions],
  (humanPressures) => {
    if (!humanPressures) return null;
    const pressures = humanPressures.filter(p => p.name !== 'Pressure free' );
    return orderBy(pressures, 'pressureValue', 'desc')[0].name;
})

const getPressureBarData = createSelector(
  [getPressureOptions, getRastersFromProps, getTotalPressure],
  (humanPressures, rasters, totalPressure) => {
    if (!humanPressures || !rasters || !totalPressure) return null;
    const selectedPressures = Math.round(humanPressures.filter(({ value }) => rasters[value]).reduce((acc, next) => acc + next.pressureValue, 0));
    const nonSelectedPressures = Math.round(totalPressure) - selectedPressures;
    return { selectedPressures, nonSelectedPressures };
  }
)

export default createStructuredSelector({
  humanPressures: getTerrestrialHumanPressures,
  options: getPressureOptions,
  barData: getPressureBarData,
  totalPressure: getTotalPressure,
  biggestPressureName: getBiggestPressureName
});