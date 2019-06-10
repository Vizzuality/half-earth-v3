import { connect } from 'react-redux';
import Component from './landscape-view-manager-component';
// This import forces the registering of the module
import 'redux_modules/grid-cell-data';
import 'redux_modules/geo-description';

import * as actions from 'redux_modules/grid-cell-data/grid-cell-data-actions';
import { clearGeoDescription, fetchGeoDescription } from 'redux_modules/geo-description/geo-description-actions';

export default connect(null, { ...actions, clearGeoDescription, fetchGeoDescription })(Component);
