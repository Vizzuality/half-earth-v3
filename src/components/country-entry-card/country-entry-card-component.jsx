import React from 'react';
import cx from 'classnames';
import styles from './country-entry-card.module.scss';
import { ReactComponent as PinIcon } from 'icons/places.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';

const CountryEntryCardComponent = ({ handleSceneModeChange, handleCountryDeselect, countryISO }) => {
  return (
    <div className={cx(styles.container, {[styles.open]: countryISO})}>
      <div className={styles.cardHeader}>
        <span className={styles.iconWrapper}>
            <PinIcon />
        </span>
        <span className={styles.countryName}>Country name</span>
        <span className={styles.iconWrapper} onClick={handleCountryDeselect}>
          <CloseIcon />
        </span>
      </div>
      <div onClick={handleSceneModeChange}>
        CLICK ME
      </div>
    </div>
  )
}

export default CountryEntryCardComponent;