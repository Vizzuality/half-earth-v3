import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import { PRECALCULATED_AOI_OPTIONS, HIGHER_AREA_SIZE_LIMIT, WARNING_MESSAGES } from 'constants/analyze-areas-constants';
import { getSelectedAnalysisLayer, createHashFromGeometry, calculateGeometryArea } from 'utils/analyze-areas-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';
// HOOKS
import { useSketchWidget} from 'hooks/esri';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import aoisGeometriesActions from 'redux_modules/aois-geometries';
import { loadModules } from 'esri-loader';

const actions = { ...urlActions, ...mapTooltipActions, ...aoisGeometriesActions };



const AnalyzeAreasContainer = (props) => {
  const { browsePage, view, activeLayers, changeGlobe, setTooltipIsVisible, setAoiGeometry } = props;
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
    } else {
      const { geometry } = graphic;
      const hash = createHashFromGeometry(geometry);
      setAoiGeometry({ hash, geometry });
      browsePage({type: AREA_OF_INTEREST, payload: { id: hash }});
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
      } else {
        const geometryInstance = new Polygon(featureSetGeometry);
        const hash = createHashFromGeometry(geometryInstance);
        setAoiGeometry({ hash, geometry: geometryInstance });
        browsePage({type: AREA_OF_INTEREST, payload: { id: hash }});
      }
    })
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
        if (sketchTool) {handleSketchToolDestroy();}
        break;
      default:
        setSelectedAnalysisTab('click');
        handleSketchToolDestroy();
        break;
    }
  }

  const handleOptionSelection = (option) => {
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
