import React from 'react';
import { Loading } from 'he-components';
import styles from './country-data-card-styles.module.scss'
import FixedHeader from 'components/fixed-header'
import DummyBlurWorkaround from 'components/dummy-blur-workaround';
import dummyCountryImage from 'images/dummyCountryImage.jpg';

const CountryDataCardComponent = ({ 
  view,
  countryName,
  countryArea,
  countryData,
  countriesList,
  vertebratesCount,
  countryPopulation,
  countryDescription,
  countryDataLoading,
  grossNationalIncome,
  handleSceneModeChange,
  handleCountryDropdownClick
}) => {

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

  return countryData && countriesList && (
    <div className={styles.container}>
      <DummyBlurWorkaround />
      <FixedHeader 
        closeSidebar={handleSceneModeChange}
        title={countryName}
        view={view}
        autoHeight
        selectableTitle
        titleOptions={countriesList}
        handleTitleOptionClick={handleCountryDropdownClick}
      />
      <img className={styles.image} alt={`${countryName}`} src={dummyCountryImage} />
      <section className={styles.descriptionWrapper}>
        <p>Total Area: {`${countryArea}`} km<sup>2</sup></p>
        <p>Endemic vertebrates: {`${vertebratesCount}`} species</p>
        <p>Population: {`${countryPopulation}`}</p>
        <p>GNI: {`${grossNationalIncome}`}</p>
        <p>{`${countryDescription}`}</p>
      </section>
    </div>
  );
}

export default CountryDataCardComponent;