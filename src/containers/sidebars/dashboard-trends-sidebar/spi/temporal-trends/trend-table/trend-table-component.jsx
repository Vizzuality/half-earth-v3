import { last } from 'lodash';
import React, { useEffect, useState } from 'react';

import { useT } from '@transifex/react';

import { numberToLocaleStringWithOneDecimal } from 'utils/dashboard-utils.js';

import cx from 'classnames';

import tableStyles from 'components/protected-areas-table/protected-areas-table-styles.module.scss';

import styles from './trend-table-styles.module.scss';

function TrendTableComponent(props) {
  const t = useT();
  const { provinces } = props;

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (provinces && provinces.length > 0) {
      const latestYear = last(provinces.map((province) => province.year));
      console.log('Latest Year:', latestYear);
      const formattedData = provinces.filter((province) => {
        if (province.year === latestYear) {
          return {
            name: province.NAME,
            spi: province.SPI,
            area_km2: province.area_km2,
            area_protected: province.area_protected,
            richness_vert_spi: province.richness_vert_spi,
          };
        }
        return false;
      });
      setTableData(formattedData);
    }
  }, [provinces]);

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
            {tableData &&
              tableData.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`wdpa-row-${row.name}-${index}`}>
                  <td
                    className={cx(tableStyles.firstColumn, styles.firstColumn)}
                  >
                    {row.name}
                  </td>
                  <td>{row.spi.toFixed(1)}</td>
                  <td>
                    {numberToLocaleStringWithOneDecimal(row.area_km2) ?? 0}
                  </td>
                  <td>
                    {numberToLocaleStringWithOneDecimal(row.area_protected) ??
                      0}
                  </td>
                  <td>
                    {numberToLocaleStringWithOneDecimal(
                      row.richness_vert_spi,
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
