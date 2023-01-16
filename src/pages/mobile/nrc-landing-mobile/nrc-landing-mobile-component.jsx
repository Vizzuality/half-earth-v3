import React, { useState } from 'react';

import { NATIONAL_REPORT_CARD_LANDING } from 'router';

import NationalReportCardLandingScene from 'scenes/nrc-landing-scene';

import { useOnboardingOpenSection } from 'containers/onboarding/onboarding-hooks';

function NationalReportCardLandingMobile({
  countryISO,
  countryName,
  openedModal,
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
  );
}

export default NationalReportCardLandingMobile;
