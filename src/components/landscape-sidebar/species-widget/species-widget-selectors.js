import { createSelector, createStructuredSelector } from 'reselect';
import { getTerrestrialCellData } from 'selectors/grid-cell-selectors';

const getSpeciesData = ({ speciesData }) => (speciesData && speciesData.data) || null;

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}
const toRadians = (angle) => {
  return angle * (Math.PI / 180);
}

const calculateChartPosition = (minAngle, maxAngle, propRange) => {
  const alphaAngle = getRndInteger(minAngle, maxAngle);
  const betaAngle = 180 - 90 - alphaAngle;

  const c = 100 - propRange * 100; //revert the axis on the chart
  const x = c * Math.sin(toRadians(betaAngle));
  const y = c * Math.cos(toRadians(betaAngle));

  return { x, y };
}

const getReptilesChartData = createSelector(getSpeciesData, speciesData => {
  if (!speciesData) return [];
  
  const data = speciesData.filter(s => s.taxa === 'reptiles').map((s) => {
    return {
      id: s.HBWID,
      name: s.scntfcn,
      rangeArea: s.RANGE_A,
      proportion: s.PROP_RA * 100,
      taxa: s.taxa,
      imageURL: s.url_sp,
      pointCoordinates: calculateChartPosition(91, 179, s.PROP_RA)
    }
  }).slice(0, 9);
  return data;
})

const getBirdsChartData = createSelector(getSpeciesData, speciesData => {
  if (!speciesData) return [];
  
  const data = speciesData.filter(s => s.taxa === 'birds').map((s) => {
    return {
      id: s.HBWID,
      name: s.scntfcn,
      rangeArea: s.RANGE_A,
      proportion: s.PROP_RA * 100,
      taxa: s.taxa,
      imageURL: s.url_sp,
      pointCoordinates: calculateChartPosition(1, 89, s.PROP_RA)
    }
  }).slice(0, 9);
  return data;
})

const getMammalsChartData = createSelector(getSpeciesData, speciesData => {
  if (!speciesData) return [];
  
  const data = speciesData.filter(s => s.taxa === 'mammals').map((s) => {
    return {
      id: s.HBWID,
      name: s.scntfcn,
      rangeArea: s.RANGE_A,
      proportion: s.PROP_RA * 100,
      taxa: s.taxa,
      imageURL: s.url_sp,
      pointCoordinates: calculateChartPosition(181, 269, s.PROP_RA)
    }
  }).slice(0, 9);
  return data;
})

const getAmphibiansChartData = createSelector(getSpeciesData, speciesData => {
  if (!speciesData) return [];
  
  const data = speciesData.filter(s => s.taxa === 'amphibians').map((s) => {
    return {
      id: s.HBWID,
      name: s.scntfcn,
      rangeArea: s.RANGE_A,
      proportion: s.PROP_RA * 100,
      taxa: s.taxa,
      imageURL: s.url_sp,
      pointCoordinates: calculateChartPosition(271, 359, s.PROP_RA)
    }
  }).slice(0, 9);
  return data;
})

const getData = createSelector([getBirdsChartData, getReptilesChartData, getMammalsChartData, getAmphibiansChartData],
  (birdsData, reptilesData, mammalsData, amphibiansData) => {
    // if(!birdsData || !reptilesData) return null;
    return [...birdsData, ...reptilesData, ...mammalsData, ...amphibiansData];
  }
);

export default createStructuredSelector({
  data: getData,
  terrestrialCellData: getTerrestrialCellData,
}); 