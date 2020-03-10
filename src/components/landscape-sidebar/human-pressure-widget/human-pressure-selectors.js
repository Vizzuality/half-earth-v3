import { createSelector, createStructuredSelector } from 'reselect';
import { orderBy, sumBy } from 'lodash';
import { format } from 'd3-format';
import { humanPressuresLandscapeWidget, PRESSURES_SLUGS } from 'constants/human-pressures';
import { getTerrestrialHumanPressures, getTerrestrialCellData } from 'selectors/grid-cell-selectors';

const getLandHumanPressuresData = ({ landHumanEncroachment }) => landHumanEncroachment && landHumanEncroachment.data;

const getAggregatedPressures = createSelector(getLandHumanPressuresData, humanPressuresData => {
  if (!humanPressuresData) return null;
  const pressures = humanPressuresData.reduce((acc, current) => {
    return {
      ...acc,
      [current.ID]: {
        [PRESSURES_SLUGS.rainfed]: current.prop_Rainfed,
        [PRESSURES_SLUGS.urban]: current.prop_Urban,
        [PRESSURES_SLUGS.irrigated]: current.prop_Irrigated,
        [PRESSURES_SLUGS.rangeland]: current.prop_Rangeland
      }
      }
  }, {});
  const pressuresValues = Object.values(pressures)
  const gridCellsLength = Object.keys(pressures).length;
  const rainfed = sumBy(pressuresValues, PRESSURES_SLUGS.rainfed) / gridCellsLength;
  const irrigated = sumBy(pressuresValues, PRESSURES_SLUGS.irrigated) / gridCellsLength;
  const urban = sumBy(pressuresValues, PRESSURES_SLUGS.urban) / gridCellsLength;
  const rangeland = sumBy(pressuresValues, PRESSURES_SLUGS.rangeland) / gridCellsLength;
  const pressureFree = 100 - (rainfed + irrigated + urban + rangeland)
  return {
    [PRESSURES_SLUGS.rainfed]: rainfed,
    [PRESSURES_SLUGS.irrigated]: irrigated,
    [PRESSURES_SLUGS.urban]: urban,
    [PRESSURES_SLUGS.rangeland]: rangeland,
    pressureFree
  }
});

const getPressureData = createSelector(getAggregatedPressures, (humanPressuresData) => {
  if (!humanPressuresData) return null;
  const data = humanPressuresLandscapeWidget
    .filter(p => p.slug !== 'human-pressures-free')
    .map(pressure => (
      {
        name: pressure.name,
        slug: pressure.slug,
        value: pressure.value,
        pressureValue: humanPressuresData[pressure.value],
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
  terrestrialCellData: getTerrestrialCellData,
  options: getPressureOptions,
  selectedPressures: getSelectedPressuresValue,
  totalPressure: getTotalPressureValue,
  biggestPressureName: getBiggestPressureName,
  pressureFree: getPressureFreeValue
});