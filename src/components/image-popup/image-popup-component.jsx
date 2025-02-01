import React from 'react';

import MaximizeIcon from 'icons/maximize-solid.svg?react';

import styles from './image-popup-component-styles.module.scss';

function ImagePopupComponent(props) {
  const { children, setImagePopup } = props;

  const displayPoup = () => {
    setImagePopup(children);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => displayPoup()}
        aria-label="Maximize Photo"
      >
        <MaximizeIcon />
      </button>
      {children}
    </div>
  );
}

export default ImagePopupComponent;
