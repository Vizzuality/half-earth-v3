import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';
import { getCSSVariable } from 'utils/css-utils';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';

import compStyles from './score-distributions-shi-styles.module.scss';
import DistributionsTableContainer from './distributions-table';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import { LightModeContext } from '../../../../../context/light-mode';
import { useT } from '@transifex/react';

function ScoreDistributionsShiComponent(props) {
  const t = useT();
  const { countryData, shiData } = props;

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
  const [responseData, setResponseData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [activeScore, setActiveScore] = useState('habitat score');
  const [taxaData, setTaxaData] = useState();

  const { lightMode } = useContext(LightModeContext);

  const getChartData = async () => {
    if (shiData.scoresData.length) {
      const data = shiData.scoresData;

      setResponseData(data);
      displayData(data, activeScore);
    }
  }

  const displayData = (data, activeScore) => {
    // const ampSet = getHistogramData('AMPHIBIA');
    // const mamSet = getHistogramData('MAMMALIA');
    // const repSet = getHistogramData('REPTILIA');
    // const birdSet = getHistogramData('AVES');
    const taxaSet = {};

    // data.forEach(a => {
    //   let floorScore;
    //   if (activeScore === 'area') {
    //     floorScore = Math.floor(a.area_score);
    //   } else if (activeScore === 'habitat score') {
    //     floorScore = Math.floor((a.area_score + a.connectivity_score) / 2);
    //   } else if (activeScore === 'connectivity') {
    //     floorScore = Math.floor(a.connectivity_score);
    //   }

    //   if (!taxaSet.hasOwnProperty(floorScore)) {
    //     taxaSet[floorScore] = 1;
    //   } else {
    //     taxaSet[floorScore] += 1;
    //   }
    // });

    // Loop through each number and place it in the appropriate bucket
    data.forEach(a => {
      let floorScore;
      if (activeScore === 'area') {
        floorScore = Math.floor(a.area_score);
      } else if (activeScore === 'habitat score') {
        floorScore = Math.floor((a.area_score + a.connectivity_score) / 2);
      } else if (activeScore === 'connectivity') {
        floorScore = Math.floor(a.connectivity_score);
      }

      // Determine the bucket index based on the floor value of the number
      let bucketIndex = Math.floor(floorScore / 5);

      if (!taxaSet.hasOwnProperty(bucketIndex)) {
        taxaSet[bucketIndex] = 1;
      } else {
        taxaSet[bucketIndex] += 1;
      }
    });

    const labels = Object.keys(taxaSet).map(key => key * 5);

    setChartData({
      labels,
      datasets: [
        // {
        //   label: '# of occurance',
        //   data: ampSet,
        //   backgroundColor: getCSSVariable('amphibians'),
        //   stack: 'Stack 0',
        //   barPercentage: 1,
        // },
        // {
        //   label: '# of occurance',
        //   data: mamSet,
        //   backgroundColor: getCSSVariable('mammals'),
        //   stack: 'Stack 0',
        //   barPercentage: 1,
        // },
        // {
        //   label: '# of occurance',
        //   data: repSet,
        //   backgroundColor: getCSSVariable('reptiles'),
        //   stack: 'Stack 0',
        //   barPercentage: 1,
        // },
        // {
        //   label: '# of occurance',
        //   data: birdSet,
        //   backgroundColor: getCSSVariable('birds'),
        //   stack: 'Stack 0',
        //   barPercentage: 1,
        // },
        {
          label: t('# of occurance'),
          data: Object.values(taxaSet),
          backgroundColor: getCSSVariable('birds'),
          stack: 'Stack 0',
          barPercentage: 1,
        },
      ],
    });
  }

  useEffect(() => {
    getChartData();
    getTaxaData();
  }, [shiData]);

  const getTaxaData = async () => {
    const taxaCallsResponses = await Promise.all(
      taxas.map(async (taxa) => {
        const response = await fetch(`https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/nrc?region_id=90b03e87-3880-4164-a310-339994e3f919&taxa=${taxa}`);
        const data = await response.json();
        return data;
      })
    );

    const [birdData, mammalData, reptileData, amphibianData] = taxaCallsResponses;
    setTaxaData({ birdData, mammalData, reptileData, amphibianData });
  }


  const getHistogramData = (taxa) => {
    const taxaGroup = chartData.filter(item => item.taxa === taxa);
    const taxaSet = {};

    taxaGroup.forEach(a => {
      const floorScore = Math.floor(a.area_score);
      if (!taxaSet.hasOwnProperty(floorScore)) {
        taxaSet[floorScore] = 1;
      } else {
        taxaSet[floorScore] += 1;
      }
    });
    return taxaSet;
  }

  const handleActiveChange = (event) => {
    setActiveScore(event.currentTarget.innerText.toLowerCase());
    displayData(responseData, event.currentTarget.innerText.toLowerCase());
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
  };

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Score Distributions')}</span>

        <p className={styles.description}>
          View the distribution of the individual Species Habitat Scores,
          including the two components Area and Connectivity, for all terrestrial vertebrates. <b>{lowAvg}</b> have the lowest average habitat score while <b>{highAvg}</b> have the highest.
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SHS between')} <b>35-45:</b>
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
                <span className={styles.spsScore}>SHS: 0.04</span>
              </li>
            );
          })}
        </ul>
        <div className={styles.options}>
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
            {t('Open and download a full table of species SPS and relevant traits at national and province levels for a selected year.')}
          </span>
        </div>
      </div>
      <div className={compStyles.chartArea}>
        {!showTable && (<>
          <div className={cx(styles.btnGroup, compStyles.btnGroup)}>
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeScore !== 'habitat score',
              })}
              label={t('Habitat Score')}
              handleClick={handleActiveChange}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeScore !== 'area',
              })}
              label={t('Area')}
              handleClick={handleActiveChange}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeScore !== 'connectivity',
              })}
              label={t('Connectivity')}
              handleClick={handleActiveChange}
            />
          </div>
          <SpeciesRichnessComponent countryData={countryData} taxaData={taxaData} />
          <DistributionsChartComponent
            data={chartData}
            options={options}
            {...props}
          />
        </>)}
        {showTable && (<>
          <SpeciesRichnessComponent countryData={countryData} taxaData={taxaData} />
          <DistributionsTableContainer chartData={responseData}
            {...props} />
        </>)}
      </div>
    </div>
  );
}

export default ScoreDistributionsShiComponent;
