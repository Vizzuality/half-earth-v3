import 'he-components/dist/main.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import loadable from '@loadable/component';

import { tx, PseudoTranslationPolicy } from '@transifex/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useMobile, MobileOnly } from 'constants/responsive';

import styles from './app-styles.module.scss';
import MobileDisclaimer from './components/mobile-disclaimer-modal';

// Dynamic imports
const Landing = loadable(() => import('pages/landing'));
const LandingMobile = loadable(() => import('pages/mobile/landing-mobile'));
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

const {
  REACT_APP_TRANSIFEX_TOKEN,
  REACT_APP_FEATURE_NEW_NRC_PAGE,
  REACT_APP_FEATURE_MOBILE,
} = process.env;

function AppLayout(props) {
  const { route } = props;
  const { page } = route;
  const isMobile = useMobile();

  const isMobileFlag = isMobile && REACT_APP_FEATURE_MOBILE;

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
      return isMobileFlag ? <LandingMobile /> : <Landing />;
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
        className={styles.app}
        style={{ width: '100vw', height: '100vh', backgroundColor: '#0a212e' }}
      >
        {!REACT_APP_FEATURE_MOBILE && (
          <MobileOnly>
            <MobileDisclaimer />
          </MobileOnly>
        )}
        <AppLayout {...props} />
      </div>
    </QueryClientProvider>
  );
}

export default connect(mapStateToProps, null)(App);
