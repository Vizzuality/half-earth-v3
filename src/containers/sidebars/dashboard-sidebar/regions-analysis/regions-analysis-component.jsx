import React, { useContext } from 'react';
import cx from 'classnames';
import Button from 'components/button';
import SearchLocation from 'components/search-location';

import { SEARCH_TYPES } from 'constants/search-location-constants';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import Checkbox from '../../../../components/checkbox/checkbox-component';

import styles from './regions-analysis-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';

function RegionsAnalysisComponent(props) {
  const { view, selectedOption } = props;
  const { lightMode } = useContext(LightModeContext);

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
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
        <SearchLocation
          stacked
          searchType={SEARCH_TYPES.full}
          view={view}
          theme="dark"
          width="full"
          parentWidth="380px"
          searchSourceLayerSlug={selectedOption?.slug}
        />
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
