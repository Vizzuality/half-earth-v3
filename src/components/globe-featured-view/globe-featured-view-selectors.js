import { createStructuredSelector } from 'reselect';
import { getActiveLayers, getFeaturedGlobeSpec, getFeaturedGlobeLayers } from 'selectors/layers-selectors';

const getQuery = ({ location }) => location.query || null;

export default createStructuredSelector({
  query: getQuery,
  layerSpec: getFeaturedGlobeSpec,
  sceneLayers: getFeaturedGlobeLayers,
  activeLayers: getActiveLayers
})