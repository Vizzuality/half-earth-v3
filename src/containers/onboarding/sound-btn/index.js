import * as actions from 'actions/url-actions';
import { connect } from 'react-redux';
import SoundButton from './sound-btn-component';

import mapStateToProps from './sound-btn-selectors';

export default connect(mapStateToProps, actions)(SoundButton);
