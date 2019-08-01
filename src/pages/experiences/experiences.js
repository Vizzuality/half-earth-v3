import { connect } from 'react-redux';
import { createAction } from 'redux-tools';
import { FEATURED, DATA } from 'router';

import Component from './experiences-component';
import mapStateToProps from './experiences-selectors';

const switchToFeature = createAction(FEATURED);
const switchToExpert = createAction(DATA);

const actions = { switchToFeature, switchToExpert };

export default connect(mapStateToProps, actions)(Component);