import { useQuery } from '@tanstack/react-query';

import Component from './expanded-info-component';
const { VITE_APP_MOL_API } = import.meta.env;

const fetcher = (url) => fetch(url).then((res) => res.json());

function ExpandedInfoContainer(props) {
  const { speciesName } = props;
  if (!speciesName) return null;

  const url = `${VITE_APP_MOL_API}/species/info?scientificname=${speciesName}`;
  const { data, error } = useQuery([url], () => fetcher(url));

  return <Component {...props} data={data} error={error} />;
}

export default ExpandedInfoContainer;
