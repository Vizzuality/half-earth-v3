import 'he-components/dist/main.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import loadable from '@loadable/component';

import { tx, PseudoTranslationPolicy } from '@transifex/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { MobileOnly } from 'constants/responsive';

import MobileDisclaimer from './components/mobile-disclaimer-modal';

// Dynamic imports
const Landing = loadable(() => import('pages/landing'));
const FeaturedGlobe = loadable(() => import('pages/featured-globe'));
const DataGlobe = loadable(() => import('pages/data-globe'));
const NationalReportCardLegacy = loadable(() => import('pages/nrc-legacy'));
const NationalReportCard = loadable(() => import('pages/nrc'));
const NationalReportCardLanding = loadable(() => import('pages/nrc-landing'));
const AreaOfInterest = loadable(() => import('pages/aoi'));

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
  lang: location.query && location.query.lang,
});

const { REACT_APP_TRANSIFEX_TOKEN, REACT_APP_FEATURE_NEW_NRC_PAGE } =
  process.env;

function AppLayout(props) {
  const { route } = props;
  const { page } = route;
  switch (page) {
    case 'data-globe':
      return <DataGlobe />;
    case 'featured-globe':
      return <FeaturedGlobe />;
    case 'nrc':
      return REACT_APP_FEATURE_NEW_NRC_PAGE ? (
        <NationalReportCard />
      ) : (
        <NationalReportCardLegacy />
      );
    case 'nrc-landing':
      return <NationalReportCardLanding />;
    case 'aoi':
      return <AreaOfInterest />;
    default:
      return <Landing />;
  }
}

const queryClient = new QueryClient();

function App(props) {
  useEffect(() => {
    tx.init({
      token: REACT_APP_TRANSIFEX_TOKEN,
      ...(process.env.NODE_ENV === 'development'
        ? { missingPolicy: new PseudoTranslationPolicy() }
        : {}),
    });
  }, []);

  const { lang } = props;

  useEffect(() => {
    // Used for initial render
    tx.setCurrentLocale(lang);
  }, [lang]);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className="App"
        style={{ width: '100vw', height: '100vh', backgroundColor: '#0a212e' }}
      >
        <MobileOnly>
          <MobileDisclaimer />
        </MobileOnly>
        <AppLayout {...props} />
      </div>
    </QueryClientProvider>
  );
}

export default connect(mapStateToProps, null)(App);
