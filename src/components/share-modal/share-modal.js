import React from 'react';
import { connect } from 'react-redux';
import { ReactComponent as FacebookIcon } from "icons/facebook.svg";
import { ReactComponent as TwitterIcon } from "icons/twitter.svg";
import { ReactComponent as MailIcon } from "icons/mail.svg";

import Component from './share-modal-component';

const shareSocialMedia = [
  {
    link: `https://www.facebook.com/sharer/sharer.php?u=`,
    icon: FacebookIcon,
    alt: 'Facebook'
  },
  {
    link: `https://twitter.com/intent/tweet?url=`,
    icon: TwitterIcon,
    alt: 'Twitter'
  },
  {
    link: 'mailto:?body=',
    icon: MailIcon,
    alt: 'Email'
  }
];

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type].path,
  shareSocialMedia
});

const ShareModalContainer = React.forwardRef((props, ref) => {
  const { setShareModalOpen } = props;
  const handleClose = () => setShareModalOpen(false);
  return <Component handleClose={handleClose} {...props} ref={ref} />;
});
export default connect(mapStateToProps, null, null, { forwardRef: true })(ShareModalContainer);
