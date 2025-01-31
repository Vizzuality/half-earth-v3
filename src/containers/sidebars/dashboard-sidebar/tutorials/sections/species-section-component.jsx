import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import { tutorialSections } from 'utils/dashboard-utils.js';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import BirdsIcon from 'icons/bird_icon.svg?react';
import IndicatorIcon from 'icons/gauge_icon.svg?react';
import StacksIcon from 'icons/stacks.svg?react';

import dataLayers from 'images/dashboard/tutorials/species-data-layers.png?react';
import indicatorScores from 'images/dashboard/tutorials/species-indicator-scores.png?react';

import styles from '../tutorials-components-styles.module.scss';

import { SECTION_INFO } from './sections-info';

function SpeciesSectionComponent() {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.title}>
        <BirdsIcon />
        <h2 id={tutorialSections.SPECIES}>{t('Species')}</h2>
      </div>
      <p>{t(SECTION_INFO.SPECIES)}</p>
      <div className={styles.subTitle}>
        <StacksIcon />
        <h3 id={tutorialSections.DATA_LAYERS}>{t('Data Layers')}</h3>
      </div>
      <p>{t(SECTION_INFO.DATA_LAYER)}</p>
      <img src={dataLayers} alt="Data Layers" />
      <div className={styles.subTitle}>
        <IndicatorIcon />
        <h3 id={tutorialSections.INDICATOR_SCORES}>{t('Indicator Scores')}</h3>
      </div>
      <p>{t(SECTION_INFO.INDICATOR_SCORES)}</p>
      <img src={indicatorScores} alt="Indicator Scores" />
    </section>
  );
}

export default SpeciesSectionComponent;
