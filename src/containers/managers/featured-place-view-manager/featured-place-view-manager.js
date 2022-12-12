import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

function FeaturedPlaceViewManager({ map, view, selectedFeaturedPlace }) {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace);
  return null;
}

export default FeaturedPlaceViewManager;
