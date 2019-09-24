import React from 'react';
import PropTypes from 'prop-types';
import Tutorial from 'components/tutorial'

import Legend, {
  LegendItemTypes,
  LegendListItem,
} from 'vizzuality-components/dist/legend';
import LegendItemToolbar from './legend-item-toolbar';
import LegendTitle from './legend-title';
import { LEGEND_TUTORIAL } from 'constants/tutorial';
import styles from './legend-styles.module.scss';

const HELegend = ({ datasets, handlers, isFullscreenActive, handleInfoClick, handleRemoveLayer, handleChangeOpacity, handleChangeOrder, tutorialData }) => {
  const { 
    handleLayerChange,
    handleChangeVisibility
  } = handlers;

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
      <div className={styles.legend}>
        <Tutorial
          position={'top-left'}
          tutorialID={tutorialData.id}
          showTutorial={tutorialData.showTutorial}
        >
          {!isFullscreenActive && <Legend sortable={datasets && datasets.length > 1} onChangeOrder={handleChangeOrder}>
            {datasets && datasets.map((dataset, i) => (
              <LegendListItem index={i} key={dataset.name} layerGroup={dataset} toolbar={toolbar} title={<LegendTitle name={dataset.title} layer={dataset} />}>
                <LegendItemTypes />
              </LegendListItem>
            ))}
          </Legend>}
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