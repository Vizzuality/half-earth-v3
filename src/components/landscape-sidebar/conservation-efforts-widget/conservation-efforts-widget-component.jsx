import React, { useEffect, useState } from 'react';
import { loadModules } from '@esri/react-arcgis';
import PieChart from 'components/pie-chart';
import CheckboxGroup from 'components/checkbox-group';
import { 
  COMMUNITY_BASED,
  PROTECTED
} from 'components/landscape-sidebar/conservation-efforts-widget/conservation-efforts-widget-selectors';
import styles from './conservation-efforts-widget-styles.module.scss';

const findInDOM = (id) => document.getElementById(id);

const ConservationEffortsDescription = ({ allProp, rawData }) => {
  return (
    <p className={styles.description}>
      Of the current landscape, <span className={styles.boldFont}>{allProp.toFixed(2)}% is under protection.</span>
      {rawData[COMMUNITY_BASED] > rawData[PROTECTED] ? 'The majority of the protected areas are community managed.' : ''}
    </p>
  )
};

const ConservationEffortsWidget = ({
  setConservationEfforts,
  terrestrialCellData,
  dataFormatted,
  colors,
  rawData,
  allProp,
  alreadyChecked,
  protectedLayers,
  activeSlices,
  toggleLayer
}) => {
  const [conservationPropsLayer, setConservationPropsLayer] = useState(null);

  useEffect(() => {
    if (!conservationPropsLayer) {
      loadModules(["esri/layers/FeatureLayer"]).then(([FeatureLayer]) => {
        const consPropLayer = new FeatureLayer({
          url: "https://services9.arcgis.com/IkktFdUAcY3WrH25/arcgis/rest/services/ConsProp/FeatureServer"
        });
        setConservationPropsLayer(consPropLayer)
      });
    }
  }, []);

  const queryParams = conservationPropsLayer && conservationPropsLayer.createQuery();

  const orangeActive = alreadyChecked['Protected areas'];
  const yellowActive = alreadyChecked['Community areas'];

  useEffect(() => {
    const svg = findInDOM('conservation-widget');
    const orangeSlice = findInDOM(colors[PROTECTED]);
    const yellowSlice = findInDOM(colors[COMMUNITY_BASED]);

    if (svg && orangeSlice) {
      if (orangeActive && yellowActive && orangeSlice && yellowSlice) {
        // bring both to front
        svg.appendChild(yellowSlice);
        svg.appendChild(orangeSlice);
      } else if (yellowActive && yellowSlice && !orangeActive) {
        svg.appendChild(yellowSlice);
      } else if (!yellowActive && orangeSlice && orangeActive) {
        svg.appendChild(orangeSlice);
      } else {
        svg.appendChild(orangeSlice);
      }
    }
  }, [orangeActive, yellowActive])

  useEffect(() => {
    if (terrestrialCellData && queryParams) {
      queryParams.where = `CELL_ID IN (${terrestrialCellData.map(i => i.CELL_ID).join(', ')})`;
      conservationPropsLayer.queryFeatures(queryParams).then(function(results){
        const { features } = results;
        setConservationEfforts(features.map(c => c.attributes));
      });
    }
  }, [terrestrialCellData])

  return (
    <>
      {rawData && (
        <div className={styles.container}>
          <div className={styles.fixBlur} />
          <div className={styles.padding}>
            <h3 className={styles.title}>Conservation Efforts</h3>
            {allProp && rawData && <ConservationEffortsDescription allProp={allProp} rawData={rawData} />}
            <PieChart
              data={rawData}
              activeSlices={activeSlices}
              colors={colors}
              alreadyChecked={alreadyChecked}
            />
          </div>
          <CheckboxGroup 
            handleClick={toggleLayer}
            checkedOptions={alreadyChecked}
            options={protectedLayers}
            theme={styles}
          />
          {rawData && (
            <p className={styles.notUnderConservationLabel}>
              Not under conservation {dataFormatted.notUnderConservation}%
            </p>
          )}
        </div>
      )}
    </>
  )
}

export default ConservationEffortsWidget;