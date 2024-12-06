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
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import cx from 'classnames';
import { Loading } from 'he-components';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import { LightModeContext } from '../../../../../../context/light-mode';

import styles from './province-chart-styles.module.scss';

ChartJS.register(LinearScale, ArcElement, PointElement, Tooltip, Legend);

function ProvinceChartComponent(props) {
  const t = useT();
  const chartRef = useRef(null);
  const { lightMode } = useContext(LightModeContext);
  const {
    spiData,
    setSelectedProvince,
    countryRegions,
    selectedProvince,
    clickedRegion,
    sortedBySpi,
    sortedByArea,
    sortedBySpecies,
    provinces,
    provinceName,
    setProvinceName,
    handleRegionSelected,
    layerView,
    allSorted,
  } = props;

  const blankData = {
    labels: [t('Global SPI'), t('Remaining')],
    datasets: [
      {
        label: '',
        data: [0, 0],
        backgroundColor: [
          getCSSVariable('temporal-spi'),
          getCSSVariable('white-opacity-20'),
        ],
        borderColor: [
          getCSSVariable('temporal-spi'),
          getCSSVariable('white-opacity-20'),
        ],
        borderWidth: 1,
      },
    ],
  };

  const [bubbleData, setBubbleData] = useState();
  const [currentYear, setCurrentYear] = useState();
  const [spiArcData, setSpiArcData] = useState(blankData);
  const [countrySPI, setCountrySPI] = useState();
  const [countryProtected, setCountryProtected] = useState();
  const [spiRank, setSpiRank] = useState(0);
  const [areaRank, setAreaRank] = useState(0);
  const [speciesRank, setSpeciesRank] = useState(0);
  const [selectedRegionScores, setSelectedRegionScores] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [foundIndex, setFoundIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);

  const getChartData = () => {
    const { regions } = spiData.trendData[0];

    const data = [];
    let lastYear = 2001;
    regions.forEach((region) => {
      const { regional_scores, region_name } = region;
      const { region_area, spi_all, year } =
        regional_scores[regional_scores.length - 1];
      data.push({
        label: region_name,
        data: [{ label: region_name, x: region_area, y: spi_all, r: 10 }],
        backgroundColor: getCSSVariable('birds'),
      });

      if (year > lastYear) {
        lastYear = year;
      }
    });

    setCurrentYear(lastYear);
    setBubbleData({ datasets: data });
  };

  const highlightProvinceBubble = (index) => {
    const chart = chartRef.current;

    if (chart && index > -1) {
      if (previousIndex > -1) {
        chart.data.datasets[previousIndex].backgroundColor =
          getCSSVariable('birds');
      }
      chart.data.datasets[index].backgroundColor = '#18bab4';
      setPreviousIndex(index);
      chart.update();
    }
  };

  const getProvinceScores = (province) => {
    setProvinceName(province.value);
    setSpiRank(
      sortedBySpi.findIndex((prov) => prov.region_name === province.value) + 1
    );
    setAreaRank(
      sortedByArea.findIndex((prov) => prov.region_name === province.value) + 1
    );
    setSpeciesRank(
      sortedBySpecies.findIndex((prov) => prov.region_name === province.value) +
        1
    );
    setFoundIndex(
      provinces.findIndex((region) => region.value === province.value)
    );

    const foundRegion = countryRegions.filter(
      (region) => region.region_name === province.value
    );
    if (foundRegion.length) {
      const scores =
        foundRegion[0].regional_scores[
          foundRegion[0].regional_scores.length - 1
        ];
      setSelectedProvince(foundRegion[0]);
      setSelectedRegionScores(scores);
      setCountryProtected(scores.percentprotected_all);
      setCountrySPI(scores.spi_all);
      setCurrentYear(scores.year);

      const spi = {
        labels: [t('Global SPI'), t('Remaining')],
        datasets: [
          {
            label: '',
            data: [scores.spi_all, 100 - scores.spi_all],
            backgroundColor: [
              getCSSVariable('temporal-spi'),
              getCSSVariable('white-opacity-20'),
            ],
            borderColor: [
              getCSSVariable('temporal-spi'),
              getCSSVariable('white-opacity-20'),
            ],
            borderWidth: 1,
          },
        ],
      };

      setSpiArcData(spi);
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
        (feat.attributes.NAME_1 ?? feat.attributes.region_name) ===
        province.value
    );
    handleRegionSelected({ graphic: foundRegion?.[0] });
    getProvinceScores(province);

    const foundIdx = bubbleData?.datasets.findIndex(
      (item) => item.label === province.value
    );
    highlightProvinceBubble(foundIdx);
  };

  const selectClickedRegion = (elements, chart) => {
    const { datasetIndex } = elements[0];
    const dataIndex = elements[0].index;

    const value = bubbleData.datasets[datasetIndex].data[dataIndex];

    highlightProvinceBubble(datasetIndex, chart);

    handleProvinceSelected({ value: value.label });
    setFoundIndex(provinces.findIndex((prov) => prov.value === value.label));
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
          text: t('Total Area (1000 km2)'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
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

  useEffect(() => {
    if (!spiData.trendData.length) return;
    setIsLoading(false);

    const { country_scores } = spiData.trendData[0];
    const { spi_all, percentprotected_all } =
      country_scores[country_scores.length - 1];

    setCountrySPI(spi_all);
    setCountryProtected(percentprotected_all);
    getChartData();

    const spi = {
      labels: [t('Global SPI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [spi_all, 100 - spi_all],
          backgroundColor: [
            getCSSVariable('temporal-spi'),
            getCSSVariable('white-opacity-20'),
          ],
          borderColor: [
            getCSSVariable('temporal-spi'),
            getCSSVariable('white-opacity-20'),
          ],
          borderWidth: 1,
        },
      ],
    };

    setSpiArcData(spi);
  }, [spiData.trendData]);

  useEffect(() => {
    if (allSorted && provinces.length && bubbleData && !selectedProvince) {
      if (provinceName) {
        handleProvinceSelected({ value: provinceName });
      } else {
        handleProvinceSelected({ value: provinces[0].value });
      }
    }
  }, [allSorted, provinces, bubbleData]);

  useEffect(() => {
    if (sortedBySpecies?.length && selectedProvince) {
      handleProvinceSelected({ value: selectedProvince.region_name });
      setFoundIndex(
        provinces.findIndex(
          (prov) => prov.value === selectedProvince.region_name
        )
      );
    }
  }, [sortedBySpecies]);

  useEffect(() => {
    if (clickedRegion && countryRegions.length && allSorted) {
      getProvinceScores({
        value: clickedRegion.NAME_1 ?? clickedRegion.region_name,
      });

      const foundIdx = bubbleData?.datasets.findIndex(
        (item) =>
          item.label === (clickedRegion.NAME_1 ?? clickedRegion.region_name)
      );
      if (foundIdx) {
        highlightProvinceBubble(foundIdx);
      }
    }
  }, [clickedRegion, countryRegions, allSorted]);

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
              value={provinces[foundIndex]}
              getOptionLabel={(x) => x.label}
              getOptionValue={(x) => x.value}
              options={provinces}
              onChange={handleProvinceSelected}
              placeholder={t('Select Region')}
            />
            {selectedRegionScores && (
              <>
                <span>
                  <b>#{spiRank}</b> {t('in SPI')}
                </span>
                <span>
                  <b>#{speciesRank}</b> {t('in vertebrate species richness')}
                </span>
                <span>
                  <b>#{areaRank}</b> {t('in size')}
                </span>
              </>
            )}
          </div>
          <div className={styles.arcGrid}>
            <div className={styles.values}>
              <b>{currentYear}</b>
              <span>{t('Year')}</span>
            </div>
            <SpiArcChartComponent
              width="125x"
              height="75px"
              data={spiArcData}
              value={countrySPI}
            />
            <div className={styles.values}>
              <b>{countryProtected?.toFixed(2)}</b>
              <span>{t('SPI')}</span>
            </div>
            <span />
            <span>{t('Area Protected')}</span>
          </div>
        </div>
      )}
      <div className={styles.chart}>
        {bubbleData && (
          <Bubble options={options} data={bubbleData} ref={chartRef} />
        )}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
