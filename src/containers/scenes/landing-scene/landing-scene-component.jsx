// Dependencies
import React, { useMemo } from 'react';

// Components
import Scene from 'components/scene';
import MenuFooter from 'components/mobile-only/menu-footer';

import MenuSettings from 'components/mobile-only/menu-settings';

import Hero from 'containers/landing/hero';

// Constants
import { MobileOnly, useMobile } from 'constants/responsive';

import styles from './landing-scene-styles.module.scss';


const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const LandingSceneComponent = ({
  openedModal,
  activeOption,
  sceneSettings,
  isSidebarOpen,
}) => {
  const isMobile = useMobile();

  console.log({ sceneSettings })

  const updatedSceneSettings = useMemo(
    () => ({ ...sceneSettings, ...({ padding: { left: isMobile ? 0 : 0, top: 1200 } }) }),
    [isMobile]
  );

  return (
    <Scene
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

      <Hero className={styles.sidebarContainer} />

    </Scene>
  );
};

export default LandingSceneComponent;
