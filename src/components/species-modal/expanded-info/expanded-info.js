import React from 'react';
import Component from './expanded-info-component';
import { useQuery } from '@tanstack/react-query';

const fetcher = (url) => (
  fetch(url).then((res) => res.json())
);

const ExpandedInfoContainer = (props) => {
  const { speciesName } = props;
  if (!speciesName) return null;

  const url = `https://api.mol.org/1.x/species/info?scientificname=${speciesName}`
  const { data, error } = useQuery(
    [url],
    () => fetcher(url)
  );

  return <Component {...props} data={data} error={error}/>;
};

export default ExpandedInfoContainer;
