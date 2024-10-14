import React, { useState } from 'react';
import { useT } from '@transifex/react';
import cx from 'classnames';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import SiiContainer from './sii';
import SpiContainer from './spi';
import ShiContainer from './shi';

export const NATIONAL_TREND = 'NATIONAL';
export const PROVINCE_TREND = 'PROVINCE';

function DashboardTrendsSidebar(props) {
  const t = useT();
  const { shiValue, siiValue, spiValue, countryName, tabOption, setTabOption } = props;

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>
          {/* <b>{t('Conservation Metrics')}</b>
          <label>République démocratique du Congo</label> */}
        </div>
        <div className={styles.tabs}>
          <button
            type="button"
            aria-label={t('Species Protection Index')}
            className={cx({
              [styles.selected]: tabOption === 2,
            })}
            onClick={() => setTabOption(2)}
          >
            <label>{spiValue}</label>
            <span>{t('Species Protection Index')}</span>
          </button>
          <button
            type="button"
            aria-label={t('Species Habitat Index')}
            className={cx({
              [styles.selected]: tabOption === 1,
            })}
            onClick={() => setTabOption(1)}
          >
            <label>{shiValue}</label>
            <span>{t('Species Habitat Index')}</span>
          </button>

          <button
            type="button"
            aria-label={t('Species Information Index')}
            className={cx({
              [styles.selected]: tabOption === 3,
            })}
            onClick={() => setTabOption(3)}
          >
            <label>{siiValue}</label>
            <span>{t('Species Information Index')}</span>
          </button>
        </div>
      </header>
      {tabOption === 1 && <ShiContainer trendOption={tabOption} {...props} />}
      {tabOption === 2 && <SpiContainer trendOption={tabOption} {...props} />}
      {tabOption === 3 && <SiiContainer trendOption={tabOption} {...props} />}
    </div>
  );
}

export default DashboardTrendsSidebar;
