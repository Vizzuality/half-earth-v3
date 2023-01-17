import React, { useState } from 'react';

import { T } from '@transifex/react';

import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import { NRC_LANDING_CARDS } from './cards-constants';
import styles from './cards-styles.module.scss';

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function CardsComponent() {
  const [[page, direction], setPage] = useState([0, 0]);

  const cardIndex = wrap(0, NRC_LANDING_CARDS.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

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
          <div className={styles.progress}>
            <p>
              {cardIndex + 1} / {NRC_LANDING_CARDS.length}
            </p>
          </div>
          <h5>{NRC_LANDING_CARDS[cardIndex].title}</h5>
          <p>
            <T
              _str="{description}"
              description={NRC_LANDING_CARDS[cardIndex].description}
            />
          </p>

          {cardIndex !== 0 && (
            <div className={styles.cardContainer}>
              <div>
                <p className={styles.legendTitle}>
                  <T
                    _str="{legendTitle}"
                    legendTitle={NRC_LANDING_CARDS[cardIndex].legendTitle}
                  />
                </p>
                <SidebarLegend className={styles.legend} legendItem="spi" />
              </div>
              <p className={styles.source}>
                <T
                  _str="{source}"
                  source={NRC_LANDING_CARDS[cardIndex].source}
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
