import React from 'react';
import { connect } from 'react-redux';
import { exploreCountryFromSearch } from 'actions/google-analytics-actions';
import urlActions from 'actions/url-actions';
import Component from './data-global-sidebar-component.jsx';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { LOCAL_SCENE } from 'constants/scenes-constants';
import countrySceneConfig from 'scenes/country-scene/country-scene-config';

const actions = { exploreCountryFromSearch,...urlActions };

const SearchWidget = (props) => {
  const { changeGlobe, changeUI } = props;

  const postSearchCallback = ({result}) => {
    const { feature: { attributes: { GID_0, NAME_0 }}} = result;
    if (GID_0) {
        changeGlobe({ countryISO: GID_0, countryName: NAME_0, activeLayers: countrySceneConfig.globe.activeLayers })
        changeUI({ sceneMode: LOCAL_SCENE })
        exploreCountryFromSearch({countryName:NAME_0})
    }
  }

  const searchSources = (FeatureLayer, Locator) => (
    [
      {
        layer: new FeatureLayer({
          url: LAYERS_URLS[COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER],
          title: COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER,
        }),
        outFields: ["*"],
        searchFields: ["GID_0", "NAME_0"],
        name: "Explore countries",
        maxSuggestions: 10
      },
      {
        locator: new Locator("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"),
        singleLineFieldName: "SingleLine",
        outFields: ["Addr_type"],
        categories: ['District', 'City', 'Metro Area','Subregion', 'Region', 'Territory', 'Water Features', 'Land Features', 'Nature Reserve'],
        name: "other geographic results"
      }
    ]
  )

  const searchWidgetConfig = {
    postSearchCallback,
    searchSources
  }

  return (
    <Component
      searchWidgetConfig={searchWidgetConfig}
      {...props}
    />
  );
}

export default connect(null, actions)(SearchWidget);
