import React, { useState, useRef, useEffect, useMemo } from 'react';

import loadable from '@loadable/component';

import { T } from '@transifex/react';

import { Modal } from 'he-components';

import SpeciesCard from 'containers/sidebars/aoi-sidebar/species-card/component';

import styles from './styles.module.scss';

import SpsChart from './sps-chart';
import SpsLegend from './sps-legend';
import { SpeciesModalProps } from './types';

// TODO: TS-TODO Fix import of components
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const Spinner = loadable(() => import('components/spinner'));

function SpeciesAnalysisModal({
  isOpen,
  handleModalClose,
  loading,
  cardProps,
  speciesData,
  setSpecieBySliceNumber,
}: SpeciesModalProps) {
  const [globalRangeSelected, setGlobalRangeSelected] = useState({
    min: 3,
    max: 4,
  });

  const [SPSSelected, setSPSSelected] = useState({ min: 0, max: 1 });
  const [chartWidth, setChartWidth] = useState(759);
  const chartResponsiveRef = useRef<HTMLInputElement>();
  useEffect(() => {
    const onChartResize = () => {
      if (chartResponsiveRef && chartResponsiveRef.current) {
        const { width } = chartResponsiveRef.current.getBoundingClientRect();
        setChartWidth(width);
      }
    };
    if (isOpen) {
      // Resize the chart when the modal just opened
      setTimeout(() => {
        onChartResize();
      }, 1);
      window.addEventListener('resize', onChartResize);
      return () => window.removeEventListener('resize', onChartResize);
    }
    return undefined;
  }, [chartResponsiveRef.current, isOpen]);

  if (!cardProps) return null;

  const { SPSData, individualSpeciesData, selectedSpeciesFilter } = cardProps;

  const filteredSpeciesSliceNumber = useMemo(
    () =>
      speciesData
        .map((specieData) => {
          if (
            selectedSpeciesFilter.slug === 'all' ||
            specieData.category === selectedSpeciesFilter.slug
          ) {
            return specieData.sliceNumber;
          }
          return null;
        })
        .filter(Boolean),
    [speciesData, selectedSpeciesFilter]
  );
  const filteredSPSData = useMemo(
    () =>
      SPSData.filter((spsData) =>
        filteredSpeciesSliceNumber.includes(spsData.SliceNumber)
      ),
    [filteredSpeciesSliceNumber, SPSData]
  );

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
                {SPSSelected.max === 1 && (
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
                  data={filteredSPSData}
                  width={chartWidth}
                  selectedSpecies={individualSpeciesData}
                  globalRangeSelected={globalRangeSelected}
                  SPSSelected={SPSSelected}
                  speciesData={speciesData}
                  setSpecieBySliceNumber={setSpecieBySliceNumber}
                />
              </div>
              <SpsLegend
                data={filteredSPSData}
                globalRangeSelected={globalRangeSelected}
                setGlobalRangeSelected={setGlobalRangeSelected}
                SPSSelected={SPSSelected}
                setSPSSelected={setSPSSelected}
                speciesData={speciesData}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default SpeciesAnalysisModal;
