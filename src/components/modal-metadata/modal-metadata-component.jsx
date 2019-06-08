import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { ReactComponent as InfoIcon } from 'icons/info.svg';

import { Modal, Loading } from 'he-components';
import styles from './modal-styles.module.scss';

const ModalMetadata = ({ isOpen, handleClose, loading, title, metadata = {} }) => {
  return (
    <Modal
      onRequestClose={handleClose}
      isOpen={isOpen}
      theme={styles}
    >
      <h2>{title}</h2>
      {
        loading ? <Loading height={200} /> : (
          <>
            {
              metadata &&
                metadata.description &&
                <p className={styles.metadataDescription}>{metadata.description}</p>
            }
            <dl className={styles.metadataList}>
              {
                metadata && metadata.category && (
                <>
                  <dt>Category:</dt>
                  <dd>{metadata.category}</dd>
                  <br />
                </>
                  )
              }
              {
                metadata && metadata.dataset && (
                <>
                  <dt>Dataset:</dt>
                  <dd>{metadata.dataset}</dd>
                  <br />
                </>
                  )
              }
              {
                metadata && metadata.layer && (
                <>
                  <dt>Layer:</dt>
                  <dd>{metadata.layer}</dd>
                  <br />
                </>
                  )
              }
            </dl>
            {
              metadata && metadata.source && (
              <p className={styles.metadataSource}>
                    Source:{' '}
                {metadata.source}
                {' '}
                {
                      metadata.sourceUrl && (
                      <a href={metadata.sourceUrl} target="_blank" rel="noopener noreferrer">
                        {metadata.sourceUrl}
                      </a>
                        )
                    }
              </p>
                )
            }
            {
              metadata && metadata.molLogo && (
              <div className={styles.logoContainer}>
                <a href="https://mol.org/" target="_blank" rel="noopener noreferrer">
                  <img
                    className={styles.logoImg}
                    src="/img/partners/mol-logo.png"
                    alt="Mol logo"
                  />
                </a>
              </div>
                )
            }
          </>
)
      }
    </Modal>
  )
}

ModalMetadata.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  metadata: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
};

ModalMetadata.defaultProps = { title: '', loading: false, metadata: undefined };

const InfoModal = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <InfoIcon onClick={handleOpenModal} />
      {isModalOpen && <ModalMetadata isOpen={isModalOpen} handleClose={handleCloseModal} />}
    </>
  )
}

export default InfoModal;
