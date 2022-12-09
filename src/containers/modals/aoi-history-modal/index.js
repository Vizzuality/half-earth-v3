import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { AREA_OF_INTEREST } from 'router';

import urlActions from 'actions/url-actions';

import {
  getAoiHistory,
  sortByDate,
  writeToForageItem,
} from 'utils/local-forage-utils';

import localforage from 'localforage';

import Component from './component';

// ACTIONS

function Container(props) {
  const { isOpen, handleClose, browsePage } = props;
  const [aoiHistory, setAoiHistory] = useState([]);
  const [editAoiId, setEditAoiId] = useState(null);
  const [shareAoiId, setShareAoiId] = useState(null);
  const [updatedAoiName, setUpdatedAoiName] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      getAoiHistory().then((aois) => {
        setAoiHistory(aois.sort(sortByDate));
        setLoading(false);
      });
    }
  }, [isOpen]);

  const handleAoiClick = (id) => {
    browsePage({ type: AREA_OF_INTEREST, payload: { id } });
  };

  const handleAoiNameChange = (e) => {
    setUpdatedAoiName(e.target.value);
  };

  const handleModalClose = () => {
    setEditAoiId(null);
    setShareAoiId(null);
    handleClose();
  };

  const handleAoiDataStore = (id) => {
    writeToForageItem(id, {
      areaName: updatedAoiName,
      timestamp: Date.now(),
    }).then(() => {
      getAoiHistory().then((aois) => setAoiHistory(aois.sort(sortByDate)));
      setEditAoiId(null);
    });
  };

  const handleActivateAoiEdit = (id) => {
    setEditAoiId(id);
  };

  const handleAoiShareToggle = (id) => {
    if (id === shareAoiId) {
      setShareAoiId(null);
    } else {
      setShareAoiId(id);
    }
  };

  const handleRemoveAoiFromLocal = (id) => {
    localforage.removeItem(id).then(() => {
      getAoiHistory().then((aois) => setAoiHistory(aois.sort(sortByDate)));
    });
  };

  const handleRemoveAllLocalAoiRecords = () => {
    localforage.dropInstance().then(() => setAoiHistory([]));
  };

  const handleAoiShare = (id) => {
    localforage.getItem(id).then((storedValues) => {
      // TODO: store AOI on arcgis online
      console.info(id, storedValues);
    });
  };

  return (
    <Component
      editAoiId={editAoiId}
      shareAoiId={shareAoiId}
      aoiHistory={aoiHistory}
      handleAoiClick={handleAoiClick}
      handleAoiShare={handleAoiShare}
      handleModalClose={handleModalClose}
      handleAoiDataStore={handleAoiDataStore}
      handleAoiNameChange={handleAoiNameChange}
      handleAoiShareToggle={handleAoiShareToggle}
      handleActivateAoiEdit={handleActivateAoiEdit}
      handleRemoveAoiFromLocal={handleRemoveAoiFromLocal}
      handleRemoveAllLocalAoiRecords={handleRemoveAllLocalAoiRecords}
      loading={loading}
      {...props}
    />
  );
}

export default connect(null, urlActions)(Container);
