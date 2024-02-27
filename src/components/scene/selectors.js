import { createStructuredSelector } from 'reselect';

import { getIsGlobesMenuPages } from 'selectors/location-selectors';

const selectCenterOn = ({ location }) =>
  (location.query && location.query.centerOn) || null;

export default createStructuredSelector({
  isGlobesMenuPages: getIsGlobesMenuPages,
  centerOn: selectCenterOn,
});
