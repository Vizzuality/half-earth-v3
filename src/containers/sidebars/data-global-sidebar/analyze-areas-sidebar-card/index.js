import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';
import { getSelectedAnalysisLayer, createHashFromGeometry } from 'utils/analyze-areas-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';
// HOOKS
import { useSketchWidget} from 'hooks/esri';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';
import aoisGeometriesActions from 'redux_modules/aois-geometries';

const actions = { ...urlActions, ...mapTooltipActions, ...aoisGeometriesActions };



const AnalyzeAreasContainer = (props) => {
  const { browsePage, view, activeLayers, changeGlobe, setTooltipIsVisible, setAoiGeometry } = props;
  const [selectedOption, setSelectedOption] = useState(PRECALCULATED_AOI_OPTIONS[0]);
  const [selectedAnalysisTab, setSelectedAnalysisTab] = useState('click');
  
  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    if (activeOption) {
      setSelectedOption(activeOption);
    }
  }, [])

  const postDrawCallback = (graphic) => {
    const { geometry } = graphic;
    const hash = createHashFromGeometry(geometry);
    setAoiGeometry({ hash, geometry });
    browsePage({type: AREA_OF_INTEREST, payload: { id: hash }});
  }

  const onFeatureSetGenerated = (response) => {
    const geometry = {
      ...response.data.featureCollection.layers[0].featureSet.features[0].geometry,
      ...response.data.featureCollection.layers[0].featureSet.layerDefinition,
      ...response.data.featureCollection.layers[0].featureSet.layerDefinition,
    }
    const hash = createHashFromGeometry(geometry);
    setAoiGeometry({ hash, geometry });
    browsePage({type: AREA_OF_INTEREST, payload: { id: hash }});
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
  

  const handleDrawClick = () => {
    if (!sketchTool) {
      handleSketchToolActivation()
    } else {
      handleSketchToolDestroy()
    }
  }

  useEffect(() => {
    if (geometryArea) {
      console.log(geometryArea)
    }
  }, [geometryArea])

  return (
    <Component
      geometryArea={geometryArea}
      selectedOption={selectedOption}
      isSketchToolActive={sketchTool}
      handleDrawClick={handleDrawClick}
      selectedAnalysisTab={selectedAnalysisTab}
      handleOptionSelection={handleOptionSelection}
      onFeatureSetGenerated={onFeatureSetGenerated}
      handleAnalysisTabClick={handleAnalysisTabClick}
      {...props}
    />
  );
}

export default connect(null, actions)(AnalyzeAreasContainer);
