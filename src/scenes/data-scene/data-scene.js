import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import Component from './data-scene-component';


const Container = (props) => {
  const { activeLayers } = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();

  useEffect(() => {
    if (activeLayers) {
      const activeOption = getSelectedAnalysisLayer(activeLayers);
      console.log(getSelectedAnalysisLayer)
      console.log(activeOption)
      setSelectedAnalysisLayer(activeOption);
    }
  }, [activeLayers])

  return (
    <Component
      selectedAnalysisLayer={selectedAnalysisLayer}
      {...props}
    />
  )
}

export default Container;
