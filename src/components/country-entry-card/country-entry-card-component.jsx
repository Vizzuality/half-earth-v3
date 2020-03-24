import React from 'react';
import cx from 'classnames';
import styles from './country-entry-card.module.scss';
import { ReactComponent as PinIcon } from 'icons/places.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import GlobeSmallImage from 'images/dummyCountryImage.jpg';

const CountryEntryCardComponent = ({ handleSceneModeChange, handleCountryDeselect, countryISO }) => {
  return (
    <div className={cx(styles.container, {[styles.open]: countryISO})}>
      <div className={styles.cardHeader}>
        <PinIcon />
        <span className={styles.countryName}>{countryISO}</span>
        <CloseIcon className={styles.closeIcon} onClick={handleCountryDeselect}/>
      </div>
      <div className={cx(styles.contentWrapper, {[styles.openContent]: countryISO})} onClick={handleSceneModeChange}>
        <img className={styles.image} alt={`${countryISO}`} src={GlobeSmallImage} />
        <p className={styles.entryText}>explore this country</p>
      </div>
    </div>
  )
}

export default CountryEntryCardComponent;