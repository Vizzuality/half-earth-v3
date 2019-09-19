import { createStructuredSelector } from 'reselect';

const getTutorialEnabled = ({ tutorial }) => tutorial && tutorial.enabled;

export default createStructuredSelector({
  tutorialEnabled: getTutorialEnabled
});