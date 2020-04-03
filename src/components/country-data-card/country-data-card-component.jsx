import React from 'react';
import { Loading } from 'he-components';
import styles from './country-data-card-styles.module.scss'
import FixedHeader from 'components/fixed-header'
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import dummyCountryImage from 'images/dummyCountryImage.jpg';

const CountryDataCardComponent = ({ view, countryData, handleSceneModeChange, countryDataLoading, countryArea, countryPopulation, grossNationalIncome, countryName, countryDescription}) => {
const countries = [
  'spain',
  'bahamas',
  'portugal',
  'spain',
  'bahamas',
  'portugal',
  'spain',
  'bahamas',
  'portugal',
  'spain',
  'bahamas',
  'portugal',
]
  if (countryDataLoading) {
    return (
      <div className={styles.container}>
        <DummyBlurWorkaround />
        <div className={styles.loading}>
          <span className={styles.loadingText}>{`Loading ${countryName} information...`}</span>
          <Loading />
        </div>
      </div>
    );
  }

  return countryData && (
    <div className={styles.container}>
      <DummyBlurWorkaround />
      <FixedHeader 
        closeSidebar={handleSceneModeChange}
        title={countryName}
        view={view}
        autoHeight
        selectableTitle
        titleOptions={countries}
      />
      <img className={styles.image} alt={`${countryName}`} src={dummyCountryImage} />
      <section className={styles.descriptionWrapper}>
        <p>Total Area: {`${countryArea}`} km<sup>2</sup></p>
        <p>Population: {`${countryPopulation}`}</p>
        <p>GNI: {`${grossNationalIncome}`}</p>
        <p>{`${countryDescription}`}</p>
      </section>
    </div>
  );
}

export default CountryDataCardComponent;