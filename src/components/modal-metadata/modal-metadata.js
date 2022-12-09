import React from 'react';
import { connect } from 'react-redux';
import actions from 'redux_modules/metadata';

import ModalMetadataComponent from './modal-metadata-component';
import { mapStateToProps } from './modal-metadata-selectors';

function ModalMetadataContainer(props) {
  const handleModalClose = () => {
    const { setModalMetadata } = props;
    setModalMetadata({
      isOpen: false,
    });
  };

  return <ModalMetadataComponent {...props} handleClose={handleModalClose} />;
}

export default connect(mapStateToProps, actions)(ModalMetadataContainer);
