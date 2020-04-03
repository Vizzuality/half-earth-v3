import { createSelector } from 'reselect';
import { format } from 'd3-format';

const selectCountryData = ({ countryData }, { countryISO }) => (countryData && countryData.data && countryData.data[countryISO]) || null;
const selectCountryDataLoading = ({ countryData }) => (countryData && countryData.loading) || null;

const getArea = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  console.log(countryData)
  const { Area } = countryData;
  const areaFormat = format(",.0f");
  const formatedArea = `${areaFormat(Area)}`;
  return formatedArea;
})

const getPopulation = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { Population2016 } = countryData;
  const valueFormat = population => {
    if (population < 1000000) {
      return population.toLocaleString('en');
    }
    return format(".2f")(population / 1e6);
  };
  const unitFormat = population => {
    if (population > 1000000) {
      return 'million';
    }
    return '';
  }
  const formatedPopulation = `${valueFormat(Population2016)} ${unitFormat(Population2016)} people`;
  return formatedPopulation;
})

const getGrossNationalIncome = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  const { GNI_PPP } = countryData;
  if (!GNI_PPP) return 'data not available'
  const GNIFormat = format("$,.2f");
  const formatedGNI = `${GNIFormat(GNI_PPP)} billion`;
  return formatedGNI;
})

const getDescription = createSelector(selectCountryData, countryData => {
  if (!countryData) return null;
  return countryData.sentence;
})

const mapStateToProps = (state, props) => ({
    countryData: selectCountryData(state, props),
    countryDataLoading: selectCountryDataLoading(state, props),
    countryArea: getArea(state, props),
    countryPopulation: getPopulation(state, props),
    grossNationalIncome: getGrossNationalIncome(state, props),
    countryDescription: getDescription(state, props)
  }
)
export default mapStateToProps;