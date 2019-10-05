import { connect } from 'react-redux';
import facebookIcon from 'icons/facebook.png';
import twitterIcon from 'icons/twitter.png';
import { openShareModalAnalyticsEvent } from 'actions/google-analytics-actions';

import styles from './share-modal-styles.module';
import Component from './share-modal-component';

const actions = { openShareModalAnalyticsEvent };

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
  shareSocialMedia
});

export default connect(
  mapStateToProps,
  actions
)(Component);