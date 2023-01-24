import React from 'react';

import loadable from '@loadable/component';

import { useT } from '@transifex/react';

import { Modal } from 'he-components';

import styles from './styles.module';

const Spinner = loadable(() => import('components/spinner'));

function SpeciesAnalysisModal({ isOpen, handleModalClose, loading }) {
  const t = useT();
  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose} theme={styles}>
      <div className={styles.modalContainer}>
        {loading && <Spinner floating />}
        <h1>{t('Which species need more protection?')}</h1>
      </div>
    </Modal>
  );
}

export default SpeciesAnalysisModal;
