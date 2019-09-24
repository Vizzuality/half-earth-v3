import React from 'react';
import ReactTooltip from 'react-tooltip';
import RadioButton from 'components/radio-group/radio-button';
import styles from './tutorial-modal-styles.module.scss';
import { tutorialData } from 'constants/tutorial';

const TutorialModalContent = ({ description, onClick, checked, setChecked }) => {
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

const TutorialModal = ({
  preventTooltipClipping,
  tooltipRef,
  handleClosePrompt,
  isChecked,
  toggleChecked
}) => {

  return (
    <ReactTooltip
      id='tutorialTooltip'
      ref={tooltipRef}
      effect="float"
      event="click"
      clickable
      overridePosition={preventTooltipClipping}
      afterShow={() => console.log('dsdsdsdsddd')}
      getContent={(id) => (
        <TutorialModalContent
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

export default TutorialModal;