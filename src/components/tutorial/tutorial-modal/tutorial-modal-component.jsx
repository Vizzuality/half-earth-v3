import React from 'react';
import ReactTooltip from 'react-tooltip';
import RadioButton from 'components/radio-group/radio-button';
import styles from './tutorial-modal-styles.module.scss';
import { tutorialData } from 'constants/tutorial';

const TutorialModalContent = ({ tutorialIds, handleCloseModal, checked, setChecked }) => {
  const idArray = tutorialIds ? tutorialIds.split(',') : [];

  return (
    <div className={styles.modalContainer}>
      <div className={styles.content}>
        {idArray.map((id) => <p className={styles.description}>{tutorialData[id]}</p>)}   
        <RadioButton
          text='Don’t show me more tips'
          value={'tutorial-visibility-radio'}
          checked={checked}
          name={'tutorial-visibility'}
          theme={styles.radioButton}
          onClick={setChecked}
        />
      </div>
      <button
        className={styles.button}
        onClick={() => handleCloseModal(idArray)}
      >
        Got it!
      </button>
    </div>
  );
}

const TutorialModal = ({
  preventTooltipClipping,
  tooltipRef,
  handleCloseModal,
  isChecked,
  toggleChecked
}) => {

  return (
    <ReactTooltip
      id='tutorialTooltip'
      ref={tooltipRef}
      effect="float"
      event="click"
      globalEventOff="click"
      clickable
      overridePosition={preventTooltipClipping}
      getContent={(tutorialIds) => (
        <TutorialModalContent
          tutorialIds={tutorialIds}
          handleCloseModal={handleCloseModal}
          setChecked={toggleChecked}
          checked={isChecked}
        />
      )}
    />
  )
}

export default TutorialModal;