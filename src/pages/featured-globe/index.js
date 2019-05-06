import { connect } from 'react-redux';
import Component from './featured-globe-component.jsx';
import mapStateToProps from './featured-globe-selectors';

import ownActions from './featured-globe-actions.js';

export default connect(mapStateToProps, ownActions)(Component);