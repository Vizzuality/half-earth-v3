import loadable from '@loadable/component';

import LandingScene from 'scenes/landing-scene';

import About from 'containers/landing/about';

import Logo from 'components/half-earth-logo';
import LanguageSwitcher from 'components/language-switcher';

import uiStyles from 'styles/ui.module.scss';

const InfoModal = loadable(() => import('components/modal-metadata'));

function LandingComponent({ hasMetadata, sceneSettings }) {
  return (
    <>
      <Logo className={uiStyles.halfEarthLogoTopLeft} />
      <LanguageSwitcher />
      <About />
      <LandingScene sceneSettings={sceneSettings} />
      {hasMetadata && <InfoModal />}
    </>
  );
}

export default LandingComponent;
