export const selectQuery = ({ location }) => location.query || null;
export const selectGlobeUrlState = ({ location }) => location.query && (location.query.globe || {});
export const selectUiUrlState = ({ location }) => location.query && (location.query.ui || {});
export const selectAnimationsUrlState = ({ location }) => location.query && (location.query.animations || {});
