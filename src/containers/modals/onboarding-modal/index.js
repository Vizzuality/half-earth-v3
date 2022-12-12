import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import OnboardingModal from './component';

export default connect(null, actions)(OnboardingModal);
