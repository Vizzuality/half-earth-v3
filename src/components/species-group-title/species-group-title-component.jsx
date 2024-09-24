import React from 'react'
import cx from 'classnames';
import styles from './species-group-title-component.module.scss';

function SpeciesGroupTitleComponent(props) {
  const { species, filter } = props;
  const { family_common, family, familyObj } = species;
  return (
    <div className={cx(styles.name, styles.familyTitle, styles.item)}>
      <div className={styles.common}>
        {species === '__blank' ? '' : family_common[0]}
      </div>
      <div className={styles.sci}>{family}</div>
    </div>
  )
}

export default SpeciesGroupTitleComponent
