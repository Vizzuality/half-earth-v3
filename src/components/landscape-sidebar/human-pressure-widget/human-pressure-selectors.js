import { createSelector, createStructuredSelector } from 'reselect';
import { orderBy } from 'lodash';
import { format } from 'd3-format';
import { humanPressuresLandscapeWidget } from 'constants/human-pressures';
import { getTerrestrialHumanPressures } from 'selectors/grid-cell-selectors';


const getPressureData = createSelector(getTerrestrialHumanPressures, humanPressures => {
  if (!humanPressures) return null;
  const data = humanPressuresLandscapeWidget
    .filter(p => p.slug !== 'human-pressures-free')
    .map(pressure => (
      {
        name: pressure.name,
        slug: pressure.slug,
        value: pressure.value,
        pressureValue: humanPressures[pressure.value],
      }
    )
  );
  return data;
})

const getTotalPressureValue = createSelector(getPressureData, humanPressures => {
  if (!humanPressures) return null;
  const pressuresValues = humanPressures.map(p => p.pressureValue)
  const totalPressure = pressuresValues.reduce((acc, current) => acc + current);
  return totalPressure
})

const getPressureFreeValue = createSelector(getTerrestrialHumanPressures, humanPressures => {
  if (!humanPressures) return null;
  const pressureFree = humanPressuresLandscapeWidget.find(p => p.slug === 'human-pressures-free');
  return format(".2%")(humanPressures[pressureFree.value] / 100);
})

const getBiggestPressureName = createSelector(
  [getPressureData],
  (humanPressures) => {
    if (!humanPressures) return null;
    return orderBy(humanPressures, 'pressureValue', 'desc')[0].name.toLowerCase();
  }
)

const getSelectedPressuresValue = createSelector(
  [getPressureData],
  (humanPressures) => {
    if (!humanPressures) return null;
    return humanPressures;
  }
)

const getPressureOptions = createSelector(getPressureData, humanPressureData => {
  if (!humanPressureData) return null;
  const data = humanPressureData
    .map(({ name, slug, value, pressureValue }) => (
      {
        name: `${name} ${format(".2%")(pressureValue / 100)}`,
        slug,
        value
      }
    )
  );
  return data;
})

export default createStructuredSelector({
  humanPressures: getTerrestrialHumanPressures,
  options: getPressureOptions,
  selectedPressures: getSelectedPressuresValue,
  totalPressure: getTotalPressureValue,
  biggestPressureName: getBiggestPressureName,
  pressureFree: getPressureFreeValue
});