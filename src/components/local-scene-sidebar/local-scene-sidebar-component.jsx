import React from 'react';
import cx from 'classnames';
import { isMobile } from 'constants/responsive';

import CountryDataCard from 'components/country-data-card';
import uiStyles from 'styles/ui.module';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './local-scene-sidebar-styles.module.scss';

const LocalSceneSidebarComponent = ({
  view,
  countryISO
}) => {

  return (
    <div className={cx(styles.sidebar)}>
      <div className={styles.wrapper}>
        <CountryDataCard view={view} countryISO={countryISO}/>
      </div>
    </div>
  )
}


export default LocalSceneSidebarComponent;
