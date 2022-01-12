import React from 'react';

// icons
import { ReactComponent as ArrowUp } from 'icons/arrow_up.svg';
import { ReactComponent as ArrowDown } from 'icons/arrow_down.svg';

// styles
import styles from './protected-areas-table-styles.module.scss';

const ProtectedAreasTable = ({ data, handleSortChange }) => (
  <table className={styles.protectedAreasTable}>
    <thead>
      <tr className={styles.header}>
        <th className={styles.firstColumn}>
          <div className={styles.headerColumnContainer}>
            <span>NAME</span>
            <div className={styles.arrowsContainer}>
              <ArrowUp onClick={() => handleSortChange({ value: 'ORIG_NA', ascending: true })} />
              <ArrowDown onClick={() => handleSortChange({ value: 'ORIG_NA', ascending: false })} />
            </div>
          </div>
        </th>
        <th>
          <div className={styles.headerColumnContainer}>
            <span>GOVERNANCE</span>
            <div className={styles.arrowsContainer}>
              <ArrowUp onClick={() => handleSortChange({ value: 'GOV_TYP', ascending: true })} />
              <ArrowDown onClick={() => handleSortChange({ value: 'GOV_TYP', ascending: false })} />
            </div>
          </div>
        </th>
        <th>
          <div className={styles.headerColumnContainer}>
            <span>DESIGNATION</span>
            <div className={styles.arrowsContainer}>
              <ArrowUp onClick={() => handleSortChange({ value: 'DESIG_E', ascending: true })} />
              <ArrowDown onClick={() => handleSortChange({ value: 'DESIG_E', ascending: false })} />
            </div>
          </div>
        </th>
        <th>
          <div className={styles.headerColumnContainer}>
            <span>DESIGNATION TYPE</span>
            <div className={styles.arrowsContainer}>
              <ArrowUp onClick={() => handleSortChange({ value: 'DESIG_T', ascending: true })} />
              <ArrowDown onClick={() => handleSortChange({ value: 'DESIG_T', ascending: false })} />
            </div>
          </div>
        </th>
        <th>
          <div className={styles.headerColumnContainer}>
            <span>IUCN CATEGORY</span>
            <div className={styles.arrowsContainer}>
              <ArrowUp onClick={() => handleSortChange({ value: 'IUCN_CA', ascending: true })} />
              <ArrowDown onClick={() => handleSortChange({ value: 'IUCN_CA', ascending: false })} />
            </div>
          </div>
        </th>
        <th>
          <div className={styles.headerColumnContainer}>
            <span>COUNTRY</span>
            <div className={styles.arrowsContainer}>
              <ArrowUp onClick={() => handleSortChange({ value: 'NAME_0', ascending: true })} />
              <ArrowDown onClick={() => handleSortChange({ value: 'NAME_0', ascending: false })} />
            </div>
          </div>
        </th>
        <th className={styles.lastColumn}>
          <div className={styles.headerColumnContainer}>
            <span>AREA (KM<sup>2</sup>)</span>
            <div className={styles.arrowsContainer}>
              <ArrowUp onClick={() => handleSortChange({ value: 'AREA_KM', ascending: true })} />
              <ArrowDown onClick={() => handleSortChange({ value: 'AREA_KM', ascending: false })} />
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      {data && data.map((row, index) => (
        <tr key={`wdpa-row-${row.NAME}-${index}`}>
          <td className={styles.firstColumn}>
            {row.NAME}
          </td>
          <td>
            {row.GOV_TYP}
          </td>
          <td>
            {row.DESIG}
          </td>
          <td>
            {row.DESIG_T}
          </td>
          <td>
            {row.IUCN_CA}
          </td>
          <td>
            {row.NAME_0}
          </td>
          <td className={styles.lastColumn}>
            {`${Math.round(row.AREA_KM)}km`}<sup>2</sup>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ProtectedAreasTable;
