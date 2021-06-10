import React from 'react';
import UserDataModal from 'components/user-data-modal';
import CountryScene from 'scenes/country-scene';

const NationalReportCard = ({
  countryISO,
  userConfig,
  countryName,
  openedModal,
  hasMetadata,
  activeLayers,
  sceneSettings,
  countryExtent,
  handleMapLoad,
  isGlobeUpdating,
  isFullscreenActive,
  handleGlobeUpdating,
  localSceneActiveTab,
  countryChallengesSelectedKey,
}) => (
  <>
    <CountryScene
      countryISO={countryISO}
      userConfig={userConfig}
      countryName={countryName}
      hasMetadata={hasMetadata}
      activeLayers={activeLayers}
      openedModal={openedModal}
      sceneSettings={sceneSettings}
      countryExtent={countryExtent}
      isGlobeUpdating={isGlobeUpdating}
      isFullscreenActive={isFullscreenActive}
      handleGlobeUpdating={handleGlobeUpdating}
      localSceneActiveTab={localSceneActiveTab}
      onMapLoad={(map) => handleMapLoad(map, activeLayers)}
      countryChallengesSelectedKey={countryChallengesSelectedKey}
    />
    <UserDataModal />
  </>
);

export default NationalReportCard;