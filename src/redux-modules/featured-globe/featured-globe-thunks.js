import { setFeaturedGlobeLoading, setFeaturedGlobeReady, setFeaturedGlobeError } from './featured-globe-actions';
import './featured-globe';
const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;


export default async function featuredGlobeThunk(dispatch, getState) {
  const { data } = getState().featuredGlobeSpec;
  if (!data) {
    dispatch(setFeaturedGlobeLoading());
    try {
      // This API call fetches Arcgis js Web Scene Specification for the given item
      const dataGlobe = await fetch(`https://www.arcgis.com/sharing/rest/content/items/${SCENE_ID}/data?f=json`).then(response => response.json());
      dispatch(setFeaturedGlobeReady(dataGlobe));
    } catch (e) {
      console.warn(e);
      dispatch(setFeaturedGlobeError(e));
    }
  }
}


