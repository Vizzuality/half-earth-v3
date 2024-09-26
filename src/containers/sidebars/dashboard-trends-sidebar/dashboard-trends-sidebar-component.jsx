import React, { useContext, useEffect, useState } from 'react';
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
  const { shiValue, siiValue, spiValue, countryName } = props;

  const [trendOption, setTrendOption] = useState(2);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>
          <b>{t('Conservation Metrics')}</b>
          <label>République démocratique du Congo</label>
        </div>
        <div className={styles.tabs}>
          <button
            type="button"
            aria-label="Species Protection Index"
            className={cx({
              [styles.selected]: trendOption === 2,
            })}
            onClick={() => setTrendOption(2)}
          >
            <label>{spiValue}</label>
            <span>{t('Species Protection Index')}</span>
          </button>
          <button
            type="button"
            aria-label="Species Habitat Index"
            className={cx({
              [styles.selected]: trendOption === 1,
            })}
            onClick={() => setTrendOption(1)}
          >
            <label>{shiValue}</label>
            <span>{t('Species Habitat Index')}</span>
          </button>

          <button
            type="button"
            aria-label="Species Information Index"
            className={cx({
              [styles.selected]: trendOption === 3,
            })}
            onClick={() => setTrendOption(3)}
          >
            <label>{siiValue}</label>
            <span>{t('Species Information Index')}</span>
          </button>
        </div>
      </header>
      {trendOption === 1 && <ShiContainer trendOption={trendOption} {...props} />}
      {trendOption === 2 && <SpiContainer trendOption={trendOption} {...props} />}
      {trendOption === 3 && <SiiContainer trendOption={trendOption} {...props} />}
    </div>
  );
}

export default DashboardTrendsSidebar;
