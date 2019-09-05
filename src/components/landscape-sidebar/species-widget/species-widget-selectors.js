import { createSelector, createStructuredSelector } from 'reselect';
import { getTerrestrialCellData } from 'selectors/grid-cell-selectors';
import { uniqBy } from "lodash";

const toRadians = (angle) => {
  return angle * (Math.PI / 180);
}

const getSpeciesData = ({ speciesData }) => (speciesData && speciesData.data) || null;

const getUniqeSpeciesData= createSelector(getSpeciesData, speciesData => {
  if (!speciesData) return [];
  return uniqBy(speciesData, 'scntfcn');
})


const calculateChartPosition = (angle, propRange) => {
  // const alphaAngle = getRndInteger(minAngle, maxAngle);
  const betaAngle = 180 - 90 - angle;
  const c = 100 - propRange * 100; //revert the axis on the chart
  const x = Math.round(c * Math.sin(toRadians(betaAngle)));
  const y = Math.round(c * Math.cos(toRadians(betaAngle)));
  
  const correctionX = x > 0 ? x - 3 : x + 3;
  const correctionY = y > 0 ? y - 3 : y + 3;

  return { x: correctionX, y: correctionY };
}

const getChartData = (speciesData, taxa, startAngle)  => {
  const amphibians = speciesData.filter(s => s.taxa === taxa);
  const angleOffset = 88 / (amphibians.length + 1);

  const data = amphibians.map((s, i) => {
    const angle = startAngle + angleOffset + angleOffset * i;
    return {
      id: s.HBWID,
      name: s.scntfcn,
      rangeArea: s.RANGE_A,
      proportion: s.PROP_RA * 100,
      taxa: s.taxa,
      imageURL: s.url_sp,
      pointCoordinates: calculateChartPosition(angle, s.PROP_RA)
    }
  });
  return data;
};

const getData = createSelector(getUniqeSpeciesData, speciesData => {
  if (!speciesData) return null;
  const birdsData =  getChartData(speciesData, 'birds', 0);
  const reptilesData = getChartData(speciesData, 'reptiles', 90);
  const mammalsData = getChartData(speciesData, 'mammals', 180)
  const amphibiansData = getChartData(speciesData, 'amphibians', 270);

  return [...birdsData, ...reptilesData, ...mammalsData, ...amphibiansData];
});

export default createStructuredSelector({
  data: getData,
  terrestrialCellData: getTerrestrialCellData,
}); 