import { connect } from 'react-redux';
import Component from './featured-maps-list-component';
import mapStateToProps from './featured-maps-list-selectors';


export default connect(mapStateToProps, null)(Component);