import { createSelector, createStructuredSelector } from 'reselect';
import { getTerrestrialCellData } from 'selectors/grid-cell-selectors';
import { format, precisionPrefix, formatPrefix } from 'd3-format';
import { uniqBy } from "lodash";
import IUCNList from 'constants/iucn-list';

const p = precisionPrefix(1e4, 1.3e6); //more about precision prefix: https://github.com/d3/d3-format#precisionPrefix
const customFormat = formatPrefix("." + p, 1.3e6); // format millions with two decimals

const toRadians = (angle) => {
  return angle * (Math.PI / 180);
}

const getDotColor = (value) => {
  if (value < 0.25) return '#FFF000';
  else if (value < 0.50) return '#CBF499';
  else if (value < 0.75) return '#48C386';
  else return '#005F65';
}

const getSpeciesData = ({ speciesData }) => (speciesData && speciesData.data) || null;

const getSelectedSpeciesName = (state, props) =>
  props.selectedSpecies

const getUniqeSpeciesData= createSelector(getSpeciesData, speciesData => {
  if (!speciesData) return [];
  return uniqBy(speciesData, 'scntfcn');
})

const calculateChartPosition = (angle, propRange) => {
  const betaAngle = 180 - 90 - angle;
  const c = 100 - propRange * 100; //revert the axis on the chart

  const x = Math.round(c * Math.sin(toRadians(betaAngle)));
  const y = Math.round(c * Math.cos(toRadians(betaAngle)));
  
  const correctionX = x > 0 ? x - 2 : x;
  const correctionY = y > 0 ? y - 2 : y + 2;

  return { x: correctionX, y: correctionY };
}

const getChartData = (speciesData, taxa, startAngle)  => {
  const data = speciesData.filter(s => s.taxa === taxa);
  const angleOffset = 88 / (data.length + 1);

  const chartData = data.map((s, i) => {
    const angle = startAngle + angleOffset + angleOffset * i;
    return {
      id: s.HBWID,
      name: s.cmmn_nm !== " " ? s.cmmn_nm : s.scntfcn,
      scientificName: s.scntfcn,
      rangeArea: customFormat(s.RANGE_A),
      proportion: format(".2%")(s.PROP_RA),
      taxa: s.taxa,
      imageURL: s.url_sp.startsWith('http') ? s.url_sp : null,
      pointCoordinates: calculateChartPosition(angle, s.PROP_RA),
      color: getDotColor(s.PROP_RA),
      iucnCategory: IUCNList[s.iucn_ct] || '-'
    }
  });
  return chartData;
};

const getData = createSelector(getUniqeSpeciesData, speciesData => {
  if (!speciesData) return null;
  const birdsData =  getChartData(speciesData, 'birds', 0);
  const reptilesData = getChartData(speciesData, 'reptiles', 90);
  const mammalsData = getChartData(speciesData, 'mammals', 180)
  const amphibiansData = getChartData(speciesData, 'amphibians', 270);

  return [...birdsData, ...reptilesData, ...mammalsData, ...amphibiansData];
});

const getSelectedSpeciesData = createSelector([getData, getSelectedSpeciesName],
  (data, selectedSpeciesName) => {
  if (!data) return null;
  
  const selectedSpecies = data.find(({ name }) => name === selectedSpeciesName) || data[0];
  return selectedSpecies;
});

export default createStructuredSelector({
  data: getData,
  terrestrialCellData: getTerrestrialCellData,
  selectedSpeciesData: getSelectedSpeciesData
}); 