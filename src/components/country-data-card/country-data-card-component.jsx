import React from 'react';
import styles from './country-data-card-styles.module.scss'
import FixedHeader from 'components/fixed-header'
import DummyBlurWorkaround from 'components/dummy-blur-workaround';

const CountryDataCardComponent = ({ view, handleSceneModeChange, countryName = 'dummy name'}) => {
  return (
    <div className={styles.container}>
      <DummyBlurWorkaround />
      <FixedHeader 
        noBackClick={false}
        isLandscapeSidebarCollapsed={false}
        toggleCollapsedLandscapeSidebar={(e) => console.log(e)}
        closeSidebar={handleSceneModeChange}
        title={countryName}
        view={view}
        autoHeight
      />
      <div className={styles.descriptionWrapper}>
        DATA AND IMAGE!!!!!!!
      </div>
    </div>
  );
}

export default CountryDataCardComponent;