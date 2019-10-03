import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tutorial from 'components/tutorial'

import Legend, {
  LegendItemTypes,
  LegendListItem,
} from 'vizzuality-components/dist/legend';
import { isMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import LegendItemToolbar from './legend-item-toolbar';
import LegendTitle from './legend-title';
import styles from './legend-styles.module.scss';

const HELegend = ({ datasets, handlers, isFullscreenActive, isLandscapeSidebarCollapsed, isLandscapeMode, activeOption, handleInfoClick, handleRemoveLayer, handleChangeOpacity, handleChangeOrder, tutorialData }) => {
  const { 
    handleLayerChange,
    handleChangeVisibility
  } = handlers;

  const isOnMobile = isMobile();
  const isLegendOpen = activeOption === FOOTER_OPTIONS.LEGEND;
  const showDisclaimer = isOnMobile && isLegendOpen;
  const canShowLegend = isOnMobile ? isLegendOpen : true;
  const onTopOfCollapsed = isOnMobile && isLegendOpen && isLandscapeMode && isLandscapeSidebarCollapsed;

  const toolbar = (
    <LegendItemToolbar
      onChangeInfo={handleInfoClick}
      onChangeLayer={handleLayerChange}
      onRemoveLayer={handleRemoveLayer}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
    />
  );

  return (
    <div className={cx(styles.legend, { [styles.legendOnTopOfCollapsedSidebar]: onTopOfCollapsed })}>
      <Tutorial
        position={'top-left'}
        tutorialID={tutorialData.id}
        showTutorial={!isOnMobile && tutorialData.showTutorial}
      >
        {!isFullscreenActive && canShowLegend && <Legend sortable={datasets && datasets.length > 1} onChangeOrder={handleChangeOrder}>
          {datasets && datasets.map((dataset, i) => (
            <LegendListItem index={i} key={dataset.name} layerGroup={dataset} toolbar={toolbar} title={<LegendTitle name={dataset.title} layer={dataset} />}>
              <LegendItemTypes />
            </LegendListItem>
          ))}
        </Legend>}
        {!datasets && showDisclaimer && <div className={styles.disclaimer}>
          No active legends, please add a layer to the map.
        </div>}
      </Tutorial>
    </div>
  );
}

HELegend.propTypes = {
  datasets: PropTypes.array,
  handlers: PropTypes.shape({ 
    handleInfoClick: PropTypes.func.isRequired,
    handleRemoveLayer: PropTypes.func.isRequired,
    handleChangeOrder: PropTypes.func,
    handleLayerChange: PropTypes.func,
    handleChangeVisibility: PropTypes.func,
    handleChangeOpacity: PropTypes.func
  })
}

HELegend.defaultProps = {
  handlers: {
    handleInfoClick: PropTypes.func.isRequired,
    handleRemoveLayer: PropTypes.func.isRequired
  },
  datasets: []
};

export default HELegend;