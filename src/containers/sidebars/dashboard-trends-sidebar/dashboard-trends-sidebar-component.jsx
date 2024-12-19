import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ShiContainer from './shi';
import SiiContainer from './sii';
import SpiContainer from './spi';

export const NATIONAL_TREND = 'NATIONAL';
export const PROVINCE_TREND = 'PROVINCE';

const TABS = {
  SHI: 1,
  SPI: 2,
  SII: 3,
};

function DashboardTrendsSidebar(props) {
  const t = useT();
  const {
    shiValue,
    siiValue,
    spiValue,
    tabOption,
    setTabOption,
    regionLayers,
    map,
  } = props;

  const showHideLayers = (tabClicked) => {
    const layers = regionLayers;
    Object.keys(layers).forEach((region) => {
      const foundLayer = map.layers.items.find((item) => item.id === region);
      if (foundLayer) {
        // map.remove(foundLayer);
        if (tabClicked === TABS.SII || tabClicked === TABS.SHI) {
          foundLayer.visible = false;
        } else {
          foundLayer.visible = true;
        }
      }
    });

    setTabOption(tabClicked);
  };

  return (
    <div className={styles.container}>
      <header>
        <div className={styles.title}>
          {/* <b>{t('Conservation Metrics')}</b>
          <label>République démocratique du Congo</label> */}
        </div>
        <div className={styles.tabs}>
          <button
            type="button"
            name="spi"
            aria-label={t('Species Protection Index')}
            className={cx({
              [styles.selected]: tabOption === TABS.SPI,
            })}
            onClick={() => showHideLayers(TABS.SPI)}
          >
            <label htmlFor="spi">{spiValue}</label>
            <span>{t('Species Protection Index')}</span>
          </button>
          <button
            type="button"
            aria-label={t('Species Habitat Index')}
            className={cx({
              [styles.selected]: tabOption === TABS.SHI,
            })}
            onClick={() => showHideLayers(TABS.SHI)}
            name="shi"
          >
            <label htmlFor="shi">{shiValue}</label>
            <span>{t('Species Habitat Index')}</span>
          </button>

          <button
            type="button"
            aria-label={t('Species Information Index')}
            className={cx({
              [styles.selected]: tabOption === TABS.SII,
            })}
            onClick={() => showHideLayers(TABS.SII)}
            name="sii"
          >
            <label htmlFor="sii">{siiValue}</label>
            <span>{t('Species Information Index')}</span>
          </button>
        </div>
      </header>
      {tabOption === 1 && <ShiContainer trendOption={tabOption} {...props} />}
      {tabOption === 2 && <SpiContainer trendOption={tabOption} {...props} />}
      {tabOption === 3 && <SiiContainer trendOption={tabOption} {...props} />}
    </div>
  );
}

export default DashboardTrendsSidebar;
