import { connect } from 'react-redux'
import Component from './globe-data-view-component.jsx';
import mapStateToProps from './globe-data-view-selectors';
import * as actions from 'router/router-actions.js';

export default connect(mapStateToProps, actions)(Component);