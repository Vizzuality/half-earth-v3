import React from 'react';
import cx from 'classnames';
import { ReactComponent as LocalViewIcon } from 'icons/local_view.svg';
import { ReactComponent as ChallengesIcon } from 'icons/challenges.svg';
import { ReactComponent as RankingIcon } from 'icons/country_ranking.svg';

import { LOCAL_SCENE_TABS } from 'constants/ui-params';

import styles from './local-scene-mode-switch-styles.module.scss';

const LocalSceneModeSwitchComponent = ({ localSceneActiveTab, handleTabSelection, className }) => (
  <div className={cx(styles.switchContainer, className)}>
    <button
      className={cx(
        styles.button,
        { [styles.selectedView]: localSceneActiveTab === LOCAL_SCENE_TABS.MAP }
      )}
      onClick={() => handleTabSelection(LOCAL_SCENE_TABS.MAP)}
    >
      <LocalViewIcon className={styles.modeIcon}/>
      <span className={styles.buttonLabel}>map view</span>
    </button>
    <button
      className={cx(
        styles.button,
        { [styles.selectedView]: localSceneActiveTab === LOCAL_SCENE_TABS.CHALLENGES }
      )}
      onClick={() => handleTabSelection(LOCAL_SCENE_TABS.CHALLENGES)}
    >
      <ChallengesIcon className={styles.modeIcon}/>
      <span className={styles.buttonLabel}>challenges</span>
    </button>
    <button
      className={cx(
        styles.button,
        { [styles.selectedView]: localSceneActiveTab === LOCAL_SCENE_TABS.RANKING }
      )}
      onClick={() => handleTabSelection(LOCAL_SCENE_TABS.RANKING)}
    >
      <RankingIcon className={styles.modeIcon}/>
      <span className={styles.buttonLabel}>ranking</span>
    </button>
  </div>
)

export default LocalSceneModeSwitchComponent;