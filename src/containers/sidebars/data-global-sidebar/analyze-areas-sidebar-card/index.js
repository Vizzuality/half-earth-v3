import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import aoisActions from 'redux_modules/aois';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { loadModules } from 'esri-loader';

import { AREA_OF_INTEREST } from 'router';

import { useLocale, useT } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import { createHashFromGeometry, calculateGeometryArea } from 'utils/analyze-areas-utils';
import { localeFormatting } from 'utils/data-formatting-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';

import { useSketchWidget } from 'hooks/esri';

import { getPrecalculatedAOIOptions, HIGHER_AREA_SIZE_LIMIT } from 'constants/analyze-areas-constants';
import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
} from 'constants/layers-slugs';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import { mapStateToProps } from './analyze-areas-sidebar-card-selectors';
import Component from './component.jsx';

const actions = {
  ...urlActions,
  ...mapTooltipActions,
  ...aoisGeometriesActions,
  ...aoiAnalyticsActions,
  ...aoisActions,
};

function AnalyzeAreasContainer(props) {
  const locale = useLocale();
  const t = useT();

  const WARNING_MESSAGES = {
    area: {
      title: t('Area size too big'),
      // eslint-disable-next-line react/no-unstable-nested-components
      description: (size) => (
        <span>
          {t('The maximum size for on the fly area analysis is ')}
          {localeFormatting(HIGHER_AREA_SIZE_LIMIT)}
          {t(' km')}
          <sup>2</sup>
          .
          {t('The area that you are trying to analyze has ')}
          {localeFormatting(size)}
          {t(' km')}
          <sup>2</sup>
          .
          {' '}
          {t('Please select a smaller area to trigger the analysis.')}
        </span>
      ),
    },
    file: {
      title: t('Something went wrong with your upload'),
      description: () => t('Please verify that the .zip file contains at least the .shp, .shx, .dbf, and .prj files components and that the file as a maximum of 2MB.'),
    },
    400: {
      title: t('File too big'),
      description: () => t('File exceeds the max size allowed of 2MB. Please provide a smaller file to trigger the analysis.'),
    },
    500: {
      title: t('Server error'),
      description: () => t('An error ocurred during the file upload. Please try again'),
    },
  };

  const precalculatedAOIOptions = useMemo(() => getPrecalculatedAOIOptions(), [locale]);

  const {
    browsePage,
    view,
    activeLayers,
    changeGlobe,
    setTooltipIsVisible,
    setAoiGeometry,
    shapeDrawSuccessfulAnalytics,
    shapeDrawTooBigAnalytics,
    shapeUploadErrorAnalytics,
    shapeUploadSuccessfulAnalytics,
    shapeUploadTooBigAnalytics,
    changeUI,
    selectedAnalysisLayer,
  } = props;

  const [selectedOption, setSelectedOption] = useState(precalculatedAOIOptions[0]);
  const [selectedAnalysisTab, setSelectedAnalysisTab] = useState('click');
  const [isPromptModalOpen, setPromptModalOpen] = useState(false);
  const [promptModalContent, setPromptModalContent] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    setSelectedOption(precalculatedAOIOptions.find(
      (option) => option.title === selectedAnalysisLayer,
    ));
  }, [selectedAnalysisLayer, precalculatedAOIOptions, setSelectedOption]);

  const postDrawCallback = (layer, graphic, area) => {
    if (area > HIGHER_AREA_SIZE_LIMIT) {
      view.map.remove(layer);
      setPromptModalContent({
        title: WARNING_MESSAGES.area.title,
        description: WARNING_MESSAGES.area.description(area),
      });
      setPromptModalOpen(true);
      shapeDrawTooBigAnalytics();
    } else {
      const { geometry } = graphic;
      const hash = createHashFromGeometry(geometry);
      setAoiGeometry({ hash, geometry });
      shapeDrawSuccessfulAnalytics();
      browsePage({ type: AREA_OF_INTEREST, payload: { id: hash } });
    }
  };

  const onShapeUploadSuccess = (response) => {
    loadModules(['esri/geometry/Polygon', 'esri/geometry/geometryEngine'])
      .then(([Polygon, geometryEngine]) => {
        const featureSetGeometry = response.data.featureCollection.layers[0]
          .featureSet.features[0].geometry;
        const area = calculateGeometryArea(featureSetGeometry, geometryEngine);
        if (area > HIGHER_AREA_SIZE_LIMIT) {
          setPromptModalContent({
            title: WARNING_MESSAGES.area.title,
            description: WARNING_MESSAGES.area.description(area),
          });
          setPromptModalOpen(true);
          shapeUploadTooBigAnalytics();
        } else {
          const geometryInstance = new Polygon(featureSetGeometry);
          const hash = createHashFromGeometry(geometryInstance);
          setAoiGeometry({ hash, geometry: geometryInstance });
          shapeUploadSuccessfulAnalytics();
          browsePage({ type: AREA_OF_INTEREST, payload: { id: hash } });
        }
      });
  };

  const onShapeUploadError = (error) => {
    if (error.message === 'Invalid file format.') {
      setPromptModalContent({
        title: WARNING_MESSAGES.file.title,
        description: WARNING_MESSAGES.file.description(),
      });
    } else {
      setPromptModalContent({
        title: WARNING_MESSAGES[error.details.httpStatus].title,
        description: error.message,
      });
    }
    setPromptModalOpen(true);
    shapeUploadErrorAnalytics(WARNING_MESSAGES[error.details.httpStatus].title);
  };

  const {
    sketchTool,
    handleSketchToolDestroy,
    handleSketchToolActivation,
  } = useSketchWidget(view, { postDrawCallback });

  const handleLayerToggle = (newSelectedOption) => {
    const protectedAreasSelected = newSelectedOption === WDPA_OECM_FEATURE_LAYER;

    const getLayersToToggle = () => {
      const formerSelectedSlug = selectedOption.slug;
      const newLayerCategory = newSelectedOption === HALF_EARTH_FUTURE_TILE_LAYER
        ? LAYERS_CATEGORIES.PROTECTION : undefined;

      let layersToToggle = [
        { layerId: formerSelectedSlug },
        { layerId: newSelectedOption, category: newLayerCategory },
      ];

      if (protectedAreasSelected) {
        const additionalProtectedAreasLayers = [
          PROTECTED_AREAS_VECTOR_TILE_LAYER,
          COMMUNITY_AREAS_VECTOR_TILE_LAYER,
        ];
        additionalProtectedAreasLayers.forEach((layer) => {
          if (!activeLayers.some((l) => l.title === layer)) {
            layersToToggle.push({ layerId: layer, category: LAYERS_CATEGORIES.PROTECTION });
          }
        });
      }

      // Never toggle (remove) future places layer if its active
      // Future places layer will be activated if we select it at some point
      // and never toggled unless we do it from the protection checkbox
      const futureLayerIsActive = activeLayers
        .some((l) => l.title === HALF_EARTH_FUTURE_TILE_LAYER);
      if (futureLayerIsActive
        && layersToToggle.some((l) => l.layerId === HALF_EARTH_FUTURE_TILE_LAYER)) {
        layersToToggle = layersToToggle.filter((l) => l.layerId !== HALF_EARTH_FUTURE_TILE_LAYER);
      }

      return layersToToggle;
    };

    const layersToToggle = getLayersToToggle();
    const categories = layersToToggle.reduce((acc, layer) => {
      acc[layer.layerId] = layer.category;
      return acc;
    }, {});
    batchToggleLayers(layersToToggle.map((l) => l.layerId), activeLayers, changeGlobe, categories);
  };

  const handleAnalysisTabClick = (selectedTab) => {
    setSelectedAnalysisTab(selectedTab || 'click');

    if (selectedTab === 'draw') {
      handleSketchToolActivation();
    } else if (sketchTool) {
      handleSketchToolDestroy();
    }

    if (selectedTab === 'click') {
      handleLayerToggle(precalculatedAOIOptions[0]);
    }
  };

  const handleOptionSelection = (option) => {
    handleLayerToggle(option.slug);
    changeUI({ selectedAnalysisLayer: option.slug });
    setTooltipIsVisible(false);
  };

  const handlePromptModalToggle = () => setPromptModalOpen(!isPromptModalOpen);

  return (
    <Component
      {...props}
      selectedOption={selectedOption}
      isPromptModalOpen={isPromptModalOpen}
      promptModalContent={promptModalContent}
      onShapeUploadError={onShapeUploadError}
      selectedAnalysisTab={selectedAnalysisTab}
      onShapeUploadSuccess={onShapeUploadSuccess}
      handleOptionSelection={handleOptionSelection}
      handleAnalysisTabClick={handleAnalysisTabClick}
      handlePromptModalToggle={handlePromptModalToggle}
    />
  );
}

export default connect(mapStateToProps, actions)(AnalyzeAreasContainer);
