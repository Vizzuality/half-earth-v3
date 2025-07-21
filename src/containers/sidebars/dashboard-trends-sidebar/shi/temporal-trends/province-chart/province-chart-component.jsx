/* eslint-disable camelcase */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Bubble, Line } from 'react-chartjs-2';
import Select from 'react-select';

import { useLocale, useT } from '@transifex/react';

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

import Button from 'components/button';
import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';

import { SHI_LATEST_YEAR } from 'constants/dashboard-constants.js';

import shiProvinceImg from 'images/dashboard/tutorials/tutorial_shi_provinces-en.png?react';
import shiProvinceFRImg from 'images/dashboard/tutorials/tutorial_shi_provinces-fr.png?react';

import { SECTION_INFO } from '../../../../dashboard-sidebar/tutorials/sections/sections-info';
import compStyles from '../../../dashboard-trends-sidebar-styles.module.scss';

import styles from './province-chart-styles.module.scss';

ChartJS.register(LinearScale, LineElement, PointElement, Tooltip, Legend);

const SCORES = {
  HABITAT_SCORE: 'habitat',
  AREA_SCORE: 'area',
  CONNECTIVITY_SCORE: 'connectivity',
};

function ProvinceChartComponent(props) {
  const bubbleDataCountryList = ['EE', 'GUY-FM'];
  const t = useT();
  const shiStartYear = 2001;
  const locale = useLocale();
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
    countryISO,
  } = props;

  const [isLoading, setIsLoading] = useState(true);
  const [foundIndex, setFoundIndex] = useState(0);
  const [bubbleData, setBubbleData] = useState();
  const [lineData, setLineData] = useState();
  const [provinceList, setProvinceList] = useState([]);
  const [chartInfo, setChartInfo] = useState();
  const [activeScore, setActiveScore] = useState(SCORES.HABITAT_SCORE);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [filteredProvince, setFilteredProvince] = useState();

  const getLineData = (name) => {
    const filteredData = shiProvinceTrendData.filter(
      (item) =>
        item.name === name &&
        item.year >= shiStartYear &&
        item.year <= SHI_LATEST_YEAR
    );

    setLineData({
      labels: filteredData.map((item) => item.year),
      datasets: [
        {
          label: t('Average Area Score'),
          data: filteredData.map((item) => item.area_score),
          borderColor: getCSSVariable('area'),
        },
        {
          label: t('Average Connectivity Score'),
          data: filteredData.map((item) => item.connectivity_score),
          borderColor: getCSSVariable('connectivity'),
        },
        {
          label: t('Average Habitat Score'),
          data: filteredData.map(
            (item) =>
              (parseFloat(item.area_score) +
                parseFloat(item.connectivity_score)) /
              2
          ),
          borderColor: getCSSVariable('habitat'),
        },
      ],
    });
  };

  const getProvinceScores = (province) => {
    const shiProvinceValue = shiProvinceTrendData.find(
      (item) => item.name === province.name && item.year === SHI_LATEST_YEAR
    );

    const { name } = shiProvinceValue;

    setSelectedProvince(shiProvinceValue);
    setFilteredProvince(shiProvinceValue);
    setProvinceName(name);

    const provinceSet = new Set();
    provinces.forEach((item) => {
      if (item.name && item.iso3 !== item.region_key) {
        provinceSet.add(JSON.stringify({ name: item.name }));
      }
    });
    const uniqueProvinces = Array.from(provinceSet).map((item) =>
      JSON.parse(item)
    );
    setProvinceList(uniqueProvinces);
    setFoundIndex(uniqueProvinces.findIndex((region) => region.name === name));

    getLineData(name);
  };

  const updateBubbleChartData = (score) => {
    const bData = [];
    if (bubbleDataCountryList.includes(countryISO)) {
      shiProvinceTrendData.forEach((region) => {
        const {
          area_km2,
          habitat_index,
          region_name,
          area_score,
          connectivity,
        } = region;

        let yValue = habitat_index;

        if (score === SCORES.AREA_SCORE) {
          yValue = area_score;
        } else if (score === SCORES.CONNECTIVITY_SCORE) {
          yValue = connectivity;
        }

        bData.push({
          ...region,
          label: region_name,
          data: [{ x: area_km2, y: yValue * 100, r: 8 }],
          backgroundColor: getCSSVariable('bubble'),
          borderColor: getCSSVariable('white'),
        });
      });

      setBubbleData({ datasets: bData });
    }
  };

  const handleActiveChange = (score) => {
    setActiveScore(score);
    updateBubbleChartData(score);
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

  const handleProvinceSelected = async (province) => {
    const searchQuery = {
      returnGeometry: true,
      outFields: ['*'],
    };

    const results = await layerView?.queryFeatures(searchQuery);

    // const foundRegion = results?.features.filter(
    //   (feat) => feat.attributes.region_name === province.name
    // );

    const foundRegion = results?.features.filter(
      (feat) =>
        (feat.attributes.NAME_1 ?? feat.attributes.region_nam) === province.name
    );

    handleRegionSelected({ graphic: foundRegion?.[0] });
    getProvinceScores(province);
    setClickedRegion(null);

    if (countryISO === 'EE' || countryISO === 'GUY-FM') {
      const foundIdx = bubbleData?.datasets.findIndex(
        (item) => item.region_name === province.region_name
      );
      highlightProvinceBubble(foundIdx);
    }
  };

  const selectClickedRegion = (elements, chart) => {
    const { datasetIndex } = elements[0];

    const value = bubbleData.datasets[datasetIndex];

    highlightProvinceBubble(datasetIndex, chart);

    handleProvinceSelected(value);
    setFoundIndex(provinces.findIndex((prov) => prov.name === value.name));
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
        min: 90,
        max: 100,
      },
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        selectClickedRegion(elements, chart);
      }
    },
  };

  const lineOptions = {
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

  const updateChartInfo = () => {
    setChartInfo({
      title: t('Province View'),
      description: t(SECTION_INFO.SHI_PROVINCE_VIEW),
      imgAlt: t('Species Protection Index - Trends'),
      image: locale === 'fr' ? shiProvinceFRImg : shiProvinceImg,
    });
  };

  useEffect(() => {
    if (!lang) return;
    updateChartInfo();
  }, [lang]);

  useEffect(() => {
    updateChartInfo();
  }, []);

  useEffect(() => {
    if (shiProvinceTrendData.length) {
      setIsLoading(false);
      updateBubbleChartData(SCORES.HABITAT_SCORE);
    }
  }, [shiProvinceTrendData]);

  useEffect(() => {
    if (shiProvinceTrendData.length && provinces.length) {
      if (provinceName) {
        // const region = shiProvinceTrendData.find(
        //   (item) => item.name === provinceName
        // );

        const region = shiProvinceTrendData.find(
          (item) => item.name === provinceName && item.year === SHI_LATEST_YEAR
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
    if (selectedProvince && !clickedRegion) {
      setFoundIndex(
        provinces.findIndex((prov) => prov.name === selectedProvince.name)
      );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (clickedRegion && shiProvinceTrendData.length) {
      const region = provinces.find((item) => {
        return item.name === clickedRegion.NAME_1;
      });
      getProvinceScores(region);

      const foundIdx = bubbleData?.datasets.findIndex(
        (item) => item.region_name === clickedRegion.NAME_1
      );
      if (foundIdx) {
        highlightProvinceBubble(foundIdx);
      }
    }
  }, [clickedRegion, shiProvinceTrendData]);

  useEffect(() => {
    if (selectedProvince && bubbleData) {
      const foundIdx = bubbleData?.datasets.findIndex(
        (item) => item.region_name === selectedProvince.region_name
      );
      highlightProvinceBubble(foundIdx);
    }
  }, [selectedProvince, bubbleData]);

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
              value={provinceList[foundIndex]}
              getOptionLabel={(x) => x.name}
              getOptionValue={(x) => x.name}
              options={provinceList}
              onChange={handleProvinceSelected}
              placeholder={t('Select Region')}
            />
          </div>
          {filteredProvince && (
            <div className={styles.arcGrid}>
              <div className={styles.values}>
                <b>{filteredProvince?.year + 1}</b>
                <span>{t('Year')}</span>
              </div>
              <div className={styles.values}>
                <b>{filteredProvince.area_score.toFixed(1)}</b>
                <span>{t('Area Component')}</span>
              </div>
              <div className={styles.values}>
                <b>{filteredProvince.habitat_index.toFixed(1)}</b>
                <span>{t('SHI')}</span>
              </div>
              <div className={styles.values}>
                <b>{filteredProvince.connectivity_score.toFixed(1)}</b>
                <span>{t('Connectivity Component')}</span>
              </div>
              <div className={styles.values}>
                <b>{filteredProvince?.shi_rank}</b>
                <span>{t('Rank')}</span>
              </div>
              {/* <span />
            <span /> */}
              {/* <span>{t('SHI')}</span> */}
            </div>
          )}
        </div>
      )}
      {bubbleDataCountryList.includes(countryISO) && bubbleData && (
        <>
          <div className={cx(styles.btnGroup, compStyles.btnGroup)}>
            <Button
              type="rectangular"
              className={cx(compStyles.saveButton, {
                [compStyles.notActive]: activeScore !== SCORES.HABITAT_SCORE,
              })}
              label={t('Habitat Index')}
              handleClick={() => handleActiveChange(SCORES.HABITAT_SCORE)}
            />
            <Button
              type="rectangular"
              className={cx(compStyles.saveButton, {
                [compStyles.notActive]: activeScore !== SCORES.AREA_SCORE,
              })}
              label={t('Area Component')}
              handleClick={() => handleActiveChange(SCORES.AREA_SCORE)}
            />
            <Button
              type="rectangular"
              className={cx(compStyles.saveButton, {
                [compStyles.notActive]:
                  activeScore !== SCORES.CONNECTIVITY_SCORE,
              })}
              label={t('Connectivity Component')}
              handleClick={() => handleActiveChange(SCORES.CONNECTIVITY_SCORE)}
            />
          </div>
          <div className={styles.chart}>
            <ChartInfoComponent chartInfo={chartInfo} {...props}>
              <Bubble
                options={bubbleOptions}
                data={bubbleData}
                ref={chartRef}
              />
            </ChartInfoComponent>
          </div>
        </>
      )}
      {!bubbleDataCountryList.includes(countryISO) && lineData && (
        <div className={styles.chart}>
          <div className={styles.legend}>
            <div className={cx(styles.legendBox, styles.habitat)} />
            <span>{t('Habitat Score')}</span>
            <div className={cx(styles.legendBox, styles.area)} />
            <span>{t('Area Score')}</span>
            <div className={cx(styles.legendBox, styles.connectivity)} />
            <span>{t('Connectivity Score')}</span>
          </div>

          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Line options={lineOptions} data={lineData} />
          </ChartInfoComponent>
        </div>
      )}
    </div>
  );
}

export default ProvinceChartComponent;
