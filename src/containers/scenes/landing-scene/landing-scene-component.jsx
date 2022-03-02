// Dependencies
import React from 'react';

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

  const updatedSceneSettings = {
    "center": [16.9515536, 0.116959],
    "environment": {
      "alphaCompositingEnabled": false,
      "atmosphereEnabled": false,
      "background": {
        "color": [0, 10, 16],
      },
      "type": "color",
    },
    "isGlobeUpdating": false,
    "padding": { top: 1250, left: isMobile ? 0 : 250 },
    "ui": { components: Array(0) },

  }
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
