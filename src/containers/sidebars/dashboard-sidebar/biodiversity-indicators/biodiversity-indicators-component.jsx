import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import { useT } from '@transifex/react';
import hrTheme from 'styles/themes/hr-theme.module.scss';
import { Loading } from 'he-components';
import styles from './biodiversity-indicators-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
// import country_attrs from '../mol-country-attributes.json';
import HabitatContainer from './habitat';
import ProtectionContainer from './protection';

function BioDiversityComponent(props) {
  const t = useT();
  const {
    lightMode,
    selectedTab,
    setSelectedTab,
    habitatScore,
    habitatTableData,
    globalHabitatScore,
    protectionScore,
    globalProtectionScore,
    protectionTableData,
    protectionArea,
    globalProtectionArea } = props

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!protectionScore) return;
    setIsLoading(false);
  }, [protectionScore]);


  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Biodiversity Indicators')}</span>
      <hr className={hrTheme.dark} />
      {isLoading && <Loading height={200} />}
      {!isLoading && <>
        <div className={styles.tabs}>
          <button
            type="button"
            aria-label={t('Species Protection Index')}
            className={cx({
              [styles.selected]: selectedTab === 2,
            })}
            onClick={() => setSelectedTab(2)}
          >
            <span>{protectionScore}%</span>
            <span>{t('Protection Score')}</span>
          </button>
          <button
            type="button"
            aria-label={t('Species Habitat Index')}
            className={cx({
              [styles.selected]: selectedTab === 1,
            })}
            onClick={() => setSelectedTab(1)}
          >
            <span>{habitatScore}%</span>
            <span>{t('Habitat Score')}</span>
          </button>
          {/* <button
            type="button"
            aria-label={t('Species Information Index')}
            className={cx({
              [styles.selected]: selectedTab === 3,
            })}
            onClick={() => setSelectedTab(3)}
          >
            <span>0.00%</span>
            <span>{t('Information Score')}</span>
          </button> */}
        </div>
        {selectedTab === 1 &&
          <HabitatContainer
            habitatScore={habitatScore}
            globalHabitatScore={globalHabitatScore}
            habitatTableData={habitatTableData}
            {...props} />
        }
        {selectedTab === 2 &&
          <ProtectionContainer
            protectionScore={protectionScore}
            globalProtectionScore={globalProtectionScore}
            protectionTableData={protectionTableData}
            protectionArea={protectionArea}
            globalProtectionArea={globalProtectionArea}
            {...props} />
        }
      </>
      }
    </section>
  );
}

export default BioDiversityComponent;
