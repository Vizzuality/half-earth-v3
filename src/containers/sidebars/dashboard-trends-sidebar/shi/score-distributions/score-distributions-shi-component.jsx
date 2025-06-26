import React, { useContext, useEffect, useState } from 'react';

import { T, useLocale, useT } from '@transifex/react';

import { getCSSVariable } from 'utils/css-utils';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';
import { Loading } from 'he-components';

import Button from 'components/button';
import ChartInfoComponent from 'components/chart-info-popup/chart-info-component';
import DistributionsChartComponent from 'components/charts/distribution-chart/distribution-chart-component';
import SpeciesRichnessComponent from 'components/species-richness/species-richness-component';
import TaxaImageComponent from 'components/taxa-image';

import {
  NAVIGATION,
  SPECIES_SELECTED_COOKIE,
} from 'constants/dashboard-constants.js';

import shiScoreDistImg from 'images/dashboard/tutorials/tutorial_shi_scoreDist-en.png?react';
import shiScoreDistFRImg from 'images/dashboard/tutorials/tutorial_shi_scoreDist-fr.png?react';

import { SECTION_INFO } from '../../../dashboard-sidebar/tutorials/sections/sections-info';
import {
  NATIONAL_TREND,
  PROVINCE_TREND,
  ZONE_3,
  ZONE_5,
} from '../../dashboard-trends-sidebar-component';
import styles from '../../dashboard-trends-sidebar-styles.module.scss';
import compStyles from '../../spi/score-distibutions/score-distributions-spi-styles.module.scss';

import DistributionsTableContainer from './distributions-table';

function ScoreDistributionsShiComponent(props) {
  const t = useT();
  const locale = useLocale();
  const {
    setScientificName,
    setSelectedIndex,
    shiScoresData,
    shiSelectSpeciesData,
    shiActiveTrend,
    setMapLegendLayers,
    selectedProvince,
    setFromTrends,
    lang,
    countryISO,
    zoneHistrogramData,
  } = props;

  const SCORES = {
    HABITAT_SCORE: 'habitat',
    AREA_SCORE: 'area',
    CONNECTIVITY_SCORE: 'connectivity',
  };

  const NATIONAL_SCORES = {
    HABITAT_SCORE: 'habitat',
    AREA_SCORE: 'areascore',
    CONNECTIVITY_SCORE: 'connectivity',
  };
  const threatStatuses = ['LEAST CONCERN', 'EXTINCT', 'EXTINCT IN THE WILD'];
  const acceptedZones = ['ACC_3', 'ACC_5', 'MEX', 'PER', 'BRA', 'MDG', 'VNM'];
  const [chartData, setChartData] = useState();
  const [responseData] = useState();
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [spsSpecies, setSpsSpecies] = useState();
  const [lowDist, setLowDist] = useState(0);
  const [highDist, setHighDist] = useState(7);
  const [isSpeciesLoading, setIsSpeciesLoading] = useState(true);
  const [chartInfo, setChartInfo] = useState();
  const { lightMode } = useContext(LightModeContext);

  const toolTipTitle = (tooltipItems) => {
    const bucket = parseInt(tooltipItems[0].label, 10);
    return `${bucket} - ${bucket + 7}`;
  };

  const options = {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: toolTipTitle,
        },
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
          font: {
            size: 14,
            weight: 'bold',
          },
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
          font: {
            size: 14,
            weight: 'bold',
          },
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

  const displayData = () => {
    let shiData = shiScoresData;

    if (shiActiveTrend === 'NATIONAL') {
      const taxaSet = {
        amphibians: {
          [NATIONAL_SCORES.AREA_SCORE]: {},
          [NATIONAL_SCORES.HABITAT_SCORE]: {},
          [NATIONAL_SCORES.CONNECTIVITY_SCORE]: {},
        },
        birds: {
          [NATIONAL_SCORES.AREA_SCORE]: {},
          [NATIONAL_SCORES.HABITAT_SCORE]: {},
          [NATIONAL_SCORES.CONNECTIVITY_SCORE]: {},
        },
        mammals: {
          [NATIONAL_SCORES.AREA_SCORE]: {},
          [NATIONAL_SCORES.HABITAT_SCORE]: {},
          [NATIONAL_SCORES.CONNECTIVITY_SCORE]: {},
        },
        reptiles: {
          [NATIONAL_SCORES.AREA_SCORE]: {},
          [NATIONAL_SCORES.HABITAT_SCORE]: {},
          [NATIONAL_SCORES.CONNECTIVITY_SCORE]: {},
        },
      };

      // Loop through each number and place it in the appropriate bucket
      shiData?.forEach((a) => {
        const bin = a.bin.split(',')[1].replace(/ /gi, '');

        taxaSet.amphibians[bin] = a.amphibians_shi_count || a.amphibians;
        taxaSet.birds[bin] = a.birds_shi_count || a.birds;
        taxaSet.mammals[bin] = a.mammals_shi_count || a.mammals;
        taxaSet.reptiles[bin] = a.reptiles_shi_count || a.reptiles;
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
    } else {
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

      if (countryISO !== 'EE') {
        if (shiActiveTrend === ZONE_3 || shiActiveTrend === ZONE_5) {
          const zoneName = shiActiveTrend === 'ZONE_3' ? 'ACC_3' : 'ACC_5';
          const data = zoneHistrogramData.filter((item) =>
            item.region_key.includes(zoneName)
          );
          shiData = data;
        }
      } else {
        shiData = zoneHistrogramData.filter(
          (item) =>
            item.project === 'eewwf' &&
            item.region_key === selectedProvince?.region_key
        );
      }

      shiData?.forEach((a) => {
        const bin = a.bin.split(',')[1].replace(/ /gi, '');

        taxaSet.amphibians[bin] = a.amphibians_shi_count || a.amphibians;
        taxaSet.birds[bin] = a.birds_shi_count || a.birds;
        taxaSet.mammals[bin] = a.mammals_shi_count || a.mammals;
        taxaSet.reptiles[bin] = a.reptiles_shi_count || a.reptiles;
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
    }
    setIsLoading(false);
  };

  const loadSpecies = () => {
    const species = [];
    if (zoneHistrogramData.length) {
      let zoneData = [];

      if (selectedProvince) {
        const filteredZoneData = zoneHistrogramData.filter((item) =>
          item.region_key === selectedProvince.region_key &&
          (item.project === countryISO.toLowerCase()) === 'ee'
            ? 'eewwf'
            : countryISO.toLowerCase()
        );
        zoneData = new Set(filteredZoneData);
      }

      zoneData.forEach((item) => {
        if (item.species_shs) {
          const values = JSON.parse(item.species_shs);

          values.forEach((value) => {
            const val = value[''];
            if (
              val.stewardship >= 0.05 &&
              !threatStatuses.includes(val.threat_status?.toUpperCase())
            ) {
              species.push({
                scientificname: val.species,
                species_url: val.species_url,
                habitat_score: val.shs_score,
                taxa: val.taxa,
              });
            }
          });

          if (species.length > 0) {
            const lastItem = species[species.length - 1];
            const low = species[0].habitat_score;
            const high = lastItem.habitat_score;

            setLowDist(low.toFixed(1));
            setHighDist(high.toFixed(1));
          } else {
            setLowDist(0);
            setHighDist(0);
          }
        }
      });

      setSpsSpecies(species.slice(0, 4));
    } else {
      shiSelectSpeciesData.forEach((item) => {
        if (item.species_shs) {
          const values = JSON.parse(item.species_shs);

          values.forEach((value) => {
            const val = value[''];
            if (
              val.stewardship >= 0 &&
              !threatStatuses.includes(val.threat_status?.toUpperCase())
            ) {
              species.push({
                scientificname: val.species,
                species_url: val.species_url,
                habitat_score: val.shs_score,
                taxa: val.taxa,
              });
            }
          });

          if (species.length > 0) {
            const lastItem = species[species.length - 1];
            const low = species[0].habitat_score;
            const high = lastItem.habitat_score;

            setLowDist(low.toFixed(1));
            setHighDist(high.toFixed(1));
          } else {
            setLowDist(0);
            setHighDist(0);
          }
        }
      });

      setSpsSpecies(species.slice(0, 4));
    }
    setIsSpeciesLoading(false);
  };

  const selectSpecies = (scientificname) => {
    setMapLegendLayers([]);
    setFromTrends(true);
    setSelectedIndex(NAVIGATION.DATA_LAYER);
    setScientificName(scientificname);
    localStorage.setItem(SPECIES_SELECTED_COOKIE, scientificname);
  };

  const getChartData = async () => {
    displayData();
  };

  useEffect(() => {
    setIsLoading(true);
    getChartData();

    if (zoneHistrogramData.length) {
      loadSpecies();
    }
  }, [shiScoresData, shiActiveTrend, zoneHistrogramData]);

  useEffect(() => {
    if (!shiSelectSpeciesData || !shiSelectSpeciesData.length) return;
    setIsSpeciesLoading(true);
    loadSpecies();
  }, [shiSelectSpeciesData]);

  const updateChartInfo = () => {
    setChartInfo({
      title: t('Score Distributions'),
      description: t(SECTION_INFO.SHI_SCORE_DISTRIBUTIONS),
      imgAlt: t('Species Protection Index - Trends'),
      image: locale === 'fr' ? shiScoreDistFRImg : shiScoreDistImg,
    });
  };

  useEffect(() => {
    if (!lang) return;
    updateChartInfo();
  }, [lang]);

  useEffect(() => {
    updateChartInfo();
  }, []);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.trends)}>
      <div className={styles.info}>
        <span className={styles.title}>{t('Score Distributions')}</span>

        <p className={styles.description}>
          {shiActiveTrend === PROVINCE_TREND && (
            <T
              _str="View the distribution of the individual Species Habitat Scores, including the two components Area and Connectivity, for all terrestrial vertebrates {inTheBold} {provinceBold} {provinceTextBold}."
              inTheBold={<b>{t('in the')}</b>}
              provinceBold={<b>{selectedProvince?.region_name}</b>}
              provinceTextBold={<b>{t('province')}</b>}
            />
          )}
          {shiActiveTrend === NATIONAL_TREND && (
            <T
              _str="View the distribution of the individual Species Habitat Scores, including the two components Area and Connectivity, for all terrestrial vertebrates {provinceBold}."
              provinceBold={<b>{t('at the national level')}</b>}
            />
          )}
        </p>

        <span className={styles.spsSpeciesTitle}>
          {t('Species with SHS between')}{' '}
          <b>
            {lowDist} - {highDist}:
          </b>
        </span>
        <hr />
        {isSpeciesLoading && <Loading height={200} />}
        {!isSpeciesLoading && (
          <ul className={styles.spsSpecies}>
            {spsSpecies.map((s) => {
              return (
                <li key={s.scientificname ?? s.ScientificName}>
                  <button
                    type="button"
                    onClick={() =>
                      selectSpecies(s.scientificname ?? s.ScientificName)
                    }
                  >
                    {s.species_url && (
                      <img
                        src={s.species_url ?? s.SpeciesImage}
                        alt="species"
                      />
                    )}
                    {!s.species_url && <TaxaImageComponent taxa={s?.taxa} />}
                    <div className={styles.spsInfo}>
                      <span className={styles.name}>
                        {s.scientificname ?? s.ScientificName}
                      </span>
                      <span className={styles.scientificname}>
                        {s.scientificname ?? s.ScientificName}
                      </span>
                    </div>
                    <span className={styles.spsScore}>
                      SHS: {s.habitat_score.toFixed(1)}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <div className={styles.options}>
          {/* {!showTable && (
            <Button
              type="rectangular"
              className={cx(styles.saveButton, styles.notActive)}
              label={t('View full table')}
              handleClick={() => setShowTable(true)}
            />
          )} */}
          {showTable && (
            <Button
              type="rectangular"
              className={cx(styles.saveButton, styles.notActive)}
              label={t('Close full table')}
              handleClick={() => setShowTable(false)}
            />
          )}
          {/* <span className={styles.helpText}>
            {t(
              'Open and download a full table of species scores and relevant traits at national and province levels.'
            )}
          </span> */}
        </div>
      </div>
      <div
        className={cx(lightMode ? compStyles.light : '', compStyles.chartArea)}
      >
        <SpeciesRichnessComponent shi {...props} />
        {!showTable && (
          <>
            {isLoading && <Loading height={200} />}
            {!isLoading && (
              <ChartInfoComponent chartInfo={chartInfo} {...props}>
                <DistributionsChartComponent
                  data={chartData}
                  options={options}
                />
              </ChartInfoComponent>
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
