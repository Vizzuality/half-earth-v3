import { useSetLandscapeViewParam, useLandscapeViewCameraChange } from 'hooks/landscape-view-hooks';

const LandscapeViewManager = ({ view, zoomLevelTrigger, onZoomChange, isLandscapeMode, countryISO }) => {
  // Update url param hook
  useSetLandscapeViewParam(view, zoomLevelTrigger, onZoomChange, countryISO);
  // update camera tilt hook
  useLandscapeViewCameraChange(view, isLandscapeMode);
  return null
}

export default LandscapeViewManager;
