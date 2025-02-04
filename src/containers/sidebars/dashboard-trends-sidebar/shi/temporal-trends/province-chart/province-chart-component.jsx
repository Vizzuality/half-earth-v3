/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import Select from 'react-select';

import { useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';
import last from 'lodash/last';

import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';

import shiProvinceImg from 'images/dashboard/tutorials/shi-province.png?react';

import { SECTION_INFO } from '../../../../dashboard-sidebar/tutorials/sections/sections-info';

import styles from './province-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

function ProvinceChartComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  const {
    setSelectedProvince,
    selectedProvince,
    clickedRegion,
    provinces,
    setClickedRegion,
    shiProvinceTrendData,
    provinceName,
    setProvinceName,
    handleRegionSelected,
    layerView,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [foundIndex, setFoundIndex] = useState(0);
  const [data, setData] = useState();
  const [chartInfo, setChartInfo] = useState();
  const [filteredProvince, setFilteredProvince] = useState();

  const getProvinceScores = (province) => {
    const { region_name } = province;

    setSelectedProvince(province);
    setProvinceName(region_name);
    setFoundIndex(
      shiProvinceTrendData.findIndex(
        (region) => region.region_name === region_name
      )
    );
  };

  const handleProvinceSelected = async (province) => {
    const searchQuery = {
      returnGeometry: true,
      outFields: ['*'],
    };

    const results = await layerView?.queryFeatures(searchQuery);

    const foundRegion = results?.features.filter(
      (feat) => feat.attributes.region_name === province.region_name
    );
    handleRegionSelected({ graphic: foundRegion?.[0] });
    getProvinceScores(province);
    setClickedRegion(null);
  };

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: t('Year'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          maxTicksLimit: 8,
        },
      },
      y: {
        beginAtZero: false,
        display: true,
        title: {
          display: true,
          text: t('Species Habitat Index'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          maxTicksLimit: 10,
        },
      },
    },
  };

  const getChartData = () => {
    const filteredData = shiProvinceTrendData.filter(
      (prov) => prov.region_name === selectedProvince.region_name
    );

    const currentValue = last(filteredData);
    setFilteredProvince(currentValue);

    setData({
      labels: filteredData.map((item) => item.year),
      datasets: [
        {
          label: t('Average Area Score'),
          data: filteredData.map((item) => item.area_score * 100),
          borderColor: getCSSVariable('area'),
        },
        {
          label: t('Average Connectivity Score'),
          data: filteredData.map((item) => item.connectivity * 100),
          borderColor: getCSSVariable('connectivity'),
        },
        {
          label: t('Average Habitat Score'),
          data: filteredData.map((item) => item.habitat_index * 100),
          borderColor: getCSSVariable('habitat'),
        },
      ],
    });
  };

  useEffect(() => {
    setChartInfo({
      title: t('Province View'),
      description: t(SECTION_INFO.SHI_PROVINCE_VIEW),
      imgAlt: t('Species Protection Index - Trends'),
      image: shiProvinceImg,
    });
  }, []);

  useEffect(() => {
    if (selectedProvince && shiProvinceTrendData.length) {
      setIsLoading(false);
      getChartData();
    }
  }, [selectedProvince, shiProvinceTrendData]);

  useEffect(() => {
    if (shiProvinceTrendData.length && provinces.length) {
      if (provinceName) {
        const region = shiProvinceTrendData.find(
          (item) => item.region_name === provinceName
        );
        handleProvinceSelected(region);
      } else if (selectedProvince) {
        handleProvinceSelected(selectedProvince);
      } else {
        handleProvinceSelected(provinces[0]);
      }
    }
  }, [shiProvinceTrendData, provinces]);

  useEffect(() => {
    if (clickedRegion && shiProvinceTrendData.length) {
      const region = provinces.find((item) => {
        return item.region_name === clickedRegion.NAME_1;
      });
      getProvinceScores(region);
    }
  }, [clickedRegion, shiProvinceTrendData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading && (
        <div className={styles.info}>
          <div className={styles.specs}>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="provinces"
              value={shiProvinceTrendData[foundIndex]}
              getOptionLabel={(x) => x.region_name}
              getOptionValue={(x) => x.region_name}
              options={provinces}
              onChange={handleProvinceSelected}
              placeholder={t('Select Region')}
            />
          </div>
          <div className={styles.arcGrid}>
            <div className={styles.values}>
              <b>{filteredProvince.year}</b>
              <span>{t('Year')}</span>
            </div>
            <div className={styles.values}>
              <b>{(filteredProvince.area_score * 100).toFixed(1)}</b>
              <span>{t('Area Component')}</span>
            </div>
            <div className={styles.values}>
              <b>{(filteredProvince.habitat_index * 100).toFixed(1)}</b>
              <span>{t('SHI')}</span>
            </div>
            <div className={styles.values}>
              <b>{(filteredProvince.connectivity * 100).toFixed(1)}</b>
              <span>{t('Connectivity Component')}</span>
            </div>
            <div className={styles.values}>
              <b>{filteredProvince.habitat_index_rank}</b>
              <span>{t('Rank')}</span>
            </div>
            {/* <span />
            <span /> */}
            {/* <span>{t('SHI')}</span> */}
          </div>
        </div>
      )}
      <div className={styles.chart}>
        <div className={styles.legend}>
          <div className={cx(styles.legendBox, styles.habitat)} />
          <span>{t('SHI')}</span>
          <div className={cx(styles.legendBox, styles.area)} />
          <span>{t('Area')}</span>
          <div className={cx(styles.legendBox, styles.connectivity)} />
          <span>{t('Connectivity')}</span>
        </div>
        {data && (
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Line options={options} data={data} />
          </ChartInfoComponent>
        )}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
