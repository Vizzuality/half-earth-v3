import React, { useEffect } from 'react'
import styles from './distributions-table-styles.module.scss';
import tableStyles from 'components/protected-areas-table/protected-areas-table-styles.module.scss';
import { useT, useLocale } from '@transifex/react';
import ArrowDown from 'icons/arrow_down.svg?react';
import ArrowUp from 'icons/arrow_up.svg?react';

function DistributionsTableComponent(props) {
  const { chartData } = props;
  const t = useT();
  const locale = useLocale();

  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={tableStyles.protectedAreasTable}>
          <thead>
            <tr className={tableStyles.header}>
              <th className={tableStyles.firstColumn}>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Taxa')}</span>
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
                  <span>{t('Scientific Name')}</span>
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
                  <span>{t('Stewardship')}</span>
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
                  <span>{t('Range Size')}</span>
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
                  <span>{t('Area Score')}</span>
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
              <th>
                <div className={tableStyles.headerColumnContainer}>
                  <span>{t('Connectivity Score')}</span>
                  <div className={tableStyles.arrowsContainer}>
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
              <th className={tableStyles.lastColumn}>
                <div className={tableStyles.headerColumnContainer}>
                  <span>
                    {t('Habitat Score')}
                  </span>
                  <div className={tableStyles.arrowsContainer}>
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
            {chartData &&
              chartData.map(row => (
                // eslint-disable-next-line react/no-array-index-key
                row.taxa_scores.map((species, idx) => (
                  <tr key={`wdpa-row-${row.speciesgroup}-${idx}`}>
                    <td className={tableStyles.firstColumn}>{row.speciesgroup}</td>
                    <td>{species.scientificname}</td>
                    <td>{species.steward_score.toFixed(2)}</td>
                    <td>{(species.area_score + species.connectivity_score / 2).toFixed(2)}<sup>2</sup></td>
                    <td>{species.area_score.toFixed(2)}</td>
                    <td>{species.connectivity_score.toFixed(2)}</td>
                    <td className={tableStyles.lastColumn}>
                      {((species.area_score + species.connectivity_score) / 2).toFixed(2)}
                    </td>
                  </tr>
                ))
              ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DistributionsTableComponent
