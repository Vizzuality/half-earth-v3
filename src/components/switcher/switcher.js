import { connect } from 'react-redux';

import Component from './switcher-component';
import { changeMapSceneAnalyticsEvent } from 'actions/google-analytics-actions';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type]
});

export default connect(mapStateToProps, { changeMapSceneAnalyticsEvent })(
  Component
);