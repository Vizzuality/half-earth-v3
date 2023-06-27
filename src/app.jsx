import 'he-components/dist/main.css';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import loadable from '@loadable/component';

import { tx, PseudoTranslationPolicy } from '@transifex/native';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ThirdParty from 'containers/third-party';

import { useMobile } from 'constants/responsive';

import styles from './app-styles.module.scss';

// Dynamic imports
const Landing = loadable(() => import('pages/landing'));
const LandingMobile = loadable(() => import('pages/mobile/landing-mobile'));
const DataGlobe = loadable(() => import('pages/data-globe'));
const NationalReportCardLandingMobile = loadable(() =>
  import('pages/mobile/nrc-landing-mobile')
);
const NationalReportCardMobile = loadable(() =>
  import('pages/mobile/nrc-mobile')
);
const PriorityMobileGlobe = loadable(() =>
  import('pages/mobile/priority-mobile')
);
const FeaturedGlobe = loadable(() => import('pages/featured-globe'));
const NationalReportCard = loadable(() => import('pages/nrc'));
const NationalReportCardLanding = loadable(() => import('pages/nrc-landing'));
const AreaOfInterest = loadable(() => import('pages/aoi'));

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
  lang: location.query && location.query.lang,
});

const { REACT_APP_TRANSIFEX_TOKEN } = process.env;

function AppLayout(props) {
  const { route } = props;
  const { page } = route;
  const isMobile = useMobile();

  switch (page) {
    case 'data-globe':
      return isMobile ? <PriorityMobileGlobe /> : <DataGlobe />;
    case 'featured-globe':
      return <FeaturedGlobe />;
    case 'nrc':
      if (isMobile) {
        return <NationalReportCardMobile />;
      }
      return <NationalReportCard />;
    case 'nrc-landing':
      return isMobile ? (
        <NationalReportCardLandingMobile />
      ) : (
        <NationalReportCardLanding />
      );
    case 'aoi':
      return <AreaOfInterest />;
    default:
      return isMobile ? <LandingMobile /> : <Landing />;
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
      <div className={styles.app}>
        <AppLayout {...props} />
        <ThirdParty />
      </div>
    </QueryClientProvider>
  );
}

export default connect(mapStateToProps, null)(App);
