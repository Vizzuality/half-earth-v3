import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Component from './dashboard-trends-sidebar-component.jsx';
import mapStateToProps from './selectors';

function DashboardTrendsSidebarContainer(props) {
  const { countryISO } = props;

  const [shiValue, setShiValue] = useState(0);
  const [spiValue, setSpiValue] = useState(0);
  const [siiValue, setSiiValue] = useState(0);

  const [shiData, setShiData] = useState({trendData: [], scoresData: []});
  const [spiData, setSpiData] = useState({trendData: [], scoresData: []});
  const [siiData, setSiiData] = useState({trendData: [], scoresData: []});

  const getData = async () => {
    const year = '2021';
    const regionId = '90b03e87-3880-4164-a310-339994e3f919';
    const taxa = 'all_terr_verts';

    // SHI calls
    const shiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/shs/trend?iso=${countryISO}`;
    const shiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/shs/values?iso=${countryISO}&year=${year}`;

    // SPI calls
    const spiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/nrc?region_id=${regionId}&taxa=${taxa}`;
    const spiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/values?iso=${countryISO}&year=${year}&taxa=${taxa}`;

    // SII calls
    const siiTrendsUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/completeness?region_id=${regionId}&indicator=richness&version=2020&weight=national`;
    const siiScoresUrl = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/sps/values?iso=${countryISO}&year=${year}&taxa=${taxa}`;

    const apiCalls = [shiTrendsUrl, shiScoresUrl, spiTrendsUrl, spiScoresUrl, siiTrendsUrl, siiScoresUrl];

    const apiResponses = await Promise.all(apiCalls.map(async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    }));

    const [shiTrendData, shiScoresData, spiTrendData, spiScoresData, siiTrendData, siiScoresData] = apiResponses;

    const shiTD = shiTrendData;
    const lastValues = shiTD[shiTD.length - 1];
    const shi = ((lastValues.avg_area + lastValues.avg_conn) / 2).toFixed(2);
    setShiValue(shi);

    const spiTD = spiTrendData;
    const spiTrendsValues = spiTD[0].values;
    const spiValues = spiTrendsValues.spi_values;
    const spi = spiValues[spiValues.length - 1][1];
    setSpiValue(spi);

    const siiTD = siiTrendData;
    setSiiValue((siiTD[0].all_taxa_avg * 100).toFixed(2));

    setShiData({trendData: shiTrendData, scoresData: shiScoresData});
    setSpiData({trendData: spiTrendData, scoresData: spiScoresData});
    setSiiData({trendData: siiTrendData, scoresData: siiScoresData});
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Component
      countryISO={countryISO}
      shiValue={shiValue}
      spiValue={spiValue}
      siiValue={siiValue}
      shiData={shiData}
      spiData={spiData}
      siiData={siiData}
      {...props}
    />
  );
}

export default connect(mapStateToProps, null)(DashboardTrendsSidebarContainer);
