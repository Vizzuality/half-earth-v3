import React from 'react';

import cx from 'classnames';
import {
  routes, DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING,
} from 'router';

import globeDiscover from 'images/globe-discover.png';
import globeExplore from 'images/globe-explore.png';
import globeNRC from 'images/globe-NRC.png';

import styles from './styles.module';

function GlobePageIndicator({ pathname }) {
  return (
    <div className={styles.container}>
      <div
        className={cx({
          [styles.globeHighlight]: pathname === routes[FEATURED].path,
          [styles.globeHidden]: pathname !== routes[FEATURED].path,
        })}
      >
        <img
          className={styles.globeImage}
          alt="Discover stories page"
          src={globeDiscover}
        />
      </div>
      <div
        className={cx({
          [styles.globeHighlight]: pathname === routes[DATA].path,
          [styles.globeHidden]: pathname !== routes[DATA].path,
        })}
      >
        <img
          className={styles.globeImage}
          alt="Explore data page"
          src={globeExplore}
        />
      </div>
      <div
        className={cx({
          [styles.globeHighlight]: pathname === routes[NATIONAL_REPORT_CARD_LANDING].path,
          [styles.globeHidden]: pathname !== routes[NATIONAL_REPORT_CARD_LANDING].path,
        })}
      >
        <img
          className={styles.globeImage}
          alt="National report cards page"
          src={globeNRC}
        />
      </div>
    </div>
  );
}

export default GlobePageIndicator;
