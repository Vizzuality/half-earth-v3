import React, { useContext } from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import IndicatorsSectionComponent from './sections/indicators-section-component';
import RegionsSectionComponent from './sections/regions-section-component';
import SpeciesSectionComponent from './sections/species-section-component';
import styles from './tutorials-components-styles.module.scss';

function TutorialsComponent() {
  const t = useT();
  const { lightMode } = useContext(LightModeContext);

  const goToSection = (section) => {
    console.log(section);
    const sectionElement = document.getElementById(section);
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Tutorials & Help')}</span>

      <hr className={hrTheme.dark} />
      <div className={styles.help}>
        <nav>
          <h3>Jump to:</h3>
          <button
            type="button"
            className={styles.section}
            onClick={() => goToSection('species')}
          >
            {t('Species')}
          </button>
          <ul>
            <li>
              <button type="button" onClick={() => goToSection('data-layers')}>
                {t('Data Layers')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => goToSection('indicator-scores')}
              >
                {t('Indicator Scores')}
              </button>
            </li>
          </ul>
          <button
            type="button"
            className={styles.section}
            onClick={() => goToSection('regions')}
          >
            {t('Regions')}
          </button>
          <button
            type="button"
            className={styles.section}
            onClick={() => goToSection('indicators')}
          >
            {t('Indicators')}
          </button>
          <ul>
            <li>
              <button type="button" onClick={() => goToSection('spi')}>
                {t('Species Protection Index')}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goToSection('shi')}>
                {t('Species Habitat Index')}
              </button>
            </li>
            <li>
              <button type="button" onClick={() => goToSection('sii')}>
                {t('Species Informcation Index')}
              </button>
            </li>
          </ul>
        </nav>
        <div className={styles.information}>
          <SpeciesSectionComponent />
          <RegionsSectionComponent />
          <IndicatorsSectionComponent />
        </div>
      </div>
    </section>
  );
}

export default TutorialsComponent;
