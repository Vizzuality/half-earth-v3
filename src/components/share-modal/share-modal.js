import React from 'react';
import { connect } from 'react-redux';
import facebookIcon from 'icons/facebook.png';
import twitterIcon from 'icons/twitter.png';
import mailIcon from 'icons/email.png';

import Component from './share-modal-component';

const shareSocialMedia = [
  {
    link: `https://www.facebook.com/sharer/sharer.php?u=`,
    icon: facebookIcon,
    alt: 'Facebook'
  },
  {
    link: `https://twitter.com/intent/tweet?url=`,
    icon: twitterIcon,
    alt: 'Twitter'
  },
  {
    link: 'mailto:?body=',
    icon: mailIcon,
    alt: 'Email'
  }
];

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type].path,
  shareSocialMedia
});

const ShareModalContainer = (props) => {
  const { setShareModalOpen } = props;
  const handleClose = () => setShareModalOpen(false);
  return <Component handleClose={handleClose} {...props} />;
}
export default connect(mapStateToProps, null)(ShareModalContainer);