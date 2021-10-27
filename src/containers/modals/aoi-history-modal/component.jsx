import React, { useEffect, useState, useRef } from "react";
import localforage from 'localforage';
import { Modal } from "he-components";

import styles from "./styles.module";


const AoiHistoryModalComponent = ({ handleClose, isOpen }) => {

  const [isEditingName, setAoiToEdit] = useState(false);
  const [aoiHistory, setAoiHistory] = useState([]);
  const activeInputRef = useRef();

  useEffect(() => {
    const _aoiHistory = [];
    localforage.iterate((value, key) => {
      _aoiHistory.push({
        id: key,
        name: value.name,
        timestamp: value.timestamp
      })
    }).then(() => {
      setAoiHistory(_aoiHistory);
    }).catch((error) => {
      console.error(error)
    })
  }, [])

  useEffect(() => {
    if (isEditingName && activeInputRef.current) {
      activeInputRef.current.focus();
    }
  }, [isEditingName, activeInputRef])

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>Your areas of interest history.</h2>
        <p className={styles.description}>These are the areas of interest you have created in the past. To delete them, clear the Cache of your browser.</p>
        <ul className={styles.aoiListContainer}>
          {aoiHistory.map((aoi) => (
            <li 
              key={aoi.id}
              className={styles.aoiItemContainer}
            >
              <div
                className={styles.data}
              >
                {isEditingName === aoi.id ? 
                <input
                  id={aoi.id}
                  type="text"
                  ref={activeInputRef}
                  className={styles.nameInput}
                /> :
                <span
                  className={styles.aoiName}
                  onClick={() => console.log('browse area')}
                >
                  {aoi.name || 'custom super really long name'}
                </span>
                }
                <span className={styles.timestamp}>
                  {isEditingName === aoi.id ? '' : (aoi.timestamp || '05/07/2021 14:54')}
                </span>
              </div>
              <div
                className={styles.toolbar}
              >
                <button
                  className={styles.item}
                  onClick={
                    isEditingName === aoi.id ?
                    () => setAoiToEdit (false) :
                    () => setAoiToEdit(aoi.id)
                  }
                >
                  {isEditingName === aoi.id ? 'Store new name' : 'Edit name'}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default AoiHistoryModalComponent;
