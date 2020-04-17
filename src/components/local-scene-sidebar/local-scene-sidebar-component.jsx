import React from 'react';
import cx from 'classnames';

import CountryDataCard from 'components/country-data-card';
import BiodiversitySidebarCard from 'components/biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from 'components/protected-areas-sidebar-card';
import HumanImpactSidebarCard from 'components/human-impact-sidebar-card';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './local-scene-sidebar-styles.module.scss';

const LocalSceneSidebarComponent = ({
  map,
  view,
  rasters,
  setRasters,
  countryISO,
  countryName,
  activeLayers,
  activeCategory,
  isFullscreenActive,
  handleGlobeUpdating,
  countedActiveLayers
}) => {
  const sidebarHidden = isFullscreenActive;
  return (
    <div className={cx(styles.container, {
      [animationStyles.leftHidden]: sidebarHidden,
    })}>
      <CountryDataCard
        view={view}
        countryISO={countryISO}
        countryName={countryName}
      />
      <BiodiversitySidebarCard
        map={map}
        view={view}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        countedActiveLayers={countedActiveLayers}
        className={styles.biodiversitySidebarCard}
      />
      <ProtectedAreasSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
      />
      <HumanImpactSidebarCard
        map={map}
        view={view}
        rasters={rasters}
        setRasters={setRasters}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
      />
    </div>
  )
}


export default LocalSceneSidebarComponent;
