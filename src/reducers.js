import { combineReducers } from 'redux';
import { handleModule } from 'redux-tools';
import router from './router';

// Shared Components
import { reduxConfig as sidebarRedux } from 'components/shared/sidebar';

const componentReducers = {
  sidebar: handleModule(sidebarRedux)
};

export default combineReducers({
  location: router.reducer,
  ...componentReducers
});