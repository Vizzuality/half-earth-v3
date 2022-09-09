import React from 'react';

import loadable from '@loadable/component';

import cx from 'classnames';

import AreaOfInterestScene from 'scenes/aoi-scene';

import HalfEarthLogo from 'components/half-earth-logo';
import MainMenu from 'components/main-menu';

import uiStyles from 'styles/ui.module.scss';

import styles from './styles.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

const {
  REACT_APP_FEATURE_NEW_MENUS: FEATURE_NEW_MENUS,
} = process.env;

function AreaOfInterestPageComponent({
  activeCategory,
  handleGlobeUpdating,
  hasMetadata,
  onboardingType,
  onboardingStep,
  waitingInteraction,
}) {
  return (
    <>
      <HalfEarthLogo className={cx(styles.hideOnPrint, uiStyles.halfEarthLogoTopLeft)} />
      {!FEATURE_NEW_MENUS && (
        <MainMenu />
      )}
      <AreaOfInterestScene
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        onboardingStep={onboardingStep}
        onboardingType={onboardingType}
        waitingInteraction={waitingInteraction}
      />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default AreaOfInterestPageComponent;
