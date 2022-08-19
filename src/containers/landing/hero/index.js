import * as actions from 'actions/url-actions';
import { connect } from 'react-redux';
import Hero from './hero-component';

export default connect(null, actions)(Hero);
