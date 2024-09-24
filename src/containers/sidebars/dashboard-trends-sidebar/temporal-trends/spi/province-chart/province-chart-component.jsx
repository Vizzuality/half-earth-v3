import React, { useContext, useEffect, useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import Select from 'react-select';
import cx from 'classnames';
import { getCSSVariable } from 'utils/css-utils';
import { Loading } from 'he-components';
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
  const { spiData } = props;
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
  const [areaRank, setAreaRank] = useState(0);
  const [speciesRank, setSpeciesRank] = useState(0);
  const [selectedRegionScores, setSelectedRegionScores] = useState();
  const [sortedBySpi, setSortedBySpi] = useState();
  const [sortedByArea, setSortedByArea] = useState();
  const [sortedBySpecies, setSortedBySpecies] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!spiData.trendData.length) return;
    setIsLoading(false);
    const { country_scores, regions } = spiData.trendData[0];
    setCountryRegions(regions);

    const { spi_all, percentprotected_all } = country_scores[country_scores.length - 1];
    setCountrySPI(spi_all);
    setCountryProtected(percentprotected_all);
    getChartData();
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
  }, [spiData.trendData]);

  const getChartData = () => {
    const { regions } = spiData.trendData[0];
    const data = [];

    setCurrentYear(regions[0].regional_scores[regions[0].regional_scores.length - 1].year);

    regions.map(region => {
      const { regional_scores, region_name } = region;
      const { region_area, spi_all } = regional_scores[regional_scores.length - 1];
      data.push({
        label: region_name,
        data: [{ x: region_area, y: spi_all, r: 10 }],
        backgroundColor: getCSSVariable('birds'),
      })
    });

    setBubbleData({ datasets: data });
  }

  useEffect(() => {
    if (!countryRegions) return;
    getProvinces();

  }, [countryRegions])

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

    const spiSorted = sortProvincesBySPI();
    setSortedBySpi(spiSorted);
    const areaSorted = sortProvincesByArea();
    setSortedByArea(areaSorted);
    const speciesSorted = sortProvincesBySpecies();
    setSortedBySpecies(speciesSorted);
  }

  const getProvinceScores = (province) => {
    const foundRegion = countryRegions.filter(region => region.region_name === province.value);
    const scores = foundRegion[0].regional_scores[foundRegion[0].regional_scores.length - 1];
    setSpiRank(sortedBySpi.findIndex(prov => prov.region_name === province.value) + 1);
    setAreaRank(sortedByArea.findIndex(prov => prov.region_name === province.value) + 1);
    setSpeciesRank(sortedBySpecies.findIndex(prov => prov.region_name === province.value) + 1);
    setSelectedRegionScores(scores);
    setCountryProtected(scores.percentprotected_all);
    setCountrySPI(scores.spi_all);

    const spi = {
      labels: [t('Global SPI'), t('Remaining')],
      datasets: [
        {
          label: '',
          data: [
            scores.spi_all,
            100 - scores.spi_all,
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

  const sortProvincesBySPI = () => {
    const sorted = [...countryRegions].sort((a, b) => {
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

    return sorted;
  }

  const sortProvincesByArea = () => {
    const sorted = [...countryRegions].sort((a, b) => {
      const spi_A = a.regional_scores[a.regional_scores.length - 1].region_area;
      const spi_B = b.regional_scores[b.regional_scores.length - 1].region_area;
      if (spi_A > spi_B) {
        return -1;
      }
      if (spi_A < spi_B) {
        return 1;
      }
      return 0;
    });

    return sorted;
  }

  const sortProvincesBySpecies = () => {
    const sorted = [...countryRegions].sort((a, b) => {
      const spi_A = a.regional_scores[a.regional_scores.length - 1].nspecies;
      const spi_B = b.regional_scores[b.regional_scores.length - 1].nspecies;
      if (spi_A > spi_B) {
        return -1;
      }
      if (spi_A < spi_B) {
        return 1;
      }
      return 0;
    });

    return sorted;
  }

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      {isLoading && <Loading height={200} />}
      {!isLoading && <div className={styles.info}>
        <div className={styles.specs}>
          <Select
            className="basic-single"
            classNamePrefix="select"
            name="provinces"
            options={provinces}
            onChange={getProvinceScores}
          />
          {selectedRegionScores && <>
            <span>
              <b>#{spiRank}</b> {t('in SPI')}
            </span>
            <span>
              <b>#{speciesRank}</b> {t('in vertebrate species richness')}
            </span>
            <span>
              <b>#{areaRank}</b> {t('in size')}
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
      }
      <div className={styles.chart}>
        {bubbleData && <Bubble options={options} data={bubbleData} />}
      </div>
    </div>
  );
}

export default ProvinceChartComponent;
