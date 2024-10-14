import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import Button from 'components/button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchLocation from 'components/search-location';
import EsriFeatureService from 'services/esri-feature-service';
import GroupLayer from '@arcgis/core/layers/GroupLayer.js';
import { SEARCH_TYPES } from 'constants/search-location-constants';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import styles from './regions-analysis-styles.module.scss';
import { LightModeContext } from '../../../../context/light-mode';
import { useT } from '@transifex/react';
import { LAYER_OPTIONS } from '../../../../utils/dashboard-utils';

function RegionsAnalysisComponent(props) {
  const t = useT();
  const { view, selectedOption, map, regionLayers, setRegionLayers, selectedRegionOption, setSelectedRegionOption } = props;
  const { lightMode } = useContext(LightModeContext);

  const optionSelected = (event) => {
    removeRegionLayers();
    let layers;

    const option = event.currentTarget.value;
    if (option === 'protectedAreas') {
      layers = EsriFeatureService.addProtectedAreaLayer();

      setRegionLayers({
        [LAYER_OPTIONS.PROTECTED_AREAS]: layers.featureLayer,
        [LAYER_OPTIONS.PROTECTED_AREAS_VECTOR]: layers.vectorTileLayer
      });
      map.add(layers.groupLayer);
    } else if (option === 'provinces') {
      layers = EsriFeatureService.addProvinceLayer();

      setRegionLayers({
        [LAYER_OPTIONS.PROVINCES]: layers.featureLayer,
        [LAYER_OPTIONS.PROVINCES_VECTOR]: layers.vectorTileLayer
      });
      map.add(layers.groupLayer);
    }

    setSelectedRegionOption(option);
  }

  const removeRegionLayers = () => {
    let layers = regionLayers;
    Object.keys(layers).map(region => {
      // const { [region]: name, ...rest } = layers;
      // layers = rest;
      const foundLayer = map.layers.items.find(item => item.id === region);
      if (foundLayer) {
        map.remove(foundLayer);
      }
    });

    // setRegionLayers(layers);
  }

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
          onChange={optionSelected}
          value={selectedRegionOption}
        >
          <FormControlLabel value="protectedAreas" control={<Radio />} label={t('Protected Areas')} />
          <FormControlLabel value="proposedProtectedAreas" control={<Radio />} label={t('Proposed Protected Areas')} />
          <FormControlLabel value="provinces" control={<Radio />} label={t('Provinces')} />
          <FormControlLabel value="priorityAreas" control={<Radio />} label={t('Priority Areas')} />
          <FormControlLabel value="communityForests" control={<Radio />} label={t('Community Forests')} />
        </RadioGroup>
      </div>
      {/* <div className={styles.search}>
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
          label={t('Download Data')}
        />
      </div> */}
    </section>
  );
}

export default RegionsAnalysisComponent;
