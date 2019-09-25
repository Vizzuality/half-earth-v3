import * as actions from './tutorial-actions';
import { RARITY_RICHNESS_TUTORIAL, LEGEND_TUTORIAL, LEGEND_DRAG_TUTORIAL } from 'constants/tutorial';

// more about persisting redux State to local storage: https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

const defaultState = {
  showAllTutorials: true,
  [RARITY_RICHNESS_TUTORIAL]: true,
  [LEGEND_TUTORIAL]: true,
  [LEGEND_DRAG_TUTORIAL]: true
};

const LOCAL_STORAGE_ITEM_NAME = 'HEtutorial' // key in local storage

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);
    if (serializedState === null) { 
      return defaultState; // if there is no tutorial data in local settings, return defult settings
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return defaultState; // return defaultState in case that user privacy mode does't allow the use of localStorage.
  }
}; 

export const initialState = loadState();

function setTutorialData(state, { payload }) {
  const newState = { ...state, ...payload};
  try {
    const serializedState = JSON.stringify(newState);
    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, serializedState); // set updated data to local storage
    return newState;
  } catch {
    return state;
  }
}

export default {
  [actions.setTutorialData]: setTutorialData
};
