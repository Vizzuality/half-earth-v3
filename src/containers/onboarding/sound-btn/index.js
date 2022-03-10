import * as actions from 'actions/url-actions';
import { connect } from 'react-redux';
import SoundButton from './sound-btn-component';


export default connect(null, actions)(SoundButton);
