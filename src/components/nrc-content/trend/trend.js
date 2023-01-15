import { connect } from 'react-redux';

import Component from './trend-component';
import mapStateToProps from './trend-selectors';

export default connect(mapStateToProps, null)(Component);
