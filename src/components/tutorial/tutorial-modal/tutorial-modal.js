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
    const isTooltipClipped = window.innerHeight - top < 200;
    return { top: isTooltipClipped ? window.innerHeight - 200 : top, left };
  }
  
  const forceHideTooltip = ref => {
    const { current } = ref;
    if(current) current.tooltipRef = null; // force hiding the tooltip, more about this workaround here: https://github.com/wwayne/react-tooltip/issues/449#issuecomment-514768776
    ReactTooltip.hide();
  }

  const handleClosePrompt = (tutorialID) => {
    forceHideTooltip(tooltipRef);
    const updatedAllTutorials = isChecked ? { showAllTutorials: false } : {}; // hide all tutorial prompts if selected
    setTutorialData({ [tutorialID]: false, ...updatedAllTutorials }); // hide this specific tutorial prompt
  }

  return (
    <Component
      preventTooltipClipping={preventTooltipClipping}
      handleClosePrompt={handleClosePrompt}
      tooltipRef={tooltipRef}
      isChecked={isChecked}
      toggleChecked={toggleChecked}
      {...props}
    />
  );
}

export default connect(null, actions)(TutorialModal);
