import React from 'react';
import Component from './national-report-pdf-component';
import { connect } from 'react-redux';
import mapStateToProps from 'components/local-scene-sidebar/local-scene-sidebar-selectors';

const NationalReportPdfContainer = (props) => (
  <Component {...props}/>
)

export default connect(mapStateToProps, null)(NationalReportPdfContainer);