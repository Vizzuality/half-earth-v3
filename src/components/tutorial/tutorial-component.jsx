import React, { useState, useEffect } from 'react';
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

const TutorialComponent = ({ children, position, showHint = true, tutorialEnabled, setTutorialData, tutorialID }) => {
  // const [ref, setRef] = useState(null);
  // const [isOpened, setOpened] = useState(false);

  return (
    <>
      <div className={styles.container}>
        {tutorialEnabled && 
          <button
            className={styles.questionMarkButton}
            style={{...position.style }}
            data-tip={tutorialID}
            data-place={position.dataPlace}
            data-for='tutorialTooltip'
            // data-event-off='click
            data-effect='solid'
            data-event='click'
            data-delay-show={0}
            data-delay-hide={0}
            data-class="tutorial-modal-class"
            // ref={ref => setRef(ref) }
            onClick={() => ReactTooltip.rebuild()}
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