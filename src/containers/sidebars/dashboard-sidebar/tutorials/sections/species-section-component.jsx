import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import BirdsIcon from 'icons/bird_icon.svg?react';
import IndicatorIcon from 'icons/gauge_icon.svg?react';
import StacksIcon from 'icons/stacks.svg?react';

import styles from '../tutorials-components-styles.module.scss';

import { SECTION_INFO } from './sections-info';

function SpeciesSectionComponent() {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.title}>
        <BirdsIcon />
        <h2 id="species">{t('Species')}</h2>
      </div>
      <p>{t(SECTION_INFO.SPECIES)}</p>
      <div className={styles.subTitle}>
        <StacksIcon />
        <h3 id="data-layers">{t('Data Layers')}</h3>
      </div>
      <p>{t(SECTION_INFO.DATA_LAYER)}</p>
      <div className={styles.subTitle}>
        <IndicatorIcon />
        <h3 id="indicator-scores">{t('Indicator Scores')}</h3>
      </div>
      <p>{t(SECTION_INFO.INDICATORS)}</p>
    </section>
  );
}

export default SpeciesSectionComponent;
