import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { AREA_OF_INTEREST } from 'router';

import { useLocale, useT } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import {
  createHashFromGeometry,
  calculateGeometryArea,
} from 'utils/analyze-areas-utils';
import { getLocaleNumber } from 'utils/data-formatting-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';

import Polygon from '@arcgis/core/geometry/Polygon';

import { useSketchWidget, useWatchUtils } from 'hooks/esri';

import {
  getPrecalculatedAOIOptions,
  CLEAR_SELECTIONS,
  HIGHER_AREA_SIZE_LIMIT,
} from 'constants/analyze-areas-constants';
import {
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER,
  WDPA_OECM_FEATURE_LAYER,
  HALF_EARTH_FUTURE_TILE_LAYER,
  GRAPHIC_LAYER,
} from 'constants/layers-slugs';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

import { mapStateToProps } from './analyze-areas-sidebar-card-selectors';
import Component from './component.jsx';

const actions = {
  ...urlActions,
  ...mapTooltipActions,
  ...aoisGeometriesActions,
  ...aoiAnalyticsActions,
};

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

function AnalyzeAreasContainer(props) {
  const locale = useLocale();
  const t = useT();
  const warningMessages = useMemo(
    () => getWarningMessages(t, locale),
    [locale]
  );

  const precalculatedAOIOptions = useMemo(
    () => getPrecalculatedAOIOptions(),
    [locale]
  );

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
    selectedAnalysisTab,
  } = props;

  const [selectedOption, setSelectedOption] = useState(
    precalculatedAOIOptions[0]
  );
  const [showProgress, setShowProgress] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [sketchWidgetMode, setSketchWidgetMode] = useState('create');
  const [isPromptModalOpen, setPromptModalOpen] = useState(false);
  const [promptModalContent, setPromptModalContent] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    setSelectedOption(
      precalculatedAOIOptions.find(
        (option) => option.title === selectedAnalysisLayer
      )
    );

    if (selectedAnalysisLayer === HALF_EARTH_FUTURE_TILE_LAYER) {
      setIsFirstLoad(false);
    }
  }, [selectedAnalysisLayer, precalculatedAOIOptions, setSelectedOption]);

  const postDrawCallback = (geometry) => {
    const hash = createHashFromGeometry(geometry);
    setAoiGeometry({ hash, geometry });
    shapeDrawSuccessfulAnalytics();
    browsePage({ type: AREA_OF_INTEREST, payload: { id: hash } });
  };

  const onShapeUploadSuccess = (response) => {
    const featureSetGeometry =
      response.data.featureCollection.layers[0].featureSet.features[0].geometry;
    const area = calculateGeometryArea(featureSetGeometry);
    if (area > HIGHER_AREA_SIZE_LIMIT) {
      setPromptModalContent({
        title: warningMessages.area.title,
        description: warningMessages.area.description(area),
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
  };

  const onShapeUploadError = (error) => {
    if (error.message === 'Invalid file format.') {
      setPromptModalContent({
        title: warningMessages.file.title,
        description: warningMessages.file.description(),
      });
    } else {
      setPromptModalContent({
        title: warningMessages[error.details.httpStatus].title,
        description: error.message,
      });
    }
    setPromptModalOpen(true);
    shapeUploadErrorAnalytics(warningMessages[error.details.httpStatus].title);
  };
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

  const handleDrawClick = () => {
    if (!sketchTool) {
      handleSketchToolActivation();
    } else {
      handleSketchToolDestroy();
    }
  };

  const handleLayerToggle = (newSelectedOption) => {
    const protectedAreasSelected =
      newSelectedOption === WDPA_OECM_FEATURE_LAYER;

    const getLayersToToggle = () => {
      const formerSelectedSlug = selectedOption?.slug;
      const newLayerCategory =
        newSelectedOption === HALF_EARTH_FUTURE_TILE_LAYER
          ? LAYERS_CATEGORIES.PROTECTION
          : undefined;

      let layersToToggle = [];
      layersToToggle.push({ layerId: formerSelectedSlug });
      if (
        newSelectedOption !== CLEAR_SELECTIONS &&
        (formerSelectedSlug !== undefined ||
          formerSelectedSlug !== CLEAR_SELECTIONS)
      ) {
        layersToToggle.push({
          layerId: newSelectedOption,
          category: newLayerCategory,
        });
      }

      if (formerSelectedSlug === CLEAR_SELECTIONS) {
        layersToToggle.push({
          layerId: GRAPHIC_LAYER,
        });
      }

      if (protectedAreasSelected) {
        const additionalProtectedAreasLayers = [
          PROTECTED_AREAS_VECTOR_TILE_LAYER,
          COMMUNITY_AREAS_VECTOR_TILE_LAYER,
        ];
        additionalProtectedAreasLayers.forEach((layer) => {
          if (!activeLayers.some((l) => l.title === layer)) {
            layersToToggle.push({
              layerId: layer,
              category: LAYERS_CATEGORIES.PROTECTION,
            });
          }
        });
      }

      return layersToToggle;
    };

    const layersToToggle = getLayersToToggle();

    const categories = layersToToggle.reduce((acc, layer) => {
      acc[layer.layerId] = layer.category;
      return acc;
    }, {});
    batchToggleLayers(
      layersToToggle.map((l) => l.layerId),
      activeLayers,
      changeGlobe,
      categories
    );
  };

  const handleAnalysisTabClick = (selectedTab) => {
    changeUI({ selectedAnalysisTab: selectedTab || 'click' });

    if (selectedTab === 'draw') {
      handleSketchToolActivation();
    } else if (sketchTool) {
      setSketchWidgetMode('create'); // Maybe it was in edit mode
      handleSketchToolDestroy();
    }
  };

  const watchUtils = useWatchUtils();

  const handleOptionSelection = async (option) => {
    if (option?.slug === HALF_EARTH_FUTURE_TILE_LAYER && isFirstLoad) {
      setShowProgress(true);
    }
    handleLayerToggle(option?.slug);
    changeUI({ selectedAnalysisLayer: option?.slug });
    setTooltipIsVisible(false);

    watchUtils.watch(() =>
      view.map.allLayers.forEach((layer) => {
        if (layer.id === HALF_EARTH_FUTURE_TILE_LAYER && layer.visible) {
          setShowProgress(false);
        }
      })
    );
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
      handleDrawClick={handleDrawClick}
      handleAnalysisTabClick={handleAnalysisTabClick}
      handlePromptModalToggle={handlePromptModalToggle}
      sketchTool={sketchTool}
      sketchWidgetMode={sketchWidgetMode}
      setSketchWidgetMode={setSketchWidgetMode}
      sketchTooltipType={sketchTooltipType}
      setSketchTooltipType={setSketchTooltipType}
      setUpdatedGeometry={setUpdatedGeometry}
      updatedGeometry={updatedGeometry}
      showProgress={showProgress}
    />
  );
}

export default connect(mapStateToProps, actions)(AnalyzeAreasContainer);
