import { createSelector, createStructuredSelector } from 'reselect';


const areaChartData = ({ chartData }) => chartData;

const getAreaChartData = createSelector(
  [areaChartData],
  (parsedData) => {
    if (!parsedData) return null;
    const data = parsedData.map((i) => {
      return {
        year: i.year,
        spi: [i.SPI_high, i.SPI_low],
        protected: [i.percentprotected_high, i.percentprotected_low],
      }
    });
    return data;
  }
)

export default createStructuredSelector({
  areaChartData: getAreaChartData,
});
