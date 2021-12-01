import React, { useEffect } from 'react';
import Component from './component.jsx';
import { connect } from 'react-redux';
import { visitNrcRankingAnalytics } from 'actions/google-analytics-actions';
const actions = { visitNrcRankingAnalytics }

const Container = (props) => {

    useEffect(() => {
      const { visitNrcRankingAnalytics } = props;
      visitNrcRankingAnalytics() 
    }, [])

    return <Component {...props}/>
}

export default connect(null, actions)(Container);
