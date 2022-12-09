import { connect } from 'react-redux';

import * as actions from 'actions/url-actions';

import mapStateToProps from '../onboarding-selectors';

import OnboardingTooltip from './onboarding-tooltip-component';

export default connect(mapStateToProps, actions)(OnboardingTooltip);
