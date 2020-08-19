import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import * as urlActions from 'actions/url-actions';
import { COUNTRIES_LABELS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LOCAL_SCENE, DATA_SCENE } from 'constants/scenes-constants';
import countrySceneConfig from 'scenes/country-scene/country-scene-config';
import Component from './country-labels-layer-component';
import close from 'icons/close.svg';

const actions = {...urlActions}

const CountryLabelsLayerContainer = props => {
  const { view, changeGlobe, changeUI, countryISO, sceneMode, countryName } = props;

  const handleSceneModeChange = () => {
    changeGlobe({ activeLayers: countrySceneConfig.globe.activeLayers })
    changeUI({ sceneMode: sceneMode === DATA_SCENE ? LOCAL_SCENE : DATA_SCENE })
  };

  const getLabelsLayer = (results) => {
    if (!results.length) return null;
    return results.find(result => result.graphic.layer.id === COUNTRIES_LABELS_FEATURE_LAYER)
  }
  
  const onClickHandler = (labelsLayer, point) => {
    if (labelsLayer) {
      const { graphic } = labelsLayer;
      const { attributes } = graphic;
      if (!countryISO || countryISO !== attributes.GID_0) {
        const flagSrc = `${process.env.PUBLIC_URL}/flags/${attributes.GID_0}.svg`;
        changeGlobe({countryISO: attributes.GID_0, countryName: attributes.NAME_0});
        if (view.popup) view.popup.close();
        displayTooltip(point, attributes.NAME_0, flagSrc);
      } 
    } else if (view.popup.visible === true) {
      view.popup.close();
      changeGlobe({countryISO: null, countryName: null});
    }
  }

  const onHoverHandler = labelsLayer => {
    if (labelsLayer) {
      const { graphic } = labelsLayer;
      const { attributes } = graphic;
      document.body.style.cursor = 'pointer';
      changeGlobe({highlightedCountryIso: attributes.GID_0});
    } else if (!countryName) {
      document.body.style.cursor = 'default';
      changeGlobe({highlightedCountryIso: null});
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
        const point = view.toMap(event);
        onClickHandler(labelsLayer, point);
        break;
      default: return;
    }
  })
}
const displayTooltip = (point, country, flagSrc) => {
  view.goTo({target: point}).then(() => {
    view.popup.open({
      location: point,
      content: setTooltipContent(country, flagSrc)
    })
  }).catch(() => {
    view.popup.open({
      location: point,
      content: setTooltipContent(country, flagSrc)
    })
  })
}

const setTooltipContent = (country, flagSrc) => {
  const container = document.createElement("div");
  const section = document.createElement("section");
  const flag = document.createElement("img");
  const closeButton = document.createElement("img");
  const countryName = document.createElement("span");
  const button = document.createElement("button");
  container.className = "tooltip-country-container";
  section.className = "tooltip-country-section";
  flag.className = "tooltip-country-flag";
  closeButton.className = "tooltip-country-close";
  countryName.className = "tooltip-country-name";
  button.className = "tooltip-country-explore";
  flag.src = flagSrc;
  closeButton.src = close;
  flag.alt = "";
  countryName.innerText = country;
  button.innerText = 'explore';
  container.appendChild(section);
  section.appendChild(flag);
  section.appendChild(countryName);
  container.appendChild(button);
  container.appendChild(closeButton);

  button.onclick = handleSceneModeChange;
  closeButton.onclick = () => {
    view.popup.close();
    changeGlobe({countryISO: null, countryName: null})
  }

  return container;
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
      150,
      {leading: true, trailing: true}
      )
    );
    return function cleanUp() {
      eventHandler && eventHandler.remove();
    }
  }, [])


  return <Component {...props}/>
}

export default connect(null, actions)(CountryLabelsLayerContainer);