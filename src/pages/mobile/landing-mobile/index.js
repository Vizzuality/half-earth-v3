import { connect } from 'react-redux';

import * as urlActions from 'actions/url-actions';

import { activateLayersOnLoad } from 'utils/layer-manager-utils';

import { layersConfig } from 'constants/mol-layers-configs';

import LandingComponent from './landing-mobile-component.jsx';
import mapStateToProps from './landing-mobile-selectors';

const actions = { ...urlActions };

function LandingMobileContainer(props) {
  const { changeGlobe } = props;

  const handleGlobeUpdating = (updating) =>
    changeGlobe({ isGlobeUpdating: updating });

  const handleMapLoad = (map, activeLayers) => {
    activateLayersOnLoad(map, activeLayers, layersConfig);
  };

  return (
    <LandingComponent
      handleMapLoad={handleMapLoad}
      handleGlobeUpdating={handleGlobeUpdating}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(LandingMobileContainer);
