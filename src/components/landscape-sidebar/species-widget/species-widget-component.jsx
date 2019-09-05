
import React from 'react';
import ReactTooltip from 'react-tooltip';
import styles from './species-widget-styles.module.scss';

const SpeciesWidgetComponent = ({ data }) => {
  return (
    <>
      {data && 
        <div className={styles.container}>
          <h3 className={styles.title}>SPECIES TO WATCH HERE</h3>
          <p className={styles.text}>The radar plot below shows the proportion of species range protected from the available taxonomic groups.</p>
          <div className={styles.chart}>
            <div className={styles.reptilesChart}></div>
            <div className={styles.birdsChart}>
              {data.map( s => {
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
          <div>
            <div>Global range area: </div>
            <div>Global range protected:</div>
            <div>IUCN:</div>
          </div>
        </div>
      }
    </>
  );
}

export default SpeciesWidgetComponent;