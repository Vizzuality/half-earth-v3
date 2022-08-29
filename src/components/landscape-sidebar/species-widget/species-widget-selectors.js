import { createSelector, createStructuredSelector } from 'reselect';
import { getCellData } from 'selectors/grid-cell-selectors';
import { selectLangUrlState } from 'selectors/location-selectors';
import { format, precisionPrefix, formatPrefix } from 'd3-format';
import { uniqBy } from 'lodash';
import { getIUCNList } from 'constants/iucn-list';

// more about precision prefix: https://github.com/d3/d3-format#precisionPrefix
const millionsFormat = formatPrefix(`.${precisionPrefix(1e4, 1.3e6)}`, 1.3e6); // format millions with two fixed decimals
const thousandsFormat = formatPrefix(`.${precisionPrefix(1e1, 1.3e3)}`, 1.3e3); // format thousands with two fixed decimals

const formatRangeArea = (value) => {
  if (value > 1000000) {
    return millionsFormat(value);
  } if (value > 1000) {
    return thousandsFormat(value);
  }
  return value;
};

const toRadians = (angle) => {
  return angle * (Math.PI / 180);
};

const getDotColor = (value) => {
  if (value < 0.25) return '#FFF000';
  if (value < 0.50) return '#CBF499';
  if (value < 0.75) return '#48C386';
  return '#005F65';
};

const getSpeciesData = ({ speciesData }) => (speciesData && speciesData.data) || null;
const getSpeciesDataLoading = ({ speciesData }) => speciesData && speciesData.loading;

const getSelectedSpeciesName = (state, props) => props.selectedSpecies;

const getUniqeSpeciesData = createSelector(getSpeciesData, (speciesData) => {
  if (!speciesData) return [];
  return uniqBy(speciesData, 'species_name');
});

const calculateChartPosition = (angle, propRange) => {
  const betaAngle = 180 - 90 - angle;
  const c = 100 - propRange * 100; // revert the axis on the chart

  const x = Math.round(c * Math.sin(toRadians(betaAngle)));
  const y = Math.round(c * Math.cos(toRadians(betaAngle)));

  const correctionX = x > 0 ? x - 2 : x;
  const correctionY = y > 0 ? y - 2 : y + 2;

  return { x: correctionX, y: correctionY };
};

// locale is here to recompute the data when the language changes
const getComputedIUCNList = createSelector(selectLangUrlState, (locale) => getIUCNList());

const getChartData = (speciesData, taxa, startAngle, iucnList) => {
  const data = speciesData.filter((s) => s.taxa === taxa);
  const angleOffset = 88 / (data.length + 1);

  const chartData = data.map((s, i) => {
    const angle = startAngle + angleOffset + angleOffset * i;
    return {
      id: s.HBWID,
      name: s.common_name !== 'NA' ? s.common_name : s.species_name,
      scientificName: s.species_name,
      rangeArea: formatRangeArea(s.RANGE_AREA_KM2),
      proportion: format('.2%')(s.PROP_RANGE_PROT),
      taxa: s.taxa,
      imageURL: s.url_sp.startsWith('http') ? s.url_sp : null,
      pointCoordinates: calculateChartPosition(angle, s.PROP_RANGE_PROT),
      color: getDotColor(s.PROP_RANGE_PROT),
      iucnCategory: iucnList[s.iucn_cat] || '-',
    };
  });
  return chartData;
};

const getData = createSelector([getUniqeSpeciesData, getComputedIUCNList], (speciesData, iucnList) => {
  if (!speciesData) return null;
  const birdsData = getChartData(speciesData, 'bird', 0, iucnList);
  const reptilesData = getChartData(speciesData, 'reptile', 90, iucnList);
  const mammalsData = getChartData(speciesData, 'mammal', 180, iucnList);
  const amphibiansData = getChartData(speciesData, 'amphibian', 270, iucnList);
  const speciesChartData = [...birdsData, ...reptilesData, ...mammalsData, ...amphibiansData];
  return speciesChartData.length ? speciesChartData : null;
});

const getSelectedSpeciesData = createSelector(
  [getData, getSelectedSpeciesName],
  (data, selectedSpeciesName) => {
    if (!data) return null;
    const selectedSpecies = data.find(({ scientificName }) => scientificName === selectedSpeciesName) || data[0];
    return selectedSpecies;
  },
);

export default createStructuredSelector({
  data: getData,
  cellData: getCellData,
  selectedSpeciesData: getSelectedSpeciesData,
  loading: getSpeciesDataLoading,
});
