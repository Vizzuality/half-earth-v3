import { combineReducers } from 'redux';
import { handleModule } from 'redux-tools';
import router from './router';

// Components
import { reduxConfig as sidebarRedux } from 'components/sidebar';

const componentReducers = {
  sidebar: handleModule(sidebarRedux)
};

export default combineReducers({
  location: router.reducer,
  ...componentReducers
});