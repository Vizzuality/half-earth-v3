import React, { useState } from 'react';

import PriorityMobileScene from 'scenes/mobile/priority-scene-mobile';

function PriorityMobile({
  activeLayers,
  countryISO,
  countryName,
  handleMapLoad,
  isFullscreenActive,
  sceneSettings,
}) {
  const [map, setMap] = useState();

  return (
    <PriorityMobileScene
      map={map}
      countryISO={countryISO}
      countryName={countryName}
      activeLayers={activeLayers}
      sceneSettings={sceneSettings}
      isFullscreenActive={isFullscreenActive}
      onMapLoad={(loadedMap) => {
        setMap(loadedMap);
        handleMapLoad(loadedMap, activeLayers);
      }}
    />
  );
}

export default PriorityMobile;
