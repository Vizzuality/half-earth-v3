import { connect } from 'react-redux';
import Component from './geo-description-widget-component';
import mapStateToProps from './geo-description-widget-selectors';
import * as actions from 'actions/url-actions';

// this forces the registration of redux module and sagas
import 'redux_modules/geo-description';

export default connect(mapStateToProps, actions)(Component);
