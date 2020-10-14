/* eslint-disable no-undef */
import { createSelector, createStructuredSelector } from 'reselect';
import { getConfig } from 'utils/user-config-utils';
 
const getTutorialID = (state, props) => props && props.tutorialID;

const getTutorialEnabled = createSelector(
  [getTutorialID],
  (ids) => {
  const userConfig = getConfig();
  if (!ids) return null;
  if (!userConfig.showAllTutorials) return false;

  const tutorialIds = ids.split(',');
  if (!tutorialIds.some(id => userConfig[id])) return false;
  
  return true;
})


export default createStructuredSelector({
  tutorialEnabled: getTutorialEnabled
});