import React, { useContext, useEffect, useState } from 'react';

import { T, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import cx from 'classnames';
import { Loading } from 'he-components';

import Button from 'components/button';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';

import { LightModeContext } from '../../../../../context/light-mode';
import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from '../../../../../utils/dashboard-utils';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import DistributionsTableContainer from './distributions-table';
import compStyles from './score-distributions-shi-styles.module.scss';

function ScoreDistributionsShiComponent(props) {
  const t = useT();
  const {
    setScientificName,
    setSelectedIndex,
    shiScoresData,
    selectShiSpeciesData,
  } = props;
  const SCORES = {
    HABITAT_SCORE: 'steward',
    AREA_SCORE: 'areascore',
    CONNECTIVITY_SCORE: 'connectivity',
  };

  const lowAvg = 'Amphibians';
  const highAvg = 'birds';

  const [chartData, setChartData] = useState();
  const [responseData, setResponseData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [activeScore, setActiveScore] = useState(SCORES.HABITAT_SCORE);
  const [isLoading, setIsLoading] = useState(true);
  const [spsSpecies, setSpsSpecies] = useState();
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);
  const { lightMode } = useContext(LightModeContext);
  const [lowBucket, setLowBucket] = useState(0);
  const [highBucket, setHighBucket] = useState(5);
  const bucketSize = 7;

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
          text: t('Score'),
          color: lightMode ? getCSSVariable('black') : getCSSVariable('white'),
        },
        grid: {
          color: getCSSVariable('oslo-gray'),
          display: false,
          offset: false,
        },
        ticks: {
          color: getCSSVariable('oslo-gray'),
          stepSize: 5,
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

  const displayData = (score) => {
    const taxaSet = {
      amphibians: {
        [SCORES.AREA_SCORE]: {},
        [SCORES.HABITAT_SCORE]: {},
        [SCORES.CONNECTIVITY_SCORE]: {},
      },
      birds: {
        [SCORES.AREA_SCORE]: {},
        [SCORES.HABITAT_SCORE]: {},
        [SCORES.CONNECTIVITY_SCORE]: {},
      },
      mammals: {
        [SCORES.AREA_SCORE]: {},
        [SCORES.HABITAT_SCORE]: {},
        [SCORES.CONNECTIVITY_SCORE]: {},
      },
      reptiles: {
        [SCORES.AREA_SCORE]: {},
        [SCORES.HABITAT_SCORE]: {},
        [SCORES.CONNECTIVITY_SCORE]: {},
      },
    };

    // Loop through each number and place it in the appropriate bucket
    shiScoresData.forEach((a) => {
      const bin = a.binned.split(',')[0].replace(/ /gi, '');

      taxaSet.amphibians[score][bin] = a[`${score}_amphibians`];
      taxaSet.birds[score][bin] = a[`${score}_birds`];
      taxaSet.mammals[score][bin] = a[`${score}_mammals`];
      taxaSet.reptiles[score][bin] = a[`${score}_reptiles`];
    });
    console.log('Taxaset', taxaSet);
    const uniqueKeys = new Set([
      ...Object.keys(taxaSet.birds[score]),
      ...Object.keys(taxaSet.mammals[score]),
      ...Object.keys(taxaSet.reptiles[score]),
      ...Object.keys(taxaSet.amphibians[score]),
    ]);

    setChartData({
      labels: [...uniqueKeys].map((key) => key),
      datasets: [
        {
          label: t('Birds'),
          data: Object.values(taxaSet.birds[score]),
          backgroundColor: getCSSVariable('birds'),
        },
        {
          label: t('Mammals'),
          data: Object.values(taxaSet.mammals[score]),
          backgroundColor: getCSSVariable('mammals'),
        },
        {
          label: t('Reptiles'),
          data: Object.values(taxaSet.reptiles[score]),
          backgroundColor: getCSSVariable('reptiles'),
        },
        {
          label: t('Amphibians'),
          data: Object.values(taxaSet.amphibians[score]),
          backgroundColor: getCSSVariable('amphibians'),
        },
      ],
    });
    setIsLoading(false);
  };

  const handleActiveChange = (score) => {
    setActiveScore(score);
    displayData(score);
  };

  const loadSpecies = () => {
    const species = [
      selectShiSpeciesData[0],
      selectShiSpeciesData[1],
      selectShiSpeciesData[2],
      selectShiSpeciesData[3],
    ];
    setSpsSpecies(species);
    setIsSpeciesLoading(false);
  };

  const selectSpecies = (scientificname) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

  const getChartData = async () => {
    // setResponseData(selectShiSpeciesData);
    // loadSpecies(selectShiSpeciesData);
    displayData(SCORES.HABITAT_SCORE);
  };

  useEffect(() => {
    if (!shiScoresData.length) return;

    setIsLoading(true);
    getChartData();
  }, [shiScoresData]);

  useEffect(() => {
    if (!selectShiSpeciesData.length) return;
    setIsSpeciesLoading(true);
    loadSpecies();
  }, [selectShiSpeciesData]);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Score Distributions')}</span>

        <p className={styles.description}>
          <T
            _str="View the distribution of the individual Species Habitat Scores, including the two components Area and Connectivity, for all terrestrial vertebrates. {lowAvgBold} have the lowest average habitat score while {highAvgBold} have the highest."
            lowAvgBold={<b>{lowAvg}</b>}
            highAvgBold={<b>{highAvg}</b>}
          />
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SHS between')}{' '}
          <b>
            {lowBucket} - {highBucket}:
          </b>
        </span>
        <hr />
        {isSpeciesLoading && <Loading height={200} />}
        {!isSpeciesLoading && (
          <ul className={styles.spsSpecies}>
            {spsSpecies.map((s) => {
              return (
                <li key={s.ScientificName}>
                  <button
                    type="button"
                    onClick={() => selectSpecies(s.species)}
                  >
                    <img src={s.SpeciesImage} alt="species" />
                    <div className={styles.spsInfo}>
                      <span className={styles.name}>{s.ScientificName}</span>
                      <span className={styles.scientificname}>
                        {s.ScientificName}
                      </span>
                    </div>
                    <span className={styles.spsScore}>
                      SHS: {s.HabitatScore.toFixed(1)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles.options}>
          {!showTable && (
            <Button
              type="rectangular"
              className={cx(styles.saveButton, styles.notActive)}
              label={t('View full table')}
              handleClick={() => setShowTable(true)}
            />
          )}
          {showTable && (
            <Button
              type="rectangular"
              className={cx(styles.saveButton, styles.notActive)}
              label={t('Close full table')}
              handleClick={() => setShowTable(false)}
            />
          )}
          <span className={styles.helpText}>
            {t(
              'Open and download a full table of species scores and relevant traits at national and province levels.'
            )}
          </span>
        </div>
      </div>
      <div className={compStyles.chartArea}>
        {!showTable && (
          <>
            {/* <SpeciesRichnessComponent countryData={countryData} taxaData={taxaData} /> */}
            <div className={cx(styles.btnGroup, compStyles.btnGroup)}>
              <Button
                type="rectangular"
                className={cx(styles.saveButton, {
                  [styles.notActive]: activeScore !== SCORES.HABITAT_SCORE,
                })}
                label={t('Habitat Score')}
                handleClick={() => handleActiveChange(SCORES.HABITAT_SCORE)}
              />
              <Button
                type="rectangular"
                className={cx(styles.saveButton, {
                  [styles.notActive]: activeScore !== SCORES.AREA_SCORE,
                })}
                label={t('Area')}
                handleClick={() => handleActiveChange(SCORES.AREA_SCORE)}
              />
              <Button
                type="rectangular"
                className={cx(styles.saveButton, {
                  [styles.notActive]: activeScore !== SCORES.CONNECTIVITY_SCORE,
                })}
                label={t('Connectivity')}
                handleClick={() =>
                  handleActiveChange(SCORES.CONNECTIVITY_SCORE)
                }
              />
            </div>
            {isLoading && <Loading height={200} />}
            {!isLoading && (
              <DistributionsChartComponent data={chartData} options={options} />
            )}
          </>
        )}
        {showTable && (
          <>
            {/* <SpeciesRichnessComponent countryData={countryData} taxaData={taxaData} /> */}
            <DistributionsTableContainer chartData={responseData} {...props} />
          </>
        )}
      </div>
    </div>
  );
}

export default ScoreDistributionsShiComponent;
