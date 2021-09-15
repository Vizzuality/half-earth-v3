import React, { useState, useEffect } from 'react';
import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import Component from './data-scene-component';


const Container = (props) => {
  const { activeLayers } = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();

  useEffect(() => {
    const activeOption = getSelectedAnalysisLayer(activeLayers);
    setSelectedAnalysisLayer(activeOption);
  }, [activeLayers])

  return (
    <Component
      selectedAnalysisLayer={selectedAnalysisLayer}
      {...props}
    />
  )
}

export default Container;
