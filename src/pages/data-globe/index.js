import { connect } from 'react-redux';
import Component from './data-globe-component.jsx';
import mapStateToProps from './data-globe-selectors';

import ownActions from './data-globe-actions.js';

export default connect(mapStateToProps, ownActions)(Component);