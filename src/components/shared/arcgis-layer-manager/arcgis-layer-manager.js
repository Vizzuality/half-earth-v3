import { connect } from 'react-redux';
import Component from './arcgis-layer-manager-component';
import mapStateToProps from './arcgis-layer-manager-selectors';

export default connect(mapStateToProps, null)(Component);