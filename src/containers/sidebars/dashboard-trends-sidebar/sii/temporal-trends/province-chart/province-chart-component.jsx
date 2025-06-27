/* eslint-disable camelcase */
import { last } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Bubble, Line } from 'react-chartjs-2';
import Select from 'react-select';

import { useLocale, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';
import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import { SII_LATEST_YEAR } from 'constants/dashboard-constants.js';

import siiProvinceImg from 'images/dashboard/tutorials/tutorial_spi_provinces-en.png?react';
import siiProvinceFRImg from 'images/dashboard/tutorials/tutorial_spi_provinces-fr.png?react';

import { SECTION_INFO } from '../../../../dashboard-sidebar/tutorials/sections/sections-info';

import styles from './province-chart-styles.module.scss';

ChartJS.register(LinearScale, ArcElement, PointElement, Tooltip, Legend);

function ProvinceChartComponent(props) {
  const bubbleDataCountryList = ['EE', 'GUY-FM'];
  const t = useT();
  const locale = useLocale();
  const chartRef = useRef(null);
  const { lightMode } = useContext(LightModeContext);
  const {
    setSelectedProvince,
    selectedProvince,
    clickedRegion,
    setClickedRegion,
    provinces,
    provinceName,
    setProvinceName,
    handleRegionSelected,
    layerView,
    countryISO,
    lang,
  } = props;

  const blankData = {
    labels: [t('Global SII'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [
          getCSSVariable('bubble'),
          getCSSVariable('white-opacity-20'),
        ],
        borderColor: [
          getCSSVariable('bubble'),
          getCSSVariable('white-opacity-20'),
        ],
        borderWidth: 1,
      },
    ],
  };

  const [bubbleData, setBubbleData] = useState();
  const [lineData, setLineData] = useState();
  const [currentYear, setCurrentYear] = useState(SII_LATEST_YEAR);
  const [siiArcData, setSiiArcData] = useState(blankData);
  const [countrySII, setCountrySII] = useState();
  const [siiRank, setSiiRank] = useState(0);
  const [areaRank, setAreaRank] = useState(0);
  const [speciesRank, setSpeciesRank] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [foundIndex, setFoundIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [percentAreaProtected, setPercentAreaProtected] = useState(0);
  const [chartInfo, setChartInfo] = useState();
  const [provinceList, setProvinceList] = useState([]);

  let lastProvinceValue;

  const getLastValurForProvince = (provName) => {
    if (!provinces || provinces.length === 0) return null;
    return last(provinces.filter((prov) => prov.name === provName));
  };

  const getChartData = (name) => {
    const data = [];

    if (bubbleDataCountryList.includes(countryISO)) {
      provinces.forEach((region) => {
        const { AreaProtected, SII, region_name } = region;
        data.push({
          ...region,
          label: region_name,
          data: [{ x: AreaProtected, y: SII, r: 8 }],
          backgroundColor: getCSSVariable('bubble'),
          borderColor: getCSSVariable('white'),
        });
      });

      setBubbleData({ datasets: data });
    } else {
      const selectedProvinceName = name;

      const provinceData = provinces
        .filter((prov) => prov.name === selectedProvinceName)
        .map((item) => ({
          year: item.year,
          sii: item.sii,
          name: item.name,
          percentAreaProtected: (item.area_protected / item.area_km2) * 100,
        }));

      setLineData({
        labels: provinceData.map((item) => item.year),
        datasets: [
          {
            label: 'SII',
            data: provinceData.map((item) => item.sii),
            borderColor: getCSSVariable('bubble'),
          },
        ],
      });
    }
  };

  const getProvinceScores = (province) => {
    lastProvinceValue = getLastValurForProvince(province.name);

    const {
      sii,
      area_km2,
      // Area protected value
      area_protected,
      name,
      sii_rank,
      size_rank,
      year,
      richness_vert_sii_rank,
    } = lastProvinceValue;

    setSelectedProvince(lastProvinceValue);
    setProvinceName(name);
    setSiiRank(sii_rank);
    setAreaRank(size_rank);
    setSpeciesRank(richness_vert_sii_rank);
    setPercentAreaProtected((area_protected / area_km2) * 100);
    setCountrySII(sii);
    setCurrentYear(year);

    const siiArc = {
      labels: [t('Global SII'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [sii, 100 - sii],
          backgroundColor: [
            getCSSVariable('bubble'),
            getCSSVariable('white-opacity-20'),
          ],
          borderColor: [
            getCSSVariable('bubble'),
            getCSSVariable('white-opacity-20'),
          ],
          borderWidth: 1,
        },
      ],
    };

    setSiiArcData(siiArc);

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

    // EE and COD could use region name
    setFoundIndex(uniqueProvinces.findIndex((region) => region.name === name));

    getChartData(name);
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

  const updateChartInfo = () => {
    setChartInfo({
      title: t('Province View'),
      description: t(SECTION_INFO.SII_PROVINCE_VIEW),
      imgAlt: t('Species Protection Index - Trends'),
      image: locale === 'fr' ? siiProvinceFRImg : siiProvinceImg,
    });
  };

  useEffect(() => {
    if (!lang) return;
    updateChartInfo();
  }, [lang]);

  useEffect(() => {
    updateChartInfo();
  }, []);

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
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: t('Species Protection Index'),
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
        },
      },
      y: {
        beginAtZero: true,
        display: true,
        title: {
          display: true,
          text: t('SII / Percent of Area Protected'),
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
  };

  useEffect(() => {
    if (provinces.length === 0) return;
    setIsLoading(false);

    if (countryISO === 'EE' || countryISO === 'GUY-FM') {
      getChartData();
    } else if (!selectedProvince) {
      handleProvinceSelected(provinces[0]);
    }
  }, [provinces]);

  useEffect(() => {
    if (provinces.length && bubbleData && !clickedRegion) {
      if (provinceName) {
        const region = provinces.find((item) => item.name === provinceName);
        handleProvinceSelected(region);
      } else if (selectedProvince) {
        handleProvinceSelected(selectedProvince);
      } else {
        handleProvinceSelected(provinces[0]);
      }
    }
  }, [provinces, bubbleData]);

  useEffect(() => {
    if (selectedProvince && !clickedRegion) {
      handleProvinceSelected(selectedProvince);
      setFoundIndex(
        provinces.findIndex((prov) => prov.name === selectedProvince.name)
      );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (clickedRegion && provinces.length) {
      const region = provinces.find(
        (item) => item.name === clickedRegion.NAME_1
      );
      getProvinceScores(region);

      const foundIdx = bubbleData?.datasets.findIndex(
        (item) => item.name === clickedRegion.NAME_1
      );
      if (foundIdx) {
        highlightProvinceBubble(foundIdx);
      }
    }
  }, [clickedRegion, provinces]);

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
            <span>
              <b>#{siiRank}</b> {t('in SII')}
            </span>
            <span>
              <b>#{speciesRank}</b> {t('in vertebrate species richness')}
            </span>
            <span>
              <b>#{areaRank}</b> {t('in size')}
            </span>
          </div>
          <div className={styles.arcGrid}>
            <div className={styles.values}>
              <b>{currentYear}</b>
              <span>{t('Year')}</span>
            </div>
            <SpiArcChartComponent
              width="125x"
              height="75px"
              data={siiArcData}
              value={countrySII}
            />
            <div className={styles.values}>
              <b>{percentAreaProtected.toFixed(1)}%</b>
              <span>{t('Area Protected')}</span>
            </div>
            <span />
            <span style={{ alignSelf: 'baseline' }}>{t('SII')}</span>
          </div>
        </div>
      )}
      <div className={styles.chart}>
        {bubbleDataCountryList.includes(countryISO) && bubbleData && (
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Bubble options={options} data={bubbleData} ref={chartRef} />
          </ChartInfoComponent>
        )}
        {!bubbleDataCountryList.includes(countryISO) && lineData && (
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <Line options={lineOptions} data={lineData} />
          </ChartInfoComponent>
        )}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
