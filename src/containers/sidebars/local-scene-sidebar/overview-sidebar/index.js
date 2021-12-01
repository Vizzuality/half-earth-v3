import React, { useEffect } from 'react';
import Component from './component.jsx';
import { connect } from 'react-redux';
import mapStateToProps from 'containers/sidebars/local-scene-sidebar/local-scene-sidebar-selectors';
import { visitNrcOverviewAnalytics, downloadNrcPdfAnalytics } from 'actions/google-analytics-actions';
const actions = { visitNrcOverviewAnalytics, downloadNrcPdfAnalytics }

const Container = (props) => {

    useEffect(() => {
      const { visitNrcOverviewAnalytics } = props;
      visitNrcOverviewAnalytics() 
    }, [])

    const handlePrintReport = () => {
      const { downloadNrcPdfAnalytics, countryName } = props;
      const today = new Date();
      const date = Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric'}).format(today);
      const tempTitle = document.title;
      document.title = `Half-Earth National Report Card ${date} - ${countryName}`;
      window.print();
      downloadNrcPdfAnalytics(countryName)
      document.title = tempTitle;
    }

    return (
      <Component
        handlePrintReport={handlePrintReport}  
        {...props}
      />
    )
}

export default connect(mapStateToProps, actions)(Container);
