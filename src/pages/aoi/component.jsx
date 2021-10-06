import React from 'react';
import cx from 'classnames';
import AreaOfInterestScene from 'scenes/aoi-scene';
import HalfEarthLogo from 'components/half-earth-logo';

import styles from './styles.module.scss';
import uiStyles from 'styles/ui.module.scss';

const AreaOfInterestPageComponent = () => (
  <>
    <HalfEarthLogo className={cx(styles.hideOnPrint,uiStyles.halfEarthLogoTopLeft)}/>
    <AreaOfInterestScene />
  </>
);

export default AreaOfInterestPageComponent;