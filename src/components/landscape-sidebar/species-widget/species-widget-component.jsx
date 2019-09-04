
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './species-widget-styles.module.scss';

const SpeciesWidgetComponent = ({ data }) => {

  return (
    <div className={styles.container}>
      <div className={styles.reptilesChart}></div>
      <div className={styles.birdsChart}>
        {data && data.map( s => {
          return (
            <>
              <div 
                className={styles.point}
                style={{ bottom: s.pointCoordinates.y, left: s.pointCoordinates.x }}
                data-tip
                data-for={s.name}
                data-effect='solid'
                data-delay-show={0}
              >
              </div>
              <ReactTooltip id={s.name} className='infoTooltipStyle'>
                {s.proportion}
              </ReactTooltip>
            </>
          )
        })}
      </div>
      <div className={styles.mammalsChart}></div>
      <div className={styles.amphibiansChart}></div>

    </div>
    
  );
}

export default SpeciesWidgetComponent;