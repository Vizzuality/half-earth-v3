import { connect } from 'react-redux'
import Component from './globe-featured-view-component.jsx';
import mapStateToProps from './globe-feature-view-selectors';
import * as actions from 'router/router-actions.js';



export default connect(mapStateToProps, actions)(Component);