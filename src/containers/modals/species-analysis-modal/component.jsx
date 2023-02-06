import React from 'react';

import loadable from '@loadable/component';

import { T } from '@transifex/react';

import { Modal } from 'he-components';

import SpeciesCard from 'containers/sidebars/aoi-sidebar/species-card/component';

import styles from './styles.module';

import SpsChart from './sps-chart';

const Spinner = loadable(() => import('components/spinner'));

function SpeciesAnalysisModal({
  isOpen,
  handleModalClose,
  loading,
  cardProps,
}) {
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
              <SpsChart
                data={cardProps && cardProps.SPSData}
                width={700}
                height={700}
                selectedSpecies={cardProps && cardProps.individualSpeciesData}
              />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default SpeciesAnalysisModal;
