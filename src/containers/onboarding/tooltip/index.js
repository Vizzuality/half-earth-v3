import * as actions from 'actions/url-actions';
import { connect } from 'react-redux';
import OnboardingTooltip from './onboarding-tooltip-component';
import mapStateToProps from '../onboarding-selectors';

export default connect(mapStateToProps, actions)(OnboardingTooltip);
