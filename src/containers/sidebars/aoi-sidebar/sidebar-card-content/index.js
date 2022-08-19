import React, { useState, useEffect, useMemo } from 'react';
import { useLocale } from '@transifex/react';
import { connect } from 'react-redux';
import Component from './component';
import { AOI_LEGEND_CATEGORIES, getSidebarCardsConfig } from 'constants/analyze-areas-constants';
import { layerManagerToggle, batchToggleLayers } from 'utils/layer-manager-utils';
import * as urlActions from 'actions/url-actions';
import metadataActions from 'redux_modules/metadata';
import metadataConfig from 'constants/metadata';
import ContentfulService from 'services/contentful';

const actions = { ...metadataActions, ...urlActions };

function Container(props) {
  const {
    contextualData,
    toggleType,
    changeGlobe,
    activeLayers,
    cardCategory,
    metadataSlug,
  } = props;

  const locale = useLocale();
  const sidebarCardsConfig = useMemo(() => getSidebarCardsConfig(), [locale]);

  const [selectedLayer, setSelectedLayer] = useState(null);
  const [cardDescription, setCardDescription] = useState(null);
  const [protectedAreasModalOpen, setProtectedAreasModalOpen] = useState(false);
  const { description, title } = sidebarCardsConfig[cardCategory];
  const [metadata, setMetadata] = useState(null);

  // Just to get the sources of each card
  useEffect(() => {
    const md = metadataConfig[metadataSlug];
    ContentfulService.getMetadata(md.slug, locale).then((data) => {
      setMetadata(data);
    });
  }, [locale]);

  useEffect(() => {
    if (Object.keys(contextualData).length > 0) {
      setCardDescription(description(contextualData));
    }
  }, [contextualData]);

  const radioTypeToggle = (option) => {
    if (selectedLayer === option.slug) {
      layerManagerToggle(option.slug, activeLayers, changeGlobe);
      setSelectedLayer(null);
    } else if (selectedLayer) {
      batchToggleLayers([selectedLayer, option.slug], activeLayers, changeGlobe);
      setSelectedLayer(option.slug);
    } else {
      layerManagerToggle(option.slug, activeLayers, changeGlobe);
      setSelectedLayer(option.slug);
    }
  };

  const checkboxTypeToggle = (option) => {
    layerManagerToggle(option.value, activeLayers, changeGlobe);
  };

  const handleAllProtectedAreasClick = () => {
    setProtectedAreasModalOpen(true);
  };

  const handleProtectedAreasModalToggle = () => {
    setProtectedAreasModalOpen(!protectedAreasModalOpen);
  };
  return (
    <Component
      cardTitle={title}
      cardDescription={cardDescription}
      hasLegend={AOI_LEGEND_CATEGORIES.some((c) => c === cardCategory)}
      onChange={toggleType === 'radio' ? radioTypeToggle : checkboxTypeToggle}
      handleAllProtectedAreasClick={handleAllProtectedAreasClick}
      handleProtectedAreasModalToggle={handleProtectedAreasModalToggle}
      isProtectedAreasModalOpen={protectedAreasModalOpen}
      metadata={metadata}
      {...props}
    />
  );
}

export default connect(null, actions)(Container);
