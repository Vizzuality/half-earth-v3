import { loadModules } from 'esri-loader';
import { get } from 'lodash'

const markerDefaultStyles = 'overflow: hidden; border-radius: 20px; position: absolute; display: none; width: 40px; height: 40px; pointer-events: none; background-size: cover;';

const hitResults = (viewPoint, layerTitle) => (
  viewPoint.results.filter((result) => result.graphic.layer.title === layerTitle)
)

export const setCursor = (viewPoint, layerTitle) => {
  const layerFeatures = hitResults(viewPoint, layerTitle);
  if (layerFeatures.length) {
    document.body.style.cursor = 'pointer';
  } else {
    document.body.style.cursor = 'default';
  }
}

export const setDefaultCursor = () => document.body.style.cursor = 'default';

export const removeAvatarImage = (markerElement) => {
  setDefaultCursor();
  const marker = markerElement || document.getElementById('avatar');
  marker.setAttribute("style", `${markerDefaultStyles}`);
}

export const setAvatarImage = (view, viewPoint, featuredPlacesLayerTitle, selectedFeaturedMap, featuredMapPlaces) => {
  const featuredPoint = hitResults(viewPoint, featuredPlacesLayerTitle);
  let marker = document.getElementById('avatar');
  if (!marker) {
    marker = document.createElement('div');
    marker.setAttribute("style", `${markerDefaultStyles}`)
    marker.setAttribute("id", "avatar");
    document.body.appendChild(marker);
  }
  if (featuredPoint.length) {
    const { latitude, longitude } = featuredPoint[0].graphic.geometry;
    const slug = get(featuredPoint, '[0].graphic.attributes.nam_slg');
    const imageUrl = featuredMapPlaces.data[selectedFeaturedMap][slug].imageUrl ;
    loadModules(["esri/geometry/Point"]).then(([Point]) => {
      const point = new Point({latitude, longitude});
      const screenCoords = view.toScreen(point);
      marker.setAttribute("style", `${markerDefaultStyles} left: ${screenCoords.x}px; top: ${screenCoords.y}px; transform: translate(-20px, -20px); display: block; border: 1px solid white; background-image: url(${imageUrl})`)
    })
  } else {
    removeAvatarImage(marker);
    setDefaultCursor();
  }
}

export const setSelectedFeaturedPlace = (viewPoint, featuredPlacesLayerTitle, changeUI) => {
  const featuredPoint = hitResults(viewPoint, featuredPlacesLayerTitle);
  const selectedFeaturedPlace = featuredPoint.length ? get(featuredPoint, '[0].graphic.attributes.nam_slg') : null;
  if (selectedFeaturedPlace) changeUI({ selectedFeaturedPlace });
}

export const drawGeometry = (viewPoint, layerTitle, graphic) => {
  const layerFeatures = hitResults(viewPoint, layerTitle);
  if (layerFeatures.length) {
    if (!graphic.geometry) {
      graphic.geometry = layerFeatures[0].graphic.geometry;
    } else if(graphic.geometry.centroid.x !== layerFeatures[0].graphic.geometry.centroid.x) {
      graphic.geometry = layerFeatures[0].graphic.geometry;
    } 
  } else {
    graphic.geometry = null;
  }
}

export const flyToGeometry = (view, viewPoint, layerTitle) => {
  const layerFeatures = hitResults(viewPoint, layerTitle);
  if (layerFeatures.length) {
    view.goTo(layerFeatures[0].graphic.geometry);
  }
}