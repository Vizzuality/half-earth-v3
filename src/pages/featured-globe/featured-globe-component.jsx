import React from 'react';
import Globe from 'components/globe';

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({ sceneSettings }) => {
  return <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} />
};

export default FeaturedGlobeComponent;