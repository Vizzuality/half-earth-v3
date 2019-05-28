import { connect } from 'react-redux';
import Component from './human-presure-widget-component';

import mapStateToProps from './human-pressure-selectors';

export default connect(mapStateToProps, null)(Component);