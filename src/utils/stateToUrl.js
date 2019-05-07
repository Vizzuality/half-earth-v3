import qs from 'qs';
import { omit } from 'lodash';

export const decodeUrlForState = url => {
  const paramsParsed = {};
  const params = qs.parse(url);
  Object.keys(params).forEach(key => {
    try {
      paramsParsed[key] = JSON.parse(atob(params[key]));
    } catch (err) {
      paramsParsed[key] = params[key];
    }
  });
  return paramsParsed;
};

export const encodeStateForUrl = params => {
  const paramsParsed = {};
  Object.keys(params).forEach(key => {
    if (typeof params[key] === 'object') {
      paramsParsed[key] = btoa(JSON.stringify(params[key]));
    } else {
      paramsParsed[key] = params[key];
    }
  });
  return qs.stringify(paramsParsed);
};

export const setComponentStateToUrl = ({ key, subKey, change, state }) => {
  const { location: { query, payload, type } } = state();
  let params = change;
  if (query && query[subKey || key] && !!change && typeof change === 'object') {
    params = {
      ...query[subKey || key],
      ...change
    };
  }

  // if a false value if sent we should remove the key from the url
  const cleanLocationQuery =
    !change && query ? omit(query, [subKey || key]) : query;
  return {
    key,
    type,
    payload,
    query: {
      ...cleanLocationQuery,
      ...(params && {
        [subKey || key]: params
      })
    }
  };
};