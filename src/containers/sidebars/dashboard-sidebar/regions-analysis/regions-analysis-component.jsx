import React from 'react';

import Button from 'components/button';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import Checkbox from '../../../../components/checkbox/checkbox-component';

import styles from './regions-analysis-styles.module.scss';

function RegionsAnalysisComponent() {
  return (
    <section className={styles.container}>
      <span className={styles.sectionTitle}>Regions Analysis</span>
      <hr className={hrTheme.dark} />
      <p>
        Select a region type below to explore a table of regions in which this
        species is expected to occur.
      </p>
      <div className={styles.choices}>
        <Checkbox
          option={{ value: 'selectAll', name: 'Select/deselect All' }}
        />
        <Checkbox
          option={{ value: 'protectedAreas', name: 'Protected Areas' }}
        />
        <Checkbox
          option={{
            value: 'proposedProtectedAreas',
            name: 'Proposed Protected Areas',
          }}
        />
        <Checkbox option={{ value: 'Provinces', name: 'Provinces' }} />
        <Checkbox option={{ value: 'priorityAreas', name: 'Priority Areas' }} />
        <Checkbox
          option={{ value: 'Community Forests', name: 'Community Forests' }}
        />
      </div>
      <div className={styles.search}>
        <input type="text" placeholder="Search for a Region" />
        <Button
          type="rectangular"
          className={styles.saveButton}
          label="download data"
        />
      </div>
    </section>
  );
}

export default RegionsAnalysisComponent;
