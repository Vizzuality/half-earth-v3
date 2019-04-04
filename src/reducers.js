import { combineReducers } from 'redux';
import router from './router';

export default combineReducers({
  location: router.reducer
});