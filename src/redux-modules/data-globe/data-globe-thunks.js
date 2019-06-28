import { setDataGlobeLoading, setDataGlobeReady, setDataGlobeError } from './data-globe-actions';
import './data-globe';
const { REACT_APP_DATA_GLOBE_SCENE_ID: SCENE_ID } = process.env;

export default async function dataGlobeThunk(dispatch, getState) {
  const { data } = getState().dataGlobeSpec;
  if (!data) {
    dispatch(setDataGlobeLoading());
    try {
      // This API call fetches Arcgis js Web Scene Specification for the given item
      const dataGlobe = await fetch(`https://www.arcgis.com/sharing/rest/content/items/${SCENE_ID}/data?f=json`).then(response => response.json());
      dispatch(setDataGlobeReady(dataGlobe));
    } catch (e) {
      console.warn(e);
      dispatch(setDataGlobeError(e));
    }
  }
}


