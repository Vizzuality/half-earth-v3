import React, { useContext, useEffect, useState } from 'react';

import { T, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import cx from 'classnames';
import { Loading } from 'he-components';

import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';

import { LightModeContext } from '../../../../../context/light-mode';
import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from '../../../../../utils/dashboard-utils';
import { PROVINCE_TREND } from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import compStyles from './score-distributions-spi-styles.module.scss';

function ScoreDistributionsSpiComponent(props) {
  const t = useT();
  const {
    activeTrend,
    selectedProvince,
    setSelectedIndex,
    setScientificName,
    spiScoresData,
    selectSpiSpeciesData,
  } = props;
  const { lightMode } = useContext(LightModeContext);
  const [chartData, setChartData] = useState();
  // const [showTable, setShowTable] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);
  const [spsSpecies, setSpsSpecies] = useState();

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
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
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          stepSize: 100,
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
    } else {
      locationData = spiScoresData;
    }

    // Loop through each number and place it in the appropriate bucket
    locationData.forEach((a) => {
      const bin = a.bin.split(',')[1].replace(']', '');

      taxaSet.amphibians[bin] = a.amphibians;
      taxaSet.birds[bin] = a.birds;
      taxaSet.mammals[bin] = a.mammals;
      taxaSet.reptiles[bin] = a.reptiles;
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
    const species = [
      selectSpiSpeciesData[0],
      selectSpiSpeciesData[1],
      selectSpiSpeciesData[2],
      selectSpiSpeciesData[3],
    ];
    setSpsSpecies(species);

    setIsSpeciesLoading(false);
  };

  const selectSpecies = (scientificname) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

  useEffect(() => {
    if (!spiScoresData.length) return;

    setIsLoading(true);
    getChartData();
  }, [spiScoresData, activeTrend]);

  useEffect(() => {
    if (!selectSpiSpeciesData.length) return;
    setIsSpeciesLoading(true);
    loadSpecies();
  }, [selectSpiSpeciesData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Score Distributions')}</span>

        <p className={styles.description}>
          {/* <T
            _str="View the distribution of the individual Species Protection Scores for all terrestrial vertebrates. {lowAvgBold} have the lowest average protection score while {highAvgBold} have the highest."
            lowAvgBold={<b>{lowAvg}</b>}
            highAvgBold={<b>{highAvg}</b>}
          /> */}
          <T _str="View the distribution of the individual Species Protection Scores for all terrestrial vertebrates." />
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SPS between')}{' '}
          <b>{/* {lowBucket} - {highBucket}: */}0 - 5:</b>
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
        {/* <div className={styles.options}>
          {!showTable && <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label={t('View full table')}
            handleClick={() => setShowTable(true)}
          />}
          {showTable && <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label={t('Close full table')}
            handleClick={() => setShowTable(false)}
          />}
          <span className={styles.helpText}>
            {t('Open and download a full table of species scores and relevant traits at national and province levels.')}
          </span>
        </div> */}
      </div>
      <div
        className={cx(lightMode ? compStyles.light : '', compStyles.chartArea)}
      >
        <SpeciesRichnessComponent {...props} />
        {isLoading && <Loading height={200} />}
        {!isLoading && (
          <DistributionsChartComponent options={options} data={chartData} />
        )}
      </div>
    </div>
  );
}

export default ScoreDistributionsSpiComponent;
