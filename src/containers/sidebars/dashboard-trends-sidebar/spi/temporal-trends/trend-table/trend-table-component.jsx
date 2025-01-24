import React from 'react';

import { useT } from '@transifex/react';

import { numberToLocaleStringWithOneDecimal } from 'utils/dashboard-utils.js';

import tableStyles from 'components/protected-areas-table/protected-areas-table-styles.module.scss';

import ArrowDown from 'icons/arrow_down.svg?react';
import ArrowUp from 'icons/arrow_up.svg?react';

import styles from './trend-table-styles.module.scss';

function TrendTableComponent(props) {
  const t = useT();
  const { provinces } = props;

  const handleSortChange = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={tableStyles.protectedAreasTable}>
          <thead>
            <tr className={tableStyles.header}>
              <th className={tableStyles.firstColumn}>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Province')}</span>
                  {/* <div className={tableStyles.arrowsContainer}>
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
                  </div> */}
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('SPI')}</span>
                  {/* <div className={tableStyles.arrowsContainer}>
                    <ArrowUp
                      onClick={() =>
                        handleSortChange({ value: 'GOV_TYPE', ascending: true })
                      }
                    />
                    <ArrowDown
                      onClick={() =>
                        handleSortChange({
                          value: 'GOV_TYPE',
                          ascending: false,
                        })
                      }
                    />
                  </div> */}
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>
                    {t('Total Area')} (km<sup>2</sup>)
                  </span>
                  {/* <div className={tableStyles.arrowsContainer}>
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
                  </div> */}
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>
                    {t('Area Protected')} (km<sup>2</sup>)
                  </span>
                  {/* <div className={tableStyles.arrowsContainer}>
                    <ArrowUp
                      onClick={() =>
                        handleSortChange({
                          value: 'DESIG_TYPE',
                          ascending: true,
                        })
                      }
                    />
                    <ArrowDown
                      onClick={() =>
                        handleSortChange({
                          value: 'DESIG_TYPE',
                          ascending: false,
                        })
                      }
                    />
                  </div> */}
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Vertebrate Richness')}</span>
                  {/* <div className={tableStyles.arrowsContainer}>
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
                  </div> */}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {provinces &&
              provinces.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`wdpa-row-${row.NAME}-${index}`}>
                  <td className={tableStyles.firstColumn}>{row.region_name}</td>
                  <td>{row.SPI.toFixed(1)}</td>
                  <td>{numberToLocaleStringWithOneDecimal(row.Area) ?? 0}</td>
                  <td>
                    {numberToLocaleStringWithOneDecimal(row.AreaProtected) ?? 0}
                  </td>
                  <td>
                    {numberToLocaleStringWithOneDecimal(
                      row.VertebrateRichness,
                      0
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrendTableComponent;
