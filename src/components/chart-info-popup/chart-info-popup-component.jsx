import React from 'react';

import PropTypes from 'prop-types';

import styles from './chart-info-popup-component-styles.module.scss';

function ChartInfoPopupComponent(props) {
  const { imgSrc, imgAlt, title, description } = props;
  return (
    <div>
      <h3 className={styles.title}>{title}</h3>
      <p>{description}</p>
      <img src={imgSrc} alt={imgAlt} />
    </div>
  );
}

export default ChartInfoPopupComponent;

ChartInfoPopupComponent.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

ChartInfoPopupComponent.defaultProps = {
  description: '',
};
