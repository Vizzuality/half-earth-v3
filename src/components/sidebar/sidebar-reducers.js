import * as actions from './sidebar-actions';

export const initialState = { open: true };

const sideBarToggle = state => ({ ...state, open: !state.open });

export default { [actions.sideBarToggle]: sideBarToggle };
