import { connect } from 'react-redux';
import conservationEffortsActions from 'redux_modules/conservation-efforts';

import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';

import Component from './conservation-efforts-widget-component';
import mapStateToProps from './conservation-efforts-widget-selectors';

const actions = { ...conservationEffortsActions, addLayerAnalyticsEvent, removeLayerAnalyticsEvent };

export default connect(mapStateToProps, actions)(Component);