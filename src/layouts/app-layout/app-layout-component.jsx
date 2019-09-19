import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import FeaturedGlobe from 'pages/featured-globe';
import DataGlobe from 'pages/data-globe';
import MapIframe from 'pages/map-iframe';

class App extends PureComponent {
  render() {
    const { route } = this.props;
    const { page } = route;
    const embedded = page === 'map-iframe';
    const whichGlobe = embedded ? <MapIframe /> : <DataGlobe />
    return page === 'featured-globe' ? <FeaturedGlobe /> : whichGlobe;
  }
}

App.propTypes = {
  route: Proptypes.object.isRequired
};

export default App;