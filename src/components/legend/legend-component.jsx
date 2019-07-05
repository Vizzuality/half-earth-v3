import React from 'react';
import PropTypes from 'prop-types';
import Legend, {
  LegendItemToolbar,
  LegendItemButtonOpacity,
  LegendItemButtonInfo,
  LegendItemTypes,
  LegendListItem,
  LegendItemButtonRemove
} from 'vizzuality-components/dist/legend';

import LegendTitle from './legend-title';

import styles from './legend-styles.module.scss';

const HELegend = ({ map, datasets, handlers, isFullscreenActive, handleInfoClick, handleRemoveLayer, handleChangeOpacity /*, setLayerOrder*/ }) => {
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

  const marks = { 
    0: { style: { marginLeft: '0px', }, label: '0%'},
    100: { style: { marginLeft: '0px', width: 'auto' }, label: '100%'}
  };

  const enabledStyle = {
    fill: 'rgb(24, 186, 180)',
  };

  const defaultStyle = {
    fill: 'white'
  }


  // const findNestedLayer = (layerID) => {
  //   return layers.items.find((parentLayer) => parentLayer.layers && parentLayer.layers.items.some(({ id }) => id === layerID));
  // }
  // const compareOrders = (oldOrder, newOrder) => {
  //   const indexChanges =  oldOrder.map(item => {
  //     const orderDifference = oldOrder.indexOf(item) - newOrder.indexOf(item); 
  //     return { title: item, indexOffset: orderDifference >= 0 ? orderDifference : orderDifference * -1 }
  //   });
  //   const movedLayerId = indexChanges.find(({ indexOffset }) => {
  //     return indexOffset > 1;
  //   });

  //   if(movedLayerId) return movedLayerId.title;

  //   const movedLayerId2 = indexChanges.find(({ indexOffset }) => {
  //     return indexOffset === 1;
  //   });

  //   return movedLayerId2.title;
  // }

  // const handleChangeOrder = (layerGroupsIds) => {
  //   const oldIds = datasets.map(({ dataset }) => dataset);
  //   console.log('datasets: ',datasets)
  //   // const movedLayerID = layerGroupsIds.find(id => layerGroupsIds.indexOf(id) !== oldIds.indexOf(id));
  //   const movedLayerID = compareOrders(oldIds, layerGroupsIds);
  //   console.log('LEGEND: START');
  //   console.log('LEGEND: WHAT I FOUND: ',movedLayerID);
  //   console.log('LEGEND: new order',layerGroupsIds)

  //   const switchedPositionIndex = layerGroupsIds.indexOf(movedLayerID);
  //   console.log('- LEGEND: switchedPositionIndex: ',switchedPositionIndex);

  //   const getOldElement = oldIds[switchedPositionIndex];
  //   console.log('- LEGEND: getOldElement: ',getOldElement);
  //   console.log('layers.items: ',layers.items)
  //   const mapLayersIndex = layers.items.find(({ id }) => id === getOldElement);

  //   console.log('- LEGEND: mapLayersIndex: ',mapLayersIndex);

  //   console.log('LEGEND: new order',layerGroupsIds)
  //   console.log('MAP: BEFORE REORDER: ',layers.items.map(({ title, id }) => ({ title, id })));
  //   // const nestedLayer = layers.items.map((parentLayer) => parentLayer.layers && parentLayer.layers.items.find(({ id }) => id === movedLayer)).find(layer => layer )
  //   // const nestedLayer = layers.items.find((parentLayer) => parentLayer.layers && parentLayer.layers.items.some(({ id }) => id === movedLayerID));
  //   // console.log('nestedLayer: ',nestedLayer);
  //   // console.log('nestedLayer: ',layers.items.find(({ id }) => id === movedLayer) || nestedLayer);
  //   // console.log('ALL LAYERS: ',layers.items);
  //   const layerToReorder = layers.items.find(({ id }) => id === movedLayerID) || findNestedLayer(movedLayerID);
  //   // console.log('LAYER: id:', movedLayerID, ', layer: ',layerToReorder);
  //   console.log('NEW INDEX: ',layers.items.length - layerGroupsIds.length - 1 + layerGroupsIds.indexOf(movedLayerID))
  //   map.reorder(
  //     layerToReorder,
  //     layers.items.length - layerGroupsIds.length - 1 + layerGroupsIds.indexOf(movedLayerID)
  //   );
  //   console.log('MAP: AFTER REORDER: ', layers.items.map(({ title }) => title));
  //   console.log('MAP: map: ',map);

  //   // const updatedDatasets = [];
  //   // layerGroupsIds.forEach((id) => {
  //   //   updatedDatasets.push(datasets.find(({ dataset }) => dataset === id).dataset);
  //   // });
  //   const updatedDatasets = map.layers.items.map(({ id }) => id);
  //   console.log('LEGEND: updatedDatasets: ',updatedDatasets);
  //   console.log('LEGEND: END');

  //   setLayerOrder(layerGroupsIds);
  // };

  const toolbar = (
    <LegendItemToolbar
      onChangeInfo={handleInfoClick}
      onChangeLayer={handleLayerChange}
      onRemoveLayer={handleRemoveLayer}
      onChangeVisibility={handleChangeVisibility}
      onChangeOpacity={handleChangeOpacity}
      focusStyle={defaultStyle}
      defaultStyle={defaultStyle}
      enabledStyle={enabledStyle}
    >
      <LegendItemButtonOpacity
        className={styles.legendItemButtonOpacity}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        railStyle={railStyle}
        marks={marks}

      />
      <LegendItemButtonInfo />
      <LegendItemButtonRemove />
    </LegendItemToolbar>
  );


  return (
    <div className={styles.legend}>
      {!isFullscreenActive && <Legend sortable={false} /*onChangeOrder={handleChangeOrder}*/>
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