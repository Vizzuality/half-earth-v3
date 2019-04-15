import React, { Component } from 'react';
import { hot } from 'react-hot-loader'
// import DataGlobe from 'components/globe-data-view';
// import dataGlobeViewConfig from './sceneConfigs/dataGlobeViewConfig';
import featuredGlobeViewConfig from './sceneConfigs/featuredGlobeViewConfig';
import FeaturedGlobe from 'components/globe-featured-view';

import { Icons as VizzIcons } from 'vizzuality-components';

import Legend from 'components/shared/legend';

class App extends Component {
  render() {
    return (
      <div className="App">
        <FeaturedGlobe sceneConfig={featuredGlobeViewConfig} />
        <VizzIcons />
        <Legend />
      </div>
    );
  }
}

export default process.env.NODE_ENV === "development" ? hot(module)(App) : App;
