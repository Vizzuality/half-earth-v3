import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import TimeLineIcon from 'icons/timeline.svg?react';

import styles from '../tutorials-components-styles.module.scss';

import { SECTION_INFO } from './sections-info';

function IndicatorsSectionComponent() {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.title}>
        <TimeLineIcon />
        <h2>{t('Indicators')}</h2>
      </div>
      <p>{t(SECTION_INFO.SPECIES)}</p>
      <div className={styles.subTitle}>
        <h3>{t('Species Protection Index')}</h3>
      </div>
      <p>{t(SECTION_INFO.INDICATORS)}</p>
      <div className={styles.subTitle}>
        <h3>{t('Species Habitat Index')}</h3>
      </div>
      <p>{t(SECTION_INFO.INDICATORS)}</p>
      <div className={styles.subTitle}>
        <h3>{t('Species Information Index')}</h3>
      </div>
      <p>{t(SECTION_INFO.INDICATORS)}</p>
    </section>
  );
}

export default IndicatorsSectionComponent;
