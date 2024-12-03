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
import {
  NATIONAL_TREND,
  PROVINCE_TREND,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import DistributionsTableContainer from '../../shi/score-distributions/distributions-table';

import compStyles from './score-distributions-spi-styles.module.scss';

function ScoreDistributionsSpiComponent(props) {
  const t = useT();
  const {
    spiData,
    countryISO,
    activeTrend,
    selectedProvince,
    year,
    setSelectedIndex,
    setScientificName,
  } = props;
  const { lightMode } = useContext(LightModeContext);
  const [speciesHighlights, setSpeciesHighlights] = useState();
  const [lowBucket, setLowBucket] = useState(0);
  const [highBucket, setHighBucket] = useState(5);
  const [chartData, setChartData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [taxaData, setTaxaData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);
  const [titleText, setTitleText] = useState();
  const [spsSpecies, setSpsSpecies] = useState();
  const bucketSize = 5;
  const lowAvg = 'Amphibians';
  const highAvg = 'birds';

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

  useEffect(() => {
    if (!spiData.scoresData.length || !year) return;

    setIsLoading(true);
    getTopSpecies();
    getData();
  }, [spiData.scoresData, year]);

  useEffect(() => {
    if (!year) return;

    setIsLoading(true);
    getData();
  }, [activeTrend, selectedProvince, year]);

  useEffect(() => {
    if (!speciesHighlights) return;
    setIsSpeciesLoading(true);
    loadSpecies();
  }, [speciesHighlights, selectedProvince]);

  const getData = () => {
    getTaxaData();
    getChartData();
    getTitleText();
    setIsLoading(false);
  };

  const getChartData = async () => {
    let url = `https://next-api.mol.org/2.x/indicators/sps/values_all_taxa?iso3=${countryISO}&year=${year}`;

    if (activeTrend === PROVINCE_TREND && selectedProvince) {
      url = `https://next-api.mol.org/2.x/indicators/sps/values_regional_all_taxa?iso3_regional=${selectedProvince.iso_regional}&year=${year}`;
    }
    const response = await fetch(url);
    const data = await response.json();

    // const data = spiData.scoresData;
    const taxaSet = { amphibians: {}, birds: {}, mammals: {}, reptiles: {} };

    // Loop through each number and place it in the appropriate bucket
    data.forEach((a) => {
      const speciesGroup = a.speciesgroup;

      a.protectionscores.forEach((s) => {
        const number = +s.protectionscore;
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

  // TODO: Using hard coded region id for Congo
  const getTaxaData = async () => {
    let url = `https://next-api.mol.org/2.x/indicators/sps/sps_score_by_taxa_country?iso3=${countryISO}&year=${year}`;
    if (selectedProvince && activeTrend === PROVINCE_TREND) {
      url = `https://next-api.mol.org/2.x/indicators/sps/sps_score_by_taxa_region?iso3=${countryISO}&year=${year}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setTaxaData(data);
  };

  const getTopSpecies = async () => {
    const response = await fetch(
      `https://next-api.mol.org/2.x/indicators/shs/species_hightlights?iso3=${countryISO}&year=${year}`
    );
    const data = await response.json();

    setSpeciesHighlights(data[0]);
  };

  const loadSpecies = () => {
    if (activeTrend === PROVINCE_TREND && selectedProvince) {
      const regionSpecies = speciesHighlights.region_highlights.filter(
        (sh) => sh.iso3_regional === selectedProvince.iso_regional
      );
      setSpsSpecies(regionSpecies[0]?.region_highlights);
    } else {
      setSpsSpecies(speciesHighlights.country_highlights);
    }
    setIsSpeciesLoading(false);
  };

  const getTitleText = () => {
    if (activeTrend === NATIONAL_TREND || !selectedProvince) {
      setTitleText(`NATIONAL ${t(' SPI BY TAXONOMIC GROUP')}`);
    } else if (activeTrend === PROVINCE_TREND && selectedProvince) {
      setTitleText(
        `${selectedProvince?.region_name} ${t('SPI BY TAXONOMIC GROUP')}`
      );
    }
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
            _str="View the distribution of the individual Species Protection Scores for all terrestrial vertebrates. {lowAvgBold} have the lowest average protection score while {highAvgBold} have the highest."
            lowAvgBold={<b>{lowAvg}</b>}
            highAvgBold={<b>{highAvg}</b>}
          />
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SPS between')}{' '}
          <b>
            {lowBucket} - {highBucket}:
          </b>
        </span>
        <hr />
        {isSpeciesLoading && <Loading height={200} />}
        {!isSpeciesLoading && (
          <ul className={styles.spsSpecies}>
            {spsSpecies &&
              spsSpecies.map((species, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => selectSpecies(species.species)}
                  >
                    <img src={species.asset_url} alt="species" />
                    <div className={styles.spsInfo}>
                      <span className={styles.name}>{species.species}</span>
                      <span className={styles.scientificname}>
                        {species.species}
                      </span>
                    </div>
                    {species.protection_score && (
                      <span
                        className={styles.spsScore}
                      >{`SPS: ${species.protection_score?.toFixed(2)}`}</span>
                    )}
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
        {!showTable && (
          <>
            <div className={compStyles.title}>{titleText}</div>
            <SpeciesRichnessComponent taxaData={taxaData} {...props} />
            {isLoading && <Loading height={200} />}
            {!isLoading && (
              <DistributionsChartComponent options={options} data={chartData} />
            )}
          </>
        )}
        {showTable && (
          <>
            <SpeciesRichnessComponent taxaData={taxaData} />
            <DistributionsTableContainer chartData={chartData} {...props} />
          </>
        )}
      </div>
    </div>
  );
}

export default ScoreDistributionsSpiComponent;
