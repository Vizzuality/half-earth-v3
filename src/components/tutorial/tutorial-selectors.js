/* eslint-disable no-undef */
import { createSelector, createStructuredSelector } from 'reselect';

const getTutorial = ({ tutorial }) => tutorial;
 
const getTutorialID = (state, props) => props && props.tutorialID;

const getTutorialEnabled = createSelector(
  [getTutorial, getTutorialID],
  (tutorial, ids) => {
  if (!tutorial || !ids) return null;
  if (!tutorial.showAllTutorials) return false;

  const tutorialIds = ids.split(',');
  if (!tutorialIds.some(id => tutorial[id])) return false;
  
  return true;
})


export default createStructuredSelector({
  tutorialEnabled: getTutorialEnabled
});