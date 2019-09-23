import { connect } from 'react-redux';
import mapStateToProps from './data-globe-selectors';
import Component from './data-globe-simple-component.jsx';
export default connect(mapStateToProps, null)(Component);