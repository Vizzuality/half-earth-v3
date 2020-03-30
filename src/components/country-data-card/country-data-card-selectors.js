import { createStructuredSelector, createSelector } from 'reselect';
import { format } from 'd3-format';

const selectCountryData = ({ countryData }) => (countryData && countryData.data) || null;

const getName = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.NAME_0
})

const getArea = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { Area } = countryData;
  const areaFormat = format(",.0f");
  const formatedArea = `${areaFormat(Area)} km2`;
  return formatedArea;
})

const getPopulation = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { Population2016 } = countryData;
  const populationFormat = (population) => format(".2f")(population / 1e6);
  const formatedPopulation = `${populationFormat(Population2016)} million`;
  return formatedPopulation;
})

const getGrossNationalIncome = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { GNI_PPP } = countryData;
  const GNIFormat = format("$,.2f");
  const formatedGNI = `${GNIFormat(GNI_PPP)} billion`;
  return formatedGNI;
})

const getDescription = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.sentence;
})


export default createStructuredSelector({
  countryData: selectCountryData,
  countryName: getName,
  countryArea: getArea,
  countryPopulation: getPopulation,
  grossNationalIncome: getGrossNationalIncome,
  countryDescription: getDescription
})