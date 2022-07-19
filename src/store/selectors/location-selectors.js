export const selectQuery = ({ location }) => location.query || null;
export const selectGlobeUrlState = ({ location }) => location.query && (location.query.globe || {});
export const selectUiUrlState = ({ location }) => location.query && (location.query.ui || {});
export const selectLangUrlState = ({ location }) => location.query && (location.query.lang || 'en');
// for map iframe and post robot
export const selectListenersState = ({ location }) => location.query && (location.query.listeners || false);
