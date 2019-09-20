import React, { useState, useEffect } from 'react';
// import cx from 'classnames';
import ReactTooltip from 'react-tooltip';
import RadioButton from 'components/radio-group/radio-button';
import styles from './tutorial-tooltip-styles.module.scss';
import { tutorialData } from 'constants/tutorial';

const TutorialModal = ({ description, onClick, checked, setChecked }) => {
  return (
    <div className={styles.modalContainer}>
      <div>
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

export const TutorialPrompt = ({ setTutorialData }) => {
  const [isChecked, setChecked] = useState(false);

  const handleClosePrompt = (tutorialID) => {
    ReactTooltip.hide();
    const updatedAllTutorials = isChecked ? { showAllTutorials: false } : {}; // hide all tutorial prompts if selected
    setTutorialData({ [tutorialID]: false, ...updatedAllTutorials }); // hide this specific tutorial prompt
  }
  const toggleChecked = () => setChecked(!isChecked);

  return (
    <ReactTooltip
      id='tutorialTooltip'
      clickable={true}
      globalEventOff="click"
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