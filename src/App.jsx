import React, { Component } from 'react';
import {connect} from 'react-redux'; 
import { hot } from 'react-hot-loader';
import FeaturedGlobe from 'pages/featured-globe';
import DataGlobe from 'pages/data-globe';
import MapIframe from 'pages/map-iframe';
import NationalReportCard from 'pages/nrc';
import AreaOfInterest from 'pages/aoi';

import { Icons as VizzIcons } from 'vizzuality-components';
import 'he-components/dist/main.css';
import 'vizzuality-components/dist/legend.css';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type]
});

const AppLayout = (props) => {
  const { route } = props;
  const { page } = route;
  switch(page){
    case 'featured-globe':
      return <FeaturedGlobe />;
    case 'nrc':
      return <NationalReportCard />;
    case 'aoi':
      return <AreaOfInterest />;
    case 'map-iframe':
      return <MapIframe />;
    default:
        return <DataGlobe />;
  }
}

class App extends Component {
  render() {
    return (
      <div className="App" style={{width:'100vw', height:'100vh', backgroundColor: '#0a212e'}} >
        <AppLayout {...this.props}/>
        <VizzIcons />
      </div>
    );
  }
}

export default process.env.NODE_ENV === "development" ? hot(module)(connect(mapStateToProps, null)(App)) : connect(mapStateToProps, null)(App);
