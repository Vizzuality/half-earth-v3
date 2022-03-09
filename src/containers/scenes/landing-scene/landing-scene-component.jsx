// Dependencies
// Components
import Globe from 'components/globe';
import MenuFooter from 'components/mobile-only/menu-footer';
import MenuSettings from 'components/mobile-only/menu-settings';
import Scene from 'components/scene';
// Constants
import { MobileOnly, useMobile } from 'constants/responsive';
import Hero from 'containers/landing/hero';
import globeDiscover from 'images/globe-discover.png';
import globeExplore from 'images/globe-explore.png';
import globeNRC from 'images/globe-NRC.png';
import React, { useMemo } from 'react';
import styles from './landing-scene-styles.module.scss';


// const { REACT_APP_ARGISJS_API_VERSION: API_VERSION } = process.env;

const LandingSceneComponent = ({
  openedModal,
  activeOption,
  sceneSettings,
  isSidebarOpen,
}) => {
  const isMobile = useMobile();

  const updatedSceneSettings = useMemo(
    () => ({ ...sceneSettings, ...({ padding: { left: isMobile ? 0 : 0, top: 1200 } }) }),
    [isMobile]
  );

  console.log({ updatedSceneSettings });

  return (
    <Scene
      sceneName={'landing-scene'}
      sceneSettings={updatedSceneSettings}
    // loaderOptions={{ url: `https://js.arcgis.com/${API_VERSION}` }}
    >

      <MobileOnly>
        <MenuFooter
          activeOption={activeOption}
          isSidebarOpen={isSidebarOpen}
        />
        <MenuSettings activeOption={activeOption} openedModal={openedModal} />
      </MobileOnly>
      <div className={styles.sceneContainer}>

        <Hero />

        <div className={styles.globesContainer}>
          <Globe
            title="Discover stories"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet, est eget lobortis lobortis, ex ex volutpat ligula."
            globeImage={globeDiscover}
          />
          <Globe
            title="Explore Data"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet, est eget lobortis lobortis, ex ex volutpat ligula."
            globeImage={globeExplore}
            center
          />
          <Globe
            title="National Report Cards"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus aliquet, est eget lobortis lobortis, ex ex volutpat ligula."
            globeImage={globeNRC}
          />
        </div>
      </div>

    </Scene>
  );
};

export default LandingSceneComponent;
