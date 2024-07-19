import React, { useEffect, useState } from 'react';

import cx from 'classnames';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ScoreDistributionsContainer from './score-distributions';
import TemporalTrendsContainer from './temporal-trends';

export const NATIONAL_TREND = 'NATIONAL';
export const PROVINCE_TREND = 'PROVINCE';

function DashboardTrendsSidebar(props) {
  const { countryISO, countryData } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [data, setData] = useState([]);
  const [shiValue, setShiValue] = useState(0);
  const [spiValue, setSpiValue] = useState(0);
  const [siiValue, setSiiValue] = useState(0);

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

    const shiTrendData = apiResponses[0];
    const lastValues = shiTrendData[shiTrendData.length - 1];

    const spiTrendData = apiResponses[2];
    const spiTrendsValues = spiTrendData[0].values;
    const spiValues = spiTrendsValues.spi_values;
    const spi = spiValues[spiValues.length - 1][1];
    setSpiValue(spi);

    const shi = (lastValues.avg_area + lastValues.avg_conn) / 2;
    setShiValue(shi);
    setData(apiResponses);

    const siiTrendData = apiResponses[4];
    setSiiValue((siiTrendData[0].all_taxa_avg * 100).toFixed(2));
  }

  useEffect(() => {
    getData();
  }, [])


  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>
          <b>Conservation Metrics</b>
          <label>Democratic Republic of Congo</label>
        </div>
        <div className={styles.tabs}>
          <button
            type="button"
            aria-label="Species Habitat Index"
            className={cx({
              [styles.selected]: selectedIndex === 1,
            })}
            onClick={() => setSelectedIndex(1)}
          >
            <label>{shiValue}</label>
            <span>Species Habitat Index</span>
          </button>
          <button
            type="button"
            aria-label="Species Protection Index"
            className={cx({
              [styles.selected]: selectedIndex === 2,
            })}
            onClick={() => setSelectedIndex(2)}
          >
            <label>{spiValue}</label>
            <span>Species Protection Index</span>
          </button>
          <button
            type="button"
            aria-label="Species Information Index"
            className={cx({
              [styles.selected]: selectedIndex === 3,
            })}
            onClick={() => setSelectedIndex(3)}
          >
            <label>{siiValue}</label>
            <span>Species Information Index</span>
          </button>
        </div>
      </header>
      <TemporalTrendsContainer
        selectedIndex={selectedIndex}
        countryData={countryData}
        countryISO={countryISO}
        shiTrendData={data?.[0]}
        shiNationalData={data?.[2]}
        spiTrendsData={data?.[2]}
        siiTrendsData={data?.[4]}
      />
      <ScoreDistributionsContainer
        selectedIndex={selectedIndex}
        countryISO={countryISO}
        countryData={countryData}
        shiScoresData={data?.[1]}
        spiScoresData={data?.[3]}
        siiScoresData={data?.[5]}
      />
    </div>
  );
}

export default DashboardTrendsSidebar;
