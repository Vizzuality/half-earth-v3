import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';
import Component from './country-labels-layer-component';


const CountryLabelsLayerContainer = props => {
  const { view, changeGlobe } = props;

  const getLabelsLayer = (results) => {
    if (!results.length) return null;
    return results.find(result => result.graphic.layer.id === COUNTRIES_LABELS_FEATURE_LAYER)
  }

  const onClickHandler = labelsLayer => {
    if (labelsLayer) {
      const { graphic } = labelsLayer;
      const { attributes } = graphic;
      changeGlobe({countryISO: attributes.GID_0});
    }
  }

  const onHoverHandler = labelsLayer => {
    if (labelsLayer) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }
  }

const onLabelEvent = (event) => {
  event.stopPropagation();
  view.hitTest(event).then( response => {
    const { results } = response;
    const labelsLayer = getLabelsLayer(results);
    switch (event.type) {
      case 'pointer-move':
        onHoverHandler(labelsLayer);
        break;
      case 'click':
        onClickHandler(labelsLayer);
        break;
      default: return;
    }
  })
}


  useEffect(() => {
    const eventHandler = view.on("click", onLabelEvent)
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [])

  useEffect(() => {
    const eventHandler = view.on("pointer-move", onLabelEvent);
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [])


  return <Component {...props}/>
}

export default connect(null, urlActions)(CountryLabelsLayerContainer);