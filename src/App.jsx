import loadable from '@loadable/component';
import 'he-components/dist/main.css';
import React, { useEffect } from 'react';
import { tx, PseudoTranslationPolicy } from '@transifex/native';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';

// Dynamic imports
const Landing = loadable(() => import('pages/landing'));
const FeaturedGlobe = loadable(() => import('pages/featured-globe'));
const DataGlobe = loadable(() => import('pages/data-globe'));
const MapIframe = loadable(() => import('pages/map-iframe'));
const NationalReportCard = loadable(() => import('pages/nrc'));
const NationalReportCardLanding = loadable(() => import('pages/nrc-landing'));
const AreaOfInterest = loadable(() => import('pages/aoi'));

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
  lang: location.query.lang,
});

const { REACT_APP_TRANSIFEX_TOKEN } = process.env;

const AppLayout = (props) => {
  const { route } = props;
  const { page } = route;
  switch (page) {
    case 'data-globe':
      return <DataGlobe />;
    case 'featured-globe':
      return <FeaturedGlobe />;
    case 'nrc':
      return <NationalReportCard />;
    case 'nrc-landing':
      return <NationalReportCardLanding />;
    case 'aoi':
      return <AreaOfInterest />;
    case 'map-iframe':
      return <MapIframe />;
    default:
      return <Landing />;
  }
};

const App = (props) => {
  useEffect(() => {
    tx.init({
      token: REACT_APP_TRANSIFEX_TOKEN,
      ...(process.env.NODE_ENV === 'development'
        ? { missingPolicy: new PseudoTranslationPolicy() }
        : {}),
    });
  }, []);

  useEffect(() => {
    tx.setCurrentLocale(props.lang);
  }, [props.lang]);

  return (
    <div
      className="App"
      style={{ width: '100vw', height: '100vh', backgroundColor: '#0a212e' }}
    >
      <AppLayout {...props} />
    </div>
  );
};

export default process.env.NODE_ENV === 'development'
  ? hot(module)(connect(mapStateToProps, null)(App))
  : connect(mapStateToProps, null)(App);
