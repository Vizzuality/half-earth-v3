import React, { useEffect, useState, useContext } from 'react';

import cx from 'classnames';

import Button from 'components/button';
import { getCSSVariable } from 'utils/css-utils';
import compStyles from './score-distributions-sii-styles.module.scss';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import { LightModeContext } from '../../../../../context/light-mode';

function ScoreDistributionsSiiComponent(props) {
  const { countryData, siiData } = props;
  const { lightMode } = useContext(LightModeContext);

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
  const [showTable, setShowTable] = useState(false);

  const getChartData = async () => {
    if (siiData.scoresData.length) {
      const data = siiData.scoresData;
      const taxaSet = {};

      // Loop through each number and place it in the appropriate bucket
      data.forEach(a => {
        const number = +a.protection_score;
        // Determine the bucket index based on the floor value of the number
        let bucketIndex = Math.floor(number / 5);

        if (!taxaSet.hasOwnProperty(bucketIndex)) {
          taxaSet[bucketIndex] = 1;
        } else {
          taxaSet[bucketIndex] += 1;
        }
      });

      const labels = Object.keys(taxaSet).map(key => +key * 5);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Items',
            data: Object.values(taxaSet),
            backgroundColor: getCSSVariable('birds'),
          },
        ],
      });
    }
  };

  useEffect(() => {
    getChartData();
  }, [siiData]);

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
          text: 'Protection Score',
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
          text: 'Number of Species',
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
        <span className={styles.title}>Score Distributions</span>

        <p className={styles.description}>
          View the distribution of the individual Species Information Scores for all
          terrestrial vertebrates. <b>{lowAvg}</b> have the lowest average information score while <b>{highAvg}</b> have the highest.
        </p>

        <span className={styles.spsSpeciesTitle}>
          Species with SIS between <b>0-5:</b>
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
                  <button className={styles.addToMap} type="button">
                    Add to map
                  </button>
                </div>
                <span className={styles.spsScore}>SPS: 0.04</span>
              </li>
            );
          })}
        </ul>
        <div className={styles.options}>
          {!showTable && <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label="view full table"
            handleClick={() => setShowTable(true)}
          />}
          {showTable && <Button
            type="rectangular"
            className={cx(styles.saveButton, styles.notActive)}
            label="Close full table"
            handleClick={() => setShowTable(false)}
          />}
          <span className={styles.helpText}>
            Open and download a full table of species SPS and relevant traits at
            national and province levels for a selected year.
          </span>
        </div>
      </div>
      <div className={compStyles.chartArea}>
        {!showTable && (<>
          <SpeciesRichnessComponent countryData={countryData} />
          <DistributionsChartComponent
            data={chartData}
            options={options}
            {...props}
          />
        </>)}
        {showTable && (<>
          <SpeciesRichnessComponent countryData={countryData} />
          {/* <DistributionsTableContainer chartData={chartData}
            {...props} /> */}
        </>)}
      </div>
    </div>
  );
}

export default ScoreDistributionsSiiComponent;
