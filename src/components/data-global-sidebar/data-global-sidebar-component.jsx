import React from 'react';
import cx from 'classnames';
import BiodiversitySidebarCard from 'components/biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from 'components/protected-areas-sidebar-card';
import HumanImpactSidebarCard from 'components/human-impact-sidebar-card';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './data-global-sidebar-styles.module.scss'

const DataGlobeSidebarComponent = ({
  map,
  view,
  activeLayers,
  isCountryMode,
  activeCategory,
  isLandscapeMode,
  isFullscreenActive,
  countedActiveLayers,
  handleGlobeUpdating
}) => {

  const sidebarHidden = isCountryMode || isLandscapeMode || isFullscreenActive;
  return (
    <div className={cx(styles.sidebarContainer, {[animationStyles.leftHidden]: sidebarHidden})}>
      <BiodiversitySidebarCard
        map={map}
        view={view}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        className={styles.biodiversitySidebarCard}
        countedActiveLayers={countedActiveLayers}
      />
      <ProtectedAreasSidebarCard
        map={map}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
      />
      <HumanImpactSidebarCard
        view={view}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
      />
    </div>
  )
}

export default DataGlobeSidebarComponent;