import { createSelector, createStructuredSelector } from 'reselect';

const getChartData = (state, { chartData }) => chartData;

const getAreaChartData = createSelector(
  [getChartData],
  (chartData) => {
    // if (!chartData) return null;
    // const parsedLandData = chartData.land.map((i) => {
    //   return {
    //     year: i.year,
    //     spi: [i.SPI_high, i.SPI_low],
    //     protected: [i.percentprotected_high, i.percentprotected_low],
    //   }
    // });
    // const parsedMarineData = chartData?.marine.map((i) => {
    //   return {
    //     year: i.year,
    //     spi: [i.SPI_high, i.SPI_low],
    //     protected: [i.percentprotected_high, i.percentprotected_low],
    //   }
    // });
    // return { parsedData: { land: parsedLandData, marine: parsedMarineData } };
    return chartData;
  }
)

export default createStructuredSelector({
  areaChartData: getAreaChartData,
});
