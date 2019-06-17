import { connect } from 'react-redux';
import Component from './grid-layer-component';

import actions from 'redux_modules/grid-cell-data';

export default connect(null, actions)(Component);