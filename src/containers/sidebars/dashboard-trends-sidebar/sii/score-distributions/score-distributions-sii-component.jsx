import React, { useEffect, useState, useContext } from 'react';

import { T, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';

import styles from '../../dashboard-trends-sidebar-styles.module.scss';

import compStyles from './score-distributions-sii-styles.module.scss';

function ScoreDistributionsSiiComponent(props) {
  const t = useT();
  const { siiData } = props;
  const { lightMode } = useContext(LightModeContext);
  const taxas = ['birds', 'mammals', 'reptiles', 'amphibians'];
  const lowAvg = 'Amphibians';
  const highAvg = 'birds';

  const spsSpecies = [
    {
      name: 'Grey Winged Robin Chat',
      scientificname: 'Cossypha polioptera',
    },
    {
      name: 'Piliocolobus parmentieri',
      scientificname: 'Piliocolobus parmentieri',
    },
    {
      name: 'Palm Egg Eater',
      scientificname: 'Dasypeltis palmarum',
    },
    {
      name: 'Caconda Grassland Frog',
      scientificname: 'Ptychadena bunoderma',
    },
  ];

  const [chartData, setChartData] = useState();
  const [taxaData, setTaxaData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getChartData = async () => {
    const data = siiData.scoresData;
    const taxaSet = {};

    // Loop through each number and place it in the appropriate bucket
    data.forEach((a) => {
      const number = +a.protection_score;
      // Determine the bucket index based on the floor value of the number
      const bucketIndex = Math.floor(number / 5);

      if (!(bucketIndex in taxaSet)) {
        taxaSet[bucketIndex] = 1;
      } else {
        taxaSet[bucketIndex] += 1;
      }
    });

    const labels = Object.keys(taxaSet).map((key) => +key * 5);

    setChartData({
      labels,
      datasets: [
        {
          label: t('Items'),
          data: Object.values(taxaSet),
          backgroundColor: getCSSVariable('birds'),
        },
      ],
    });
  };

  // TODO: Using hard coded region id for Congo
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

  useEffect(() => {
    if (!siiData.scoresData.length) return;
    getChartData();
    getTaxaData();
    setIsLoading(false);
  }, [siiData.scoresData]);

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
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Score Distributions')}</span>

        <p className={styles.description}>
          <T _str="View the distribution of the individual Species Information Scores for all terrestrial vertebrates." />
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SIS between')} <b>0-5:</b>
        </span>
        <hr />
        <ul className={styles.spsSpecies}>
          {spsSpecies.map((species) => {
            return (
              <li key={species.scientificname}>
                <img src="https://place-hold.it/50x50" alt="species" />
                <div className={styles.spsInfo}>
                  <span className={styles.name}>{species.name}</span>
                  <span className={styles.scientificname}>
                    {species.scientificname}
                  </span>
                </div>
                <span className={styles.spsScore}>SPS: 0.04</span>
              </li>
            );
          })}
        </ul>
        <div className={styles.options}>
          {/* {!showTable && <Button
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
            {t('Open and download a full table of species SPS and relevant traits at national and province levels for a selected year.')}
          </span> */}
        </div>
      </div>
      <div className={compStyles.chartArea}>
        {!showTable && (
          <>
            {/* <SpeciesRichnessComponent countryData={countryData} taxaData={taxaData} /> */}
            {isLoading && <Loading height={200} />}
            {!isLoading && (
              <DistributionsChartComponent data={chartData} options={options} />
            )}
          </>
        )}
        {/* {showTable && (<>
          <SpeciesRichnessComponent countryData={countryData} taxaData={taxaData} />
          <DistributionsTableContainer chartData={siiData?.scoresData} {...props} />
        </>)} */}
      </div>
    </div>
  );
}

export default ScoreDistributionsSiiComponent;
