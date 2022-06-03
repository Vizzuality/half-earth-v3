import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

// constants
import { PRECALCULATED_AOI_OPTIONS, HIGHER_AREA_SIZE_LIMIT, WARNING_MESSAGES } from 'constants/analyze-areas-constants';
import { PROTECTED_AREAS_VECTOR_TILE_LAYER,COMMUNITY_AREAS_VECTOR_TILE_LAYER,  GADM_1_ADMIN_AREAS_FEATURE_LAYER, WDPA_OECM_FEATURE_LAYER, GADM_0_ADMIN_AREAS_FEATURE_LAYER, HALF_EARTH_FUTURE_TILE_LAYER, SPECIFIC_REGIONS_TILE_LAYER } from 'constants/layers-slugs';
import { AREA_TYPES } from 'constants/aois.js';
import { LAYERS_CATEGORIES } from 'constants/mol-layers-configs';

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
import mapStateToProps from './analyze-areas-sidebar-card-selectors.js';

const actions = { ...urlActions, ...mapTooltipActions, ...aoisGeometriesActions, ...aoiAnalyticsActions, ...aoisActions };

const AnalyzeAreasContainer = (props) => {
  const { browsePage, view, activeLayers, changeGlobe, setTooltipIsVisible, setAoiGeometry, setAreaTypeSelected, areaTypeSelected } = props;
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
      changeGlobe({ areaTypeSelected })
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
          changeGlobe({ areaTypeSelected })
        }
      })
  }

  const onShapeUploadError = (error) => {
    if (error.message === "Invalid file format.") {
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
        setAreaTypeSelected(AREA_TYPES.custom);
        setSelectedAnalysisTab('draw');
        handleLayerToggle(PRECALCULATED_AOI_OPTIONS[0]);
        break;
      case 'click':
        setSelectedAnalysisTab('click');
        handleLayerToggle(PRECALCULATED_AOI_OPTIONS[0]);
        if (sketchTool) { handleSketchToolDestroy(); }
        break;
      default:
        setSelectedAnalysisTab('click');
        handleSketchToolDestroy();
        break;
    }
  }

  const handleOptionSelection = (option) => {
    // eslint-disable-next-line default-case
    switch (option.slug) {
      case GADM_1_ADMIN_AREAS_FEATURE_LAYER:
        setAreaTypeSelected(AREA_TYPES.subnational);
        break;
      case GADM_0_ADMIN_AREAS_FEATURE_LAYER:
        setAreaTypeSelected(AREA_TYPES.national);
        break;
      case WDPA_OECM_FEATURE_LAYER:
        setAreaTypeSelected(AREA_TYPES.protected);
        break;
      case HALF_EARTH_FUTURE_TILE_LAYER:
        setAreaTypeSelected(AREA_TYPES.futurePlaces);
        break;
      case SPECIFIC_REGIONS_TILE_LAYER:
        setAreaTypeSelected(AREA_TYPES.specificRegions);
        break;
      default:
        setAreaTypeSelected(AREA_TYPES.custom)
        break;
    }
    handleLayerToggle(option.slug);
    setSelectedOption(option);
    setTooltipIsVisible(false);
  }

  const handleLayerToggle = (newSelectedOption) => {

    const getLayersToToggle = () => {
      const formerSelectedSlug = selectedOption.slug;

      let layersToToggle = [formerSelectedSlug, newSelectedOption];

      const protectedAreasSelected = newSelectedOption === WDPA_OECM_FEATURE_LAYER;
      if (protectedAreasSelected) {
        const additionalProtectedAreasLayers = [PROTECTED_AREAS_VECTOR_TILE_LAYER, COMMUNITY_AREAS_VECTOR_TILE_LAYER];
        additionalProtectedAreasLayers.forEach(layer => {
          if (!activeLayers.some(l => l.title === layer)) {
            layersToToggle.push(layer);
          }
        })
      }

      // Never toggle (remove) future places layer if its active
      // Future places layer will be activated if we select it at some point and never toggled unless we do it from the protection checkbox
      const futureLayerIsActive = activeLayers.some(l => l.title === HALF_EARTH_FUTURE_TILE_LAYER);
      if (futureLayerIsActive && layersToToggle.includes(HALF_EARTH_FUTURE_TILE_LAYER)) {
        layersToToggle = layersToToggle.filter(l => l !== HALF_EARTH_FUTURE_TILE_LAYER)
      }

      return layersToToggle;
    };

    const category = newSelectedOption === HALF_EARTH_FUTURE_TILE_LAYER ? LAYERS_CATEGORIES.PROTECTION : undefined;

    batchToggleLayers(getLayersToToggle(), activeLayers, changeGlobe, category);
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

export default connect(mapStateToProps, actions)(AnalyzeAreasContainer);
