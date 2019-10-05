import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import HalfEarthModalComponent from './half-earth-modal-component';
import metadataActions from 'redux_modules/page-texts';

const HalfEarthModal = props => {
  const { setPageTexts, textData  } = props;

  useEffect(() => {
    if(!textData) {
      setPageTexts('half-earth-meter');
    }
  }, [])

  return <HalfEarthModalComponent {...props} />
}

const mapStateToProps = ({ pageTexts }) => ({
  textData: pageTexts.data['half-earth-meter'],
  loading: pageTexts.loading,
  error: pageTexts.error
});

export default connect(mapStateToProps, metadataActions)(HalfEarthModal);