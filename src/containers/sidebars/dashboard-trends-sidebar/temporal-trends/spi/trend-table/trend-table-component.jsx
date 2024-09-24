import React, { useEffect, useState } from 'react'
import styles from './trend-table-styles.module.scss';
import tableStyles from 'components/protected-areas-table/protected-areas-table-styles.module.scss';
import { useT } from '@transifex/react';
import ArrowDown from 'icons/arrow_down.svg?react';
import ArrowUp from 'icons/arrow_up.svg?react';


function TrendTableComponent(props) {
  const t = useT();
  const { spiData } = props;
  const [sortedData, setSortedData] = useState()

  useEffect(() => {
    if (!spiData.trendData) return;

    const prov = spiData.trendData[0].regions;
    const sortProvinces = prov.sort((a, b) => {
      const nameA = a.region_name.toUpperCase();
      const nameB = b.region_name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });

    setSortedData(sortProvinces);
  }, [spiData.trendData])

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={tableStyles.protectedAreasTable}>
          <thead>
            <tr className={tableStyles.header}>
              <th className={tableStyles.firstColumn}>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Province')}</span>
                  <div className={tableStyles.arrowsContainer}>
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
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('SPI')}</span>
                  <div className={tableStyles.arrowsContainer}>
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
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Area (km2)')}</span>
                  <div className={tableStyles.arrowsContainer}>
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
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Area Protected')}</span>
                  <div className={tableStyles.arrowsContainer}>
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
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Vertebrate Richness')}</span>
                  <div className={tableStyles.arrowsContainer}>
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
            </tr>
          </thead>
          <tbody>
            {sortedData &&
              sortedData.map((row, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <tr key={`wdpa-row-${row.NAME}-${index}`}>
                  <td className={tableStyles.firstColumn}>{row.region_name}</td>
                  <td>{row.regional_scores[row.regional_scores.length - 1].spi_all.toFixed(2)}</td>
                  <td>{row.regional_scores[row.regional_scores.length - 1].region_area?.toFixed(2) ?? 0}km<sup>2</sup></td>
                  <td>{row.regional_scores[row.regional_scores.length - 1].reserve_area?.toFixed(2) ?? 0}km<sup>2</sup></td>
                  <td>{row.regional_scores[row.regional_scores.length - 1].nspecies}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TrendTableComponent;
