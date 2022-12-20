import React from 'react';
import { connect } from 'react-redux';
import metadataActions from 'redux_modules/metadata';

import { useLocale } from '@transifex/react';

import { handleMetadataClick } from 'utils/metadata-utils';

import Component from './checkbox-component';

function CheckboxContainer(props) {
  const locale = useLocale();

  const handleInfoClick = (option) => {
    const { setModalMetadata } = props;
    handleMetadataClick({ option, setModalMetadata, locale });
  };
  return <Component handleInfoClick={handleInfoClick} {...props} />;
}

export default connect(null, metadataActions)(CheckboxContainer);
