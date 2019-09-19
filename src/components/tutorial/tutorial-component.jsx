import React, { useState, useEffect } from 'react';
// import cx from 'classnames';
import { ReactComponent as QuestionIcon } from 'icons/question.svg';
import ReactTooltip from 'react-tooltip';
import RadioButton from 'components/radio-group/radio-button';
import styles from './tutorial-styles.module.scss';

const TutorialModal = ({ description, onClick, checked, setChecked }) => {
  // console.log( 'TutorialModal checked:',checked);
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


const TutorialComponent = ({ children, position, description, showHint = true, tutorialEnabled, setTutorialData, tutorialID }) => {
  // const [ref, setRef] = useState(null);
  const [isOpened, setOpened] = useState(false);
  const [isChecked, setChecked] = useState(false);

  const handleOpenPrompt = () => {
    setOpened(true);
  }

  const handleClosePrompt = () => {
    ReactTooltip.hide();
    setOpened(false);
    setTutorialData({ [tutorialID]: false }); // hide this specific tutorial prompt

    if(isChecked) {
      setTutorialData({ showAllTutorials: false });  // hide all tutorial prompts
    }
  }
  const toggleChecked = () => setChecked(!isChecked);

  const renderChildren = (children) => (
    <div className={styles.content}>
      {React.Children.map(children || null, (child, i) => {
        return child && <child.type key={i} {...child.props}/>;
      })}
    </div>
  )

  return (
    <>
      {!tutorialEnabled ? (
        renderChildren(children)
      ) : (
          <div className={styles.container}>
              <button
                className={styles.questionMarkButton}
                style={{...position.style, display: isOpened ? 'block' : 'block' }}
                data-tip
                data-place={position.dataPlace}
                data-for={tutorialID}
                // data-event-off='click'
                data-effect='solid'
                data-event='click'
                data-delay-show={0}
                data-delay-hide={0}
                data-class="tutorial-modal-class"
                // ref={ref => setRef(ref) }
                onClick={handleOpenPrompt}
              >
                <QuestionIcon />
              </button>
          <ReactTooltip
            id={tutorialID}
            clickable={true}
            globalEventOff="click"
          >
            <TutorialModal
              description={description}
              onClick={handleClosePrompt}
              setChecked={toggleChecked}
              checked={isChecked}
            />
          </ReactTooltip>
          {renderChildren(children)}
        </div>
    )}
  </>)    
}

export default TutorialComponent;