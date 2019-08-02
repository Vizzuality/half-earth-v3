import React from 'react';
import Globe from 'components/globe';
import Switcher from 'components/switcher';

const { REACT_APP_FEATURED_GLOBE_SCENE_ID: SCENE_ID } = process.env;

const FeaturedGlobeComponent = ({ sceneSettings, handleSwitch, onLoad }) => {
  return (
    <Globe sceneId={SCENE_ID} sceneSettings={sceneSettings} onLoad={onLoad}>
      <Switcher handleClick={handleSwitch} />
    </Globe>
  )
};

export default FeaturedGlobeComponent;