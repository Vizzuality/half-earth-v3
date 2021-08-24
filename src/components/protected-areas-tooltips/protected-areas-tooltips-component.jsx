import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

import {
  PROTECTED_AREAS_FEATURE_LAYER,
  COMMUNITY_AREAS_FEATURE_LAYER,
  PROTECTED_AREAS_VECTOR_TILE_LAYER,
  COMMUNITY_AREAS_VECTOR_TILE_LAYER
} from 'constants/layers-slugs';

import {
  layersConfig
} from 'constants/mol-layers-configs';

const PROTECTED_AREA_COLOR = '#FF6C47';
const COMMUNITY_AREA_COLOR = '#FCC44A';

const PROTECTED = 'PROTECTED';
const COMMUNITY = 'COMMUNITY';

// HTML elements
const tooltipDot = (color) =>
  `<span style="background-color: ${color};" class="tooltip-dot"></span>`
const areaNameTooltip = (name) => 
  `<span class="tooltip-area-name">${name}</span>`
const areaSizeTooltip = (size) =>
  `<p class="tooltip-area-size">${size} km<sup style="font-size: 7px;">2</sup></p>`;

const ProtectedAreasTooltips = ({ view, isLandscapeMode, activeLayers }) => {
  // tooltips handling
  const [protectedAreasFL, setProtectedAreasFL] = useState(null);
  const [communityAreasFL, setCommunityAreasFL] = useState(null);

  const isProtectedAreasRendered =  activeLayers && activeLayers.find(l => l.title === PROTECTED_AREAS_VECTOR_TILE_LAYER);
  const isCommunityAreasRendered = activeLayers && activeLayers.find(l => l.title === COMMUNITY_AREAS_VECTOR_TILE_LAYER);

  // fetch Protected Areas Feature Layer
  useEffect(() => {
    if (isLandscapeMode && isProtectedAreasRendered && !protectedAreasFL) {
      loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
        const protectedAreasFL = new FeatureLayer({
          url: layersConfig[PROTECTED_AREAS_FEATURE_LAYER].url
        });
        setProtectedAreasFL(protectedAreasFL)
      });
    }
  }, [isProtectedAreasRendered, isLandscapeMode]);

  // fetch Community Areas Feature Layer
  useEffect(() => {
    if (isLandscapeMode && isCommunityAreasRendered && !communityAreasFL) {
      loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
        const communityAreasFL = new FeatureLayer({
          url: layersConfig[COMMUNITY_AREAS_FEATURE_LAYER].url
        });
        setCommunityAreasFL(communityAreasFL)
      });
    }
  }, [isCommunityAreasRendered, isLandscapeMode]);

  const onAreaClick = (event) => {
    const _point = view.toMap(event);

    const protectedAreaReady = isProtectedAreasRendered && protectedAreasFL;
    const communityAreaReady = isCommunityAreasRendered && communityAreasFL;

    loadModules(["esri/rest/support/Query"]).then(([Query]) => {
      const query = new Query({
        geometry: _point,
        spatialRelationship: 'intersects',
        returnGeometry: false,
        outFields: ["NAME", "REP_AREA"]
      });

      if (protectedAreaReady && communityAreaReady) {
        communityAreasFL.queryFeatures(query).then((results) => {
          const { features } = results;
          if (features.length) {
            displayTooltip(_point, features[0].attributes, COMMUNITY_AREA_COLOR);
          } else {
            queryAreas(PROTECTED, query, _point);
          }
        })
      } else if (communityAreaReady && !isProtectedAreasRendered) {
        queryAreas(COMMUNITY, query, _point);
      } else if (protectedAreaReady && !isCommunityAreasRendered) {
        queryAreas(PROTECTED, query, _point);
      }
    })
  }

  const queryAreas = (type, query, point) => {
    const isProtected = type === PROTECTED;
    const layer = isProtected ? protectedAreasFL : communityAreasFL;
    const color = isProtected ? PROTECTED_AREA_COLOR : COMMUNITY_AREA_COLOR;
    layer.queryFeatures(query).then((results) => {
      const { features } = results;
      if (features.length) {
        displayTooltip(point, features[0].attributes, color);
      }
    })
  }

  // set handler on area click
  useEffect(() => {
    if(isLandscapeMode) { view.on("click", onAreaClick) }
  }, [isLandscapeMode, protectedAreasFL, communityAreasFL])

  const displayTooltip = (point, content, color) => {
    view.popup.autoCloseEnabled = true;
    view.popup.open({
      location: point,
      content: `
        <p class="tooltip-container">${tooltipDot(color)}${areaNameTooltip(content.NAME)}</p>${areaSizeTooltip(content.REP_AREA.toFixed(2))}`
    })
  }
  return null
}

export default ProtectedAreasTooltips;
