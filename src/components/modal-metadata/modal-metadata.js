import React from 'react';
import { connect } from 'react-redux';

import ModalMetadataComponent from './modal-metadata-component';
import { mapStateToProps } from './modal-metadata-selectors';
import actions from 'redux_modules/metadata';

const ModalMetadataContainer = props => {
  const handleModalClose = () => {
    const { setModalMetadata } = props;
    setModalMetadata({
      isOpen: false
    });
  };

  return (
    <ModalMetadataComponent {...props} handleClose={handleModalClose}/>
  )
}

export default connect(mapStateToProps, actions)(ModalMetadataContainer);
