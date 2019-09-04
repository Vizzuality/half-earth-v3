import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

const FeaturedPlaceViewManager = ({ view, selectedFeaturedPlace, featuredPlacesLayer, isLandscapeMode }) => {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(view, selectedFeaturedPlace, featuredPlacesLayer, isLandscapeMode)
  return null
}

export default FeaturedPlaceViewManager;