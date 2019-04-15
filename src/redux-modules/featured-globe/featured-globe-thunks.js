import featuredGlobeViewConfig from 'sceneConfigs/featuredGlobeViewConfig';

import { setFeaturedGlobeLoading, setFeaturedGlobeReady, setFeaturedGlobeError } from './featured-globe-actions';

import './featured-globe';

export default async function featuredGlobeThunk(dispatch, getState) {
  const { data } = getState().featuredGlobeSpec;
  if (!data) {
    dispatch(setFeaturedGlobeLoading());
    try {
      // This API call fetches Arcgis js Web Scene Specification for the given item
      const dataGlobe = await fetch(`https://www.arcgis.com/sharing/rest/content/items/${featuredGlobeViewConfig.id}/data?f=json`).then(response => response.json());
      dispatch(setFeaturedGlobeReady(dataGlobe));
    } catch (e) {
      console.warn(e);
      dispatch(setFeaturedGlobeError(e));
    }
  }
}


