import React from 'react';
import { useT } from '@transifex/react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './styles.module.scss';
import { ReactComponent as VolumeControl } from 'icons/volume-control.svg';

const AudioCard = ({
  className,
  description,
  duration,
  gif,
  number,
  title,
  handleClick,
}) => {
  const t = useT();

  return (
    <button onClick={handleClick} className={cx(className, styles.container)}>
      <div className={styles.numberContainer}>
        <p className={styles.number}>{number}.</p>
        <img className={styles.gif} src={gif} alt={title} />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>

      <div className={styles.volumeContainer}>
        <p>
          {duration}
          {t('min')}
        </p>
        <VolumeControl className={styles.volumeIcon} />
      </div>
    </button>
  );
};

AudioCard.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.string,
  gif: PropTypes.string,
  number: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

export default AudioCard;
