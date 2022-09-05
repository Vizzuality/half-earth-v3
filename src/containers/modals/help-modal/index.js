import React from 'react';

import Component from './component';

function HelpModalContainer(props) {
  const { setHelpModalOpen } = props;
  const handleClose = () => setHelpModalOpen(false);
  // eslint-disable-next-line react/jsx-filename-extension
  return <Component handleClose={handleClose} {...props} />;
}
export default HelpModalContainer;
