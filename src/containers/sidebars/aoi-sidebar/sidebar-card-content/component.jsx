import React from 'react';
import LayerToggle from 'components/layer-toggle';
import Legend from 'containers/sidebars/sidebar-legend';
import SourceAnnotation from 'components/source-annotation';
import checkboxTheme from 'styles/themes/checkboxes-theme.module.scss';
import styles from './styles.module.scss';

const Component = ({
  map,
  layers,
  onChange,
  toggleType,
  legendItem,
  activeLayers,
  percentageUnderPressure,
}) => (
  <>
    <div>
      <p>How are humans affecting this area?</p>
      { legendItem && <Legend legendItem={legendItem} className={styles.legendContainer}/>}
      <p>
        {`Of the current area, ${percentageUnderPressure} is under human pressure, the majority of which are pressures from irrigated agriculture.`}
      </p>
      <SourceAnnotation
        theme='dark'
        metaDataSources={' WDPA, OECM & RAISG.'}
        className={styles.sourceContainer}
      />
    </div>
    <div className={styles.togglesContainer}>
      {layers.map(layer => (
        <LayerToggle
          map={map}
          option={layer}
          key={layer.value}
          type={toggleType}
          activeLayers={activeLayers}
          theme={checkboxTheme.landPressures}
          onChange={onChange}
        />
      ))}
    </div>
  </>
)

export default Component;