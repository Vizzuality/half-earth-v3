import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { loadModules } from 'esri-loader';
import { exploreCountryFromSearchAnalyticsEvent } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';
import Component from './component.jsx';
import { getEcoregionsSearchSource, getAdminsSearchSource, getProtectedAreasSearchSource } from 'utils/analyze-areas-utils';
import { ECOREGIONS, ADMIN_AREAS, PROTECTED_AREAS, DEFAULT_SOURCE } from 'constants/analyze-areas-constants';
import { useSketch} from 'hooks/esri';
import { AREA_OF_INTEREST } from 'router'

const actions = { ...urlActions };

const AnalyzeAreasContainer = (props) => {
  const { browsePage, view, exploreCountryFromSearchAnalyticsEvent } = props;
  const [selectedSource, setSelectedSource] = useState(DEFAULT_SOURCE)
  const [searchWidgetConfig, setSearchWidgetConfig] = useState({})
  const [isSketchToolActive, setSketchToolState] = useState(false);
  const [sketchTool, setSketchTool] = useState({});
  // console.log(sketchTool)
  const handleDrawClick = () => {
    setSketchToolState(!isSketchToolActive);
  }
  
  useEffect(() => {
    const container = document.createElement("div");
    container.setAttribute("id", "sketchTool");

    console.log(container)
    console.log(isSketchToolActive)
    if (isSketchToolActive) {
      
      console.log(isSketchToolActive)
      loadModules(["esri/widgets/Sketch",  "esri/layers/GraphicsLayer"]).then(([Sketch, GraphicsLayer]) => {
        const sketchLayer = new GraphicsLayer({ elevationInfo: { mode: 'on-the-ground' } });
        view.map.add(sketchLayer);
        const _sketchTool = new Sketch({
          view,
          layer: sketchLayer,
          container,
          availableCreateTools: ['polygon', 'rectangle', 'circle'],
          defaultCreateOptions: { hasZ: false },
          defaultUpdateOptions: { enableZ: false, multipleSelectionEnabled: false, toggleToolOnClick: true },
          visibleElements: {
            settingsMenu: false
          }
        });
        setSketchTool(_sketchTool)
        view.ui.add(_sketchTool, "bottom-right");
       const esriSearch = document.querySelector('#sketchTool');
       const rootNode = document.getElementById("root");
       rootNode.appendChild(esriSearch);
        console.log(_sketchTool)
      });
    }
  },[isSketchToolActive])


  const postSearchCallback = () => {
    switch (selectedSource) {
      case ECOREGIONS:
        return function({result}) {
          const { feature: { attributes: { ECO_ID }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { eco_id: ECO_ID }});
        }
      case PROTECTED_AREAS:
        return function({result}) {
          const { feature: { attributes: { WDPAID }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { wdpa_id: WDPAID }});
        }
      case ADMIN_AREAS:
        return function({result}) {
          const { feature: { attributes: { ISO_CODE }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { wdpa_id: ISO_CODE }});
        }
      default:
        return function({result}) {
          const { feature: { attributes: { ISO_CODE }}} = result;
          browsePage({type: AREA_OF_INTEREST, query: { iso_code: ISO_CODE }});
        }
    }
  }

  const searchSources = (FeatureLayer) => {
    switch (selectedSource) {
      case ECOREGIONS:
        return function() {
          getEcoregionsSearchSource(FeatureLayer);
        }
      case PROTECTED_AREAS:
        return function() {
          getProtectedAreasSearchSource(FeatureLayer);
        }
      case ADMIN_AREAS:
        return function() {
          getAdminsSearchSource(FeatureLayer);
        }
      default:
        return function() {
          getAdminsSearchSource(FeatureLayer);
        }
    }
  }

  useEffect(() => {
    setSearchWidgetConfig({
      postSearchCallback: postSearchCallback(),
      searchSources: searchSources()
    })
  }, [selectedSource])


  return (
    <Component
      searchWidgetConfig={searchWidgetConfig}
      handleDrawClick={handleDrawClick}
      {...props}
    />
  );
}

export default connect(null, actions)(AnalyzeAreasContainer);
