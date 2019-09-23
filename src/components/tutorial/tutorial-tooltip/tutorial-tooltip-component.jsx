import React, { useState, useEffect, useRef } from 'react';
// import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import RadioButton from 'components/radio-group/radio-button';
import styles from './tutorial-tooltip-styles.module.scss';
import { tutorialData } from 'constants/tutorial';

const TutorialModal = ({ description, onClick, checked, setChecked }) => {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.content}>
        <div className={styles.description}>{description}</div>
        <RadioButton
          text='Don’t show me more tips'
          value={'tutorial-visibility-radio'}
          checked={checked}
          name={'tutorial-visibility'}
          className={styles.radioButton}
          onClick={setChecked}
        />
      </div>
      <button
        className={styles.button}
        onClick={onClick}
      >
        Got it!
      </button>
    </div>
  );
}

const preventTooltipClipping = (({ top, left }) => {
  const isTooltipClipped = window.innerHeight - top < 200;
  return { top: isTooltipClipped ? window.innerHeight - 200 : top, left };
})

export const TutorialPrompt = ({ setTutorialData }) => {
  const [isChecked, setChecked] = useState(false);
  const tooltip = useRef(null);

  const handleClosePrompt = (tutorialID) => {
    const { current } = tooltip;
    if(current) current.tooltipRef = null; // force hide the tooltip, more about this workaround here: https://github.com/wwayne/react-tooltip/issues/449#issuecomment-514768776
    ReactTooltip.hide();

    const updatedAllTutorials = isChecked ? { showAllTutorials: false } : {}; // hide all tutorial prompts if selected
    setTutorialData({ [tutorialID]: false, ...updatedAllTutorials }); // hide this specific tutorial prompt
  }
  const toggleChecked = () => setChecked(!isChecked);

  return (
    <ReactTooltip
      id='tutorialTooltip'
      ref={tooltip}
      effect="solid"
      event="click"
      globalEventOff="click"
      clickable
      overridePosition={preventTooltipClipping}
      getContent={(id) => (
        <TutorialModal
          description={tutorialData[id]}
          onClick={() => handleClosePrompt(id)}
          setChecked={toggleChecked}
          checked={isChecked}
        />
      )}
    >
    </ReactTooltip>
  )
}

export default TutorialPrompt;