import { connect } from 'react-redux';
import Component from './landscape-view-manager-component';
import mapStateToProps from './landscape-view-manager-selectors';

export default connect(mapStateToProps, null)(Component);

