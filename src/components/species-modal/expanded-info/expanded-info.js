import React from 'react';
import Component from './expanded-info-component';
import useSWR from 'swr';

const ExpandedInfoContainer = (props) => {
  const { speciesName } = props;
  if (!speciesName) return null;

  const fetcher = (url) => (
    fetch(url).then((res) => res.json())
  );
  const { data, error } = useSWR(
    `https://api.mol.org/1.x/species/info?scientificname=${speciesName}`,
    fetcher
  );

  return <Component {...props} data={data} error={error}/>;
};

export default ExpandedInfoContainer;