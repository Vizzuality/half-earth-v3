import React, { useContext, useEffect, useMemo, useState } from 'react';

import { DASHBOARD } from 'router';

import { useLocale, useT } from '@transifex/react';

import { createHashFromGeometry } from 'utils/analyze-areas-utils';
import {
  PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
  DRC_REGION_FEATURE_ID,
  GUY_FM_RAPID_INVENTORY_32_FEATURE_ID,
  RAPID_INVENTORY_32_FEATURE_ID,
  ZONE_3_FEATURE_ID,
  ZONE_5_FEATURE_ID,
  NBS_OP_INTERVENTIONS_FEATURE_ID,
} from 'utils/dashboard-utils';
import { getLocaleNumber } from 'utils/data-formatting-utils';
import { postAoiToDataBase } from 'utils/geo-processing-services';

import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import cx from 'classnames';
import { LightModeContext } from 'context/light-mode';

import { useSketchWidget } from 'hooks/esri';

import PromptModal from 'containers/modals/prompt-modal';

import Button from 'components/button';

import EsriFeatureService from 'services/esri-feature-service';

import { HIGHER_AREA_SIZE_LIMIT } from 'constants/analyze-areas-constants';
import {
  LAYER_OPTIONS,
  NAVIGATION,
  REGION_OPTIONS,
  LAYER_TITLE_TYPES,
  DATA_POINT_TYPE,
} from 'constants/dashboard-constants.js';

import hrTheme from 'styles/themes/hr-theme.module.scss';

import SketchTooltip from '../../data-global-sidebar/analyze-areas-sidebar-card/sketch-tooltip/sketch-tooltip';
import SketchWidget from '../../data-global-sidebar/analyze-areas-sidebar-card/sketch-widget/sketch-widget-component';

import styles from './regions-analysis-styles.module.scss';
// import SearchInput from 'components/search-input';

export const getWarningMessages = (t, locale) => ({
  area: {
    title: t('Area size too big'),
    // eslint-disable-next-line react/no-unstable-nested-components
    description: (size) => (
      <span>
        {t(
          'The maximum size for on the fly area analysis is {number} km{sup}.',
          {
            number: getLocaleNumber(HIGHER_AREA_SIZE_LIMIT, locale),
            sup: <sup>2</sup>,
          }
        )}{' '}
        {t('The area that you are trying to analyze has {number} km{sup}.', {
          number: getLocaleNumber(size, locale),
          sup: <sup>2</sup>,
        })}{' '}
        {t('Please select a smaller area to trigger the analysis.')}
      </span>
    ),
  },
  file: {
    title: t('Something went wrong with your upload'),
    description: () =>
      t(
        'Please verify that the .zip file contains at least the .shp, .shx, .dbf, and .prj files components and that the file as a maximum of 2MB.'
      ),
  },
  400: {
    title: t('File too big'),
    description: () =>
      t(
        'File exceeds the max size allowed of 2MB. Please provide a smaller file to trigger the analysis.'
      ),
  },
  500: {
    title: t('Server error'),
    description: () =>
      t('An error ocurred during the file upload. Please try again'),
  },
});
function RegionsAnalysisComponent(props) {
  const t = useT();
  const locale = useLocale();
  const {
    map,
    regionLayers,
    browsePage,
    setAoiGeometry,
    shapeDrawTooBigAnalytics,
    setRegionLayers,
    view,
    setSelectedIndex,
    selectedRegion,
    setSelectedRegion,
    selectedIndex,
    selectedRegionOption,
    setMapLegendLayers,
    setSelectedRegionOption,
    setRegionName,
    countryISO,
    setHash,
  } = props;
  const { lightMode } = useContext(LightModeContext);
  const [sketchWidgetMode, setSketchWidgetMode] = useState('create');
  const [isPromptModalOpen, setPromptModalOpen] = useState(false);
  const [promptModalContent, setPromptModalContent] = useState({
    title: '',
    description: '',
  });

  const postDrawCallback = (geometry) => {
    const hash = createHashFromGeometry(geometry);
    setAoiGeometry({ hash, geometry });
    postAoiToDataBase(geometry, { aoiId: hash });

    setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
    setRegionName(t('Custom Area'));
    setHash(hash);
    setSelectedRegion({ name: t('Custom Area'), iso: countryISO });
  };

  const warningMessages = useMemo(
    () => getWarningMessages(t, locale),
    [locale]
  );

  const {
    sketchTool,
    handleSketchToolDestroy,
    handleSketchToolActivation,
    updatedGeometry,
    setUpdatedGeometry,
    sketchTooltipType,
    setSketchTooltipType,
  } = useSketchWidget({
    view,
    sketchWidgetMode,
    setSketchWidgetMode,
    setPromptModalOpen,
    setPromptModalContent,
    warningMessages,
    shapeDrawTooBigAnalytics,
    sketchWidgetConfig: { postDrawCallback },
  });

  const getLayerIcon = (layer, item) => {
    view.whenLayerView(layer).then(() => {
      const { renderer } = layer; // Get the renderer

      if (renderer) {
        const { symbol, uniqueValueGroups } = renderer;

        if (symbol) {
          const { url, outline } = symbol;

          if (url) {
            item.imageUrl = url;
          }

          if (outline) {
            item.outline = outline;
          }
        } else if (uniqueValueGroups) {
          item.classes = uniqueValueGroups[0].classes;
        }
      }

      setMapLegendLayers((ml) => [...ml, item]);
    });
  };

  const displayLayer = async (option) => {
    let featureLayer;
    setMapLegendLayers((ml) => {
      const filtered = ml.filter((l) => l.id !== LAYER_OPTIONS.PROTECTED_AREAS);
      return filtered;
    });

    if (sketchTool) {
      handleSketchToolDestroy();
    }

    if (option === REGION_OPTIONS.PROTECTED_AREAS) {
      featureLayer = await EsriFeatureService.addProtectedAreaLayer(
        null,
        countryISO
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROTECTED_AREAS]: featureLayer,
      }));
      map.add(featureLayer);

      // Add layers to Map Legend
      const protectedAreaLayer = {
        label: t(LAYER_TITLE_TYPES.PROTECTED_AREAS),
        id: LAYER_OPTIONS.PROTECTED_AREAS,
        showChildren: false,
        type: DATA_POINT_TYPE.PUBLIC,
      };

      getLayerIcon(featureLayer, protectedAreaLayer);
    } else if (option === REGION_OPTIONS.PROVINCES) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        PROVINCE_FEATURE_GLOBAL_OUTLINE_ID,
        countryISO
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.PROVINCES]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.FORESTS) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        DRC_REGION_FEATURE_ID,
        null,
        LAYER_OPTIONS.FORESTS
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.FORESTS]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.DISSOLVED_NBS) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        NBS_OP_INTERVENTIONS_FEATURE_ID,
        null,
        LAYER_OPTIONS.DISSOLVED_NBS
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.DISSOLVED_NBS]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.ZONE_3) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        ZONE_3_FEATURE_ID,
        null,
        LAYER_OPTIONS.ZONE_3
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.ZONE_3]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.ZONE_5) {
      featureLayer = await EsriFeatureService.getFeatureLayer(
        ZONE_5_FEATURE_ID,
        null,
        LAYER_OPTIONS.ZONE_5
      );

      setRegionLayers(() => ({
        [LAYER_OPTIONS.ZONE_5]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.RAPID_INVENTORY_32) {
      if (countryISO.toUpperCase() === 'GUY-FM') {
        featureLayer = await EsriFeatureService.getFeatureLayer(
          GUY_FM_RAPID_INVENTORY_32_FEATURE_ID,
          null,
          LAYER_OPTIONS.RAPID_INVENTORY_32
        );
      } else {
        featureLayer = await EsriFeatureService.getFeatureLayer(
          RAPID_INVENTORY_32_FEATURE_ID,
          null,
          LAYER_OPTIONS.RAPID_INVENTORY_32
        );
      }

      setRegionLayers(() => ({
        [LAYER_OPTIONS.RAPID_INVENTORY_32]: featureLayer,
      }));
      map.add(featureLayer);
    } else if (option === REGION_OPTIONS.DRAW) {
      if (!sketchTool) {
        handleSketchToolActivation();
      }
    }
  };

  const removeRegionLayers = () => {
    const protectedAreaLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.PROTECTED_AREAS
    );
    const provinceLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.PROVINCES
    );
    const forestLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.FORESTS
    );
    const dissolvedLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.DISSOLVED_NBS
    );
    const zone3Layer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.ZONE_3
    );
    const zone5Layer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.ZONE_5
    );
    const rapidLayer = map.layers.items.find(
      (layer) => layer.id === LAYER_OPTIONS.RAPID_INVENTORY_32
    );

    map.remove(protectedAreaLayer);
    map.remove(provinceLayer);
    map.remove(forestLayer);
    map.remove(dissolvedLayer);
    map.remove(zone3Layer);
    map.remove(zone5Layer);
    map.remove(rapidLayer);
    setRegionLayers({});
  };

  const optionSelected = (event) => {
    setSelectedRegion(null);
    removeRegionLayers();

    const option = event.currentTarget.value;
    displayLayer(option);
    setSelectedRegionOption(option);
  };

  const handlePromptModalToggle = () => setPromptModalOpen(!isPromptModalOpen);

  useEffect(() => {
    browsePage({
      type: DASHBOARD,
      payload: { iso: countryISO.toLowerCase() },
      query: {
        selectedIndex,
        regionLayers,
        selectedRegionOption,
      },
    });
  }, [regionLayers]);

  useEffect(() => {
    if (selectedRegionOption && selectedRegion) {
      setSelectedIndex(NAVIGATION.EXPLORE_SPECIES);
    } else {
      removeRegionLayers();
      if (countryISO.toUpperCase() === 'EE') {
        setSelectedRegionOption(REGION_OPTIONS.DISSOLVED_NBS);
        displayLayer(REGION_OPTIONS.DISSOLVED_NBS);
      } else {
        setSelectedRegionOption(REGION_OPTIONS.PROTECTED_AREAS);
        displayLayer(REGION_OPTIONS.PROTECTED_AREAS);
      }
    }
  }, []);

  return (
    <section className={cx(lightMode ? styles.light : '', styles.container)}>
      <span className={styles.sectionTitle}>{t('Regions Analysis')}</span>
      <span className={styles.sectionSubtitle}>
        {t(
          'Explore high quality biodiversity expectations for any area of interest'
        )}
      </span>
      <hr className={hrTheme.dark} />
      <p>{t('Select a region type below to display on the map')}</p>
      <div className={styles.choices}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          onChange={optionSelected}
          value={selectedRegionOption}
        >
          {countryISO.toUpperCase() !== 'EE' && (
            <>
              <FormControlLabel
                value={REGION_OPTIONS.PROTECTED_AREAS}
                control={<Radio />}
                label={t('Protected Areas')}
              />

              <FormControlLabel
                value={REGION_OPTIONS.PROVINCES}
                control={<Radio />}
                label={t('Provinces')}
              />
            </>
          )}
          {countryISO === 'COD' && (
            <FormControlLabel
              value={REGION_OPTIONS.FORESTS}
              control={<Radio />}
              label={t('Forest Titles')}
            />
          )}
          {countryISO.toUpperCase() === 'EE' && (
            <FormControlLabel
              value={REGION_OPTIONS.DISSOLVED_NBS}
              control={<Radio />}
              label={t('NBS-OP Interventions')}
            />
          )}
          {countryISO.toUpperCase() === 'GUY-FM' && (
            <>
              <FormControlLabel
                value={REGION_OPTIONS.ZONE_3}
                control={<Radio />}
                label={t('3 Zones')}
              />
              <FormControlLabel
                value={REGION_OPTIONS.ZONE_5}
                control={<Radio />}
                label={t('5 Zones')}
              />
            </>
          )}
          {(countryISO.toUpperCase() === 'GUY-FM' ||
            countryISO.toUpperCase() === 'GUY') && (
            <FormControlLabel
              value={REGION_OPTIONS.RAPID_INVENTORY_32}
              control={<Radio />}
              label={t('Rapid Inventory 32')}
            />
          )}
          {countryISO.toUpperCase() === 'GUY' && (
            <>
              <FormControlLabel
                value={REGION_OPTIONS.DRAW}
                control={<Radio />}
                label={t('Draw a custom area')}
              />
              {selectedRegionOption === REGION_OPTIONS.DRAW && (
                <div>
                  <SketchWidget
                    sketchTool={sketchTool}
                    sketchWidgetMode={sketchWidgetMode}
                    setSketchWidgetMode={setSketchWidgetMode}
                    setSketchTooltipType={setSketchTooltipType}
                    setUpdatedGeometry={setUpdatedGeometry}
                    updatedGeometry={updatedGeometry}
                    view={view}
                  />
                  <SketchTooltip sketchTooltipType={sketchTooltipType} />
                  <p className={styles.sectionLabel}>
                    {t('Draw shape smaller than')}{' '}
                    <b>
                      {getLocaleNumber(HIGHER_AREA_SIZE_LIMIT, locale)} km
                      <sup>2</sup>
                    </b>
                    {t(', approximately the size of Belgium.')}
                  </p>

                  <p className={styles.sectionLabel}>
                    {t('Use the different drawing tools to draw the area.')}
                  </p>
                </div>
              )}
            </>
          )}
          {/* <FormControlLabel value="proposedProtectedAreas" control={<Radio />} label={t('Proposed Protected Areas')} /> */}
          {/* <FormControlLabel value="priorityAreas" control={<Radio />} label={t('Priority Areas')} /> */}
          {/* <FormControlLabel value="communityForests" control={<Radio />} label={t('Community Forests')} /> */}
        </RadioGroup>
        <div className={styles.comingSoon}>
          <span>{t('Coming Soon')}</span>
          <span>{t('Upload a custom area on the map')}</span>
          <Button
            className={styles.disabled}
            type="rectangular"
            label={t('Upload a shapefile')}
          />
        </div>
      </div>
      <PromptModal
        isOpen={isPromptModalOpen}
        handleClose={handlePromptModalToggle}
        title={promptModalContent.title}
        description={promptModalContent.description}
      />
    </section>
  );
}

export default RegionsAnalysisComponent;
