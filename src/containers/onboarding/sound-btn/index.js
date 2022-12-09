import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import SoundButton from './sound-btn-component';
import mapStateToProps from './sound-btn-selectors';

export default connect(mapStateToProps, actions)(SoundButton);
