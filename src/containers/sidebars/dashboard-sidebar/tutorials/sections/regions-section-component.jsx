import React, { useContext } from 'react';

import { useLocale, useT } from '@transifex/react';

import { tutorialSections } from 'utils/dashboard-utils.js';

import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import ImagePopupComponent from 'components/image-popup/image-popup-component';

// import regionsOne from 'images/dashboard/tutorials/tutorial_regions_landing-en.png?react';
// import regionsTwo from 'images/dashboard/tutorials/tutorial_regions_speciesList-en.png?react';

import styles from '../tutorials-components-styles.module.scss';

import { SECTION_INFO } from './sections-info';

function RegionsSectionComponent(props) {
  const t = useT();
  const locale = useLocale();
  const { lightMode } = useContext(LightModeContext);
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.title}>
        <SouthAmericaIcon />
        <h2 id={tutorialSections.REGIONS}>{t('Regions')}</h2>
      </div>
      <p>{t(SECTION_INFO.REGIONS)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_regions_landing-${
            locale || 'en'
          }.png?react`}
          alt="Regions"
        />
      </ImagePopupComponent>
      <p>{t(SECTION_INFO.REGIONS_TWO)}</p>
      <ImagePopupComponent {...props}>
        <img
          src={`dashboard/tutorials/tutorial_regions_speciesList-${
            locale || 'en'
          }.png?react`}
          alt="Regions"
        />
      </ImagePopupComponent>
    </section>
  );
}

export default RegionsSectionComponent;
