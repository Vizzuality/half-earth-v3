/* eslint-disable camelcase */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
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
  const chartRef = useRef(null);
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
    lang,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [foundIndex, setFoundIndex] = useState(0);
  const [bubbleData, setBubbleData] = useState();
  const [chartInfo, setChartInfo] = useState();
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [filteredProvince, setFilteredProvince] = useState();

  const getProvinceScores = (province) => {
    const { region_name } = province;

    setSelectedProvince(province);
    const filteredData = shiProvinceTrendData.filter(
      (prov) => prov.region_name === province.region_name
    );

    const currentValue = last(filteredData);
    setFilteredProvince(currentValue);
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

  const highlightProvinceBubble = (index) => {
    const chart = chartRef.current;

    if (chart && index > -1) {
      if (previousIndex > -1) {
        chart.data.datasets[previousIndex].backgroundColor =
          getCSSVariable('bubble');
      }
      chart.data.datasets[index].backgroundColor =
        getCSSVariable('bubble-selected');
      setPreviousIndex(index);
      chart.update();
    }
  };

  const selectClickedRegion = (elements, chart) => {
    const { datasetIndex } = elements[0];

    const value = bubbleData.datasets[datasetIndex];

    highlightProvinceBubble(datasetIndex, chart);

    handleProvinceSelected(value);
    setFoundIndex(
      provinces.findIndex((prov) => prov.region_name === value.region_name)
    );
  };

  const bubbleOptions = {
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
          text: t('Total Area (1000 km2)'),
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
        },
      },
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        selectClickedRegion(elements, chart);
      }
    },
  };

  const getBubbleChartData = () => {
    const bData = [];
    shiProvinceTrendData.forEach((region) => {
      const { area_km2, habitat_index, region_name } = region;
      bData.push({
        ...region,
        label: region_name,
        data: [{ x: area_km2, y: habitat_index * 100, r: 8 }],
        backgroundColor: getCSSVariable('bubble'),
        borderColor: getCSSVariable('white'),
      });
    });

    setBubbleData({ datasets: bData });
  };

  const updateChartInfo = () => {
    setChartInfo({
      title: t('Province View'),
      description: t(SECTION_INFO.SHI_PROVINCE_VIEW),
      imgAlt: t('Species Protection Index - Trends'),
      image: shiProvinceImg,
    });
  };

  useEffect(() => {
    updateChartInfo();
  }, [lang]);

  useEffect(() => {
    updateChartInfo();
  }, []);

  useEffect(() => {
    if (shiProvinceTrendData.length) {
      setIsLoading(false);
      getBubbleChartData();
    }
  }, [shiProvinceTrendData]);

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
          {filteredProvince && (
            <div className={styles.arcGrid}>
              <div className={styles.values}>
                <b>{filteredProvince?.year}</b>
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
                <b>{filteredProvince?.habitat_index_rank}</b>
                <span>{t('Rank')}</span>
              </div>
              {/* <span />
            <span /> */}
              {/* <span>{t('SHI')}</span> */}
            </div>
          )}
        </div>
      )}
      <div className={styles.chart}>
        {bubbleData && (
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Bubble options={bubbleOptions} data={bubbleData} ref={chartRef} />
          </ChartInfoComponent>
        )}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
