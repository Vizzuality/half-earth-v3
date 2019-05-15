import { connect } from 'react-redux';
import Component from './landscape-view-manager-component';
// This import forces the registering of the module
import 'redux_modules/grid-cell-data';
import * as actions from 'redux_modules/grid-cell-data/grid-cell-data-actions';

export default connect(null, actions)(Component);

