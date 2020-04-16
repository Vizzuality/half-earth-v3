import React from 'react';
import cx from 'classnames';
import CountryEntryCard from 'components/country-entry-card';
import BiodiversitySidebarCard from 'components/biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from 'components/protected-areas-sidebar-card';
import HumanImpactSidebarCard from 'components/human-impact-sidebar-card';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './data-global-sidebar-styles.module.scss'

const DataGlobeSidebarComponent = ({
  map,
  view,
  rasters,
  sceneMode,
  setRasters,
  countryName,
  activeLayers,
  isCountryMode,
  activeCategory,
  isLandscapeMode,
  isFullscreenActive,
  handleGlobeUpdating
}) => {

  const sidebarHidden = isCountryMode || isLandscapeMode || isFullscreenActive;
  return (
    <div className={cx(styles.sidebarContainer, {[animationStyles.leftHidden]: sidebarHidden})}>
      <CountryEntryCard
        sceneMode={sceneMode}
        countryName={countryName}
        isCountryMode={isCountryMode}
        isFullscreenActive={isFullscreenActive}
      />
      <BiodiversitySidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        className={styles.biodiversitySidebarCard}
      />
      <ProtectedAreasSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
      />
      <HumanImpactSidebarCard
        map={map}
        view={view}
        rasters={rasters}
        setRasters={setRasters}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
      />
    </div>
  )
}

export default DataGlobeSidebarComponent;