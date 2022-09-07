/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import mapTooltipActions from 'redux_modules/map-tooltip';

import { AREA_OF_INTEREST } from 'router';

import { useLocale, useT } from '@transifex/react';

// import mapStateToProps from 'selectors/map-tooltip-selectors';

import { aoiAnalyticsActions } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';

import { getSelectedAnalysisLayer, createHashFromGeometry } from 'utils/analyze-areas-utils';

import {
  HALF_EARTH_FUTURE_TILE_LAYER,
  SPECIFIC_REGIONS_TILE_LAYER,
  ADMIN_AREAS_FEATURE_LAYER,
  GADM_0_ADMIN_AREAS_FEATURE_LAYER,
  GADM_1_ADMIN_AREAS_FEATURE_LAYER,
} from 'constants/layers-slugs';
import MAP_TOOLTIP_CONFIG from 'constants/map-tooltip-constants';

import Component from './data-scene-component';
import mapStateToProps from './data-scene-selectors';

const actions = { ...mapTooltipActions, ...urlActions, ...aoiAnalyticsActions };

function Container(props) {
  const {
    mapTooltipData,
    activeLayers,
    setBatchTooltipData,
    browsePage,
    precomputedAoiAnalytics,
    changeUI,
    // categoryActiveLayers,
  } = props;

  const { content: mapTooltipContent, precalculatedLayer } = mapTooltipData;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();

  const locale = useLocale();
  const t = useT();

  const handleHighlightLayerFeatureClick = (features) => {
    if (features && features.length && selectedAnalysisLayer) {
      const tooltipConfig = MAP_TOOLTIP_CONFIG[selectedAnalysisLayer.slug];

      const { title, subtitle, id } = tooltipConfig;
      const { geometry, attributes } = features[0].graphic;

      let customId;
      let customTitle;
      if (selectedAnalysisLayer.slug === HALF_EARTH_FUTURE_TILE_LAYER) {
        // Calculate sha-1 id for future places
        customId = createHashFromGeometry(geometry);
        customTitle = `Priority place ${attributes.cluster}`;
      }
      if (selectedAnalysisLayer.slug === SPECIFIC_REGIONS_TILE_LAYER) {
        // Calculate sha-1 id for specific regions
        customId = `region-${attributes.region}`;
      }

      const getPrecalculatedLayer = (precalculatedAttributes) => {
        if (selectedAnalysisLayer.slug !== ADMIN_AREAS_FEATURE_LAYER) {
          return selectedAnalysisLayer.slug;
        }
        return precalculatedAttributes.GID_1
          ? GADM_1_ADMIN_AREAS_FEATURE_LAYER
          : GADM_0_ADMIN_AREAS_FEATURE_LAYER;
      };

      setBatchTooltipData({
        isVisible: true,
        geometry,
        precalculatedLayer: getPrecalculatedLayer(attributes),
        content: {
          buttonText: t('analyze area'),
          id: customId || attributes[id],
          title: customTitle || attributes[title],
          subtitle: attributes[subtitle],
          objectId: attributes.OBJECTID, // Only for feature places
          percentage_protected: Math.round(attributes.percentage_protected) || 100,
          // 100 is for protected areas
          description:
            attributes.DESIG && `${attributes.DESIG}, ${attributes.STATUS.toLowerCase()} t('in') ${attributes.STATUS_}`,
          nspecies: attributes.nspecies,
          status: attributes.STATUS,
          status_year: attributes.STATUS_,
          IUCN_type: attributes.IUCN_CA,
          designation_type: attributes.DESIG_T,
        },
      });
    }
  };

  const handleTooltipActionButtonClick = () => {
    const { title } = mapTooltipContent;
    precomputedAoiAnalytics(title);
    browsePage({
      type: AREA_OF_INTEREST,
      payload: { id: mapTooltipContent.id },
      query: { precalculatedLayer, OBJECTID: mapTooltipContent.objectId },
    });
    changeUI({ categoryActiveLayers: activeLayers });
  };

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedAnalysisLayer(activeOption);
    // Don't remove locale. Is here to recalculate the titles translation
  }, [activeLayers, locale]);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <Component
      selectedAnalysisLayer={selectedAnalysisLayer}
      handleTooltipActionButtonClick={handleTooltipActionButtonClick}
      handleHighlightLayerFeatureClick={handleHighlightLayerFeatureClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
