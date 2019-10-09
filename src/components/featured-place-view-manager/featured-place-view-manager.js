import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

const FeaturedPlaceViewManager = ({ map, view, selectedFeaturedPlace, isLandscapeMode }) => {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace, isLandscapeMode)
  return null
}

export default FeaturedPlaceViewManager;