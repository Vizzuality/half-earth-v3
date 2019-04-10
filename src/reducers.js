import { combineReducers } from 'redux';
import { handleModule } from 'redux-tools';
import router from './router';
// Redux-modules
import { reduxConfig as dataGlobeRedux } from 'redux_modules/data-globe';
// Shared Components
import { reduxConfig as sidebarRedux } from 'components/shared/sidebar';

const reduxModulesReducers = {
  dataGlobeSpec: handleModule(dataGlobeRedux)
};

const componentReducers = {
  sidebar: handleModule(sidebarRedux)
};

export default combineReducers({
  location: router.reducer,
  ...reduxModulesReducers,
  ...componentReducers
});