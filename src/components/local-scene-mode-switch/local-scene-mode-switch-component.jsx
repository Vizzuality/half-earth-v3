import React, { useState }  from 'react';
import cx from 'classnames';
import ScatterPlot from 'components/charts/scatter-plot';
import { INDICATOR_LABELS } from 'constants/country-mode-constants';
import { ReactComponent as LocalViewIcon } from 'icons/local_view.svg';
import { ReactComponent as ChallengesIcon } from 'icons/challenges.svg';
import { ReactComponent as RankingIcon } from 'icons/country_ranking.svg';

import styles from './local-scene-mode-switch-styles.module.scss';

const COUNTRY_MODE_TABS = {
  CHALLENGES: 'challenges',
  MAP: 'map',
  RANKING: 'ranking'
}

const LocalSceneModeSwitchComponent = ({ scatterPlotData }) => {
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
        <button
          className={cx(
            styles.button,
            { [styles.selectedView]: activeTab === COUNTRY_MODE_TABS.MAP }
          )}
          onClick={() => changeActiveTab(COUNTRY_MODE_TABS.MAP)}
        >
          <LocalViewIcon className={styles.modeIcon}/>
          <span className={styles.buttonLabel}>map view</span>
        </button>
        <button
          className={cx(
            styles.button,
            { [styles.selectedView]: activeTab === COUNTRY_MODE_TABS.CHALLENGES }
          )}
          onClick={() => changeActiveTab(COUNTRY_MODE_TABS.CHALLENGES)}
        >
          <ChallengesIcon className={styles.modeIcon}/>
          <span className={styles.buttonLabel}>challenges</span>
        </button>
        <button
          className={cx(
            styles.button,
            { [styles.selectedView]: activeTab === COUNTRY_MODE_TABS.RANKING }
          )}
          onClick={() => changeActiveTab(COUNTRY_MODE_TABS.RANKING)}
        >
          <RankingIcon className={styles.modeIcon}/>
          <span className={styles.buttonLabel}>ranking</span>
        </button>
      </div>
     

    </div>
  )
}

export default LocalSceneModeSwitchComponent;