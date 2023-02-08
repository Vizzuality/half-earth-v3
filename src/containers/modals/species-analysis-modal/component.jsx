import React, { useState, useRef, useEffect } from 'react';

import loadable from '@loadable/component';

import { T } from '@transifex/react';

import { Modal } from 'he-components';

import SpeciesCard from 'containers/sidebars/aoi-sidebar/species-card/component';

import styles from './styles.module';

import SpsChart from './sps-chart';
import SpsLegend from './sps-legend';

const Spinner = loadable(() => import('components/spinner'));

function SpeciesAnalysisModal({
  isOpen,
  handleModalClose,
  loading,
  cardProps,
}) {
  const [globalRangeSelected, setGlobalRangeSelected] = useState({
    min: 0,
    max: 1,
  });
  const [SPSSelected, setSPSSelected] = useState({ min: 0, max: 4 });
  const [chartWidth, setChartWidth] = useState(700);

  const chartResponsiveRef = useRef();
  useEffect(() => {
    const onChartResize = () => {
      if (chartResponsiveRef && chartResponsiveRef.current) {
        const { width } = chartResponsiveRef.current.getBoundingClientRect();
        setChartWidth(width);
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
              <p className={styles.moreProtectionSentence}>
                {globalRangeSelected.max === 1 && (
                  <T
                    _str="Currently {highlighted} in the chart are the species that {needMoreProtection}."
                    highlighted={
                      <span className={styles.bold}>
                        <T
                          _str="highlighted"
                          _comment="Currently (highlighted) in the chart are the species that {need more protection}."
                        />
                      </span>
                    }
                    needMoreProtection={
                      <span className={styles.bold}>
                        <T
                          _str="need more protection"
                          _comment="Currently highlighted in the chart are the species that {need more protection}."
                        />
                      </span>
                    }
                  />
                )}
              </p>
              <div ref={chartResponsiveRef} className={styles.chartResponsive}>
                <SpsChart
                  data={cardProps && cardProps.SPSData}
                  width={chartWidth}
                  selectedSpecies={cardProps && cardProps.individualSpeciesData}
                  globalRangeSelected={globalRangeSelected}
                  SPSSelected={SPSSelected}
                />
              </div>
              <SpsLegend
                data={cardProps && cardProps.SPSData}
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
