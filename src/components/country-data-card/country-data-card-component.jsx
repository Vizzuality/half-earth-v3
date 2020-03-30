import React from 'react';
import styles from './country-data-card-styles.module.scss'
import FixedHeader from 'components/fixed-header'
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import dummyCountryImage from 'images/dummyCountryImage.jpg';

const CountryDataCardComponent = ({ view, handleSceneModeChange, countryData}) => {
  
  return countryData && (
    <div className={styles.container}>
      <DummyBlurWorkaround />
      <FixedHeader 
        closeSidebar={handleSceneModeChange}
        title={countryData.NAME_0}
        view={view}
        autoHeight
      />
      <img className={styles.image} alt={`${countryData.NAME_0}`} src={dummyCountryImage} />
      <section className={styles.descriptionWrapper}>
        <p>Total Area: {`${countryData.Area}`}</p>
        <p>Population: {`${countryData.Population2016}`}</p>
        <p>GNI: {`${countryData.GNI_PPP}`}</p>
        <p>{`${countryData.sentence}`}</p>
      </section>
    </div>
  );
}

export default CountryDataCardComponent;