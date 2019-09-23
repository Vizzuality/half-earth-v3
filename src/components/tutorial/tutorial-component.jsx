import React from 'react';
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

const TutorialComponent = ({ children, position, tutorialEnabled, specialCondition = true, tutorialID }) => {
  return (
    <>
      <div className={styles.container}>
        {tutorialEnabled && specialCondition &&
          <button
            className={styles.questionMarkButton}
            style={{...position.style }}
            data-for='tutorialTooltip'
            data-tip={tutorialID}
            data-place={position.dataPlace}
            data-class="tutorial-modal-class"
            // data-offset="{'top': 50, 'left': 10}"
            onClick={() => {
              ReactTooltip.rebuild()
            }}
          >
            <QuestionIcon />
          </button>
        }
        {renderChildren(children)}
      </div>
    </>
  )    
}

export default TutorialComponent;