import React from 'react';
import Component from './tutorial-component';
import { connect } from 'react-redux';
import mapStateToProps from './tutorial-selectors';

const TutorialWidget = props => {
  const { position, description, setTutorialEnabled } = props;

  const offset = '-8px';
  const positionMap = {
    'top-left': { style: { top: offset, left: offset }, dataPlace: "left" },
    'top-right': { style: { top: offset, right: offset }, dataPlace: "right" },
    'bottom-left': { style: { bottom: offset, left: offset}, dataPlace: "left" },
    'bottom-right': { style: { bottom: offset, right: offset}, dataPlace: "right" }
  }

  return (
    <Component
      {...props}
      position={positionMap[position] || positionMap['top-right']}
      description={description}
      setTutorialEnabled={setTutorialEnabled}
    />
  )
}

export default connect(mapStateToProps, null)(TutorialWidget);
