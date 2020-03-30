import React from 'react';
import styles from './country-data-card-styles.module.scss'
import FixedHeader from 'components/fixed-header'
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import dummyCountryImage from 'images/dummyCountryImage.jpg';

const CountryDataCardComponent = ({ view, handleSceneModeChange, countryData, countryArea, countryPopulation, grossNationalIncome, countryName, countryDescription}) => {
  
  return countryData && (
    <div className={styles.container}>
      <DummyBlurWorkaround />
      <FixedHeader 
        closeSidebar={handleSceneModeChange}
        title={countryName}
        view={view}
        autoHeight
      />
      <img className={styles.image} alt={`${countryName}`} src={dummyCountryImage} />
      <section className={styles.descriptionWrapper}>
        <p>Total Area: {`${countryArea}`}</p>
        <p>Population: {`${countryPopulation}`}</p>
        <p>GNI: {`${grossNationalIncome}`}</p>
        <p>{`${countryDescription}`}</p>
      </section>
    </div>
  );
}

export default CountryDataCardComponent;