import React from 'react';

import { useT } from '@transifex/react';

import cx from 'classnames';

import { REGION_OPTIONS } from 'constants/dashboard-constants.js';

import styles from './dashboard-trends-sidebar-styles.module.scss';
import ShiContainer from './shi';
import SiiContainer from './sii';
import SpiContainer from './spi';

export const NATIONAL_TREND = 'NATIONAL';
export const PROVINCE_TREND = 'PROVINCE';
export const ZONE_3 = 'ZONE_3';
export const ZONE_5 = 'ZONE_5';

export const TABS = {
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
    countryISO,
    map,
    setMapLegendLayers,
  } = props;

  const showHideLayers = (tabClicked) => {
    const layers = regionLayers;

    const foundProvinceLayer = map.layers.items.find(
      (item) => item.id === REGION_OPTIONS.PROVINCES
    );

    const outlineLayer = map.layers.items.find(
      (item) => item.id === `${countryISO}-outline`
    );

    if (tabClicked === TABS.SII) {
      if (foundProvinceLayer) {
        foundProvinceLayer.visible = false;
      }

      if (outlineLayer) {
        outlineLayer.visible = false;
      }

      setMapLegendLayers([]);
    } else if (tabClicked === TABS.SHI) {
      if (foundProvinceLayer) {
        foundProvinceLayer.visible = false;
      }

      if (outlineLayer) {
        outlineLayer.visible = true;
      }

      const item = { label: 'SHI', parent: '', id: `${countryISO}-outline` };
      setMapLegendLayers([item]);
    } else {
      Object.keys(layers).forEach(() => {
        if (foundProvinceLayer) {
          foundProvinceLayer.visible = true;
        }

        if (outlineLayer) {
          outlineLayer.visible = false;
        }
      });

      const item = { label: 'SPI', parent: '', id: REGION_OPTIONS.PROVINCES };
      setMapLegendLayers([item]);
    }

    setTabOption(tabClicked);
  };

  return (
    <div id="dashboard-sidebar" className={styles.container}>
      <header>
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
            {countryISO.toLowerCase() !== 'eewwf' && (
              <label htmlFor="spi">{spiValue}</label>
            )}
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
            {countryISO.toLowerCase() !== 'eewwf' && (
              <label htmlFor="shi">{shiValue}</label>
            )}
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
            {countryISO.toLowerCase() !== 'eewwf' && (
              <label htmlFor="sii">{siiValue}</label>
            )}
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
