import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import { tutorialSections } from 'utils/dashboard-utils.js';

import SouthAmericaIcon from '@mui/icons-material/SouthAmerica';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

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
      <p>{t(SECTION_INFO.REGIONS_TWO)}</p>
    </section>
  );
}

export default RegionsSectionComponent;
