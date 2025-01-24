import React from 'react';

import { useT } from '@transifex/react';

import { numberToLocaleStringWithOneDecimal } from 'utils/dashboard-utils.js';

import cx from 'classnames';

import tableStyles from 'components/protected-areas-table/protected-areas-table-styles.module.scss';

import styles from './trend-table-styles.module.scss';

function TrendTableComponent(props) {
  const t = useT();
  const { provinces } = props;

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={tableStyles.protectedAreasTable}>
          <thead>
            <tr className={tableStyles.header}>
              <th className={cx(tableStyles.firstColumn, styles.firstColumn)}>
                <div>
                  <span>{t('Province')}</span>
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('SPI')}</span>
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>
                    {t('Total Area')} (km<sup>2</sup>)
                  </span>
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>
                    {t('Area Protected')} (km<sup>2</sup>)
                  </span>
                </div>
              </th>
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Vertebrate Richness')}</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {provinces &&
              provinces.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`wdpa-row-${row.NAME}-${index}`}>
                  <td
                    className={cx(tableStyles.firstColumn, styles.firstColumn)}
                  >
                    {row.region_name}
                  </td>
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
