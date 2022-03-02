// Dependencies
import React, { useMemo } from 'react';
// Components
import Scene from 'components/scene';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';
// Constants
import { MobileOnly, useMobile } from 'constants/responsive';

const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const LandingSceneComponent = ({
  onMapLoad,
  openedModal,
  activeOption,
  sceneSettings,
  isSidebarOpen,
}) => {
  const isMobile = useMobile();
  const updatedSceneSettings = useMemo(
    () => ({ ...sceneSettings, ...(isMobile && { padding: { left: 0 } }) }),
    [isMobile]
  );
  return (
    <>
      <Scene
        // onMapLoad={onMapLoad}
        sceneName={'landing-scene'}
        sceneSettings={updatedSceneSettings}
        loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
      >

        <MobileOnly>
          <MenuFooter
            activeOption={activeOption}
            isSidebarOpen={isSidebarOpen}
          />
          <MenuSettings activeOption={activeOption} openedModal={openedModal} />
        </MobileOnly>

      </Scene>
    </>
  );
};

export default LandingSceneComponent;
