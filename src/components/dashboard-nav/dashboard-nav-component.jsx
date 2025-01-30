import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import { NAVIGATION } from 'constants/dashboard-constants.js';

import BirdsIcon from 'icons/bird_icon.svg?react';
import InfoIcon from 'icons/dashboard/info_icon.svg?react';
import SpeciesIcon from 'icons/gauge_icon.svg?react';
import HomeIcon from 'icons/house-solid.svg?react';
import StacksIcon from 'icons/stacks.svg?react';
import TimeLineIcon from 'icons/timeline.svg?react';

import styles from './dashboard-nav-styles.module.scss';

function DashboardNavComponent(props) {
  const t = useT();
  const {
    selectedIndex,
    setSelectedIndex,
    scientificName,
    setSelectedRegion,
    setScientificName,
    setMapLegendLayers,
    setDataLayerData,
    setSpeciesInfo,
  } = props;
  const { lightMode } = useContext(LightModeContext);

  const titles = {
    HOME: 'home',
    REGIONS: 'regions',
    DATA_LAYER: 'data-layer',
    BIO_DIVERSITY: 'bio-diversity',
    REGION_ANALYSIS: 'region-analysis',
    TRENDS: 'trends',
    INFO: 'info',
  };

  const updateHistory = (page) => {
    window.history.pushState({ selectedIndex: page }, '', ``);

    setMapLegendLayers([]);

    if (page !== NAVIGATION.DATA_LAYER && page !== NAVIGATION.BIO_IND) {
      setSelectedRegion(null);
      setScientificName(null);
      setDataLayerData(null);
      setSpeciesInfo(null);
    }
    setSelectedIndex(page);
  };

  return (
    <section className={cx(lightMode ? styles.light : '', styles.sidenav)}>
      <div className={styles.icons}>
        <button
          type="button"
          aria-label={t('Home')}
          title={t('Home')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.HOME,
          })}
          onClick={() => updateHistory(NAVIGATION.HOME, titles.HOME)}
        >
          <HomeIcon />
        </button>
        <button
          type="button"
          aria-label={t('Species')}
          title={t('Species')}
          className={cx({
            [styles.selected]:
              selectedIndex >= NAVIGATION.SPECIES &&
              selectedIndex <= NAVIGATION.REGION_ANALYSIS,
          })}
          onClick={() => {
            updateHistory(NAVIGATION.DATA_LAYER, titles.DATA_LAYER);
          }}
        >
          <BirdsIcon />
        </button>
        {scientificName &&
          selectedIndex >= NAVIGATION.SPECIES &&
          selectedIndex <= NAVIGATION.REGION_ANALYSIS && (
            <div className={styles.subNav}>
              <button
                type="button"
                disabled={!scientificName}
                aria-label={t('Data Layers')}
                title={t('Data Layers')}
                className={cx({
                  [styles.selected]: selectedIndex === NAVIGATION.DATA_LAYER,
                  [styles.disabled]: !scientificName,
                })}
                onClick={() =>
                  updateHistory(NAVIGATION.DATA_LAYER, titles.DATA_LAYER)
                }
              >
                <StacksIcon />
              </button>
              <button
                type="button"
                disabled={!scientificName}
                aria-label={t('Conservation Status')}
                title={t('Conservation Status')}
                className={cx({
                  [styles.selected]: selectedIndex === NAVIGATION.BIO_IND,
                  [styles.disabled]: !scientificName,
                })}
                onClick={() =>
                  updateHistory(NAVIGATION.BIO_IND, titles.BIO_DIVERSITY)
                }
              >
                <SpeciesIcon />
              </button>
            </div>
          )}
        <button
          type="button"
          aria-label={t('Regions')}
          title={t('Regions')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.REGION,
          })}
          onClick={() => updateHistory(NAVIGATION.REGION, titles.REGIONS)}
        >
          <SouthAmericaIcon />
        </button>
        <button
          type="button"
          aria-label={t('Trends')}
          title={t('Trends')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.TRENDS,
          })}
          onClick={() => updateHistory(NAVIGATION.TRENDS, titles.TRENDS)}
        >
          <TimeLineIcon />
        </button>
        <button
          type="button"
          aria-label={t('Tutorials')}
          title={t('Tutorials')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.INFO,
          })}
          onClick={() => updateHistory(NAVIGATION.INFO, titles.INFO)}
        >
          <InfoIcon />
        </button>
      </div>
    </section>
  );
}

export default DashboardNavComponent;
