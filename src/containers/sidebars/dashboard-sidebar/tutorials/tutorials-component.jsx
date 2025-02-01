import React, { useContext, useEffect, useRef, useState } from 'react';

import { useT } from '@transifex/react';

import { tutorialSections } from 'utils/dashboard-utils.js';

import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import IndicatorsSectionComponent from './sections/indicators-section-component';
import RegionsSectionComponent from './sections/regions-section-component';
import SpeciesSectionComponent from './sections/species-section-component';
import styles from './tutorials-components-styles.module.scss';

function TutorialsComponent(props) {
  const t = useT();
  const divRef = useRef(null);
  const { lightMode } = useContext(LightModeContext);
  const [selectedSection, setSelectedSection] = useState();

  const goToSection = (section) => {
    setSelectedSection(section);
    const sectionElement = document.getElementById(section);
    sectionElement.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const div = divRef.current;

    if (div) {
      const handleScroll = () => {
        let currentActiveHeading = null;

        Object.values(tutorialSections).forEach((section) => {
          if (section) {
            const sectionElement = document.getElementById(section);
            const rect = sectionElement.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // Check if the heading is in view (adjust threshold as needed)
            const isInView = rect.top <= viewportHeight * 0.3; // Example: 25% from top and bottom

            if (isInView) {
              currentActiveHeading = section;
            }
          }
        });

        setSelectedSection(currentActiveHeading);
      };

      div.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check

      return () => {
        div.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Tutorials & Help')}</span>

      <hr className={hrTheme.dark} />
      <div className={styles.help}>
        <nav>
          <h3>Jump to:</h3>
          <button
            type="button"
            className={cx(styles.section, {
              [styles.selected]: selectedSection === tutorialSections.SPECIES,
            })}
            onClick={() => goToSection(tutorialSections.SPECIES)}
          >
            {t('Species')}
          </button>
          <ul>
            <li>
              <button
                type="button"
                className={cx({
                  [styles.selected]:
                    selectedSection === tutorialSections.DATA_LAYERS,
                })}
                onClick={() => goToSection(tutorialSections.DATA_LAYERS)}
              >
                {t('Data Layers')}
              </button>
            </li>
            <li>
              <button
                type="button"
                className={cx({
                  [styles.selected]:
                    selectedSection === tutorialSections.INDICATOR_SCORES,
                })}
                onClick={() => goToSection(tutorialSections.INDICATOR_SCORES)}
              >
                {t('Indicator Scores')}
              </button>
            </li>
          </ul>
          <button
            type="button"
            className={cx(styles.section, {
              [styles.selected]: selectedSection === tutorialSections.REGIONS,
            })}
            onClick={() => goToSection(tutorialSections.REGIONS)}
          >
            {t('Regions')}
          </button>
          <button
            type="button"
            className={cx(styles.section, {
              [styles.selected]:
                selectedSection === tutorialSections.INDICATORS,
            })}
            onClick={() => goToSection(tutorialSections.INDICATORS)}
          >
            {t('Indicators')}
          </button>
          <ul>
            <li>
              <button
                type="button"
                className={cx({
                  [styles.selected]: selectedSection === tutorialSections.SPI,
                })}
                onClick={() => goToSection(tutorialSections.SPI)}
              >
                {t('Species Protection Index')}
              </button>
            </li>
            <li>
              <button
                type="button"
                className={cx({
                  [styles.selected]: selectedSection === tutorialSections.SHI,
                })}
                onClick={() => goToSection(tutorialSections.SHI)}
              >
                {t('Species Habitat Index')}
              </button>
            </li>
            <li>
              <button
                type="button"
                className={cx({
                  [styles.selected]: selectedSection === tutorialSections.SII,
                })}
                onClick={() => goToSection(tutorialSections.SII)}
              >
                {t('Species Informcation Index')}
              </button>
            </li>
          </ul>
        </nav>
        <div ref={divRef} className={styles.information}>
          <SpeciesSectionComponent {...props} />
          <RegionsSectionComponent {...props} />
          <IndicatorsSectionComponent {...props} />
        </div>
      </div>
    </section>
  );
}

export default TutorialsComponent;
