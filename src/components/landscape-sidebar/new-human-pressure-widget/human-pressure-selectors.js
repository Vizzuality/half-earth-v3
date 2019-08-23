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
  return data;
})

const getTotalPressureValue = createSelector(getPressureOptions, humanPressures => {
  if (!humanPressures) return null;
  const pressuresValues = humanPressures.map(p => p.pressureValue)
  const totalPressure = pressuresValues.reduce((acc, current) => acc + current);
  return totalPressure
})

const getPressureFreeValue = createSelector(getTerrestrialHumanPressures, humanPressures => {
  if (!humanPressures) return null;
  const pressureFree = humanPressuresLandscapeWidget.find(p => p.slug === 'human-pressures-free');
  return Math.round(humanPressures[pressureFree.value]);
})

const getBiggestPressureName = createSelector(
  [getPressureOptions],
  (humanPressures) => {
    if (!humanPressures) return null;
    return orderBy(humanPressures, 'pressureValue', 'desc')[0].name;
})

const getSelectedPressuresValue = createSelector(
  [getPressureOptions, getRastersFromProps],
  (humanPressures, rasters) => {
    if (!humanPressures || !rasters) return null;
    const selectedPressures = Math.round(humanPressures.filter(({ value }) => rasters[value]).reduce((acc, next) => acc + next.pressureValue, 0));
    return selectedPressures;
  }
)

export default createStructuredSelector({
  humanPressures: getTerrestrialHumanPressures,
  options: getPressureOptions,
  selectedPressures: getSelectedPressuresValue,
  totalPressure: getTotalPressureValue,
  biggestPressureName: getBiggestPressureName,
  pressureFree: getPressureFreeValue
});