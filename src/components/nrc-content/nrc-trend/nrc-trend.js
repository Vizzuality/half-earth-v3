import { connect } from 'react-redux';

import Component from './nrc-trend-component';
import mapStateToProps from './nrc-trend-selectors';

export default connect(mapStateToProps, null)(Component);
