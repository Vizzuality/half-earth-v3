import React, { useEffect, useRef } from "react";
import Button from 'components/button';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as BinIcon } from 'icons/bin.svg';
import { timestampAoiFormatting } from 'utils/data-formatting-utils';
import { Modal } from "he-components";

import styles from "./styles.module";


const AoiHistoryModalComponent = ({
  isOpen,
  editAoiId,
  aoiHistory,
  handleAoiClick,
  handleModalClose,
  handleAoiDataStore,
  handleAoiNameChange,
  handleActivateAoiEdit,
  handleRemoveAoiFromLocal,
}) => {

  // const [aoiHistory, setAoiHistory] = useState([]);
  const activeInputRef = useRef();

  useEffect(() => {
    if (editAoiId && activeInputRef.current) {
      activeInputRef.current.focus();
    }
  }, [editAoiId, activeInputRef])

  const AoiInfoComponent = ({id, name, timestamp}) => (
    <>
      <span
        className={styles.aoiName}
        onClick={() => handleAoiClick(id)}
      >
        {name || 'custom super really long name'}
      </span>
      <span className={styles.timestamp}>
        {editAoiId === id ? '' : (timestampAoiFormatting(timestamp) || '05/07/2021 14:54')}
      </span>
    </>
  )

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
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
                 <AoiInfoComponent id={id} name={name} timestamp={timestamp}/>
                }
              </div>
              <div
                className={styles.toolbar}
              >
                {editAoiId === id ? 
                  <Button 
                    type="rectangular"
                    className={styles.saveButton}
                    handleClick={() => handleAoiDataStore(id)}
                    label="save"
                  /> :
                 <>
                  <Button 
                    Icon={EditIcon}
                    type="icon-square"
                    className={styles.item}
                    handleClick={() => handleActivateAoiEdit(id)}
                    tooltipText="Draw a new area"
                  />
                  <Button 
                    Icon={ShareIcon}
                    type="icon-square"
                    className={styles.item}
                    handleClick={() => console.log('share')}
                    tooltipText="Share this area"
                  />
                  <Button 
                    Icon={BinIcon}
                    type="icon-square"
                    className={styles.item}
                    handleClick={() => handleRemoveAoiFromLocal(id)}
                    tooltipText="Delete this area from your local history"
                  />
                 </>
                }
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default AoiHistoryModalComponent;
