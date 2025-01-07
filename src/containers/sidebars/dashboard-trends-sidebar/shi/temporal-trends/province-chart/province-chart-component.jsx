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

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import SHILegend from '../../../../../../assets/images/dashboard/shi_legend.png';

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

  const emptyArcColor = lightMode
    ? getCSSVariable('dark-opacity')
    : getCSSVariable('white-opacity-20');
  const blankData = {
    labels: [t('Global SPI'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [getCSSVariable('habitat'), emptyArcColor],
        borderColor: [getCSSVariable('habitat'), emptyArcColor],
        borderWidth: 1,
      },
    ],
  };
  const [shiData, setShiData] = useState(blankData);

  const [isLoading, setIsLoading] = useState(true);
  const [foundIndex, setFoundIndex] = useState(0);
  const [data, setData] = useState();
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
      (feat) =>
        (feat.attributes.NAME_1 ?? feat.attributes.region_nam) ===
        province.region_name
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

    const shi = {
      labels: [t('Global SHI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [
            currentValue.shi_clipped_scaled,
            100 - currentValue.shi_clipped_scaled,
          ],
          backgroundColor: [getCSSVariable('habitat'), emptyArcColor],
          borderColor: [getCSSVariable('habitat'), emptyArcColor],
          borderWidth: 1,
        },
      ],
    };
    setShiData(shi);

    setData({
      labels: filteredData.map((item) => item.year),
      datasets: [
        {
          label: t('Average Area Score'),
          data: filteredData.map((item) => item.area_clipped_scaled),
          borderColor: getCSSVariable('area'),
        },
        {
          label: t('Average Connectivity Score'),
          data: filteredData.map((item) => item.connectivity_clipped_scaled),
          borderColor: getCSSVariable('connectivity'),
        },
        {
          label: t('Average Habitat Score'),
          data: filteredData.map((item) => item.shi_clipped_scaled),
          borderColor: getCSSVariable('habitat'),
        },
      ],
    });
  };

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
              <b>{filteredProvince.area_clipped_scaled.toFixed(1)}</b>
              <span>{t('Area Score')}</span>
            </div>
            <SpiArcChartComponent
              width="125x"
              height="75px"
              data={shiData}
              value={filteredProvince.shi_clipped_scaled}
            />
            <div className={styles.values}>
              <b>{filteredProvince.connectivity_clipped_scaled.toFixed(1)}</b>
              <span>{t('Connectivity Score')}</span>
            </div>
            <div className={styles.values}>
              <b>{filteredProvince.habitat_index_rank}</b>
              <span>{t('Rank')}</span>
            </div>
            <span />
            <span />
            <span>{t('SHI')}</span>
          </div>
        </div>
      )}
      <div className={styles.chart}>
        <div className={styles.mapLegend}>
          <img src={SHILegend} alt="spi-legend" />
          <div className={styles.legendValues}>
            <span>0</span>
            <span>100</span>
          </div>
        </div>
        <div className={styles.legend}>
          <div className={cx(styles.legendBox, styles.habitat)} />
          <span>{t('Habitat Score')}</span>
          <div className={cx(styles.legendBox, styles.area)} />
          <span>{t('Area Score')}</span>
          <div className={cx(styles.legendBox, styles.connectivity)} />
          <span>{t('Connectivity Score')}</span>
        </div>
        {data && <Line options={options} data={data} />}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
