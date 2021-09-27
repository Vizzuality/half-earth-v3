import React from 'react';
import LayerToggle from 'components/layer-toggle';
import Legend from 'containers/sidebars/sidebar-legend';
import SourceAnnotation from 'components/source-annotation';
import SidebarCardWrapper from 'containers/sidebars/sidebar-card-wrapper';
import styles from './styles.module.scss';

const Component = ({
  map,
  layers,
  onChange,
  toggleType,
  legendItem,
  toggleTheme,
  activeLayers,
  percentageUnderPressure,
}) => (
  <SidebarCardWrapper className={styles.cardWrapper}>
    <div>
      <p className={styles.title}>How are humans affecting this area?</p>
      {legendItem && <Legend legendItem={legendItem} className={styles.legendContainer}/>}
      <p className={styles.description}>
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
          onChange={onChange}
          theme={toggleTheme}
          activeLayers={activeLayers}
        />
      ))}
    </div>
  </SidebarCardWrapper>
)

export default Component;