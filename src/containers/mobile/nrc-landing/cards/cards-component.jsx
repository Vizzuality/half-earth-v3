import React from 'react';

import { T } from '@transifex/react';

import { motion, AnimatePresence } from 'framer-motion';

import SidebarLegend from 'containers/sidebars/sidebar-legend';

import styles from './cards-styles.module.scss';

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

function CardsComponent({
  cardIndex,
  variants,
  page,
  direction,
  setPage,
  cardsContent,
}) {
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
              {cardIndex + 1} / {cardsContent.length}
            </p>
          </div>
          <h5>{cardsContent[cardIndex].title}</h5>
          <p>{cardsContent[cardIndex].description}</p>

          {cardsContent[cardIndex].legendTitle && (
            <div className={styles.cardContainer}>
              <div>
                <p className={styles.legendTitle}>
                  <T
                    _str="{legendTitle}"
                    legendTitle={cardsContent[cardIndex].legendTitle}
                  />
                </p>
                <SidebarLegend
                  className={styles.legend}
                  legendItem={cardsContent[cardIndex].legendColor}
                />
              </div>
              <p className={styles.source}>
                <T _str="{source}" source={cardsContent[cardIndex].source} />
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default CardsComponent;
