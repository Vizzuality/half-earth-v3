import React, { useEffect, useMemo, useRef, useState } from 'react';

import { T } from '@transifex/react';

import cx from 'classnames';
import { animate, motion, useMotionValue } from 'framer-motion';
import ReactMarkdown from 'react-markdown/with-html';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import styles from './mobile-cards-styles.module.scss';

const transition = {
  type: 'spring',
  bounce: 0,
};
const range = [-1, 0, 1];

function Page({ index, renderPage, x, onDragEnd }) {
  const child = useMemo(() => renderPage({ index }), [index, renderPage]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        x,
        left: `${index * 100}%`,
        right: `${index * 100}%`,
      }}
      draggable
      drag="x"
      dragElastic={1}
      onDragEnd={onDragEnd}
    >
      {child}
    </motion.div>
  );
}

function VirtualizedPage({ children }) {
  const x = useMotionValue(0);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);

  const calculateNewX = () => -index * (containerRef.current?.clientWidth || 0);

  const handleEndDrag = (e, dragProps) => {
    const clientWidth = containerRef.current?.clientWidth || 0;

    const { offset, velocity } = dragProps;

    if (Math.abs(velocity.y) > Math.abs(velocity.x)) {
      animate(x, calculateNewX(), transition);
      return;
    }

    if (offset.x > clientWidth / 4) {
      setIndex(index - 1);
    } else if (offset.x < -clientWidth / 4) {
      setIndex(index + 1);
    } else {
      animate(x, calculateNewX(), transition);
    }
  };

  useEffect(() => {
    const controls = animate(x, calculateNewX(), transition);
    return controls.stop;
  }, [index]);

  return (
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
        return (
          <Page
            key={rangeValue + index}
            x={x}
            onDragEnd={handleEndDrag}
            index={rangeValue + index}
            renderPage={children}
          />
        );
      })}
    </motion.div>
  );
}

function CardsComponent({ cardsContent, setCurrent, current }) {
  console.log({ setCurrent, current });
  return (
    <div className={styles.container}>
      <VirtualizedPage>
        {({ index }) => {
          const modulo = index % cardsContent.length;
          const cardIndex = modulo < 0 ? cardsContent.length + modulo : modulo;
          const isSingleLegend = !!cardsContent[cardIndex].legendColor;

          return (
            <div className={styles.cardPage}>
              <div draggable={false} className={styles.card}>
                <div>
                  <div className={styles.indicatorBg} />
                  <p className={styles.progress}>
                    {cardIndex + 1} / {cardsContent.length}
                  </p>
                  <h5 className={styles.title}>
                    {cardsContent[cardIndex].title}
                  </h5>
                  <p className={styles.description}>
                    {cardsContent[cardIndex].description}
                  </p>
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
                    <p className={styles.source}>
                      <span className={styles.sourceIntro}>
                        <T _str="Source:" />{' '}
                      </span>
                      <ReactMarkdown
                        key={`source-${index + 1}`}
                        source={cardsContent[cardIndex].source}
                        escapeHtml={false}
                      />
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        }}
      </VirtualizedPage>
    </div>
  );
}

export default CardsComponent;
