/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';
import uiActions from 'redux_modules/ui';

import { AREA_OF_INTEREST } from 'router';

import { useT } from '@transifex/react';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import { createHashFromGeometry } from 'utils/analyze-areas-utils';
import { getTooltipContent } from 'utils/tooltip-utils';

import intersectionBy from 'lodash/intersectionBy';
import unionBy from 'lodash/unionBy';

import { CATEGORY_LAYERS } from 'constants/category-layers-constants';
import {
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';
import { getSidebarTabs } from 'constants/ui-params';

import Component from './data-scene-component';
import mapStateToProps from './data-scene-selectors';

const actions = {
  ...mapTooltipActions,
  ...urlActions,
  ...aoiAnalyticsActions,
  ...uiActions,
};

function Container(props) {
  const {
    mapTooltipData,
    activeLayers,
    setBatchTooltipData,
    browsePage,
    precomputedAoiAnalytics,
    changeUI,
    activeCategoryLayers,
    sidebarTabActive,
    selectedAnalysisLayer,
  } = props;
  const { content: mapTooltipContent, precalculatedLayerSlug } = mapTooltipData;
  const [mapLayerTab, analyzeAreasTab] = getSidebarTabs();

  const activeLayersWithoutAdmin = activeLayers.filter(
    (ual) => ual.title !== ADMIN_AREAS_FEATURE_LAYER
  );
  const [updatedActiveLayers, setUpdatedActiveLayers] = useState(
    activeLayersWithoutAdmin
  );

  useEffect(() => {
    const adminLayerIsActive = !!updatedActiveLayers.find(
      (ual) => ual.title === ADMIN_AREAS_FEATURE_LAYER
    );

    if (sidebarTabActive === mapLayerTab.slug && adminLayerIsActive) {
      setUpdatedActiveLayers(
        updatedActiveLayers.filter(
          (ual) => ual.title !== ADMIN_AREAS_FEATURE_LAYER
        )
      );
    }
    if (sidebarTabActive === analyzeAreasTab.slug && !adminLayerIsActive) {
      setUpdatedActiveLayers([
        ...updatedActiveLayers,
        { title: ADMIN_AREAS_FEATURE_LAYER },
      ]);
    }
  }, [sidebarTabActive, updatedActiveLayers, setUpdatedActiveLayers]);

  const t = useT();

  useEffect(() => {
    // Add temporary activeCategoryLayers to activeLayers at render and reset the param
    if (activeCategoryLayers) {
      setUpdatedActiveLayers(
        unionBy(activeCategoryLayers, activeLayers, 'title')
      );
      changeUI({ activeCategoryLayers: undefined });
    } else {
      setUpdatedActiveLayers(activeLayers);
    }
  }, [activeLayers]);

  const handleHighlightLayerFeatureClick = (features) => {
    if (features && features.length && selectedAnalysisLayer) {
      const tooltipConfig = MAP_TOOLTIP_CONFIG[selectedAnalysisLayer];

      const { title, subtitle, id } = tooltipConfig;
      const { geometry, attributes } = features[0].graphic;
      let customId;
      let customTitle;
      if (selectedAnalysisLayer === HALF_EARTH_FUTURE_TILE_LAYER) {
        // Calculate sha-1 id for future places
        customId = createHashFromGeometry(geometry);
        customTitle = `Priority place ${attributes.cluster}`;
      }
      if (selectedAnalysisLayer === SPECIFIC_REGIONS_TILE_LAYER) {
        // Calculate sha-1 id for specific regions
        customId = `region-${attributes.region}`;
      }

      const getPrecalculatedLayer = (precalculatedAttributes) => {
        if (selectedAnalysisLayer !== ADMIN_AREAS_FEATURE_LAYER) {
          return selectedAnalysisLayer;
        }
        return precalculatedAttributes.GID_1
          ? GADM_1_ADMIN_AREAS_FEATURE_LAYER
          : GADM_0_ADMIN_AREAS_FEATURE_LAYER;
      };

      setBatchTooltipData({
        isVisible: true,
        geometry,
        precalculatedLayerSlug: getPrecalculatedLayer(attributes),
        content: getTooltipContent(
          t,
          attributes,
          id,
          title,
          subtitle,
          customId,
          customTitle
        ),
      });
    }
  };

  const handleTooltipActionButtonClick = () => {
    const { title } = mapTooltipContent;
    precomputedAoiAnalytics(title);
    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: mapTooltipContent.id },
      query: {
        precalculatedLayerSlug,
        OBJECTID: mapTooltipContent.objectId,
      },
    });
    changeUI({
      activeCategoryLayers: intersectionBy(
        updatedActiveLayers,
        CATEGORY_LAYERS,
        'title'
      ),
    });
  };

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      handleTooltipActionButtonClick={handleTooltipActionButtonClick}
      handleHighlightLayerFeatureClick={handleHighlightLayerFeatureClick}
      updatedActiveLayers={updatedActiveLayers}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
