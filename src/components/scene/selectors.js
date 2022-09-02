import { createSelector, createStructuredSelector } from 'reselect';

import { selectPathname } from 'selectors/location-selectors';

import {
  routes, DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING,
} from 'router';

const getIsGlobesMenuPages = createSelector(
  selectPathname,
  (pathname) => {
    const isGlobePages = (pathname === routes[FEATURED].path)
    || (pathname === routes[NATIONAL_REPORT_CARD_LANDING].path)
    || (pathname === routes[DATA].path);
    if (isGlobePages) return true;
    return false;
  },
);

export default createStructuredSelector({
  isGlobesMenuPages: getIsGlobesMenuPages,
});
