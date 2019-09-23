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

const TutorialComponent = ({ children, position, tutorialEnabled, specialCondition = true, tutorialID }) => {
  const [ref, setRef] = useState(null);

  // useEffect(() => {
  //   ReactTooltip.rebuild();
  //   console.log('ReactTooltip.rebuild();')
  // }, [])

  return (
    <>
      <div className={styles.container}>
        {tutorialEnabled && specialCondition &&
          <button
            className={styles.questionMarkButton}
            style={{...position.style }}
            data-tip={tutorialID}
            data-place={position.dataPlace}
            data-for='tutorialTooltip'
            // data-event-off='click
            // data-effect='float'
            data-event='click'
            data-class="tutorial-modal-class"
            ref={ref => setRef(ref) }
            onClick={() => {
              ReactTooltip.show(ref);
              setTimeout(() => {
                  ReactTooltip.hide(ref);
              }, 1);
              // ReactTooltip.rebuild()
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