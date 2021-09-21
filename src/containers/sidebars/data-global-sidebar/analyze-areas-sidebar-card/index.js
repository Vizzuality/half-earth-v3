import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Component from './component.jsx';
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';
import { getSelectedAnalysisLayer, createHashFromGraphic } from 'utils/analyze-areas-utils';
import { batchToggleLayers } from 'utils/layer-manager-utils';
// HOOKS
import { useSketchWidget} from 'hooks/esri';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';
import mapTooltipActions from 'redux_modules/map-tooltip';

const actions = { ...urlActions, ...mapTooltipActions };



const AnalyzeAreasContainer = (props) => {
  const { browsePage, view, activeLayers, changeGlobe, setTooltipIsVisible } = props;
  const [selectedOption, setSelectedOption] = useState(PRECALCULATED_AOI_OPTIONS[0]);
  const [selectedAnalysisTab, setSelectedAnalysisTab] = useState('click');

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedOption(activeOption);
  }, [])

  const postDrawCallback = (graphic) => {
    const aoi_hash = createHashFromGraphic(graphic);
    browsePage({type: AREA_OF_INTEREST, payload: { id: aoi_hash }, query: { aoi_geometry: graphic.geometry }});
  }

  const {
    handleSketchToolActivation,
    handleSketchToolDestroy,
    sketchTool
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

  return (
    <Component
      selectedOption={selectedOption}
      isSketchToolActive={sketchTool}
      handleDrawClick={handleDrawClick}
      selectedAnalysisTab={selectedAnalysisTab}
      handleOptionSelection={handleOptionSelection}
      handleAnalysisTabClick={handleAnalysisTabClick}
      {...props}
    />
  );
}

export default connect(null, actions)(AnalyzeAreasContainer);
