import React, { useEffect, useState } from 'react';

import cx from 'classnames';

import Button from 'components/button';
import { getCSSVariable } from 'utils/css-utils';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';

import compStyles from './score-distributions-shi-styles.module.scss';
import DistributionsTableContainer from './distributions-table';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';

function ScoreDistributionsShiComponent(props) {
  const { countryISO, countryData } = props;

  const lowAvg = 'Amphibians';
  const highAvg = 'birds';
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
  const [responseData, setResponseData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [activeScore, setActiveScore] = useState('area');

  const getChartData = async () => {
    const year = '2021';
    const url = `https://next-api-dot-api-2-x-dot-map-of-life.appspot.com/2.x/indicators/shs/values?iso=${countryISO}&year=${year}`;

    const response = await fetch(url);
    const data = await response.json();

    setResponseData(data);
    displayData(data, activeScore);
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
          label: '# of occurance',
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
  }, []);


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
          text: 'Protection Score',
          color: getCSSVariable('white'),
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
          text: 'Number of Species',
          color: getCSSVariable('white'),
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
    <div className={styles.trends}>
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
      <div className={compStyles.chartArea}>
        {!showTable && (<>
          <div className={cx(styles.btnGroup, compStyles.btnGroup)}>
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeScore !== 'area',
              })}
              label="Area"
              handleClick={handleActiveChange}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeScore !== 'habitat score',
              })}
              label="Habitat Score"
              handleClick={handleActiveChange}
            />
            <Button
              type="rectangular"
              className={cx(styles.saveButton, {
                [styles.notActive]: activeScore !== 'connectivity',
              })}
              label="Connectivity"
              handleClick={handleActiveChange}
            />
          </div>
          <SpeciesRichnessComponent countryData={countryData} />
          <DistributionsChartComponent
            data={chartData}
            options={options}
            {...props}
          />
        </>)}
        {showTable && (<>
          <SpeciesRichnessComponent countryData={countryData} />
          <DistributionsTableContainer chartData={responseData}
            {...props} />
        </>)}
      </div>
    </div>
  );
}

export default ScoreDistributionsShiComponent;
