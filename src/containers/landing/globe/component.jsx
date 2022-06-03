import React, { useState } from 'react';
import cx from 'classnames';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

const Globe = ({
  className,
  description,
  title,
  globeImage,
  center,
  handleClick,
}) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <button
      onClick={handleClick}
      className={cx({
        className: !!className,
        [styles.container]: true,
        [styles.containerCenter]: center,
      })}
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
          y: isHovered && center ? -10 : isHovered && !center ? -30 : 0,
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
};

Globe.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  globeImage: PropTypes.string,
  center: PropTypes.bool,
};

export default Globe;
