import React from 'react';
import PropTypes from 'prop-types';
import Legend, {
  LegendItemToolbar,
  LegendItemButtonOpacity,
  LegendItemTypes,
  LegendListItem
} from 'vizzuality-components/dist/legend';

import LegendTitle from './legend-title';

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
    </LegendItemToolbar>
  );

  return (
    <div className={styles.legend}>
      <Legend sortable={false} onChangeOrder={handleChangeOrder}>
        {datasets && datasets.map((dataset, i) => (
          <LegendListItem index={i} key={dataset.slug} layerGroup={dataset} toolbar={toolbar} title={<LegendTitle name='test name' />}>
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
