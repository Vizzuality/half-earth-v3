import { createSelector, createStructuredSelector } from 'reselect';

const getChartData = (state, { chartData }) => chartData;

const parseData = (data) => {
  if (!data) return null;
  const parsedData = data.map((i) => {
    return {
      year: (i.year).toString(),
      spi: [i.SPI_high, i.SPI_low],
      protected: [parseInt(i.percentprotected_high), parseInt(i.percentprotected_low)],
    }
  });
  return parsedData;
}
const getAreaChartData = createSelector(
  [getChartData],
  (chartData) => {
    if (!chartData) return null;
    const { land, marine } = chartData;
    const parsedLandData = parseData(land);
    const parsedMarineData = parseData(marine);
    return { land: parsedLandData, marine: parsedMarineData };
  }
)

export default createStructuredSelector({
  areaChartData: getAreaChartData,
});
