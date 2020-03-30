import React from 'react';
import cx from 'classnames';

import CountryDataCard from 'components/country-data-card';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './local-scene-sidebar-styles.module.scss';

const LocalSceneSidebarComponent = ({
  view,
  countryISO,
  isFullscreenActive
}) => {
  const sidebarHidden = isFullscreenActive;
  return (
    <div className={cx(styles.container, {
      [animationStyles.leftHidden]: sidebarHidden,
    })}>
      <CountryDataCard view={view} countryISO={countryISO}/>
    </div>
  )
}


export default LocalSceneSidebarComponent;
