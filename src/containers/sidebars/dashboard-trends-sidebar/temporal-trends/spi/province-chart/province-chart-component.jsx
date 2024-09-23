import React, { useContext, useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import Select from 'react-select';
import cx from 'classnames';
import { getCSSVariable } from 'utils/css-utils';

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

import SpiArcChartComponent from 'components/charts/spi-arc-chart/spi-arc-chart-component';

import styles from './province-chart-styles.module.scss';
import { useT } from '@transifex/react';
import { LightModeContext } from '../../../../../../context/light-mode';

ChartJS.register(LinearScale, ArcElement, PointElement, Tooltip, Legend);

function ProvinceChartComponent(props) {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  const { countryData, spiData } = props;
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
  };

  const [provinces, setProvinces] = useState([]);
  const [bubbleData, setBubbleData] = useState();
  const [currentYear, setCurrentYear] = useState()
  const [spiArcData, setSpiArcData] = useState(blankData);
  const [countrySPI, setCountrySPI] = useState();
  const [countryProtected, setCountryProtected] = useState();
  const [countryRegions, setCountryRegions] = useState();
  const [spiRank, setSpiRank] = useState(0);
  const [selectedRegionScores, setSelectedRegionScores] = useState()

  useEffect(() => {
    if (countryData) {
      const { country_scores, regions } = spiData.trendData[0];
      setCountryRegions(regions);

      const { spi_all, percentprotected_all } = country_scores[country_scores.length - 1];
      setCountrySPI(spi_all);
      setCountryProtected(percentprotected_all);

      const spi = {
        labels: [t('Global SPI'), t('Remaining')],
        datasets: [
          {
            label: '',
            data: [
              spi_all,
              100 - spi_all,
            ],
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
  }, [spiData]);

  useEffect(() => {
    if (!countryRegions) return;
    getProvinces();

  }, [countryRegions])


  useEffect(() => {
    if (!spiData.trendData.length) return;

    getChartData();
  }, [spiData.trendData]);

  const getProvinces = () => {
    const prov = countryRegions.map(region => {
      return { value: region.region_name, label: region.region_name }
    });

    const sortProvinces = prov.sort((a, b) => {
      const nameA = a.label.toUpperCase();
      const nameB = b.label.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setProvinces(sortProvinces);
  }

  const getProvinceScores = (province) => {
    const foundRegion = countryRegions.filter(region => region.region_name === province.value);
    const scores = foundRegion[0].regional_scores[foundRegion[0].regional_scores.length - 1];
    setSpiRank(sortProvincesBySPI(province));
    setSelectedRegionScores(scores);
  }

  const getChartData = () => {
    const { regions } = spiData.trendData[0];
    const data = [];

    setCurrentYear(regions[0].regional_scores[regions[0].regional_scores.length - 1].year);

    regions.map(region => {
      const { regional_scores, region_name } = region;
      const { nspecies, spi_all } = regional_scores[regional_scores.length - 1];
      data.push({
        label: region_name,
        data: [{ x: nspecies, y: spi_all, r: 10 }],
        backgroundColor: getCSSVariable('birds'),
      })
    });

    setBubbleData({ datasets: data });
  }

  const sortProvincesBySPI = (province) => {
    const sorted = countryRegions.sort((a, b) => {
      const spi_A = a.regional_scores[a.regional_scores.length - 1].spi_all;
      const spi_B = b.regional_scores[b.regional_scores.length - 1].spi_all;
      if (spi_A > spi_B) {
        return -1;
      }
      if (spi_A < spi_B) {
        return 1;
      }
      return 0;
    });

    return (sorted.findIndex(prov => prov.region_name === province.value) + 1)
  }

  const sortProvincesByArea = () => {

  }

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.info}>
        <div className={styles.specs}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={provinces[0]}
            isClearable
            isSearchable
            name="provinces"
            options={provinces}
            onChange={getProvinceScores}
          />
          {selectedRegionScores && <>
            <span>
              <b>#{spiRank}</b> {t('in SPI')}
            </span>
            {/* <span>
            <b>#1</b> {t('in vertebrate species richness')}
          </span> */}
            <span>
              <b>#{selectedRegionScores.spi_all.toFixed(2)}</b> {t('in size')}
            </span>
          </>}
        </div>
        <div className={styles.arcGrid}>
          <b>{currentYear}</b>
          <SpiArcChartComponent
            width="125x"
            height="75px"
            data={spiArcData}
            value={countrySPI}
          />
          <b>{countryProtected?.toFixed(2)}</b>
          <span>{t('Year')}</span>
          <span>{t('SPI')}</span>
          <span>{t('Area Protected')}</span>
        </div>
      </div>
      <div className={styles.chart}>
        {bubbleData && <Bubble options={options} data={bubbleData} />}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
