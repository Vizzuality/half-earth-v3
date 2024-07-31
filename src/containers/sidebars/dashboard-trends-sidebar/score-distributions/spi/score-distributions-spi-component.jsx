import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';
import { getCSSVariable } from 'utils/css-utils';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';

import compStyles from './score-distributions-spi-styles.module.scss';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import { LightModeContext } from '../../../../../context/light-mode';

function ScoreDistributionsSpiComponent(props) {
  const { countryData, spiData } = props;
  const { lightMode } = useContext(LightModeContext);
  const lowAvg = 'Amphibians';
  const highAvg = 'birds';

  const taxas = ['birds', 'mammals', 'reptiles', 'amphibians'];

  const spsSpecies = [
    {
      name: 'Black-collared Apalis',
      scientificname: 'Oreolais puncher',
    },
    {
      name: 'Lomami Red Colobus',
      scientificname: 'Piliocolobus parmentieri',
    },
    {
      name: 'Grey-Winged Robin-Chat',
      scientificname: 'Cossypha polioptera',
    },
    {
      name: 'Palm Egg-Eater',
      scientificname: 'Dasypeltis palmarum',
    },
  ];

  const [chartData, setChartData] = useState();
  const [showTable, setShowTable] = useState(false);

  const getChartData = async () => {
    if (spiData.scoresData.length) {
      const data = spiData.scoresData;
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

  const getTaxaData = async () => {
    const taxaCalls = await Promise.all(
      taxas.map(async (taxa) => {
        const response = await fetch(`https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/nrc?region_id=90b03e87-3880-4164-a310-339994e3f919&taxa=${taxa}`);
        const data = await response.json();
        return data;
      })
    );
  }

  useEffect(() => {
    getTaxaData();
    getChartData();
  }, [spiData]);

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
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>Score Distributions</span>

        <p className={styles.description}>
          View the distribution of the individual Species Protection Scores for
          all terrestrial vertebrates. <b>{lowAvg}</b> have the lowest average
          protection score while <b>{highAvg}</b> have the highest.
        </p>

        <span className={styles.spsSpeciesTitle}>
          Species with SPS between <b>0.5:</b>
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
      <div className={cx(lightMode ? compStyles.light : '', compStyles.chartArea)}>
        {!showTable && (<>
          <div className={compStyles.title}>NATIONAL SPI BY TAXONOMIC GROUP</div>
          <SpeciesRichnessComponent countryData={countryData} />
          <DistributionsChartComponent options={options} data={chartData} />
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

export default ScoreDistributionsSpiComponent;
