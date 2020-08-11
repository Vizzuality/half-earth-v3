import React from 'react';
import PropTypes from 'prop-types';

import { Modal, Loading } from 'he-components';
import MolLogo from 'logos/mol.png';
import ReactMarkdown from 'react-markdown';
import styles from './modal-metadata-styles.module.scss';

const ModalMetadata = ({ isOpen, handleClose, loading, title, metadata }) => {
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
                <ReactMarkdown source={`Source: ${metadata.source}`} escapeHtml={false}/>
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
              metadata && metadata.molLogo === "TRUE" && (
              <div className={styles.logoContainer}>
                <a href="https://mol.org/" target="_blank" rel="noopener noreferrer">
                  <img
                    className={styles.logoImg}
                    src={MolLogo}
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

export default ModalMetadata;
