// dependencies
import React from 'react';
import cx from 'classnames';
// components
import BiodiversitySidebarCard from './biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from './protected-areas-sidebar-card';
import HumanImpactSidebarCard from './human-impact-sidebar-card';
import FindPlacesCard from 'components/find-places-card';
// styles
import styles from './data-global-sidebar-styles.module.scss';

const DataGlobalSidebarComponent = ({
  view,
  className,
  activeLayers,
  activeCategory,
  searchWidgetConfig,
  countedActiveLayers,
  handleGlobeUpdating,
}) => {

  return (
    <div className={cx(styles.container,className)}>
      <FindPlacesCard
        view={view}
        searchWidgetConfig={searchWidgetConfig}
      />
      <BiodiversitySidebarCard
        view={view}
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        className={styles.biodiversitySidebarCard}
        countedActiveLayers={countedActiveLayers}
      />
      <ProtectedAreasSidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
      />
      <HumanImpactSidebarCard
        activeLayers={activeLayers}
        activeCategory={activeCategory}
        handleGlobeUpdating={handleGlobeUpdating}
        countedActiveLayers={countedActiveLayers}
      />
    </div>
  )
}

export default DataGlobalSidebarComponent;