export const selectQuery = ({ location }) => location.query || null;
export const selectGlobeUrlState = ({ location }) => location.query && location.query.globe;
