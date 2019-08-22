import { loadModules } from '@esri/react-arcgis';

export const setAvatarImage = (view, viewPoint, featuredPlacesLayerTitle) => {
  const featuredPoint = viewPoint.results.filter((result) => result.graphic.layer.title === featuredPlacesLayerTitle);
  let marker = document.getElementById('avatar');
  const defaultStyles = 'overflow: hidden; border-radius: 20px; position: absolute; display: none; width: 40px; height: 40px; pointer-events: none; background-size: cover;';
  if (!marker) {
    marker = document.createElement('div');
    marker.setAttribute("style", `${defaultStyles}`)
    marker.setAttribute("id", "avatar");
    document.body.appendChild(marker);
  }
  if (featuredPoint.length) {
    const { latitude, longitude } = featuredPoint[0].graphic.geometry;
    loadModules(["esri/geometry/Point"]).then(([Point]) => {
      const point = new Point({latitude, longitude});
      const screenCoords = view.toScreen(point);
      document.body.style.cursor = 'pointer';
      marker.setAttribute("style", `${defaultStyles} left: ${screenCoords.x}px; top: ${screenCoords.y}px; transform: translate(-20px, -20px); display: block; border: 1px solid white; background-image: url(https://i.pinimg.com/originals/1c/c3/c5/1cc3c5ac87c9433861270c7b26a2f89d.jpg)`)
    })
  } else {
    document.body.style.cursor = 'default';
    marker.setAttribute("style", `${defaultStyles}`);
  }
}

export const setSelectedFeaturedPlace = (viewPoint, featuredPlacesLayerTitle, changeUI) => {
  const featuredPoint = viewPoint.results.filter((result) => result.graphic.layer.title === featuredPlacesLayerTitle);
  const selectedFeaturedPlace = featuredPoint.length ? featuredPoint[0].graphic.attributes.nam_slg : null;
  if (selectedFeaturedPlace) changeUI({ selectedFeaturedPlace });
}