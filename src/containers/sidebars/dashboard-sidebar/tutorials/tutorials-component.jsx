import React, { useContext, useState } from 'react';

import { useT } from '@transifex/react';

import { tutorialSections } from 'utils/dashboard-utils.js';

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
  const [selectedSection, setSelectedSection] = useState();

  const goToSection = (section) => {
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
            onClick={() => goToSection(tutorialSections.SPECIES)}
          >
            {t('Species')}
          </button>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => goToSection(tutorialSections.DATA_LAYERS)}
              >
                {t('Data Layers')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => goToSection(tutorialSections.INDICATOR_SCORES)}
              >
                {t('Indicator Scores')}
              </button>
            </li>
          </ul>
          <button
            type="button"
            className={styles.section}
            onClick={() => goToSection(tutorialSections.REGIONS)}
          >
            {t('Regions')}
          </button>
          <button
            type="button"
            className={styles.section}
            onClick={() => goToSection(tutorialSections.INDICATORS)}
          >
            {t('Indicators')}
          </button>
          <ul>
            <li>
              <button
                type="button"
                onClick={() => goToSection(tutorialSections.SPI)}
              >
                {t('Species Protection Index')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => goToSection(tutorialSections.SHI)}
              >
                {t('Species Habitat Index')}
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => goToSection(tutorialSections.SII)}
              >
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
