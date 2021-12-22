import React from 'react';

// styles
import styles from './protected-areas-table-styles.module.scss';

const ProtectedAreasTable = ({ data }) => (
  <table className={styles.protectedAreasTable}>
    <tr className={styles.header}>
      <th>
        NAME
      </th>
      <th>
        GOVERNANCE
      </th>
      <th>
        DESIGNATION
      </th>
      <th>
        DESIGNATION TYPE
      </th>
      <th>
        IUCN CATEGORY
      </th>
      <th>
        COUNTRY
      </th>
      <th>
        AREA (KM<sup>2</sup>)
      </th>
    </tr>
    {data.map((row) => (
      <tr>
        <td>
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
          COUNTRY
        </td>
        <td>
          {`${Math.round(row.AREA_KM)}km`}<sup>2</sup>
        </td>
      </tr>
    ))}
  </table>
);

export default ProtectedAreasTable;
