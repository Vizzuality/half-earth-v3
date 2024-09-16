import React, { useContext } from 'react';
import cx from 'classnames';
import Button from 'components/button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import SearchLocation from 'components/search-location';

import { SEARCH_TYPES } from 'constants/search-location-constants';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import Checkbox from '../../../../components/checkbox/checkbox-component';

import styles from './regions-analysis-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
import { useT } from '@transifex/react';

function RegionsAnalysisComponent(props) {
  const t = useT();
  const { view, selectedOption } = props;
  const { lightMode } = useContext(LightModeContext);

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Regions Analysis')}</span>
      <hr className={hrTheme.dark} />
      <p>
        {t('Select a region type below to explore a table of regions in which this species is expected to occur.')}
      </p>
      <div className={styles.choices}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
        >
          <FormControlLabel value="protectedAreas" control={<Radio />} label={t('Protected Areas')} />
          <FormControlLabel value="proposedProtectedAreas" control={<Radio />} label={t('Proposed Protected Areas')} />
          <FormControlLabel value="provinces" control={<Radio />} label={t('Provinces')} />
          <FormControlLabel value="priorityAreas" control={<Radio />} label={t('Priority Areas')} />
          <FormControlLabel value="communityForests" control={<Radio />} label={t('Community Forests')} />
        </RadioGroup>
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
