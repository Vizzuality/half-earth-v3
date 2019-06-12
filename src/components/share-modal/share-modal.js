import { connect } from 'react-redux';
import get from 'lodash/get';

import Component from './share-modal-component';

const shareSocialMedia = [
  {
    link: `https://www.facebook.com/sharer/sharer.php?u=`,
    className: 'facebookIcon'
  },
  {
    link: `https://twitter.com/intent/tweet?url=`,
    className: 'twitterIcon'
  }
];

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type].path,
  coordinates: get(location, 'query.globe.center') || [],
  shareSocialMedia
});

export default connect(
  mapStateToProps,
  null
)(Component);