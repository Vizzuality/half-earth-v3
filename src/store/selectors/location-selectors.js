import { createSelector } from 'reselect';

import { routes, DATA, FEATURED, NATIONAL_REPORT_CARD_LANDING } from 'router';

export const selectQuery = ({ location }) => location.query || null;
export const selectGlobeUrlState = ({ location }) =>
  location.query && (location.query.globe || {});
export const selectUiUrlState = ({ location }) =>
  location.query && (location.query.ui || {});
export const selectLangUrlState = ({ location }) =>
  location.query && (location.query.lang || 'en');
export const selectPathname = ({ location }) => location.pathname || null;

export const getIsGlobesMenuPages = createSelector(
  selectPathname,
  (pathname) => {
    const isGlobePages =
      pathname === routes[FEATURED].path ||
      pathname === routes[NATIONAL_REPORT_CARD_LANDING].path ||
      pathname === routes[DATA].path;
    if (isGlobePages) return true;
    return false;
  }
);

export const getPathname = createSelector(
  selectPathname,
  (pathname) => pathname
);
