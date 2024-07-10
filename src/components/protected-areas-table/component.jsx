/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-underscore-dangle */
import { useMemo } from 'react';

import { useT, useLocale } from '@transifex/react';

import {
  getWDPATranslations,
  getCountryNames,
} from 'constants/translation-constants';

import ArrowDown from 'icons/arrow_down.svg?react';
import ArrowUp from 'icons/arrow_up.svg?react';

import styles from './protected-areas-table-styles.module.scss';

function ProtectedAreasTable({ data, handleSortChange, handleNameClick }) {
  const t = useT();

  const locale = useLocale();
  const WDPATranslations = useMemo(() => getWDPATranslations(), [locale]);
  const CountryNamesTranslations = useMemo(() => getCountryNames(), [locale]);
  const translateString = (d) => WDPATranslations[d] || d;
  const translateCountry = (d) => CountryNamesTranslations[d] || d;

  const parseAreaKm = (number) => (number < 1 ? '<1' : Math.round(number));

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
                    handleSortChange({ value: 'GOV_TYPE', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'GOV_TYPE', ascending: false })
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
                    handleSortChange({ value: 'DESIG_TYPE', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'DESIG_TYPE', ascending: false })
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
                    handleSortChange({ value: 'STATUS_YR', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'STATUS_YR', ascending: false })
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
                    handleSortChange({ value: 'IUCN_CAT', ascending: true })
                  }
                />
                <ArrowDown
                  onClick={() =>
                    handleSortChange({ value: 'IUCN_CAT', ascending: false })
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
                <button
                  type="button"
                  onClick={() => handleNameClick(row.MOL_ID)}
                >
                  <p className={styles.nameLink}>{row.NAME}</p>
                </button>
              </td>
              <td>{translateString(row.GOV_TYPE)}</td>
              <td>{translateString(row.DESIG)}</td>
              <td>{translateString(row.DESIG_TYPE)}</td>
              <td>{translateString(row.STATUS)}</td>
              <td>{row.STATUS_YR}</td>
              <td>{translateString(row.IUCN_CAT)}</td>
              <td>{translateCountry(row.NAME_0)}</td>
              <td className={styles.lastColumn}>
                {`${
                  (row.AREA_KM || row.AREA_KM2) &&
                  parseAreaKm(row.AREA_KM || row.AREA_KM2)
                }km`}
                <sup>2</sup>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ProtectedAreasTable;
