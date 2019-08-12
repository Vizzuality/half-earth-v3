import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

const FeaturedPlaceViewManager = ({ map, view, selectedFeaturedPlace}) => {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace)
  return null
}

export default FeaturedPlaceViewManager;