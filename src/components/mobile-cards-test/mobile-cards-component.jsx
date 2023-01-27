import React, { useEffect, useMemo, useRef, useState } from 'react';

// import { T } from '@transifex/react';

// import cx from 'classnames';

// import ReactMarkdown from 'react-markdown/with-html';

// import SidebarLegend from 'containers/sidebars/sidebar-legend';

import { animate, motion, useMotionValue } from 'framer-motion';

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
  console.log({ cardsContent, setCurrent, current });
  return (
    <div className={styles.container}>
      <div style={{ width: 640, height: 500 }}>
        <VirtualizedPage>
          {({ index }) => {
            const modulo = index % cardsContent.length;
            const cardIndex =
              modulo < 0 ? cardsContent.length + modulo : modulo;
            return (
              <div
                draggable={false}
                style={{
                  width: '90vw',
                  border: '2px solid red',
                  color: 'white',
                }}
              >
                {cardsContent[cardIndex].title}
              </div>
            );
          }}
        </VirtualizedPage>
      </div>
    </div>
  );
}

export default CardsComponent;
