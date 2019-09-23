import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';
import FeaturedGlobe from 'pages/featured-globe';
import DataGlobe from 'pages/data-globe';
import DataGlobeSimple from 'pages/simple';


class App extends PureComponent {
  render() {
    const { route } = this.props;
    const { page } = route;
    return page === 'featured-globe' ? <FeaturedGlobe /> : <DataGlobeSimple />;
  }
}

App.propTypes = {
  route: Proptypes.object.isRequired
};

export default App;