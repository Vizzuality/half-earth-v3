import { useEffect } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import * as urlActions from 'actions/url-actions';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';

const actions = {...urlActions}

const CountriesBordersLayerContainer = ({ view, changeGlobe, countryTooltip, highlightedCountryIso }) => {
  const getBordersLayer = (results) => {
    if (!results.length) return null;
    return results.find(result => result.graphic.layer.id === COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER)
  }
  
  const onClickHandler = (bordersLayer) => {
    if (bordersLayer) {
      changeGlobe({countryTooltip: null});
      const { graphic } = bordersLayer;
      const { attributes } = graphic;
      if (!countryTooltip || countryTooltip !== attributes.GID_0) {
        view.goTo(graphic.geometry)
        changeGlobe({countryTooltip: attributes.GID_0, countryName: attributes.NAME_0});
      } 
    } else if (countryTooltip) {
      console.log('outside labels layer')
      changeGlobe({countryTooltip: null});
    }
  }

  const onHoverHandler = bordersLayer => {
    if (bordersLayer) {
      const { graphic } = bordersLayer;
      const { attributes } = graphic;
      document.body.style.cursor = 'pointer';
      changeGlobe({highlightedCountryIso: attributes.GID_0});
    } else if (highlightedCountryIso) {
      document.body.style.cursor = 'default';
      changeGlobe({highlightedCountryIso: null});
    }
  }

const onLabelEvent = (event) => {
  event.stopPropagation();
  view.hitTest(event).then( response => {
    const { results } = response;
    const bordersLayer = getBordersLayer(results);
    switch (event.type) {
      case 'pointer-move':
        onHoverHandler(bordersLayer);
        break;
      case 'click':
        onClickHandler(bordersLayer);
        break;
      default: return;
    }
  })
}

  useEffect(() => {
    const eventHandler = view.on("click", onLabelEvent);
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [])

  useEffect(() => {
    const eventHandler = view.on("pointer-move",
    debounce(
      onLabelEvent,
      55,
      {leading: true, trailing: true}
      )
    );
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [highlightedCountryIso])


  return null;
}

export default connect(null, actions)(CountriesBordersLayerContainer);