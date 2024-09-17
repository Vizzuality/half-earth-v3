import React, { useContext, useState } from 'react'

import PartnersContainer from '../../../../components/partners';
import styles from './dashboard-home-styles.module.scss';
import hrTheme from 'styles/themes/hr-theme.module.scss';
import cx from 'classnames';
import Button from 'components/button';
import SearchInput from 'components/search-input';
import { LightModeContext } from '../../../../context/light-mode';
import { useT } from '@transifex/react';
import { NAVIGATION } from '../../../../components/dashboard-nav/dashboard-nav-component';

function DashboardHomeComponent(props) {
  const t = useT();
  const { countryISO, setSelectedIndex } = props;

  const { lightMode, } = useContext(LightModeContext);
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (searchText) => {
    setSearchInput(searchText);
  }

  return (
    <div className={cx(lightMode ? styles.light : '', styles.container)}>
      <div className={styles.content}>
        <span className={styles.sectionTitle}>{t('Biodiversity Dashboard')}</span>
        <hr className={hrTheme.dark} />
        <p>{t('Explore species spatial data, view conservation status, and analyze regions where a species occurs')}</p>
        <div className={styles.explore}>
          <SearchInput
            className={styles.search}
            placeholder={t('Search for a species by name')}
            onChange={handleSearch}
            value={searchInput} />
          <Button type="rectangular"
            label={t('Explore all Species')}
            handleClick={() => setSelectedIndex(NAVIGATION.REGION)} />
        </div>
        <div className={styles.mostPopular}>
          <span className={styles.sectionTitle}>{t('Popular Species')}</span>
          <div className={styles.species}>
            <div className={styles.navCard} onClick={() => browsePage({
              type: DASHBOARD_REGIONS,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Cossypha polioptera' }
            })} >
              <div className={styles.outline}></div>
              <label>Grey Winged Robin Chat</label>
              <p>
                Cossypha polioptera
              </p>
            </div>
            <div className={styles.navCard} onClick={() => browsePage({
              type: DASHBOARD_REGIONS,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Piliocolobus parmentieri' }
            })} >
              <div className={styles.outline}></div>
              <label>Piliocolobus parmentieri</label>
              <p>
                Piliocolobus parmentieri
              </p>
            </div>
            <div className={styles.navCard} onClick={() => browsePage({
              type: DASHBOARD_REGIONS,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Dasypeltis palmarum' }
            })} >
              <div className={styles.outline}></div>
              <label>Palm Egg Eater</label>
              <p>
                Dasypeltis palmarum
              </p>
            </div>
            <div className={styles.navCard} onClick={() => browsePage({
              type: DASHBOARD_REGIONS,
              payload: { iso: countryISO.toLowerCase(), scientificname: 'Ptychadena bunoderma' }
            })} >
              <div className={styles.outline}></div>
              <label>Caconda Grassland Frog</label>
              <p>
                Ptychadena bunoderma
              </p>
            </div>
          </div>
        </div>
      </div>
      <PartnersContainer />
    </div>
  )
}

export default DashboardHomeComponent
