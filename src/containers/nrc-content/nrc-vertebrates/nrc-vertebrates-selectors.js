import { createStructuredSelector } from 'reselect';

import { getCountryData } from 'selectors/nrc-selectors';

import { getOnboardingType } from 'containers/onboarding/onboarding-selectors';

export default createStructuredSelector({
  countryData: getCountryData,
  onboardingType: getOnboardingType,
});
