import React from 'react';

import Component from './component';

function AboutModalContainer(props) {
  const { setAboutModalOpen } = props;
  const handleClose = () => setAboutModalOpen(false);
  // eslint-disable-next-line react/jsx-filename-extension
  return <Component handleClose={handleClose} {...props} />;
}
export default AboutModalContainer;
