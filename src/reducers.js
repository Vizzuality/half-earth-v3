import { combineReducers } from 'redux';
import { handleModule } from 'redux-tools';
import router from './router';
// Redux-modules
import { reduxConfig as dataGlobeRedux } from 'redux_modules/data-globe';
import { reduxConfig as featuredGlobeRedux } from 'redux_modules/featured-globe';
// Shared Components
import { reduxConfig as sidebarRedux } from 'components/shared/sidebar';

const reduxModulesReducers = {
  dataGlobeSpec: handleModule(dataGlobeRedux),
  featuredGlobeSpec: handleModule(featuredGlobeRedux)
};

const componentReducers = {
  sidebar: handleModule(sidebarRedux)
};

export default combineReducers({
  location: router.reducer,
  ...reduxModulesReducers,
  ...componentReducers
});