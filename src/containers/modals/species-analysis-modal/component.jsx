import React from 'react';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import { Modal } from 'he-components';

import SpeciesCard from 'containers/sidebars/aoi-sidebar/species-card/component';

import styles from './styles.module';

import SrsChart from './srs-chart';

const Spinner = loadable(() => import('components/spinner'));

function SpeciesAnalysisModal({
  isOpen,
  handleModalClose,
  loading,
  cardProps,
}) {
  const t = useT();
  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContent}>
        <div className={styles.cardContainer}>
          <SpeciesCard {...cardProps} insideModal />
        </div>
        <div>
          {loading ? (
            <Spinner floating />
          ) : (
            <>
              <h1>{t('Which species need more protection?')}</h1>
              <SrsChart width={800} height={800} />
            </>
          )}
        </div>
      </div>
    </Modal>
  );
}

export default SpeciesAnalysisModal;
