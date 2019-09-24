import React, { useEffect } from 'react';
import { ReactComponent as QuestionIcon } from 'icons/question.svg';
import ReactTooltip from 'react-tooltip';
import styles from './tutorial-styles.module.scss';

const renderChildren = (children) => (
  <div className={styles.content}>
    {React.Children.map(children || null, (child, i) => {
      return child && <child.type key={i} {...child.props}/>;
    })}
  </div>
)

const TutorialComponent = ({ children, position, tutorialEnabled, showTutorial = true, tutorialID }) => {
  useEffect(() => {
    ReactTooltip.rebuild();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {tutorialEnabled && showTutorial &&
          <span
            className={styles.questionMarkButton}
            style={{...position.style }}
            data-for='tutorialTooltip'
            data-tip={tutorialID}
            data-place={position.dataPlace}
            data-class="tutorial-modal-class"
          >
            <QuestionIcon />
          </span>
        }
        {renderChildren(children)}
      </div>
    </>
  )    
}

export default TutorialComponent;