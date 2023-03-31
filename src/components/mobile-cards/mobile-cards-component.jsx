import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import { T } from '@transifex/react';

import useIsSafari from 'utils/user-agent-utils';

import cx from 'classnames';
import { animate, motion, useMotionValue } from 'framer-motion';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import { MobileOnly } from 'constants/responsive';

import styles from './mobile-cards-styles.module.scss';

const transition = {
  type: 'spring',
  bounce: 0,
};
const DIRECTION = {
  LEFT: -1,
  CURRENT: 0,
  RIGHT: 1,
};
const range = [DIRECTION.LEFT, DIRECTION.CURRENT, DIRECTION.RIGHT];

function CardsComponent({ cardsContent, setCurrent }) {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const calculateNewX = () => -index * (containerRef.current?.clientWidth || 0);

  const validIndexNext = index >= -1 && index <= 1;
  const validIndexBack = index > 0 && index <= 2;

  const handleEndDrag = (e, dragProps) => {
    const clientWidth = containerRef.current?.clientWidth || 0;

    const { offset, velocity } = dragProps;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition);
      return;
    }

    if (offset.x > clientWidth / 4 && validIndexBack) {
      setIndex(index - 1);
      setCurrent(index - 1);
    } else if (offset.x < -clientWidth / 4 && validIndexNext) {
      setIndex(index + 1);
      setCurrent(index + 1);
    } else {
      animate(x, calculateNewX(), transition);
    }
  };

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index]);

  const isSafari = useIsSafari();
  return (
    <div className={styles.container}>
      <MobileOnly>
        {isSafari && (
          <div className={styles.hint}>
            <T _str="Use two fingers to move the map" />
          </div>
        )}
      </MobileOnly>
      <motion.div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflowX: 'hidden',
        }}
      >
        {range.map((rangeValue) => {
          const indexRange = rangeValue + index;
          const modulo = indexRange % cardsContent.length;
          const cardIndex = modulo < 0 ? cardsContent.length + modulo : modulo;
          const isSingleLegend = !!cardsContent[cardIndex].legendColor;

          if (
            (rangeValue === DIRECTION.LEFT && indexRange < 0) ||
            (rangeValue === DIRECTION.RIGHT &&
              indexRange > cardsContent.length - 1)
          ) {
            return null;
          }

          return (
            <motion.div
              className={styles.cardDraggable}
              style={{
                x,
                left: `${indexRange * 100}%`,
                right: `${indexRange * 100}%`,
              }}
              key={rangeValue}
              draggable
              drag="x"
              dragElastic={1}
              onDragEnd={handleEndDrag}
            >
              <div className={styles.cardPage}>
                <div className={styles.card} draggable={false}>
                  <div>
                    <div className={styles.indicatorBg} />
                    <div className={styles.progress}>
                      <p>
                        {cardIndex + 1} / {cardsContent.length}
                      </p>
                    </div>
                    <h5 className={styles.title}>
                      {cardsContent[cardIndex].title}
                    </h5>
                    <div className={styles.description}>
                      {cardsContent[cardIndex].description}
                    </div>
                  </div>
                  {cardsContent[cardIndex].legendTitle && (
                    <div className={styles.legendContainer}>
                      <div
                        className={cx({
                          [styles.withLegend]:
                            cardsContent[cardIndex].legendColor,
                        })}
                      >
                        {isSingleLegend && (
                          <span
                            className={styles.singleLegend}
                            style={{
                              backgroundColor:
                                cardsContent[cardIndex].legendColor,
                            }}
                          />
                        )}
                        <p className={styles.legendTitle}>
                          {cardsContent[cardIndex].legendTitle}
                        </p>
                        {!isSingleLegend && (
                          <SidebarLegend
                            className={styles.legend}
                            legendItem={cardsContent[cardIndex].legendItem}
                          />
                        )}
                      </div>
                      <div className={styles.source}>
                        <span className={styles.sourceIntro}>
                          <T _str="Source:" />{' '}
                        </span>
                        <ReactMarkdown
                          key={`source-${index + 1}`}
                          source={cardsContent[cardIndex].source}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default CardsComponent;
