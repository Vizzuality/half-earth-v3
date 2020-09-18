import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Tutorial from 'components/tutorial'

import Legend, {
  LegendItemTypes,
  LegendListItem,
} from 'vizzuality-components/dist/legend';
import { useMobile } from 'constants/responsive';
import { FOOTER_OPTIONS } from 'constants/mobile-only';
import LegendItemToolbar from './legend-item-toolbar';
import LegendTitle from './legend-title';
import styles from './legend-styles.module.scss';

const HELegend = ({ className, datasets, handlers, isFullscreenActive, hideTutorial, hideCloseButton, activeOption, handleInfoClick, handleRemoveLayer, handleChangeOpacity, handleChangeOrder, tutorialData, showLegend = true }) => {
  const { 
    handleLayerChange,
    handleChangeVisibility
  } = handlers;

  const isOnMobile = useMobile();
  const isLegendOpen = activeOption === FOOTER_OPTIONS.LEGEND;
  const showDisclaimer = isOnMobile && isLegendOpen;
  const canShowLegend = isOnMobile ? isLegendOpen : showLegend;

  const toolbar = (
    <LegendItemToolbar
      onChangeInfo={handleInfoClick}
      onChangeLayer={handleLayerChange}
      onRemoveLayer={handleRemoveLayer}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
      hideCloseButton={hideCloseButton}
    />
  );

  return (
    <div className={cx(styles.legend, className)}>
      <Tutorial
        position={'top-left'}
        tutorialID={tutorialData.id}
        showTutorial={!hideTutorial && !isFullscreenActive && !isOnMobile && tutorialData.showTutorial}
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