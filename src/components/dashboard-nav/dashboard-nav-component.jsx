import React, { useContext } from 'react'
import styles from './dashboard-nav-styles.module.scss';
import StacksIcon from 'icons/stacks.svg?react';
import OkapiIcon from 'icons/okapi.svg?react';
import TimeLineIcon from 'icons/timeline.svg?react';
import HomeIcon from 'icons/house-solid.svg?react';
import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useT } from '@transifex/react';
import cx from 'classnames';
import { LightModeContext } from '../../context/light-mode';
import { NAVIGATION } from '../../utils/dashboard-utils';

function DashboardNavComponent(props) {
  const t = useT();
  const { selectedIndex, setSelectedIndex } = props;
  const { lightMode, } = useContext(LightModeContext);

  const titles = {
    HOME: 'home',
    REGIONS: 'regions',
    DATA_LAYER: 'data-layer',
    BIO_DIVERSITY: 'bio-diversity',
    REGION_ANALYSIS: 'region-analysis',
    TRENDS: 'trends'
  }

  const updateHistory = (page, title) => {
    window.history.pushState({ selectedIndex: page }, '', `?page=${title}`);
    setSelectedIndex(page);
  }

  return (
    <section className={cx(lightMode ? styles.light : '', styles.sidenav)}>
      <div className={styles.icons}>
        <button
          type="button"
          aria-label={t('Home')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.HOME,
          })}
          onClick={() => updateHistory(NAVIGATION.HOME, titles.HOME)}
        >
          <HomeIcon />
        </button>
        <button
          type="button"
          aria-label={t('Regions')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.REGION,
          })}
          onClick={() => updateHistory(NAVIGATION.REGION, titles.REGIONS)}
        >
          <SouthAmericaIcon />
        </button>
        <button
          type="button"
          aria-label={t('Species')}
          className={cx({
            [styles.selected]: selectedIndex >= NAVIGATION.SPECIES && selectedIndex <= NAVIGATION.REGION_ANALYSIS,
          })}
          onClick={() => {
            updateHistory(NAVIGATION.DATA_LAYER, titles.DATA_LAYER);
          }}
        >
          <OkapiIcon className={styles.speciesIcon} />
        </button>
        {selectedIndex >= NAVIGATION.SPECIES && selectedIndex <= NAVIGATION.REGION_ANALYSIS && <div className={styles.subNav}>
          <button
            type="button"
            aria-label={t('Data Analysis')}
            className={cx({
              [styles.selected]: selectedIndex === NAVIGATION.DATA_LAYER,
            })}
            onClick={() => updateHistory(NAVIGATION.DATA_LAYER, titles.DATA_LAYER)}
          >
            <StacksIcon />
          </button>
          <button
            type="button"
            aria-label={t('Biodiversity Indicators')}
            className={cx({
              [styles.selected]: selectedIndex === NAVIGATION.BIO_IND,
            })}
            onClick={() => updateHistory(NAVIGATION.BIO_IND, titles.BIO_DIVERSITY)}
          >
            <TimeLineIcon />
          </button>
        </div>
        }
        <button
          type="button"
          aria-label={t('Trends')}
          className={cx({
            [styles.selected]: selectedIndex === NAVIGATION.TRENDS,
          })}
          onClick={() => updateHistory(NAVIGATION.TRENDS, titles.TRENDS)}
        >
          <WhatshotIcon />
        </button>
      </div>
    </section>
  )
}

export default DashboardNavComponent;
