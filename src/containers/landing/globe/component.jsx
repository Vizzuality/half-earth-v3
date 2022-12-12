import React, { useState } from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import { motion } from 'framer-motion';

import styles from './styles.module.scss';

function Globe({
  className,
  description,
  title,
  globeImage,
  center,
  handleClick,
}) {
  const [isHovered, setHovered] = useState(false);
  const getImageY = () => {
    if (isHovered && center) return -10;
    return isHovered && !center ? -30 : 0;
  };
  return (
    <button
      type="button"
      className={cx({
        className: !!className,
        [styles.container]: true,
        [styles.containerCenter]: center,
      })}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cx({
          [styles.content]: true,
          [styles.contentCenter]: center,
        })}
      >
        <motion.p
          initial={false}
          animate={{
            y: isHovered ? -45 : 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className={styles.title}
        >
          {title}
        </motion.p>
        <motion.p
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? -35 : 0,
            height: isHovered ? 'initial' : 10,
          }}
          transition={{
            duration: 0.4,
            delay: 0.2,
          }}
          className={styles.description}
        >
          {description}
        </motion.p>
      </div>
      <motion.img
        alt={title}
        src={globeImage}
        initial={false}
        animate={{
          y: getImageY(),
        }}
        transition={{
          duration: 0.4,
        }}
        className={cx({
          [styles.image]: true,
          [styles.imageCenter]: center,
        })}
      />
    </button>
  );
}

Globe.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  globeImage: PropTypes.string,
  center: PropTypes.bool,
};

Globe.defaultProps = {
  className: undefined,
  description: undefined,
  title: undefined,
  globeImage: undefined,
  center: undefined,
};

export default Globe;
