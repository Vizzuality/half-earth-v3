import React from 'react';

import loadable from '@loadable/component';

import cx from 'classnames';

import AreaOfInterestScene from 'scenes/aoi-scene';

import HalfEarthLogo from 'components/half-earth-logo';
// import MainMenu from 'components/main-menu';

import uiStyles from 'styles/ui.module.scss';

import styles from './styles.module.scss';
// Dynamic imports
const InfoModal = loadable(() => import('components/modal-metadata'));

function AreaOfInterestPageComponent({ hasMetadata }) {
  return (
    <>
      <HalfEarthLogo className={cx(styles.hideOnPrint, uiStyles.halfEarthLogoTopLeft)} />
      {/* <MainMenu /> */}
      <AreaOfInterestScene />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default AreaOfInterestPageComponent;
