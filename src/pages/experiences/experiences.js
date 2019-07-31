import { connect } from 'react-redux';
import { createAction } from 'redux-tools';
import { FEATURED, DATA } from 'router';

import Component from './experiences-component';

export const switchToFeature = createAction(FEATURED);
export const switchToExpert = createAction(DATA);

const actions = { switchToFeature, switchToExpert };

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type]
});



export default connect(mapStateToProps, actions)(Component);