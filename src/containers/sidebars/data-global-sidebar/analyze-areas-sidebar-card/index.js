import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// constants
import { PRECALCULATED_AOI_OPTIONS, HIGHER_AREA_SIZE_LIMIT, WARNING_MESSAGES } from 'constants/analyze-areas-constants';
import { GADM_1_ADMIN_AREAS_FEATURE_LAYER, WDPA_OECM_FEATURE_LAYER, GADM_0_ADMIN_AREAS_FEATURE_LAYER } from 'constants/layers-slugs';
import { NATIONAL_BOUNDARIES_TYPE, PROTECTED_AREAS_TYPE, SUBNATIONAL_BOUNDARIES_TYPE } from 'constants/aois.js';

// utils
import { getSelectedAnalysisLayer, createHashFromGeometry, calculateGeometryArea } from 'utils/analyze-areas-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';

// hooks
import { useSketchWidget } from 'hooks/esri';

// actions
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import aoisActions from 'redux_modules/aois';
import { loadModules } from 'esri-loader';

import Component from './component.jsx';

const actions = { ...urlActions, ...mapTooltipActions, ...aoisGeometriesActions, ...aoiAnalyticsActions, ...aoisActions };

const AnalyzeAreasContainer = (props) => {
  const { browsePage, view, activeLayers, changeGlobe, setTooltipIsVisible, setAoiGeometry, setAreaTypeSelected } = props;
  const [selectedOption, setSelectedOption] = useState(PRECALCULATED_AOI_OPTIONS[0]);
  const [selectedAnalysisTab, setSelectedAnalysisTab] = useState('click');
  const [isPromptModalOpen, setPromptModalOpen] = useState(false);
  const [promptModalContent, setPromptModalContent] = useState({
    title: '',
    description: ''
  })


  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    if (activeOption) {
      setSelectedOption(activeOption);
    }
  }, [])

  const postDrawCallback = (layer, graphic, area) => {
    if (area > HIGHER_AREA_SIZE_LIMIT) {
      view.map.remove(layer);
      setPromptModalContent({
        title: WARNING_MESSAGES.area.title,
        description: WARNING_MESSAGES.area.description(area),
      });
      setPromptModalOpen(true);
      props.shapeDrawTooBigAnalytics();
    } else {
      const { geometry } = graphic;
      const hash = createHashFromGeometry(geometry);
      setAoiGeometry({ hash, geometry });
      props.shapeDrawSuccessfulAnalytics();
      browsePage({ type: AREA_OF_INTEREST, payload: { id: hash } });
    }
  }

  const onShapeUploadSuccess = (response) => {
    loadModules(["esri/geometry/Polygon", "esri/geometry/geometryEngine"])
      .then(([Polygon, geometryEngine]) => {
        const featureSetGeometry = response.data.featureCollection.layers[0].featureSet.features[0].geometry;
        const area = calculateGeometryArea(featureSetGeometry, geometryEngine);
        if (area > HIGHER_AREA_SIZE_LIMIT) {
          setPromptModalContent({
            title: WARNING_MESSAGES.area.title,
            description: WARNING_MESSAGES.area.description(area),
          });
          setPromptModalOpen(true);
          props.shapeUploadTooBigAnalytics();
        } else {
          const geometryInstance = new Polygon(featureSetGeometry);
          const hash = createHashFromGeometry(geometryInstance);
          setAoiGeometry({ hash, geometry: geometryInstance });
          props.shapeUploadSuccessfulAnalytics();
          browsePage({ type: AREA_OF_INTEREST, payload: { id: hash } });
        }
      })
  }

  const onShapeUploadError = (error) => {
    setPromptModalContent({
      title: WARNING_MESSAGES[error.details.httpStatus].title,
      description: WARNING_MESSAGES[error.details.httpStatus].description(),
    });
    setPromptModalOpen(true);
    props.shapeUploadErrorAnalytics(WARNING_MESSAGES[error.details.httpStatus].title);
  }

  const {
    sketchTool,
    geometryArea,
    handleSketchToolDestroy,
    handleSketchToolActivation,
  } = useSketchWidget(view, { postDrawCallback });

  const handleAnalysisTabClick = (selectedTab) => {
    switch (selectedTab) {
      case 'draw':
        setSelectedAnalysisTab('draw');
        handleLayerToggle(selectedOption);
        break;
      case 'click':
        setSelectedAnalysisTab('click');
        handleLayerToggle(selectedOption);
        if (sketchTool) { handleSketchToolDestroy(); }
        break;
      default:
        setSelectedAnalysisTab('click');
        handleSketchToolDestroy();
        break;
    }
  }

  const handleOptionSelection = (option) => {
    switch (option) {
      case GADM_1_ADMIN_AREAS_FEATURE_LAYER:
        setAreaTypeSelected(SUBNATIONAL_BOUNDARIES_TYPE);
        break;
      case GADM_0_ADMIN_AREAS_FEATURE_LAYER:
        setAreaTypeSelected(NATIONAL_BOUNDARIES_TYPE);
        break;
      case WDPA_OECM_FEATURE_LAYER:
        setAreaTypeSelected(PROTECTED_AREAS_TYPE);
        break;
    }
    handleLayerToggle(option);
    setSelectedOption(option);
    setTooltipIsVisible(false);
  }

  const handleLayerToggle = (option) => {
    batchToggleLayers([selectedOption.slug, option.slug], activeLayers, changeGlobe)
  }


  const handlePromptModalToggle = () => setPromptModalOpen(!isPromptModalOpen);

  const handleDrawClick = () => {
    if (!sketchTool) {
      handleSketchToolActivation()
    } else {
      handleSketchToolDestroy()
    }
  }

  return (
    <Component
      geometryArea={geometryArea}
      selectedOption={selectedOption}
      isSketchToolActive={sketchTool}
      handleDrawClick={handleDrawClick}
      isPromptModalOpen={isPromptModalOpen}
      promptModalContent={promptModalContent}
      onShapeUploadError={onShapeUploadError}
      selectedAnalysisTab={selectedAnalysisTab}
      onShapeUploadSuccess={onShapeUploadSuccess}
      handleOptionSelection={handleOptionSelection}
      handleAnalysisTabClick={handleAnalysisTabClick}
      handlePromptModalToggle={handlePromptModalToggle}
      {...props}
    />
  );
}

export default connect(null, actions)(AnalyzeAreasContainer);
