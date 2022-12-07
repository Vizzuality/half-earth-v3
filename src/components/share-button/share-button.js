import { connect } from 'react-redux';

import { openShareModalAnalyticsEvent } from 'actions/google-analytics-actions';

import Component from './share-button-component';

const actions = { openShareModalAnalyticsEvent };

export default connect(null, actions)(Component);
