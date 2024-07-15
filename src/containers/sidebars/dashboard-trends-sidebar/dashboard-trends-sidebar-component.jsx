import React, { useState } from 'react';

import cx from 'classnames';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ScoreDistributionsContainer from './score-distributions';
import TemporalTrendsContainer from './temporal-trends';

export const NATIONAL_TREND = 'NATIONAL';
export const PROVINCE_TREND = 'PROVINCE';

function DashboardTrendsSidebar(props) {
  const { countryISO, countryData } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>
          <b>Conservation Metrics</b>
          <label>Democratic Republic of Congo</label>
        </div>
        <div className={styles.tabs}>
          <button
            type="button"
            aria-label="Species Habitat Index"
            className={cx({
              [styles.selected]: selectedIndex === 1,
            })}
            onClick={() => setSelectedIndex(1)}
          >
            <label>98.63</label>
            <span>Species Habitat Index</span>
          </button>
          <button
            type="button"
            aria-label="Species Protection Index"
            className={cx({
              [styles.selected]: selectedIndex === 2,
            })}
            onClick={() => setSelectedIndex(2)}
          >
            <label>62.73</label>
            <span>Species Protection Index</span>
          </button>
          <button
            type="button"
            aria-label="Species Information Index"
            className={cx({
              [styles.selected]: selectedIndex === 3,
            })}
            onClick={() => setSelectedIndex(3)}
          >
            <label>0.49</label>
            <span>Species Information Index</span>
          </button>
        </div>
      </header>
      <TemporalTrendsContainer
        selectedIndex={selectedIndex}
        countryData={countryData}
      />
      <ScoreDistributionsContainer
        selectedIndex={selectedIndex}
        countryISO={countryISO}
        countryData={countryData}
      />
    </div>
  );
}

export default DashboardTrendsSidebar;
