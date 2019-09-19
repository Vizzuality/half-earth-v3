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


const TutorialComponent = ({ children, position, description, showHint = true, tutorialEnabled, setTutorialEnabled, tutorialID }) => {
  // const [ref, setRef] = useState(null);
  const [isOpened, setOpened] = useState(false);
  const [isChecked, setChecked] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);

  useEffect(() => {
    const HEtutorialEnabled = localStorage.getItem('HE-tutorial-enabled');
    const HEtutorialEnabledBool = (HEtutorialEnabled == 'true');
    const _enabledTutorial = HEtutorialEnabled === null ? true : HEtutorialEnabledBool;
    setTutorialEnabled(_enabledTutorial);

    const showThisTutorial = localStorage.getItem(`show-${tutorialID}`);
    const showThisTutorialBool = (showThisTutorial == 'true');
    const _showThisTutorial = showThisTutorial === null ? true : showThisTutorialBool;
    setShowPrompt(_showThisTutorial);
    console.log('show this tutorial:', showPrompt)

  }
  ,[]);

  const handleOpenPrompt = () => {
    setOpened(true);
  }

  const handleClosePrompt = () => {
    ReactTooltip.hide();
    setOpened(false);
    localStorage.setItem(`show-${tutorialID}`, false);
    setShowPrompt(false);

    if(isChecked) {
      localStorage.setItem('HE-tutorial-enabled', false);
      setTutorialEnabled(false);
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
  // console.log('showPrompt: ',showPrompt)
  // const z = `questionMarkButtonId`;
  return (
    <>
      {!tutorialEnabled ? (
        renderChildren(children)
      ) : (
          <div className={styles.container}>
            {showPrompt && showHint &&
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
            }
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
    </>
  )
}

export default TutorialComponent;