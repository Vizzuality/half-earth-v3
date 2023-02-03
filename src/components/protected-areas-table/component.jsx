/* eslint-disable no-underscore-dangle */
import React, { useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import {
  getWDPATranslations,
  getCountryNames,
} from 'constants/translation-constants';

import { ReactComponent as ArrowDown } from 'icons/arrow_down.svg';
import { ReactComponent as ArrowUp } from 'icons/arrow_up.svg';

import styles from './protected-areas-table-styles.module.scss';

function ProtectedAreasTable({ data, handleSortChange }) {
  const t = useT();
  const locale = useLocale();
  const WDPATranslations = useMemo(() => getWDPATranslations(), [locale]);
  const CountryNamesTranslations = useMemo(() => getCountryNames(), [locale]);
  const translateString = (d) => WDPATranslations[d] || d;
  const translateCountry = (d) => CountryNamesTranslations[d] || d;
  return (
    <table className={styles.protectedAreasTable}>
      <thead>
        <tr className={styles.header}>
          <th className={styles.firstColumn}>
            <div className={styles.headerColumnContainer}>
              <span>{t('NAME')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'NAME', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'NAME', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th>
            <div className={styles.headerColumnContainer}>
              <span>{t('GOVERNANCE')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'GOV_TYP', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'GOV_TYP', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th>
            <div className={styles.headerColumnContainer}>
              <span>{t('DESIGNATION')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'DESIG', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'DESIG', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th>
            <div className={styles.headerColumnContainer}>
              <span>{t('DESIGNATION TYPE')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'DESIG_T', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'DESIG_T', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th>
            <div className={styles.headerColumnContainer}>
              <span>{t('STATUS')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'STATUS', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'STATUS', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th>
            <div className={styles.headerColumnContainer}>
              <span>{t('STATUS YEAR')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'STATUS_', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'STATUS_', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th>
            <div className={styles.headerColumnContainer}>
              <span>{t('IUCN CATEGORY')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'IUCN_CA', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'IUCN_CA', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th>
            <div className={styles.headerColumnContainer}>
              <span>{t('COUNTRY')}</span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'NAME_0', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'NAME_0', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
          <th className={styles.lastColumn}>
            <div className={styles.headerColumnContainer}>
              <span>
                {t('AREA (KM')}
                <sup>2</sup>)
              </span>
              <div className={styles.arrowsContainer}>
                <ArrowUp
                  onClick={() =>
                    handleSortChange({ value: 'AREA_KM', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'AREA_KM', ascending: false })
                  }
                />
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((row, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={`wdpa-row-${row.NAME}-${index}`}>
              <td className={styles.firstColumn}>
                <a
                  href={
                    row.WDPA_PID
                      ? `https://www.protectedplanet.net/${row.WDPA_PID}`
                      : 'https://www.protectedplanet.net'
                  }
                >
                  {row.NAME}
                </a>
              </td>
              <td>{translateString(row.GOV_TYP)}</td>
              <td>{translateString(row.DESIG)}</td>
              <td>{translateString(row.DESIG_T)}</td>
              <td>{translateString(row.STATUS)}</td>
              <td>{row.STATUS_}</td>
              <td>{translateString(row.IUCN_CA)}</td>
              <td>{translateCountry(row.NAME_0)}</td>
              <td className={styles.lastColumn}>
                {`${row.AREA_KM && Math.round(row.AREA_KM)}km`}
                <sup>2</sup>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ProtectedAreasTable;
