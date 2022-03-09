import cx from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles.module.scss';

const Globe = ({
  className,
  description,
  title,
  globeImage,
  handleClick,
}) => (
  <button
    onClick={handleClick}
    className={cx(className, styles.container)}
  >
    <div className={styles.content}>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </div>
    <img alt={title} src={globeImage} />
  </button>
);

Globe.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
  globeImage: PropTypes.string,
};

export default Globe;
