import React, { Component } from 'react';
import loadable from '@loadable/component';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import 'he-components/dist/main.css';
// Dynamic imports
const FeaturedGlobe = loadable(() => import('pages/featured-globe'));
const DataGlobe = loadable(() => import('pages/data-globe'));
const NationalReportCard = loadable(() => import('pages/nrc'));
const NationalReportCardLanding = loadable(() => import('pages/nrc-landing'));
const AreaOfInterest = loadable(() => import('pages/aoi'));

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
});

const AppLayout = (props) => {
  const { route } = props;
  const { page } = route;
  switch (page) {
    case 'featured-globe':
      return <FeaturedGlobe />;
    case 'nrc':
      return <NationalReportCard />;
    case 'nrc-landing':
      return <NationalReportCardLanding />;
    case 'aoi':
      return <AreaOfInterest />;
    default:
      return <DataGlobe />;
  }
};

class App extends Component {
  render() {
    return (
      <div
        className="App"
        style={{ width: '100vw', height: '100vh', backgroundColor: '#0a212e' }}
      >
        <AppLayout {...this.props} />
      </div>
    );
  }
}

export default process.env.NODE_ENV === 'development'
  ? hot(module)(connect(mapStateToProps, null)(App))
  : connect(mapStateToProps, null)(App);
