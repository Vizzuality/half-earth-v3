import { connect } from 'react-redux';

import Component from './share-modal-component';

const currentLocation = window.location.href;
const shareSocialMedia = [
  {
    link: `https://www.facebook.com/sharer/sharer.php?u=${currentLocation}`,
    className: 'facebookIcon'
  },
  {
    link: `https://twitter.com/intent/tweet?url=${currentLocation}`,
    className: 'twitterIcon'
  }
];

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type].path,
  shareSocialMedia,
  currentLocation
});

export default connect(
  mapStateToProps,
  null
)(Component);