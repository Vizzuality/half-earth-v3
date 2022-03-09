import cx from 'classnames';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles.module.scss';


const Globe = ({
  className,
  description,
  title,
  globeImage,
  center,
  handleClick,
}) => {
  const [isHovered, setHovered] = useState(false)

  return (
    <motion.button
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
            y: isHovered ? -30 : 0,
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
            display: isHovered ? 'block' : 'none',
            opacity: isHovered ? 1 : 0,
            y: isHovered ? -15 : 0,
          }}
          transition={{
            duration: 0.4,
            opacity: { duration: 0.8 }
          }}
          className={styles.description}>{description}
        </motion.p>
      </div>
      <motion.img
        alt={title}
        src={globeImage}
        initial={false}
        animate={{
          y: isHovered ? -30 : 0,
        }}
        transition={{
          duration: 0.4,
        }}
        className={cx({
          [styles.image]: true,
          [styles.imageCenter]: center,
        })}
      />
    </motion.button >
  )
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
