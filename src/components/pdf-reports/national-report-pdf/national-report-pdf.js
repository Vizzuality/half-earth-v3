import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { useWatchUtils } from 'hooks/esri';
import Component from './national-report-pdf-component';
import { connect } from 'react-redux';
import mapStateToProps from 'components/local-scene-sidebar/local-scene-sidebar-selectors';

const NationalReportPdfContainer = (props) => {
  let watchHandle;
  const { view, countryISO } = props;
  const watchUtils = useWatchUtils();
  const [sceneScreenshotUrl, setSceneScreenshotUrl] = useState();
  const [nrcUrl, setNrcUrl] = useState();

  useEffect(() => {
    setNrcUrl(`${window.location.origin}${window.location.pathname}`);
  }, [countryISO])

  useEffect(() => {
    watchHandle = watchUtils && watchUtils.whenFalseOnce(view, "updating", function(updating) {
        getSceneImageUrl();
    })
    return function cleanUp() {
      watchHandle && watchHandle.remove();
    }
  },[watchUtils, countryISO]);

  const getSceneImageUrl = ()=> {
    const options = {
      width: 430
    }
    view.takeScreenshot(options).then(function(screenshot) {
      setSceneScreenshotUrl(screenshot.dataUrl);
    })
  }

  return (
    ReactDOM.createPortal(
      <Component
        nrcUrl={nrcUrl}
        sceneScreenshotUrl={sceneScreenshotUrl}
        {...props}
      />,
      document.getElementById('root')
    )
  )
}

export default connect(mapStateToProps, null)(NationalReportPdfContainer);