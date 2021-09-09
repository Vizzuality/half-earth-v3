import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { getSelectedAnalysisLayer } from 'utils/analyze-areas-utils';
import _intersectionBy from 'lodash/intersectionBy';
import { PRECALCULATED_AOI_OPTIONS } from 'constants/analyze-areas-constants';
import Component from './data-scene-component';


const Container = (props) => {
  const { activeLayers } = props;
  const [selectedAnalysisLayer, setSelectedAnalysisLayer] = useState();

  useEffect(() => {
    if (activeLayers) {
      const intersectionArray = _intersectionBy(PRECALCULATED_AOI_OPTIONS, activeLayers, 'title');
      // const activeOption = getSelectedAnalysisLayer(activeLayers);
      console.log(intersectionArray)
      // console.log(activeOption)
      setSelectedAnalysisLayer(intersectionArray[0]);
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
