import { setDataGlobeLoading, setDataGlobeReady, setDataGlobeError } from './data-globe-actions';

export async function dataGlobeThunk(dispatch, getState) {
  const { data } = getState().dataGlobeSpec;
  if (!data) {
    dispatch(setDataGlobeLoading());
    try {
      const dataGlobe = await fetch('https://www.arcgis.com/sharing/rest/content/items/f430e65f20bc47ff846c9c9853fe855b/data?f=json').then(response => response.json());
      dispatch(setDataGlobeReady(dataGlobe));
    } catch (e) {
      console.warn(e);
      dispatch(setDataGlobeError(e));
    }
  }
}