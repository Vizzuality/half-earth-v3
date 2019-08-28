import React, { useEffect } from 'react';
import PieChart from 'components/pie-chart';
import { handleLayerRendered } from 'utils/layer-manager-utils';
import { WDPALayers } from 'constants/protected-areas';
import CheckboxGroup from 'components/checkbox-group';
import styles from './conservation-efforts-widget-styles.module.scss';

const ConservationEffortsWidget = ({ map, view, activeLayers, handleGlobeUpdating, addLayerAnalyticsEvent, removeLayerAnalyticsEvent,  handleLayerToggle, setConservationEfforts, terrestrialCellData, calculatedChartData, colors }) => {
  const protectedLayers = calculatedChartData && WDPALayers.map(layer => ({
    ...layer,
    name: layer.name === 'Protected areas' ? `${layer.name} ${calculatedChartData.protected}%` : `${layer.name} ${calculatedChartData.community}%`
  })) || [];
  
  const conservationPropsLayer = map.layers.items.find(l => l.title === 'ConsProp');

  const queryParams = conservationPropsLayer.createQuery();

  const alreadyChecked = WDPALayers.reduce((acc, option) => ({ 
    ...acc, [option.value]: activeLayers.some(layer => layer.title === option.title) 
  }), {});

  const toggleLayer = (layersPassed, option) => {
    const layerNotRendered = !activeLayers.some(layer => layer.title === option.id);

    const layerToggled = map.layers.items.reduce((wantedLayer, currentLayer) => {
      if(currentLayer.title === option.id) return currentLayer;
      if(currentLayer.layers) return currentLayer.layers.items.find(layer => layer.title === option.id);
      return wantedLayer;
    }, null)
    
    if (layerNotRendered) {
      handleGlobeUpdating(true);
    }

    handleLayerToggle(option.id);
    handleLayerRendered(view, layerToggled, handleGlobeUpdating);

    const isLayerActive = alreadyChecked[option.value];
    if (isLayerActive) addLayerAnalyticsEvent({ slug: option.slug })
    else removeLayerAnalyticsEvent({ slug: option.slug });
  }

  useEffect(() => {
    if (terrestrialCellData) {
      queryParams.where = `CELL_ID IN (${terrestrialCellData.map(i => i.CELL_ID).join(', ')})`;
      conservationPropsLayer.queryFeatures(queryParams).then(function(results){
        const { features } = results;
        setConservationEfforts(features.map(c => c.attributes));
      });
    }
  }, [terrestrialCellData])

  console.log('calculatedChartData', calculatedChartData)

  return (
    <div className={styles.container}>
      <div className={styles.fixBlur} />
      <div className={styles.padding}>
        <h3 className={styles.title}>Conservation Efforts</h3>
        <PieChart
          data={calculatedChartData}
          colors={colors}
          alreadyChecked={alreadyChecked}
        />
      </div>
      <CheckboxGroup 
        handleClick={toggleLayer}
        checkedOptions={alreadyChecked}
        options={protectedLayers}
        theme={styles} 
      />
      {calculatedChartData && (
        <p className={styles.notUnderConservationLabel}>
          Not under conservation {calculatedChartData.notUnderConservation}%
        </p>
      )}
    </div>
  )
}

export default ConservationEffortsWidget;