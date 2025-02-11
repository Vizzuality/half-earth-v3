import React from 'react';

import cx from 'classnames';

import styles from './species-group-title-component.module.scss';

function SpeciesGroupTitleComponent(props) {
  const { species } = props;
  const { scientific_name, common_name } = species;
  return (
    <div className={cx(styles.name, styles.familyTitle, styles.item)}>
      <div className={styles.common}>
        {species === '__blank' ? '' : common_name}
      </div>
      <div className={styles.sci}>{scientific_name}</div>
    </div>
  );
}

export default SpeciesGroupTitleComponent;
