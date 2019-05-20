import { connect } from 'react-redux';
import Component from './biodiversity-data-manager-component';

// This import forces the registering of the module
import 'redux_modules/biodiversity-data';

import * as actions from 'redux_modules/biodiversity-data/biodiversity-data-actions';

export default connect(null, actions)(Component);

