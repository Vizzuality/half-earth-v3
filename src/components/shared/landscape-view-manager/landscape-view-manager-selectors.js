import { createStructuredSelector } from 'reselect';
import { getQuery, getLandscapeModeParam } from 'selectors/location-selectors';

export default createStructuredSelector({
  query: getQuery,
  isLandscapeMode: getLandscapeModeParam
})