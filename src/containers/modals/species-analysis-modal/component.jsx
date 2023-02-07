import React, { useState, useRef, useEffect } from 'react';

import loadable from '@loadable/component';

import { T } from '@transifex/react';

import { Modal } from 'he-components';

import SpeciesCard from 'containers/sidebars/aoi-sidebar/species-card/component';

import styles from './styles.module';

import SpsChart from './sps-chart';
import SpsLegend from './sps-legend';

const Spinner = loadable(() => import('components/spinner'));

const CHART_RATIO = 1.8;
function SpeciesAnalysisModal({
  isOpen,
  handleModalClose,
  loading,
  cardProps,
}) {
  const [globalRangeSelected, setGlobalRangeSelected] = useState({
    min: 0,
    max: 2,
  });
  const [SPSSelected, setSPSSelected] = useState({ min: 1, max: 3 });
  const [chartSize, setChartSize] = useState({ width: 700, height: 400 });

  const chartResponsiveRef = useRef();
  useEffect(() => {
    const onChartResize = () => {
      if (chartResponsiveRef && chartResponsiveRef.current) {
        const { width } = chartResponsiveRef.current.getBoundingClientRect();
        setChartSize({ width, height: width / CHART_RATIO });
      }
    };

    onChartResize();

    window.addEventListener('resize', onChartResize);
    return () => window.removeEventListener('resize', onChartResize);
  }, [chartResponsiveRef.current]);

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContent}>
        <div className={styles.cardContainer}>
          <SpeciesCard {...cardProps} insideModal />
        </div>
        <div className={styles.chartContainer}>
          {loading ? (
            <Spinner floating />
          ) : (
            <>
              <h1 className={styles.title}>
                <T _str="Which species need more protection?" />
              </h1>
              <div className={styles.subtitle}>
                <T
                  _str="This chart shows the {globalSpeciesProtectionScore} (SPS) and the {portionOfGlobalRange} of the species found in this area. The higher the range, the more important the area is to the species; the lower the SPS, the more effort is needed to protect the species."
                  globalSpeciesProtectionScore={
                    <span className={styles.bold}>
                      <T _str="Global Species Protection Score" />
                    </span>
                  }
                  portionOfGlobalRange={
                    <span className={styles.bold}>
                      <T _str="portion of global range" />
                    </span>
                  }
                />
              </div>
              <div ref={chartResponsiveRef} className={styles.chartResponsive}>
                <SpsChart
                  data={cardProps && cardProps.SPSData}
                  {...chartSize}
                  selectedSpecies={cardProps && cardProps.individualSpeciesData}
                  globalRangeSelected={globalRangeSelected}
                  SPSSelected={SPSSelected}
                />
              </div>
              <SpsLegend
                globalRangeSelected={globalRangeSelected}
                setGlobalRangeSelected={setGlobalRangeSelected}
                SPSSelected={SPSSelected}
                setSPSSelected={setSPSSelected}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default SpeciesAnalysisModal;
