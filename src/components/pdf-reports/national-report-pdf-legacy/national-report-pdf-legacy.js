import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import { useWatchUtils } from 'hooks/esri';

import mapStateToProps from 'containers/sidebars/national-report-sidebar/national-report-sidebar-selectors';

import Component from './national-report-pdf-component';

const NationalReportPdfContainer = (props) => {
  const { view, countryISO } = props;
  const watchUtils = useWatchUtils();
  const [sceneScreenshotUrl, setSceneScreenshotUrl] = useState();
  const [nrcUrl, setNrcUrl] = useState();

  useEffect(() => {
    setNrcUrl(`${window.location.origin}${window.location.pathname}`);
  }, [countryISO]);

  const getSceneImageUrl = () => {
    const options = {
      width: 430,
    };
    view.takeScreenshot(options).then((screenshot) => {
      setSceneScreenshotUrl(screenshot.dataUrl);
    });
  };

  useEffect(() => {
    const abortController = new AbortController();
    if (watchUtils) {
      watchUtils
        .whenOnce(() => !view.updating, abortController.signal)
        .then(() => {
          getSceneImageUrl();
        });
    }
    return function cleanUp() {
      if (watchUtils) {
        abortController.abort();
      }
    };
  }, [watchUtils, countryISO]);

  return ReactDOM.createPortal(
    <Component
      nrcUrl={nrcUrl}
      sceneScreenshotUrl={sceneScreenshotUrl}
      {...props}
    />,
    // eslint-disable-next-line no-undef
    document.getElementById('root')
  );
};

export default connect(mapStateToProps, null)(NationalReportPdfContainer);
