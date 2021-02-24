import Component from './component.jsx';
import { connect } from 'react-redux';
import mapStateToProps from 'components/local-scene-sidebar/local-scene-sidebar-selectors';

export default connect(mapStateToProps, null)(Component);
