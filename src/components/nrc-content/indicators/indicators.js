import { connect } from 'react-redux';

import Component from './indicators-component';
import mapStateToProps from './indicators-selectors';

export default connect(mapStateToProps, null)(Component);
