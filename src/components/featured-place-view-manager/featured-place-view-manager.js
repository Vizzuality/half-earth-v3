import { useFeaturedPlaceViewCameraChange } from 'hooks/featured-place-view-manager-hooks';

const FeaturedPlaceViewManager = ({ view, selectedFeaturedPlace, featuredPlacesLayer}) => {
  // update camera tilt hook
  useFeaturedPlaceViewCameraChange(view, selectedFeaturedPlace, featuredPlacesLayer)
  return null
}

export default FeaturedPlaceViewManager;