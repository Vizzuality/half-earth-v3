import React, { useContext, useState } from 'react'
import styles from './dashboard-nav-styles.module.scss';
import AnalyticsIcon from 'icons/analytics.svg?react';
import StacksIcon from 'icons/stacks.svg?react';
import TimeLineIcon from 'icons/timeline.svg?react';
import HomeIcon from 'icons/house-solid.svg?react';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useT } from '@transifex/react';
import cx from 'classnames';
import { DASHBOARD_TRENDS } from 'router';
import { LightModeContext } from '../../context/light-mode';

export const NAVIGATION = {
  HOME: 1,
  REGION: 2,
  SPECIES: 3,
  DATA_LAYER: 4,
  BIO_IND: 5,
  REGION_ANALYSIS: 6,
  TRENDS: 7,
}

function DashboardNavComponent(props) {
  const t = useT();
  const { countryISO, selectedIndex, setSelectedIndex, browsePage } = props;
  const { lightMode, } = useContext(LightModeContext);

  return (
    <section className={cx(lightMode ? styles.light : '', styles.sidenav)}>
      <div className={styles.icons}>
        <button
          type="button"
          aria-label={t('Home')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.HOME,
          })}
          onClick={() => setSelectedIndex(NAVIGATION.HOME)}
        >
          <HomeIcon className={styles.icon} />
        </button>
        <button
          type="button"
          aria-label={t('Regions')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.REGION,
          })}
          onClick={() => setSelectedIndex(NAVIGATION.REGION)}
        >
          <SouthAmericaIcon className={styles.icon} />
        </button>
        <button
          type="button"
          aria-label={t('Species')}
          className={cx({
            [styles.selected]: selectedIndex >= NAVIGATION.SPECIES && selectedIndex <= NAVIGATION.REGION_ANALYSIS,
          })}
          onClick={() => {
            setSelectedIndex(NAVIGATION.DATA_LAYER);
            setShowSpeciesOptions(!showSpeciesOptions)
          }}
        >
          <EmojiNatureIcon className={styles.icon} />
        </button>
        {selectedIndex >= NAVIGATION.SPECIES && selectedIndex <= NAVIGATION.REGION_ANALYSIS && <div className={styles.subNav}>
          <button
            type="button"
            aria-label={t('Data Analysis')}
            className={cx({
              [styles.selected]: selectedIndex === NAVIGATION.DATA_LAYER,
            })}
            onClick={() => setSelectedIndex(NAVIGATION.DATA_LAYER)}
          >
            <StacksIcon className={styles.icon} />
          </button>
          <button
            type="button"
            aria-label={t('Biodiversity Indicators')}
            className={cx({
              [styles.selected]: selectedIndex === NAVIGATION.BIO_IND,
            })}
            onClick={() => setSelectedIndex(NAVIGATION.BIO_IND)}
          >
            <TimeLineIcon className={styles.icon} />
          </button>
          <button
            type="button"
            aria-label={t('Regions Analysis')}
            className={cx({
              [styles.selected]: selectedIndex === NAVIGATION.REGION_ANALYSIS,
            })}
            onClick={() => setSelectedIndex(NAVIGATION.REGION_ANALYSIS)}
          >
            <AnalyticsIcon className={styles.icon} />
          </button>
        </div>
        }
        <button
          type="button"
          aria-label={t('Trends')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.TRENDS,
          })}
          onClick={() => setSelectedIndex(NAVIGATION.TRENDS)}
        >
          <WhatshotIcon className={styles.icon} />
        </button>
      </div>
    </section>
  )
}

export default DashboardNavComponent;
