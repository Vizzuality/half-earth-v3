import React from 'react';
import { connect } from 'react-redux';
import Component from './geo-description-widget-component';
import mapStateToProps from './geo-description-widget-selectors';

// this forces the registration of redux module and sagas
import 'redux_modules/geo-description';

const GeoDescriptionWidget = props => {
  const handleBackClick = () => {
    const { view } = props;
    const target = { center: view.center, zoom: 7 }
    view.goTo(target);
  };

  return <Component handleBackClick={handleBackClick} {...props}/>
}

export default connect(mapStateToProps)(GeoDescriptionWidget);
