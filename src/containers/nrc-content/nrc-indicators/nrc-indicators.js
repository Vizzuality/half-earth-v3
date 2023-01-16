import { connect } from 'react-redux';

import Component from './nrc-indicators-component';
import mapStateToProps from './nrc-indicators-selectors';

export default connect(mapStateToProps, null)(Component);
