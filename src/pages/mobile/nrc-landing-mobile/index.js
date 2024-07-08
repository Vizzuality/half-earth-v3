import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import { setBasemap } from '../../../utils/layer-manager-utils.js';

import Component from './nrc-landing-mobile-component.jsx';
import mapStateToProps from './nrc-landing-mobile-selectors';

const actions = { ...urlActions };

function NrcLandingMobileContainer(props) {
  const { changeGlobe, sceneSettings } = props;

  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });
  const handleMapLoad = (map, activeLayers) => {
    setBasemap({
      map,
      layersArray: sceneSettings.basemap.layersArray,
    });
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return (
    <Component
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(NrcLandingMobileContainer);
