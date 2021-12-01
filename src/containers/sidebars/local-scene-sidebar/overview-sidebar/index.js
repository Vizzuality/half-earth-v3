import React, { useEffect } from 'react';
import Component from './component.jsx';
import { connect } from 'react-redux';
import mapStateToProps from 'containers/sidebars/local-scene-sidebar/local-scene-sidebar-selectors';
import { visitNrcOverviewAnalytics } from 'actions/google-analytics-actions';
const actions = { visitNrcOverviewAnalytics }

const Container = (props) => {

    useEffect(() => {
      const { visitNrcOverviewAnalytics } = props;
      visitNrcOverviewAnalytics() 
    }, [])

    return <Component {...props}/>
}

export default connect(mapStateToProps, actions)(Container);
