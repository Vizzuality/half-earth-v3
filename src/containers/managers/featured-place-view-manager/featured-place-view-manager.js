import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

function FeaturedPlaceViewManager({ map, view, selectedFeaturedPlace, selectedFeaturedMap }) {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace, selectedFeaturedMap);
  return null;
}

export default FeaturedPlaceViewManager;
