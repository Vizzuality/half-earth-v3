import React from 'react';

// styles
import styles from './protected-areas-table-styles.module.scss';

const ProtectedAreasTable = () => (
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
  </table>
);

export default ProtectedAreasTable;
