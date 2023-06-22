import React, { useState } from 'react';

import { NATIONAL_REPORT_CARD_LANDING } from 'router';

import loadable from '@loadable/component';

import NationalReportCardLandingScene from 'scenes/nrc-landing-scene';

import OnboardingDisclaimer from 'containers/onboarding/onboarding-disclaimer';
import { useOnboardingOpenSection } from 'containers/onboarding/onboarding-hooks';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function NationalReportCardLanding({
  countryISO,
  countryName,
  openedModal,
  hasMetadata,
  activeLayers,
  sceneSettings,
  handleMapLoad,
  isFullscreenActive,
  onboardingType,
  onboardingStep,
  waitingInteraction,
  browsePage,
  changeUI,
  changeGlobe,
}) {
  const [map, setMap] = useState();

  useOnboardingOpenSection({
    onboardingStep,
    onboardingType,
    waitingInteraction,
    browsePage,
    changeUI,
    locationRoute: NATIONAL_REPORT_CARD_LANDING,
    countryISO,
    countryName,
    changeGlobe,
  });

  return (
    <>
      <Logo className={uiStyles.halfEarthLogoTopLeft} />
      {!!onboardingType && <OnboardingDisclaimer />}
      <NationalReportCardLandingScene
        map={map}
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        activeLayers={activeLayers}
        sceneSettings={sceneSettings}
        isFullscreenActive={isFullscreenActive}
        onMapLoad={(loadedMap) => {
          setMap(loadedMap);
          handleMapLoad(loadedMap, activeLayers);
        }}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
        browsePage={browsePage}
      />

      {hasMetadata && <InfoModal />}
    </>
  );
}

export default NationalReportCardLanding;
