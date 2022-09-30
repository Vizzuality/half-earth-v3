import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import { layerToggleAnalytics } from 'actions/google-analytics-actions';

import { bringLayerToFront, bringLayerToBack } from 'utils/layer-manager-utils';

import { GROUPED_OPTIONS } from 'constants/biodiversity-layers-constants';

import Component from './component';

const actions = { ...metadataActions, layerToggleAnalytics };

function BiodiversityLayerToggle(props) {
  const { map, layers } = props;
  const locale = useLocale();

  const handleInfoClick = (option) => {
    const { setModalMetadata } = props;
    setModalMetadata({
      slug: `${option.slug || option.value}`,
      locale,
      title: `${option.metadataTitle || option.name} metadata`,
      isOpen: true,
    });
  };

  const handleBringToBackClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToBack(layer, map);
  };

  const handleBringToFrontClick = (e, layer) => {
    e.stopPropagation();
    bringLayerToFront(layer, map);
  };

  const parsedGroupOptions = useMemo(() => {
    const groupedOptions = GROUPED_OPTIONS(layers);
    const groupedOptionsMultiple = groupedOptions
      .filter((o) => !!o.options.length)
      .find((o) => o.options.length > 1);

    if (!groupedOptionsMultiple) {
      return groupedOptions.map((go) => {
        return {
          ...go,
          label: null,
        };
      });
    }
    return groupedOptions;
  }, [layers]);

  return (
    <Component
      handleInfoClick={handleInfoClick}
      handleBringToBackClick={handleBringToBackClick}
      handleBringToFrontClick={handleBringToFrontClick}
      groupedOptions={parsedGroupOptions}
      {...props}
    />
  );
}

export default connect(null, actions)(BiodiversityLayerToggle);
