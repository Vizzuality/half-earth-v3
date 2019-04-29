import { createStructuredSelector } from 'reselect';
import { getQuery, getActiveLayers } from 'selectors/location-selectors';

export default createStructuredSelector({
  query: getQuery,
  activeLayers: getActiveLayers
})