import { connect } from 'react-redux';
import { createAction } from 'redux-tools';
import { FEATURED, DATA } from 'router';

import Component from './experiences-component';

const switchToFeature = createAction(FEATURED);
const switchToExpert = createAction(DATA);

const actions = { switchToFeature, switchToExpert };

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
  queryParams: location.query
});



export default connect(mapStateToProps, actions)(Component);