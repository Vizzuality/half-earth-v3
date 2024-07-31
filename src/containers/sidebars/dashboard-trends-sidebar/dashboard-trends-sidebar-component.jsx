import React, { useContext, useEffect, useState } from 'react';

import cx from 'classnames';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ScoreDistributionsContainer from './score-distributions';
import TemporalTrendsContainer from './temporal-trends';
import { LightModeContext } from '../../../context/light-mode';

export const NATIONAL_TREND = 'NATIONAL';
export const PROVINCE_TREND = 'PROVINCE';

function DashboardTrendsSidebar(props) {
  const { shiValue, siiValue, spiValue } = props;

  const [selectedIndex, setSelectedIndex] = useState(1);

  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <header>
        <div className={styles.title}>
          <b>Conservation Metrics</b>
          <label>Democratic Republic of Congo</label>
        </div>
        <button type="button" onClick={() => toggleLightMode()}>Bright</button>
        <div className={styles.tabs}>
          <button
            type="button"
            aria-label="Species Habitat Index"
            className={cx({
              [styles.selected]: selectedIndex === 1,
            })}
            onClick={() => setSelectedIndex(1)}
          >
            <label>{shiValue}</label>
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
            <label>{spiValue}</label>
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
            <label>{siiValue}</label>
            <span>Species Information Index</span>
          </button>
        </div>
      </header>
      <TemporalTrendsContainer
        selectedIndex={selectedIndex}
        {...props}
      />
      <ScoreDistributionsContainer
        selectedIndex={selectedIndex}
        {...props}
      />
    </div>
  );
}

export default DashboardTrendsSidebar;
