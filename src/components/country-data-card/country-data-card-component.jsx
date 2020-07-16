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
  countrySpeciesProtectionIndex,
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
      />
      <section className={styles.indexOverview}>
        <p>The species protection index is:</p>
        <div>
          <div></div>
          <div>{`${countrySpeciesProtectionIndex}`}</div>
        </div>
      </section>
      <section className={styles.indexBaseNumbers}>
        <p>The index is based on:</p>
        <div>
          <div></div>
          <div>{`${countrySpeciesProtectionIndex}`}</div>
        </div>
      </section>
      <section className={styles.descriptionWrapper}>
        <p>{`${countryDescription}`}</p>
      </section>
    </div>
  );
}

export default CountryDataCardComponent;