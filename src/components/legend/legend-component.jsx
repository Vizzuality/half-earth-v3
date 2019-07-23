import React from 'react';
import PropTypes from 'prop-types';
import Legend, {
  LegendItemTypes,
  LegendListItem,
} from 'vizzuality-components/dist/legend';
import LegendItemToolbar, {
  LegendItemButtonOpacity,
  LegendItemButtonInfo,
  LegendItemButtonRemove
} from './legend-item-toolbar/index';
import LegendTitle from './legend-title';

import styles from './legend-styles.module.scss';

const HELegend = ({ datasets, handlers, isFullscreenActive, handleInfoClick, handleRemoveLayer, handleChangeOpacity, handleChangeOrder }) => {
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
      className='c-legend-item-toolbar'
    >
      <LegendItemButtonInfo tooltipText='Click to read the info of this layer' />
      <LegendItemButtonOpacity tooltipText={'Change the opacity'} />
      <LegendItemButtonRemove tooltipText={'Close this layer'} />
    </LegendItemToolbar>
  );

  return (
    <div className={styles.legend}>
      {!isFullscreenActive && <Legend sortable={datasets && datasets.length > 1} onChangeOrder={handleChangeOrder}>
        {datasets && datasets.map((dataset, i) => (
          <LegendListItem index={i} key={dataset.name} layerGroup={dataset} toolbar={toolbar} title={<LegendTitle name={dataset.title} layer={dataset} />}>
            <LegendItemTypes />
          </LegendListItem>
        ))}
      </Legend>}
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