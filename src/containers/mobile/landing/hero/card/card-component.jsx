import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';

import styles from './card-styles.module.scss';

function Card({ className, description, image, title, handleClick }) {
  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(className, styles.container)}
    >
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
    </button>
  );
}

Card.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

Card.defaultProps = {
  className: '',
};

export default Card;
