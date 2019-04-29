import React from 'react';
import PropTypes from 'prop-types';
import Legend, {
  LegendItemButtonOpacity,
  LegendItemButtonVisibility,
  LegendItemButtonInfo,
  LegendItemButtonRemove,
  LegendItemTypes,
  LegendListItem,
  LegendItemToolbar
} from 'vizzuality-components/dist/legend';

import styles from './legend-styles.module.scss';

const HELegend = ({ datasets, handlers }) => {
  const { 
    handleChangeOrder,
    handleRemoveLayer,
    handleLayerChange,
    handleInfoClick,
    handleChangeVisibility,
    handleChangeOpacity
  } = handlers;

  const toolbar = (
    <LegendItemToolbar
      onChangeInfo={handleInfoClick}
      onChangeLayer={handleLayerChange}
      onRemoveLayer={handleRemoveLayer}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
    >
      <LegendItemButtonOpacity />
      <LegendItemButtonVisibility />
      <LegendItemButtonInfo />
      <LegendItemButtonRemove />
    </LegendItemToolbar>
  );

  return (
    <div className={styles.legend}>
      <Legend sortable={datasets && datasets.length >= 1} onChangeOrder={handleChangeOrder}>
        {datasets && datasets.map((dataset, i) => (
          <LegendListItem index={i} key={dataset.slug} layerGroup={dataset} toolbar={toolbar}>
            <LegendItemTypes />
          </LegendListItem>
        ))}
      </Legend>
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
