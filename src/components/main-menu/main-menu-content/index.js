import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as urlActions from 'actions/url-actions';
import { joinConversationAnalytics, shareMapAnalytics } from 'actions/google-analytics-actions';
import Component from './component.jsx';

const mapStateToProps = ({ location }) => ({
  route: location.routesMap[location.type],
});

const actions = { ...urlActions, joinConversationAnalytics, shareMapAnalytics };
function Container(props) {
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const toggleModal = () => setShareModalOpen(!isShareModalOpen);

  const handleShareClick = () => {
    toggleModal();
    props.shareMapAnalytics();
  };

  const handleJoinConversationClick = (socialMedia) => {
    props.joinConversationAnalytics(socialMedia.alt);
    window.open(socialMedia.projectLink);
  };

  return (
    <Component
      toggleModal={toggleModal}
      handleShareClick={handleShareClick}
      isShareModalOpen={isShareModalOpen}
      handleJoinConversationClick={handleJoinConversationClick}
      {...props}
    />
  );
}

export default connect(mapStateToProps, actions)(Container);
