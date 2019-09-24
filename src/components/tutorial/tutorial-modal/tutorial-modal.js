import React, { useState, useRef } from 'react';
import ReactTooltip from 'react-tooltip';
import Component from './tutorial-modal-component';
import { connect } from 'react-redux';
import tutorialActions from 'redux_modules/tutorial';

const actions = { ...tutorialActions };

const TutorialModal = props => {
  const { setTutorialData } = props;
  
  const tooltipRef = useRef(null);
  const [isChecked, setChecked] = useState(false);
 
  const toggleChecked = () => setChecked(!isChecked);

  const preventTooltipClipping = ({ top, left }) => {
    const { current } = tooltipRef;
    const tooltipHeight = current ? current.tooltipRef.scrollHeight : 200;
    const isTooltipClipped = window.innerHeight - top - 20 < tooltipHeight;
    const _top = isTooltipClipped ? window.innerHeight - tooltipHeight - 20 : top; // if tooltip isn't going to fit the viewport, recalculate the 'top' position
    return { top: _top, left };
  }
  
  const forceHideTooltip = ref => {
    const { current } = ref;
    if(current) current.tooltipRef = null; // force hiding the tooltip, more about this workaround here: https://github.com/wwayne/react-tooltip/issues/449#issuecomment-514768776
    ReactTooltip.hide();
  }

  const handleCloseModal = (idArray) => {
    forceHideTooltip(tooltipRef);
    const updateTutorials = idArray && idArray.reduce((acc, tutorialID) => { return { ...acc, [tutorialID]: false } }, {});
    const updatedAllTutorials = isChecked ? { showAllTutorials: false } : {}; // hide all tutorial prompts if selected
    setTutorialData({  ...updatedAllTutorials, ...updateTutorials }); // hide this specific tutorial prompt
  }

  return (
    <Component
      preventTooltipClipping={preventTooltipClipping}
      handleCloseModal={handleCloseModal}
      tooltipRef={tooltipRef}
      isChecked={isChecked}
      toggleChecked={toggleChecked}
      {...props}
    />
  );
}

export default connect(null, actions)(TutorialModal);
