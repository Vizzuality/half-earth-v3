import React from 'react';
import PropTypes from 'prop-types';
import Legend, {
  // LegendItemToolbar,
  // LegendItemButtonOpacity,
  // LegendItemButtonInfo,
  LegendItemTypes,
  LegendListItem,
  // LegendItemButtonRemove
} from 'vizzuality-components/dist/legend';

// import  LegendItemButtonInfo from './legend-item-toolbar/legend-item-button-info/index';

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

  const handleStyle = {
    border: '1px solid #0E2B3B',
    backgroundColor: '#FFFFFF',
    height: '10px',
    width: '10px',
    boxShadow: '0 2px 4px 0 #0E2B3B',
    borderRadius: '50%',
    position: 'absolute',
    transform: 'translate(-5px,-10px)',
    cursor: 'pointer',
    outline: 'none'
  };

  const trackStyle = { 
    backgroundColor: '#1bcec7',
    height: '4px',
    borderRadius: '4px',
    transform: 'translate(0, -3px)'
  };

  const railStyle = {
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: '2px',
    borderRadius: '2px'
  };

  const toolbar = (
    <LegendItemToolbar
      onChangeInfo={handleInfoClick}
      onChangeLayer={handleLayerChange}
      onRemoveLayer={handleRemoveLayer}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
      className='c-legend-item-toolbar'
    >
      <LegendItemButtonInfo
        tooltipText='Click to read the info of this layer'
      />
      <LegendItemButtonOpacity
        className={styles.legendItemButtonOpacity}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        railStyle={railStyle}
        tooltipText={'Change the opacity'}
      />
      <LegendItemButtonRemove 
        tooltipText={'Close this layer'}
      />
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