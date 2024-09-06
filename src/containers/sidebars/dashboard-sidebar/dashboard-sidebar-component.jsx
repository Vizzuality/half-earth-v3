import React, { useContext, useEffect, useState } from 'react';
import { DASHBOARD } from 'router';
import cx from 'classnames';

import AnalyticsIcon from 'icons/analytics.svg?react';
import StacksIcon from 'icons/stacks.svg?react';
import TimeLineIcon from 'icons/timeline.svg?react';
import SunIcon from 'icons/sun-regular.svg?react';
import MoonIcon from 'icons/moon-regular.svg?react';
import HomeIcon from 'icons/house-solid.svg?react';

import BioDiversityContainer from './biodiversity-indicators';
import styles from './dashboard-sidebar-styles.module.scss';
import DataLayerContainer from './data-layers';
import RegionsAnalysisComponent from './regions-analysis/regions-analysis-component';
import { LightModeContext } from '../../../context/light-mode';

function DashboardSidebar(props) {
  const { data, browsePage, countryISO } = props;
  const [selectedIndex, setSelectedIndex] = useState(1);
  const { lightMode, toggleLightMode } = useContext(LightModeContext);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data])


  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <button type="button" className={styles.darkMode} title={lightMode ? 'Switch to Dark mode' : 'Switch to Light mode'} onClick={() => toggleLightMode()}>
        {!lightMode && <SunIcon className={styles.icon} />}
        {lightMode && <MoonIcon className={styles.icon} />}
      </button>

      <section className={styles.sidenav}>
        <div className={styles.icons}>
          <button
            type="button"
            aria-label="Home"
            onClick={() => browsePage({
              type: DASHBOARD,
              payload: { iso: countryISO.toLowerCase() }
            })}
          >
            <HomeIcon className={styles.icon} />
          </button>
          <button
            type="button"
            aria-label="Data Analysis"
            className={cx({
              [styles.selected]: selectedIndex === 1,
            })}
            onClick={() => setSelectedIndex(1)}
          >
            <StacksIcon className={styles.icon} />
          </button>
          <button
            type="button"
            aria-label="Biodiversity Indicators"
            className={cx({
              [styles.selected]: selectedIndex === 2,
            })}
            onClick={() => setSelectedIndex(2)}
          >
            <TimeLineIcon className={styles.icon} />
          </button>
          <button
            type="button"
            aria-label="Regions Analysis"
            className={cx({
              [styles.selected]: selectedIndex === 3,
            })}
            onClick={() => setSelectedIndex(3)}
          >
            <AnalyticsIcon className={styles.icon} />
          </button>
        </div>
        {selectedIndex === 1 && (
          <>
            <DataLayerContainer {...props} />
          </>
        )}
        {selectedIndex === 2 && <BioDiversityContainer {...props} />}
        {selectedIndex === 3 && <RegionsAnalysisComponent {...props} />}
      </section>
    </div>
  );
}

export default DashboardSidebar;
