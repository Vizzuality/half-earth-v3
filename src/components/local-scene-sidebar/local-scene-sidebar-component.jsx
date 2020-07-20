import React from 'react';
import cx from 'classnames';

import CountryDataCard from 'components/country-data-card';
import LocalPriorityCard from './local-priority-card';
import LocalSpeciesCard from './local-species-card';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './local-scene-sidebar-styles.module.scss';

const LocalSceneSidebarComponent = ({
  view,
  countryISO,
  countryName,
  isFullscreenActive,
}) => {
  const sidebarHidden = isFullscreenActive;
  return (
    <div className={cx(styles.container, {
      [animationStyles.leftHidden]: sidebarHidden,
    })}>
      <DummyBlurWorkaround />
      <CountryDataCard
        view={view}
        countryISO={countryISO}
        countryName={countryName}
      />
      <LocalPriorityCard />
      <LocalSpeciesCard />
    </div>
  )
}


export default LocalSceneSidebarComponent;
