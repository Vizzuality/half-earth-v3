import React, { useState } from 'react';
import { connect } from 'react-redux';
import { writeToForageItem } from 'utils/local-forage-utils';
import Component from './component';
// ACTIONS
import { AREA_OF_INTEREST } from 'router';
import urlActions from 'actions/url-actions';

const Container = (props) => {
  const [editAoiId, setEditAoiId] = useState(null);
  const [updatedAoiName, setUpdatedAoiName] = useState(null);

  const handleAoiClick = (id) => {
    const { browsePage } = props;
    browsePage({type: AREA_OF_INTEREST, payload: { id }});
  }

  const handleAoiNameChange = (e) => {
    setUpdatedAoiName(e.target.value)
  }

  const handleAoiDataStore = (id) => {
    writeToForageItem(id, {
      name: updatedAoiName,
      timestamp: Date.now()
    })
    setEditAoiId(null);
  }

  const handleActivateAoiEdit = (id) => {
    setEditAoiId(id)
  }

  return (
    <Component
      editAoiId={editAoiId}
      handleAoiClick={handleAoiClick}
      handleAoiDataStore={handleAoiDataStore}
      handleAoiNameChange={handleAoiNameChange}
      handleActivateAoiEdit={handleActivateAoiEdit}
      {...props}
    />
  )
}

export default connect(null, urlActions)(Container);