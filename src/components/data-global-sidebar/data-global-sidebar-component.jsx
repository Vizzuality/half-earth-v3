import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import BiodiversitySidebarCard from 'components/biodiversity-sidebar-card';
import ProtectedAreasSidebarCard from 'components/protected-areas-sidebar-card';
import HumanImpactSidebarCard from 'components/human-impact-sidebar-card';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import animationStyles from 'styles/common-animations.module.scss';
import styles from './data-global-sidebar-styles.module.scss'

const DataGlobeSidebarComponent = ({
  map,
  view,
  activeLayers,
  isCountryMode,
  activeCategory,
  showCloseButton,
  isLandscapeMode,
  handleOpenSearch,
  handleCloseSearch,
  isFullscreenActive,
  countedActiveLayers,
  handleGlobeUpdating
}) => {

  const sidebarHidden = isCountryMode || isLandscapeMode || isFullscreenActive;
  return (
    <div className={cx(styles.sidebarContainer, {[animationStyles.leftHidden]: sidebarHidden})}>
      <div
        className={styles.findPlacesCard}
        onClick={handleOpenSearch}
      >
        <span className={styles.searchCardTitle}>Find places</span>
        <span className={styles.searchSubtitle}>analyze countries,</span>
        <span className={styles.searchSubtitle}>explore areas</span>
        { showCloseButton && (
          ReactDOM.createPortal(
            <button
              className={styles.closeButton}
              onClick={handleCloseSearch}
            >
              <CloseIcon />
            </button>,
            document.getElementById('root')
          )
        )
      }
      </div>
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