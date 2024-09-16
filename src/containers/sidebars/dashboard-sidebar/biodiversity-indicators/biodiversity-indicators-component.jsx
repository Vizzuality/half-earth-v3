import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { useT } from '@transifex/react';
import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './biodiversity-indicators-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
// import country_attrs from '../mol-country-attributes.json';
import HabitatContainer from './habitat';
import ProtectionContainer from './protection';

function BioDiversityComponent(props) {
  const t = useT();
  const {
    lightMode,
    selectedIndex,
    setSelectedIndex,
    habitatScore,
    habitatTableData,
    globalHabitatScore,
    protectionScore,
    globalProtectionScore,
    protectionTableData,
    protectionArea,
    globalProtectionArea } = props

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Biodiversity Indicators')}</span>
      <hr className={hrTheme.dark} />
      <div className={styles.tabs}>
        <button
          type="button"
          aria-label="Species Protection Index"
          className={cx({
            [styles.selected]: selectedIndex === 2,
          })}
          onClick={() => setSelectedIndex(2)}
        >
          <span>{protectionScore}%</span>
          <span>{t('Protection Score')}</span>
        </button>
        <button
          type="button"
          aria-label="Species Habitat Index"
          className={cx({
            [styles.selected]: selectedIndex === 1,
          })}
          onClick={() => setSelectedIndex(1)}
        >
          <span>{habitatScore}%</span>
          <span>{t('Habitat Score')}</span>
        </button>
        <button
          type="button"
          aria-label="Species Information Index"
          className={cx({
            [styles.selected]: selectedIndex === 3,
          })}
          onClick={() => setSelectedIndex(3)}
        >
          <span>{t('Information Score')}</span>
        </button>
      </div>
      {selectedIndex === 1 &&
        <HabitatContainer
          habitatScore={habitatScore}
          globalHabitatScore={globalHabitatScore}
          habitatTableData={habitatTableData}
          {...props} />
      }
      {selectedIndex === 2 &&
        <ProtectionContainer
          protectionScore={protectionScore}
          globalProtectionScore={globalProtectionScore}
          protectionTableData={protectionTableData}
          protectionArea={protectionArea}
          globalProtectionArea={globalProtectionArea}
          {...props} />
      }
    </section>
  );
}

export default BioDiversityComponent;
