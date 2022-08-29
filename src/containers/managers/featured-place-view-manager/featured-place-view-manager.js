import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

function FeaturedPlaceViewManager({
  map, view, selectedFeaturedPlace, isLandscapeMode,
}) {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace, isLandscapeMode);
  return null;
}

export default FeaturedPlaceViewManager;
