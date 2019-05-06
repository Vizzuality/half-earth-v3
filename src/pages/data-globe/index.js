import { connect } from 'react-redux';
import Component from './data-globe-component.jsx';

import ownActions from './data-globe-actions.js';

export default connect(null, ownActions)(Component);