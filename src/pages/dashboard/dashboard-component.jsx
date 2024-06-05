import React from 'react';

import cx from 'classnames';

import Logo from 'components/half-earth-logo';

import uiStyles from 'styles/ui.module.scss';

import DashboardView from '../../containers/views/dashboard-view/dashboard-view';

function DashboardComponent(props) {
  const {
    sceneMode,
    countryISO,
    countryName,
    openedModal,
    activeLayers,
    handleMapLoad,
    viewSettings,
    isSidebarOpen,
    activeCategory,
    selectedSpecies,
    isFullscreenActive,
    handleGlobeUpdating,
    countedActiveLayers,
    isBiodiversityActive,
    countryTooltipDisplayFor,
    onboardingType,
    onboardingStep,
    waitingInteraction,
    aoiId,
  } = props;
  return (
    <>
      <Logo className={cx(uiStyles.halfEarthLogoTopLeft)} />
      <DashboardView
        sceneMode={sceneMode}
        countryISO={countryISO}
        countryName={countryName}
        openedModal={openedModal}
        activeLayers={activeLayers}
        viewSettings={viewSettings}
        isSidebarOpen={isSidebarOpen}
        isBiodiversityActive={isBiodiversityActive}
        countedActiveLayers={countedActiveLayers}
        activeCategory={activeCategory}
        selectedSpecies={selectedSpecies}
        isFullscreenActive={isFullscreenActive}
        handleGlobeUpdating={handleGlobeUpdating}
        countryTooltipDisplayFor={countryTooltipDisplayFor}
        onboardingType={onboardingType}
        onboardingStep={onboardingStep}
        waitingInteraction={waitingInteraction}
        aoiId={aoiId}
        onMapLoad={(map) => handleMapLoad(map, activeLayers)}
        {...props}
      />
    </>
  );
}

export default DashboardComponent;
