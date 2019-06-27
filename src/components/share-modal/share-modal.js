import { connect } from 'react-redux';
import get from 'lodash/get';
import facebookIcon from 'icons/facebook.png';
import twitterIcon from 'icons/twitter.png';
import styles from './share-modal-styles.module';

import Component from './share-modal-component';

const shareSocialMedia = [
  {
    link: `https://www.facebook.com/sharer/sharer.php?u=`,
    className: styles.facebookIcon,
    icon: facebookIcon,
    alt: 'Facebook'
  },
  {
    link: `https://twitter.com/intent/tweet?url=`,
    className: styles.twitterIcon,
    icon: twitterIcon,
    alt: 'Twitter'
  }
];

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type].path,
  center: get(location, 'query.globe.center') || [],
  zoom: get(location, 'query.globe.zoom') || 3,
  shareSocialMedia
});

export default connect(
  mapStateToProps,
  null
)(Component);