import React from 'react';
import ReactMarkdown from 'react-markdown';

import { useT } from '@transifex/react';

import PropTypes from 'prop-types';

import { Modal, Loading } from 'he-components';
import MolLogo from 'logos/mol.png';

import styles from './modal-metadata-styles.module.scss';

function ModalMetadata({
  isOpen,
  handleClose,
  loading,
  metadata,
  additionalContent,
}) {
  const t = useT();
  return (
    <Modal onRequestClose={handleClose} isOpen={isOpen} theme={styles}>
      {loading ? (
        <Loading height={200} />
      ) : (
        <>
          {metadata && metadata.title && (
            <h2 className={styles.modalTitle}>{metadata.title}</h2>
          )}
          {metadata && metadata.description && (
            <p className={styles.metadataDescription}>{metadata.description}</p>
          )}
          <dl className={styles.metadataList}>
            {metadata && metadata.category && (
              <>
                <dt>Category:</dt>
                <dd>{metadata.category}</dd>
                <br />
              </>
            )}
            {metadata && metadata.dataset && (
              <>
                <dt>Dataset:</dt>
                <dd>{metadata.dataset}</dd>
                <br />
              </>
            )}
            {metadata && metadata.layer && (
              <>
                <dt>Layer:</dt>
                <dd>{metadata.layer}</dd>
                <br />
              </>
            )}
          </dl>
          {metadata &&
            metadata.hasAdditionalContent === 'TRUE' &&
            additionalContent}
          {metadata && metadata.source && (
            <div className={styles.metadataSource}>
              <ReactMarkdown
                renderers={{
                  link: ({ href, children }) => (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children[0].props.children}
                    </a>
                  ),
                }}
              >
                {`${t('Source:')} ${metadata.source}`}
              </ReactMarkdown>
            </div>
          )}
          {metadata && metadata.molLogo === 'TRUE' && (
            <div className={styles.logoContainer}>
              <a
                href="https://mol.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className={styles.logoImg}
                  src={MolLogo}
                  alt={t('Mol logo')}
                />
              </a>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

ModalMetadata.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  metadata: PropTypes.shape(),
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  additionalContent: PropTypes.node,
};

ModalMetadata.defaultProps = {
  title: '',
  loading: false,
  metadata: undefined,
  additionalContent: undefined,
};

export default ModalMetadata;
