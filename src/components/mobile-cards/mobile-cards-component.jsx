import React from 'react';

import { T } from '@transifex/react';

import cx from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown/with-html';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import styles from './mobile-cards-styles.module.scss';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function CardsComponent({ variants, page, direction, setPage, cardsContent }) {
  const paginate = (newDirection) => {
    const isNotOutsideBounds =
      (newDirection > 0 && page < cardsContent.length - 1) ||
      (newDirection < 0 && page > 0);
    if (isNotOutsideBounds) {
      setPage([page + newDirection, newDirection]);
    }
  };

  console.log({ cardsContent });

  const card = cardsContent[page];

  const { title, description, legendItem, legendColor, legendTitle } = card;
  const isSingleLegend = !!legendColor;
  return (
    <div className={styles.container}>
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          className={styles.card}
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          <div>
            <p className={styles.progress}>
              {page + 1} / {cardsContent.length}
            </p>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.description}>{description}</p>
          </div>
          {legendTitle && (
            <div className={styles.legendContainer}>
              <div
                className={cx({
                  [styles.withLegend]: legendColor,
                })}
              >
                {isSingleLegend && (
                  <span
                    className={styles.singleLegend}
                    style={{ backgroundColor: legendColor }}
                  />
                )}
                <p className={styles.legendTitle}>{legendTitle}</p>
                {!isSingleLegend && (
                  <SidebarLegend
                    className={styles.legend}
                    legendItem={legendItem}
                  />
                )}
              </div>
              <p className={styles.source}>
                <span className={styles.sourceIntro}>
                  <T _str="Source:" />{' '}
                </span>
                <ReactMarkdown
                  key={`source-${page}`}
                  source={card.source}
                  escapeHtml={false}
                />
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CardsComponent;
