import React, { useEffect, useRef } from "react";
import cx from 'classnames';
import Button from 'components/button';
import ShareInput from 'components/share-input';
import ShareSocialIcons from 'components/share-social-icons';

import { ReactComponent as ShareIcon } from 'icons/share.svg';
import { ReactComponent as EditIcon } from 'icons/edit.svg';
import { ReactComponent as BinIcon } from 'icons/bin.svg';
import { timestampAoiFormatting } from 'utils/data-formatting-utils';
import { Modal } from "he-components";

import styles from "./styles.module";


const AoiHistoryModalComponent = ({
  isOpen,
  editAoiId,
  shareAoiId,
  aoiHistory,
  handleAoiClick,
  handleAoiShare,
  handleModalClose,
  handleAoiDataStore,
  handleAoiNameChange,
  handleActivateAoiEdit,
  handleAoiShareToggle,
  handleRemoveAoiFromLocal,
  handleRemoveAllLocalAoiRecords,
}) => {
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
        {name}
      </span>
      <span className={styles.timestamp}>
        {timestampAoiFormatting(timestamp)}
      </span>
    </>
  )

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContainer}>
        <h2 className={styles.title}>Your areas of interest history.</h2>
        <p className={styles.description}>These are the areas of interest you have created in the past.</p>
        {aoiHistory.length > 0 &&
          <Button 
            Icon={BinIcon}
            type="compound"
            className={styles.deleteAllButton}
            handleClick={handleRemoveAllLocalAoiRecords}
            label="delete all areas"
          />
        }
        <ul className={styles.aoiListContainer}>
          {aoiHistory.map(({
            id,
            name,
            timestamp
          }) => (
            <li 
              key={id}
              className={cx(
                styles.aoiItemContainer,
                {[styles.active]: editAoiId === id || shareAoiId === id}
              )}
            >
              <div
                className={styles.dataContainer}
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
                      Icon={ShareIcon}
                      type="icon-square"
                      className={styles.item}
                      handleClick={() => handleAoiShareToggle(id)}
                      tooltipText="Share this area"
                    />
                    <Button 
                      Icon={EditIcon}
                      type="icon-square"
                      className={styles.item}
                      handleClick={() => handleActivateAoiEdit(id)}
                      tooltipText="Edit area information"
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
              </div>
              {shareAoiId === id &&
              <>
                <ShareInput
                  setShareUrl={() => `${window.location.origin}/aoi/${id}`}
                  className={styles.shareInputLayout}
                  onShareCallback={() => handleAoiShare(id)}
                />
                <ShareSocialIcons
                  setShareUrl={() => `${window.location.origin}/aoi/${id}`}
                  className={styles.shareIconsLayout}
                />
              </>
              }
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default AoiHistoryModalComponent;
