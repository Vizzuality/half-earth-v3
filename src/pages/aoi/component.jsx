import React from 'react';
import cx from 'classnames';
import loadable from '@loadable/component'
import AreaOfInterestScene from 'scenes/aoi-scene';
import HalfEarthLogo from 'components/half-earth-logo';

import styles from './styles.module.scss';
import uiStyles from 'styles/ui.module.scss';
// Dynamic imports
const InfoModal = loadable(() => import('components/modal-metadata'));

const AreaOfInterestPageComponent = ({hasMetadata}) => (
  <>
    <HalfEarthLogo className={cx(styles.hideOnPrint,uiStyles.halfEarthLogoTopLeft)}/>
    <AreaOfInterestScene />
    {hasMetadata && <InfoModal />}
  </>
);

export default AreaOfInterestPageComponent;