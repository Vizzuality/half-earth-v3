import React from 'react';
import Component from './tutorial-component';
import { connect } from 'react-redux';
import mapStateToProps from './tutorial-selectors';

const TutorialWidget = props => {
  // position:
  // - top-left, top-right, bottom-left, bottom-right
  const offset = '-8px';
  const offsetMap = {
    'top-left': { style: { top: offset, left: offset }, dataPlace: "left" },
    'top-right': { style: { top: offset, right: offset }, dataPlace: "right" },
    'bottom-left': { style: { bottom: offset, left: offset}, dataPlace: "left" },
    'bottom-right': { style: { bottom: offset, right: offset}, dataPlace: "right" }
  }

  const { position, description, setTutorialEnabled } = props;
  return (
    <Component
      {...props}
      position={offsetMap[position] || offsetMap['top-right']}
      description={description}
      setTutorialEnabled={setTutorialEnabled}
    />
  )
}

export default connect(mapStateToProps, null)(TutorialWidget);
