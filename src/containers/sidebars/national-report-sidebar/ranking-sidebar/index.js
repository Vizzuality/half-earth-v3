import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { visitNrcRankingAnalytics } from 'actions/google-analytics-actions';

import Component from './component.jsx';

const actions = { visitNrcRankingAnalytics };

function Container(props) {
  useEffect(() => {
    const { visitNrcRankingAnalytics: visitRankingAnalytics } = props;
    visitRankingAnalytics();
  }, []);

  return <Component {...props} />;
}

export default connect(null, actions)(Container);
