import { LOCAL_STORAGE_USER_CONFIG_KEY, userConfigInitialState } from 'constants/tutorial';

export const getConfig = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_USER_CONFIG_KEY);
    if (serializedState === null) {
      return userConfigInitialState; // if there is no config data in local settings, return defult settings
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return userConfigInitialState; // return defaultState in case that user privacy mode does't allow the use of localStorage.
  }
}

export const setConfig = (config, {payload}) => {
  const newState = { ...config, ...payload};
  try {
    const serializedState = JSON.stringify(newState);
    localStorage.setItem(LOCAL_STORAGE_USER_CONFIG_KEY, serializedState); // set updated data to local storage
    return newState;
  } catch {
    return config;
  }
}