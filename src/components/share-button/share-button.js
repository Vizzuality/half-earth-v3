import Component from './share-button-component';
import { connect } from 'react-redux';
import { openShareModalAnalyticsEvent } from 'actions/google-analytics-actions';

const actions = { openShareModalAnalyticsEvent };

export default connect(null, actions)(Component);
