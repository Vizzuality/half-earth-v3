import { createSelector } from 'reselect';

export const getQuery = ({ location }) => location.query || null;

export const getActiveLayers = createSelector(
  getQuery, query => {
    if (!query || !query.activeLayers) return null;
    return query.activeLayers;
  }
)
