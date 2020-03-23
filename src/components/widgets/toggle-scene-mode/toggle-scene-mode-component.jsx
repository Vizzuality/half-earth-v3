import React from 'react';

const ToggleSceneComponent = ({ handleSceneModeChange }) => (
  <button
    onClick={handleSceneModeChange}
    style={{ color: 'white', top: 0, position: 'absolute' }}
  >
    TOGGLE SCENE MODE
  </button>
);

export default ToggleSceneComponent;