
import { connect } from 'react-redux';
import Component from './legend-component';
import mapStateToProps from './legend-selectors';

export default connect(mapStateToProps, null)(Component);