// Docs for Search ui widget
//https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Search.html
import React from 'react';
import { connect } from 'react-redux';
import { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent } from 'actions/google-analytics-actions';
import { changeGlobe } from 'actions/url-actions';
import SearchWidgetComponent from './search-widget-component';
import { COUNTRIES_GENERALIZED_BORDERS_FEATURE_LAYER } from 'constants/layers-slugs';
import { LAYERS_URLS } from 'constants/layers-urls';
import { useSearchWidgetLogic } from 'hooks/esri';

const actions = { openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent, changeGlobe };

const SearchWidget = ({ view, openPlacesSearchAnalyticsEvent, searchLocationAnalyticsEvent, changeGlobe }) => {

  const postSearchCallback = ({result}) => {
    const { feature: { attributes: { GID_0, NAME_0 }}} = result;
    if (GID_0) {
      changeGlobe({countryISO: GID_0, countryName: NAME_0});
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

  const { handleOpenSearch, handleCloseSearch, searchWidget } = useSearchWidgetLogic(
    view,
    openPlacesSearchAnalyticsEvent,
    searchLocationAnalyticsEvent,
    searchWidgetConfig
  );

  return (
    <SearchWidgetComponent
      handleOpenSearch={handleOpenSearch}
      handleCloseSearch={handleCloseSearch}
      showCloseButton={!!searchWidget}
    />
  );
}

export default connect(null, actions)(SearchWidget);
