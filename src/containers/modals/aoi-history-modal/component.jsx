import React, { useEffect, useState, useRef } from "react";
import localforage from 'localforage';
import { Modal } from "he-components";

import styles from "./styles.module";


const AoiHistoryModalComponent = ({
  isOpen,
  editAoiId,
  handleClose,
  handleAoiClick,
  handleAoiDataStore,
  handleAoiNameChange,
  handleActivateAoiEdit,
}) => {

  const [aoiHistory, setAoiHistory] = useState([]);
  const activeInputRef = useRef();

  useEffect(() => {
    if (isOpen) {
      const _aoiHistory = [];
      localforage.iterate((value, key) => {
        _aoiHistory.push({
          id: key,
          name: value.name,
          timestamp: value.timestamp
        })
      }).then(() => {
        console.log('setting history')
        setAoiHistory(_aoiHistory.sort((a, b) => b.timestamp - a.timestamp))
      }).catch((error) => {
        console.error(error)
      })
    }
  }, [isOpen, editAoiId])

  useEffect(() => {
    if (editAoiId && activeInputRef.current) {
      activeInputRef.current.focus();
    }
  }, [editAoiId, activeInputRef])

  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>Your areas of interest history.</h2>
        <p className={styles.description}>These are the areas of interest you have created in the past. To delete them, clear the Cache of your browser.</p>
        <ul className={styles.aoiListContainer}>
          {aoiHistory.map(({
            id,
            name,
            timestamp
          }) => (
            <li 
              key={id}
              className={styles.aoiItemContainer}
            >
              <div
                className={styles.data}
              >
                {editAoiId === id ? 
                <input
                  id={id}
                  type="text"
                  ref={activeInputRef}
                  className={styles.nameInput}
                  onChange={handleAoiNameChange}
                /> :
                <span
                  className={styles.aoiName}
                  onClick={() => handleAoiClick(id)}
                >
                  {name || 'custom super really long name'}
                </span>
                }
                <span className={styles.timestamp}>
                  {editAoiId === id ? '' : (timestamp || '05/07/2021 14:54')}
                </span>
              </div>
              <div
                className={styles.toolbar}
              >
                <button
                  className={styles.item}
                  onClick={
                    editAoiId === id ?
                    () => handleAoiDataStore(id) :
                    () => handleActivateAoiEdit(id)
                  }
                >
                  {editAoiId === id ? 'Store new name' : 'Edit name'}
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
