import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';
import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import Button from 'components/button';
import { getCSSVariable } from 'utils/css-utils';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';
import { Loading } from 'he-components';
import compStyles from './score-distributions-spi-styles.module.scss';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import { LightModeContext } from '../../../../../context/light-mode';
import { useT } from '@transifex/react';
import DistributionsTableContainer from '../../shi/score-distributions/distributions-table';

function ScoreDistributionsSpiComponent(props) {
  const t = useT();
  const { spiData, countryISO, activeTrend, selectedProvince, year } = props;
  const { lightMode } = useContext(LightModeContext);
  const lowAvg = 'Amphibians';
  const highAvg = 'birds';
  const bucketSize = 5;

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
  };

  const [chartData, setChartData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [taxaData, setTaxaData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [titleText, setTitleText] = useState();

  useEffect(() => {
    if (!spiData.scoresData.length || !year) return;
    getTaxaData();
    getChartData();
    setIsLoading(false);
  }, [spiData.scoresData, year]);

  useEffect(() => {
    if (!year) return;
    setIsLoading(true);
    getChartData();
    getTaxaData();
    getTitleText();
  }, [activeTrend, selectedProvince, year])


  const getChartData = async () => {
    let url = `https://next-api.mol.org/2.x/indicators/sps/values_all_taxa?iso3=${countryISO}&year=${year}`;

    if (activeTrend === PROVINCE_TREND && selectedProvince) {
      url = `https://next-api.mol.org/2.x/indicators/sps/values_regional_all_taxa?iso3_regional=${selectedProvince.iso_regional}&year=${year}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    // const data = spiData.scoresData;
    const taxaSet = { 'amphibians': {}, 'birds': {}, 'mammals': {}, 'reptiles': {} };

    // Loop through each number and place it in the appropriate bucket
    data.forEach(a => {
      const speciesGroup = a.speciesgroup;

      a.protectionscores.forEach(s => {
        const number = +s.protectionscore;
        // Determine the bucket index based on the floor value of the number
        let bucketIndex = Math.floor(number / bucketSize);

        if (!taxaSet[speciesGroup].hasOwnProperty(bucketIndex)) {
          taxaSet[speciesGroup][bucketIndex] = 1;
        } else {
          taxaSet[speciesGroup][bucketIndex] += 1;
        }
      })
    });

    const uniqueKeys = new Set(
      [...Object.keys(taxaSet['birds']),
      ...Object.keys(taxaSet['mammals']),
      ...Object.keys(taxaSet['reptiles']),
      ...Object.keys(taxaSet['amphibians'])]);

    setChartData({
      labels: [...uniqueKeys].map(key => key * bucketSize),
      datasets: [
        {
          label: t('Birds'),
          data: Object.values(taxaSet['birds']),
          backgroundColor: getCSSVariable('birds'),
        },
        {
          label: t('Mammals'),
          data: Object.values(taxaSet['mammals']),
          backgroundColor: getCSSVariable('mammals'),
        },
        {
          label: t('Reptiles'),
          data: Object.values(taxaSet['reptiles']),
          backgroundColor: getCSSVariable('reptiles'),
        },
        {
          label: t('Amphibians'),
          data: Object.values(taxaSet['amphibians']),
          backgroundColor: getCSSVariable('amphibians'),
        },
      ],
    });
    setIsLoading(false);
  };

  // TODO: Using hard coded region id for Congo
  const getTaxaData = async () => {
    let url = `https://next-api.mol.org/2.x/indicators/sps/sps_score_by_taxa_country?iso3=${countryISO}&year=${year}`;
    if (selectedProvince && activeTrend === PROVINCE_TREND) {
      url = `https://next-api.mol.org/2.x/indicators/sps/sps_score_by_taxa_region?iso3=${countryISO}&year=${year}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setTaxaData(data);
  }

  const getTitleText = () => {
    if (activeTrend === NATIONAL_TREND || !selectedProvince) {
      setTitleText(t('NATIONAL SPI BY TAXONOMIC GROUP'));
    } else if (activeTrend === PROVINCE_TREND && selectedProvince) {
      setTitleText(`${selectedProvince?.region_name} ${t(' SPI BY TAXONOMIC GROUP')}`);
    }
  }

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Score Distributions')}</span>

        <p className={styles.description}>
          View the distribution of the individual Species Protection Scores for
          all terrestrial vertebrates. <b>{lowAvg}</b> have the lowest average
          protection score while <b>{highAvg}</b> have the highest.
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SPS between')} <b>0.5:</b>
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
            {t('Open and download a full table of species SPS and relevant traits at national and province levels for a selected year.')}
          </span>
        </div> */}
      </div>
      <div className={cx(lightMode ? compStyles.light : '', compStyles.chartArea)}>
        {!showTable && (<>
          <div className={compStyles.title}>{titleText}</div>
          <SpeciesRichnessComponent taxaData={taxaData} {...props} />
          {isLoading && <Loading height={200} />}
          {!isLoading && <DistributionsChartComponent options={options} data={chartData} />}
        </>)}
        {showTable && (<>
          <SpeciesRichnessComponent taxaData={taxaData} />
          <DistributionsTableContainer chartData={chartData} {...props} />
        </>)}
      </div>
    </div>
  );
}

export default ScoreDistributionsSpiComponent;
