import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

const FeaturedPlaceViewManager = ({ map, view, selectedFeaturedPlace, isLandscapeMode, zoom }) => {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(map, view, selectedFeaturedPlace, isLandscapeMode, zoom)
  return null
}

export default FeaturedPlaceViewManager;