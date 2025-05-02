import React, { useContext, useEffect, useState } from 'react';

import { T, useLocale, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import spiScoreDistImg from 'images/dashboard/tutorials/tutorial_spi_scoreDist-en.png?react';
import spiScoreDistFRImg from 'images/dashboard/tutorials/tutorial_spi_scoreDist-fr.png?react';

import { SECTION_INFO } from '../../../dashboard-sidebar/tutorials/sections/sections-info';
import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import compStyles from './score-distributions-spi-styles.module.scss';

function ScoreDistributionsSpiComponent(props) {
  const t = useT();
  const locale = useLocale();
  const {
    activeTrend,
    selectedProvince,
    setSelectedIndex,
    setScientificName,
    setMapLegendLayers,
    spiScoresData,
    spiSelectSpeciesData,
    setFromTrends,
    lang,
    countryISO,
    zoneHistrogramData,
  } = props;
  const { lightMode } = useContext(LightModeContext);
  const [chartData, setChartData] = useState();
  const [chartInfo, setChartInfo] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);
  const [spsSpecies, setSpsSpecies] = useState();

  const threatStatuses = ['LEAST CONCERN', 'EXTINCT', 'EXTINCT IN THE WILD'];
  const acceptedZones = ['ACC_3', 'ACC_5', 'MEX', 'PER', 'BRA', 'MDG', 'VNM'];

  const toolTipTitle = (tooltipItems) => {
    const bucket = parseInt(tooltipItems[0].label, 10);
    return `${bucket - 5} - ${bucket}`;
  };

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: toolTipTitle,
        },
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        type: 'linear',
        offset: false,
        stacked: true,
        display: true,
        title: {
          display: true,
          text: t('Protection Score'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
          display: false,
          offset: false,
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          stepSize: 10,
        },
      },
      y: {
        stacked: true,
        display: true,
        title: {
          display: true,
          text: t('Number of Species'),
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
          stepSize: 10,
        },
      },
    },
    // onClick: (event, elements) => {
    //   if (elements.length > 0) {
    //     console.log(elements);
    //     const datasetIndex = elements[0].datasetIndex;
    //     const dataIndex = elements[0].index;
    //     const value = chartData.datasets[datasetIndex].data[dataIndex];
    //     console.log(value);

    //     setLowBucket(dataIndex * bucketSize);
    //     setHighBucket((dataIndex * bucketSize) + bucketSize)
    //   }
    // }
  };

  const getChartData = async () => {
    const taxaSet = { amphibians: {}, birds: {}, mammals: {}, reptiles: {} };

    let locationData = [];
    if (activeTrend === PROVINCE_TREND && selectedProvince) {
      locationData = spiScoresData.filter(
        (loc) => loc.iso3_regional === selectedProvince.iso3_regional
      );
    } else if (acceptedZones.includes(activeTrend)) {
      let data;
      if (countryISO !== 'EEWWF') {
        const zoneName = activeTrend === 'ZONE_3' ? 'ACC_3' : 'ACC_5';
        data = zoneHistrogramData.filter((item) =>
          item.region_key.includes(zoneName)
        );
      } else {
        data = zoneHistrogramData.filter(
          (item) =>
            item.project === 'eewwf' &&
            item.region_key === selectedProvince?.region_key
        );
      }
      locationData = data;
    } else {
      locationData = spiScoresData;
    }

    // Loop through each number and place it in the appropriate bucket
    locationData.forEach((a) => {
      const bin = a.bin.split(',')[1].replace(/ /gi, '');

      taxaSet.amphibians[bin] = a.amphibians_spi_count || a.amphibians;
      taxaSet.birds[bin] = a.birds_spi_count || a.birds;
      taxaSet.mammals[bin] = a.mammals_spi_count || a.mammals;
      taxaSet.reptiles[bin] = a.reptiles_spi_count || a.reptiles;
    });

    const uniqueKeys = new Set([
      ...Object.keys(taxaSet.birds),
      ...Object.keys(taxaSet.mammals),
      ...Object.keys(taxaSet.reptiles),
      ...Object.keys(taxaSet.amphibians),
    ]);

    setChartData({
      labels: [...uniqueKeys].map((key) => key),
      datasets: [
        {
          label: t('Birds'),
          data: Object.values(taxaSet.birds),
          backgroundColor: getCSSVariable('birds'),
        },
        {
          label: t('Mammals'),
          data: Object.values(taxaSet.mammals),
          backgroundColor: getCSSVariable('mammals'),
        },
        {
          label: t('Reptiles'),
          data: Object.values(taxaSet.reptiles),
          backgroundColor: getCSSVariable('reptiles'),
        },
        {
          label: t('Amphibians'),
          data: Object.values(taxaSet.amphibians),
          backgroundColor: getCSSVariable('amphibians'),
        },
      ],
    });
    setIsLoading(false);
  };

  const loadSpecies = () => {
    let species = [];
    if (zoneHistrogramData.length) {
      let zoneData = [];

      if (selectedProvince) {
        const filteredZoneData = zoneHistrogramData.filter(
          (item) =>
            item.region_key === selectedProvince.region_key &&
            item.project === countryISO.toLowerCase()
        );
        zoneData = new Set(filteredZoneData);
      }

      zoneData.forEach((item) => {
        if (item.species_sps) {
          const values = JSON.parse(item.species_sps);
          values.forEach((value) => {
            const val = value;
            if (
              val.species_url &&
              !threatStatuses.includes(val.threat_status.toUpperCase())
            ) {
              species.push({
                species: val.species,
                species_url: val.species_url,
                species_protection_score_all: val.spi_score,
              });
            }
          });
        }
      });

      setSpsSpecies(species.slice(0, 4));
    } else {
      species = [
        spiSelectSpeciesData[0],
        spiSelectSpeciesData[1],
        spiSelectSpeciesData[2],
        spiSelectSpeciesData[3],
      ];
      setSpsSpecies(species);
    }
    setIsSpeciesLoading(false);
  };

  const selectSpecies = (scientificname) => {
    setMapLegendLayers([]);
    setFromTrends(true);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

  const updateChartInfo = () => {
    setChartInfo({
      title: t('Score Distributions'),
      description: t(SECTION_INFO.SPI_SCORE_DISTRIBUTIONS),
      imgAlt: t('Species Protection Index - Score Distributions'),
      image: locale === 'fr' ? spiScoreDistFRImg : spiScoreDistImg,
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
    // if (!spiScoresData.length) return;

    setIsLoading(true);
    getChartData();

    if (zoneHistrogramData.length) {
      loadSpecies();
    }
  }, [spiScoresData, activeTrend, zoneHistrogramData]);

  useEffect(() => {
    if (!spiSelectSpeciesData.length) return;
    setIsSpeciesLoading(true);
    loadSpecies();
  }, [spiSelectSpeciesData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Score Distributions')}</span>

        <p className={styles.description}>
          {activeTrend === PROVINCE_TREND && (
            <T
              _str="View the distribution of the individual Species Protection Scores for all terrestrial vertebrate {inTheBold} {provinceBold} {provinceTextBold}."
              inTheBold={<b>{t('in the')}</b>}
              provinceBold={<b>{selectedProvince?.region_name}</b>}
              provinceTextBold={<b>{t('province')}</b>}
            />
          )}
          {activeTrend === NATIONAL_TREND && (
            <T
              _str="View the distribution of the individual Species Protection Scores for all terrestrial vertebrates {provinceBold}."
              provinceBold={<b>{t('at the national level')}</b>}
            />
          )}
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SPS between')} <b>0 - 5:</b>
        </span>
        <hr />
        {isSpeciesLoading && <Loading height={200} />}
        {!isSpeciesLoading && (
          <ul className={styles.spsSpecies}>
            {spsSpecies &&
              spsSpecies.map((s) => {
                return (
                  <li key={`${s.species}`}>
                    <button
                      type="button"
                      onClick={() => selectSpecies(s.species)}
                    >
                      <img src={s.species_url} alt="species" />
                      <div className={styles.spsInfo}>
                        <span className={styles.name}>{s.species}</span>
                        <span className={styles.scientificname}>
                          {s.species}
                        </span>
                      </div>
                      <span
                        className={styles.spsScore}
                      >{`SPS: ${s.species_protection_score_all?.toFixed(
                        1
                      )}`}</span>
                    </button>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
      <div
        className={cx(lightMode ? compStyles.light : '', compStyles.chartArea)}
      >
        <SpeciesRichnessComponent {...props} />
        {isLoading && <Loading height={200} />}
        {!isLoading && (
          <ChartInfoComponent chartInfo={chartInfo} {...props}>
            <DistributionsChartComponent options={options} data={chartData} />
          </ChartInfoComponent>
        )}
      </div>
    </div>
  );
}

export default ScoreDistributionsSpiComponent;
