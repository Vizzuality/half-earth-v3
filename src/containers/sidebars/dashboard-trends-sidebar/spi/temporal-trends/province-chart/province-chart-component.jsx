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
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import { SPI_LATEST_YEAR } from 'constants/dashboard-constants.js';

import SPILegend from '../../../../../../assets/images/dashboard/spi_legend.png';

import styles from './province-chart-styles.module.scss';

ChartJS.register(LinearScale, ArcElement, PointElement, Tooltip, Legend);

function ProvinceChartComponent(props) {
  const t = useT();
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
  } = props;

  const blankData = {
    labels: [t('Global SPI'), t('Remaining')],
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
  const [currentYear, setCurrentYear] = useState(SPI_LATEST_YEAR);
  const [spiArcData, setSpiArcData] = useState(blankData);
  const [countrySPI, setCountrySPI] = useState();
  const [spiRank, setSpiRank] = useState(0);
  const [areaRank, setAreaRank] = useState(0);
  const [speciesRank, setSpeciesRank] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [foundIndex, setFoundIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(-1);
  const [percentAreaProtected, setPercentAreaProtected] = useState(0);

  const getChartData = () => {
    const data = [];
    provinces.forEach((region) => {
      const { AreaProtected, SPI, region_name } = region;
      data.push({
        ...region,
        label: region_name,
        data: [{ x: AreaProtected, y: SPI, r: 8 }],
        backgroundColor: getCSSVariable('bubble'),
        borderColor: getCSSVariable('white'),
      });
    });

    setBubbleData({ datasets: data });
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

  const getProvinceScores = (province) => {
    const {
      SPI,
      AreaProtected,
      Area,
      region_name,
      SPIRanking,
      SizeRanking,
      SpeciesRichnessRanking,
    } = province;

    setSelectedProvince(province);
    setProvinceName(region_name);
    setSpiRank(SPIRanking);
    setAreaRank(SizeRanking);
    setSpeciesRank(SpeciesRichnessRanking);
    setPercentAreaProtected((AreaProtected / Area) * 100);
    setCountrySPI(SPI);
    setCurrentYear(SPI_LATEST_YEAR);
    setFoundIndex(
      provinces.findIndex((region) => region.region_name === region_name)
    );

    const spi = {
      labels: [t('Global SPI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [SPI, 100 - SPI],
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

    setSpiArcData(spi);
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

    const foundIdx = bubbleData?.datasets.findIndex(
      (item) => item.region_name === province.region_name
    );
    highlightProvinceBubble(foundIdx);
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

  useEffect(() => {
    if (!provinces) return;
    setIsLoading(false);
    getChartData();
  }, [provinces]);

  useEffect(() => {
    if (provinces.length && bubbleData && !clickedRegion) {
      if (provinceName) {
        const region = provinces.find(
          (item) => item.region_name === provinceName
        );
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
        provinces.findIndex(
          (prov) => prov.region_name === selectedProvince.region_name
        )
      );
    }
  }, [selectedProvince]);

  useEffect(() => {
    if (clickedRegion && provinces.length) {
      const region = provinces.find(
        (item) => item.region_name === clickedRegion.NAME_1
      );
      getProvinceScores(region);

      const foundIdx = bubbleData?.datasets.findIndex(
        (item) => item.region_name === clickedRegion.NAME_1
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
              value={provinces[foundIndex]}
              getOptionLabel={(x) => x.region_name}
              getOptionValue={(x) => x.region_name}
              options={provinces}
              onChange={handleProvinceSelected}
              placeholder={t('Select Region')}
            />
            <span>
              <b>#{spiRank}</b> {t('in SPI')}
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
              data={spiArcData}
              value={countrySPI}
            />
            <div className={styles.values}>
              <b>{percentAreaProtected.toFixed(1)}%</b>
              <span>{t('Area Protected')}</span>
            </div>
            <span />
            <span style={{ alignSelf: 'baseline' }}>{t('SPI')}</span>
          </div>
        </div>
      )}
      <div className={styles.chart}>
        {bubbleData && (
          <>
            <div className={styles.mapLegend}>
              <img src={SPILegend} alt="spi-legend" />
              <div className={styles.legendValues}>
                <span>0</span>
                <span>100</span>
              </div>
            </div>
            <Bubble options={options} data={bubbleData} ref={chartRef} />
          </>
        )}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
