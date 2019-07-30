import React from 'react';
import { connect } from 'react-redux';
import Component from './geo-description-widget-component';
import mapStateToProps from './geo-description-widget-selectors';

// this forces the registration of redux module and sagas
import 'redux_modules/geo-description';

const GeoDescriptionWidget = props => {
  const handleBackClick = () => {
    const { view } = props;
    const { center } = view;
    const target = {
      position: {
        x: center.longitude,
        y: center.latitude,
        z: 1000000
      },
      heading: 0,
      tilt: 0
    }
    view.goTo(target)
  };

  return <Component handleBackClick={handleBackClick} {...props}/>
}

export default connect(mapStateToProps)(GeoDescriptionWidget);
