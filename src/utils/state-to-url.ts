import { omit } from 'lodash';

import qs from 'qs';
import { Location } from 'redux-first-router';
import { GetState } from 'store/store';

export const decodeUrlForState = (url: string) => {
  const paramsParsed = {};
  const params = qs.parse(url);
  Object.keys(params).forEach((key) => {
    try {
      paramsParsed[key] = JSON.parse(String(params[key])) as string;
    } catch (err) {
      paramsParsed[key] = params[key];
    }
  });
  return paramsParsed;
};

export const encodeStateForUrl = (params: {
  key: string | { key: string | object };
}) => {
  const paramsParsed = {};
  Object.keys(params).forEach((key) => {
    if (typeof params[key] === 'object') {
      paramsParsed[key] = JSON.stringify(params[key]);
    } else {
      paramsParsed[key] = params[key] as string;
    }
  });
  return qs.stringify(paramsParsed);
};

export const setComponentStateToUrl = ({
  key,
  subKey,
  change,
  state,
}: {
  key: string;
  subKey?: string;
  change: unknown;
  state: GetState;
}) => {
  const {
    location: { query, payload, type },
  }: { location: Location } = state();
  let params = change;
  if (query && query[subKey || key] && !!change && typeof change === 'object') {
    params = {
      ...query[subKey || key],
      ...change,
    };
  }

  // if a false value is sent we should remove the key from the url
  const cleanLocationQuery =
    !change && query ? omit(query, [subKey || key]) : query;
  return {
    key,
    type,
    payload,
    query: {
      ...cleanLocationQuery,
      ...(params && {
        [subKey || key]: params,
      }),
    },
  };
};
