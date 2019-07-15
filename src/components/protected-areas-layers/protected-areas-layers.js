import Component from './protected-areas-layers-component';
import { connect } from 'react-redux';
import { addLayerAnalyticsEvent, removeLayerAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { addLayerAnalyticsEvent, removeLayerAnalyticsEvent };
export default  connect(null, actions)(Component);