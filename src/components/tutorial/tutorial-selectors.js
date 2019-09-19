/* eslint-disable no-undef */
import { createSelector, createStructuredSelector } from 'reselect';

const getTutorial = ({ tutorial }) => tutorial;
 
const getTutorialID = (state, props) => props && props.tutorialID;

const getTutorialEnabled = createSelector(
  [getTutorial, getTutorialID],
  (tutorial, id) => {
  if (!tutorial || !id) return null;
  if (!tutorial.showAllTutorials) return false;
  if (!tutorial[id]) return false;
  return true;
})


export default createStructuredSelector({
  tutorialEnabled: getTutorialEnabled
});