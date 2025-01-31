import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import { tutorialSections } from 'utils/dashboard-utils.js';

import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import regionsOne from 'images/dashboard/tutorials/species-regions-1.png?react';
import regionsTwo from 'images/dashboard/tutorials/species-regions-2.png?react';

import styles from '../tutorials-components-styles.module.scss';

import { SECTION_INFO } from './sections-info';

function RegionsSectionComponent() {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.title}>
        <SouthAmericaIcon />
        <h2 id={tutorialSections.REGIONS}>{t('Regions')}</h2>
      </div>
      <p>{t(SECTION_INFO.REGIONS)}</p>
      <img src={regionsOne} alt="Regions" />
      <p>{t(SECTION_INFO.REGIONS_TWO)}</p>
      <img src={regionsTwo} alt="Regions" />
    </section>
  );
}

export default RegionsSectionComponent;
