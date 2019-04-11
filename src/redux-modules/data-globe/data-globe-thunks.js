import { setDataGlobeLoading, setDataGlobeReady, setDataGlobeError } from './data-globe-actions';

export default async function dataGlobeThunk(dispatch, getState) {
  const { data } = getState().dataGlobeSpec;
  if (!data) {
    dispatch(setDataGlobeLoading());
    try {
      const dataGlobe = await fetch('https://www.arcgis.com/sharing/rest/content/items/cb5148d43124477f88d5e36e5fd566ea/data?f=json').then(response => response.json());
      dispatch(setDataGlobeReady(dataGlobe));
    } catch (e) {
      console.warn(e);
      dispatch(setDataGlobeError(e));
    }
  }
}


