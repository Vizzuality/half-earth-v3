import React from 'react';
import PropTypes from 'prop-types';
import Legend, {
  LegendItemToolbar,
  LegendItemButtonOpacity,
  LegendItemTypes,
  LegendListItem,
  LegendItemButtonRemove
} from 'vizzuality-components/dist/legend';

import LegendTitle from './legend-title';

import styles from './legend-styles.module.scss';

const HELegend = ({ map, datasets, handlers, isFullscreenActive, visibleLayers, setLayerOpacity, setLayerVisibility }) => {
  const { 
    handleChangeOrder,
    handleLayerChange,
    handleInfoClick,
    handleChangeVisibility
  } = handlers;

  const { layers } = map;

  const handleChangeOpacity = (layer, opacity) => {
    layers.items.forEach(mapLayer => {
      if (mapLayer.id === layer.id) { mapLayer.opacity = opacity; }
      mapLayer.layers && mapLayer.layers.items && mapLayer.layers.items.forEach(nestedLayer => {
        if (nestedLayer.id === layer.id) { nestedLayer.opacity = opacity; }
      })
    })
    setLayerOpacity(layer.id, opacity);
  }

  const handleRemoveLayer = (layer) => {
    setLayerVisibility(layer.id, false)
  }

  const toolbar = (
    <LegendItemToolbar
      onChangeInfo={handleInfoClick}
      onChangeLayer={handleLayerChange}
      onRemoveLayer={handleRemoveLayer}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
    >
      <LegendItemButtonOpacity
        className={styles.legendItemButtonOpacity}
        handleStyle={[
          {
            border: '1px solid #0E2B3B',
            backgroundColor: '#FFFFFF',
            height: '10px',
            width: '10px',
            boxShadow: '0 2px 4px 0 #0E2B3B',
            borderRadius: '50%',
            position: 'absolute',
            transform: 'translate(-5px,-9px)',
            cursor: 'pointer',
            outline: 'none'
          }
        ]}
        trackStyle={[
          { 
            backgroundColor: '#1bcec7',
            height: '4px',
            borderRadius: '4px',
            transform: 'translate(0, -3px)'
          },
        ]}
        railStyle={{
          backgroundColor: 'rgba(255,255,255,0.3)',
          height: '2px',
          borderRadius: '2px'
        }}
        marks={
          { 0: { style: { marginLeft: '0px', }, label: '0%'},
            100: { style: { marginLeft: '0px', width: 'auto' }, label: '100%'}
          }
        }
      />
      <LegendItemButtonRemove />
    </LegendItemToolbar>
  );

  return (
    <div className={styles.legend}>
      {!isFullscreenActive && <Legend sortable={false} onChangeOrder={handleChangeOrder}>
        {datasets && datasets.map((dataset, i) => (
          <LegendListItem index={i} key={dataset.slug} layerGroup={dataset} toolbar={toolbar} title={<LegendTitle name={dataset.title} layer={dataset} />}>
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