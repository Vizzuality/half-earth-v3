import React, { useContext } from 'react';

import { useT } from '@transifex/react';

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
        <h2>{t('Regions')}</h2>
      </div>
      <p>{t(SECTION_INFO.SPECIES)}</p>
    </section>
  );
}

export default RegionsSectionComponent;
