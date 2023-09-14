import React from 'react';
import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad, setBasemap } from 'utils/layer-manager-utils';

import { FIREFLY_BASEMAP_LAYER } from 'constants/layers-slugs';
import { layersConfig } from 'constants/mol-layers-configs';

import DataGlobeComponent from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';

const actions = { ...urlActions };

function DataGlobeContainer(props) {
  const { changeGlobe } = props;
  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      surfaceColor: '#070710',
      layersArray: [FIREFLY_BASEMAP_LAYER],
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return (
    <DataGlobeComponent
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(DataGlobeContainer);
