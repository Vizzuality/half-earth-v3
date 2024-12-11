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
  const { shiData, setScientificName, setSelectedIndex, scoresData } = props;
  const SCORES = {
    HABITAT_SCORE: 'steward_score',
    AREA_SCORE: 'area_score',
    CONNECTIVITY_SCORE: 'connectivity_score',
  };

  const taxas = ['birds', 'mammals', 'reptiles', 'amphibians'];
  const lowAvg = 'Amphibians';
  const highAvg = 'birds';

  const [chartData, setChartData] = useState();
  const [responseData, setResponseData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [activeScore, setActiveScore] = useState(SCORES.HABITAT_SCORE);
  const [taxaData, setTaxaData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [spsSpecies, setSpsSpecies] = useState();
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);
  const { lightMode } = useContext(LightModeContext);
  const [lowBucket, setLowBucket] = useState(0);
  const [highBucket, setHighBucket] = useState(5);
  const bucketSize = 5;

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

  useEffect(() => {
    if (!shiData.scoresData.length) return;

    setIsLoading(true);
    getChartData();
    // getTaxaData();
    setIsLoading(false);
  }, [shiData.scoresData]);

  const getChartData = async () => {
    const data = shiData.scoresData;

    setResponseData(data);
    loadSpecies(data);
    displayData(data, activeScore);
  };

  const displayData = (data, activeScore) => {
    const taxaSet = { amphibians: {}, birds: {}, mammals: {}, reptiles: {} };

    // Loop through each number and place it in the appropriate bucket
    data.forEach((a) => {
      const speciesGroup = a.speciesgroup;

      a.taxa_scores.forEach((s) => {
        const number = +s[activeScore];
        // Determine the bucket index based on the floor value of the number
        const bucketIndex = Math.floor(number / bucketSize);

        if (!taxaSet[speciesGroup].hasOwnProperty(bucketIndex)) {
          taxaSet[speciesGroup][bucketIndex] = 1;
        } else {
          taxaSet[speciesGroup][bucketIndex] += 1;
        }
      });
    });

    const uniqueKeys = new Set([
      ...Object.keys(taxaSet.birds),
      ...Object.keys(taxaSet.mammals),
      ...Object.keys(taxaSet.reptiles),
      ...Object.keys(taxaSet.amphibians),
    ]);

    setChartData({
      labels: [...uniqueKeys].map((key) => key * bucketSize),
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

  const getTaxaData = async () => {
    const taxaCallsResponses = await Promise.all(
      taxas.map(async (taxa) => {
        const response = await fetch(
          `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/nrc?region_id=90b03e87-3880-4164-a310-339994e3f919&taxa=${taxa}`
        );
        const data = await response.json();
        return data;
      })
    );

    const [birdData, mammalData, reptileData, amphibianData] =
      taxaCallsResponses;
    setTaxaData({ birdData, mammalData, reptileData, amphibianData });
  };

  const handleActiveChange = (score) => {
    setActiveScore(score);
    displayData(responseData, score);
  };

  const loadSpecies = (data) => {
    const species = [];
    species.push(data[0].taxa_scores[0]);
    species.push(data[1].taxa_scores[0]);
    species.push(data[2].taxa_scores[0]);
    species.push(data[3].taxa_scores[0]);
    setSpsSpecies(species);
    setIsSpeciesLoading(false);
  };

  const selectSpecies = (scientificname) => {
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

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
                <li key={s.species}>
                  <button
                    type="button"
                    onClick={() => selectSpecies(s.species)}
                  >
                    <img src={s.species_url} alt="species" />
                    <div className={styles.spsInfo}>
                      <span className={styles.name}>{s.species}</span>
                      <span className={styles.scientificname}>{s.species}</span>
                    </div>
                    <span className={styles.spsScore}>
                      SHS: {s.steward_score.toFixed(1)}
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
