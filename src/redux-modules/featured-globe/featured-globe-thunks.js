import reducerRegistry from 'reducerRegistry';
import { setFeaturedGlobeLoading, setFeaturedGlobeReady, setFeaturedGlobeError } from './featured-globe-actions';
import { reduxConfig } from './featured-globe';

export default async function featuredGlobeThunk(dispatch, getState) {
  // Register reducer to have the featuredGlobeSpec available on the store in case it is not registered
  if (!getState().featuredGlobeSpec) { reducerRegistry.registerModule('featuredGlobeSpec', reduxConfig) };
  const { data } = getState().featuredGlobeSpec;
  if (!data) {
    dispatch(setFeaturedGlobeLoading());
    try {
      // This API call fetches Arcgis js Web Scene Specification for the given item
      const dataGlobe = await fetch('https://www.arcgis.com/sharing/rest/content/items/f430e65f20bc47ff846c9c9853fe855b/data?f=json').then(response => response.json());
      dispatch(setFeaturedGlobeReady(dataGlobe));
    } catch (e) {
      console.warn(e);
      dispatch(setFeaturedGlobeError(e));
    }
  }
}


