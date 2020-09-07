import Component from './local-species-card-component';
import { connect } from 'react-redux';
import * as actions from 'actions/url-actions';

export default connect(null, actions)(Component);