import { createStructuredSelector, createSelector } from 'reselect';

import { getSidebarTabActive } from 'selectors/ui-selectors';

const selectQueryParams = ({ location }) => location.query;

const getQueryParams = createSelector(
  selectQueryParams,
  (queryParams) => queryParams
);

export default createStructuredSelector({
  sidebarTabActive: getSidebarTabActive,
  queryParams: getQueryParams,
});
