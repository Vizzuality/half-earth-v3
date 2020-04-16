import React from 'react';
import cx from 'classnames';
import styles from './country-entry-card.module.scss';
import { ReactComponent as PinIcon } from 'icons/places.svg';
import { ReactComponent as CloseIcon } from 'icons/close.svg';
import GlobeSmallImage from 'images/dummyCountryImage.jpg';
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

const CountryEntryCardComponent = ({ handleSceneModeChange, handleCountryDeselect, countryName }) => {
  return (
    <div 
      className={cx(styles.container, {
          [styles.open]: countryName
        })}>
      <DummyBlurWorkaround />
      <div className={styles.cardHeader}>
        <PinIcon />
        <span className={styles.countryName}>{countryName}</span>
        <CloseIcon className={styles.closeIcon} onClick={handleCountryDeselect}/>
      </div>
      <div className={styles.contentWrapper} onClick={handleSceneModeChange}>
        <img className={styles.image} alt={countryName} src={GlobeSmallImage} />
        <p className={styles.entryText}>explore this country</p>
      </div>
    </div>
  )
}

export default CountryEntryCardComponent;