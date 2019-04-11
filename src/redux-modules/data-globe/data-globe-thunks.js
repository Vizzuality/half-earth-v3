import reducerRegistry from 'reducerRegistry';
import { setDataGlobeLoading, setDataGlobeReady, setDataGlobeError } from './data-globe-actions';
import { reduxConfig } from './data-globe';

export default async function dataGlobeThunk(dispatch, getState) {
  // Register reducer to have the dataGlobeSpec available on the store in case it is not registered
  if (!getState().dataGlobeSpec) { reducerRegistry.registerModule('dataGlobeSpec', reduxConfig) };
  const { data } = getState().dataGlobeSpec;
  if (!data) {
    dispatch(setDataGlobeLoading());
    try {
      // This API call fetches Arcgis js Web Scene Specification for the given item
      const dataGlobe = await fetch('https://www.arcgis.com/sharing/rest/content/items/cb5148d43124477f88d5e36e5fd566ea/data?f=json').then(response => response.json());
      dispatch(setDataGlobeReady(dataGlobe));
    } catch (e) {
      console.warn(e);
      dispatch(setDataGlobeError(e));
    }
  }
}


