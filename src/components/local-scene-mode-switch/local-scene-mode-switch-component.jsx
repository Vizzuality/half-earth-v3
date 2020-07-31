import React, { useState }  from 'react';
import cx from 'classnames';
import ScatterPlot from 'components/charts/scatter-plot';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';

import styles from './local-scene-mode-switch-styles.module.scss';

const COUNTRY_MODE_TABS = {
  CHALLENGES: 'challenges',
  MAP: 'map'
}

const LocalSceneModeSwitchComponent  = ({ scatterPlotData }) => {
  const [activeTab, setActiveTab] = useState(COUNTRY_MODE_TABS.MAP);

  const changeActiveTab = (ACTIVE_TAB) => {
    if(ACTIVE_TAB !== activeTab) {
      setActiveTab(ACTIVE_TAB);
    }
  }

  return (
    <div className={cx(
      styles.container,
      { [styles.containerChallenges]: activeTab === COUNTRY_MODE_TABS.CHALLENGES }
      )
    }>
      {activeTab === COUNTRY_MODE_TABS.CHALLENGES &&
        <ScatterPlot
          className={styles.scatterPlot}
          data={scatterPlotData}
          xAxisLabels={INDICATOR_LABELS}
        />
      }
      <div className={styles.switchContainer}>
        <button className={styles.button} onClick={() => changeActiveTab(COUNTRY_MODE_TABS.CHALLENGES)}>CHART</button>
        <button className={styles.button} onClick={() => changeActiveTab(COUNTRY_MODE_TABS.MAP)}>MAP</button>
      </div>
     

    </div>
  )
}

export default LocalSceneModeSwitchComponent;