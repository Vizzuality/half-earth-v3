import React from 'react';
import cx from 'classnames';
import { Modal } from 'he-components';
import { ReactComponent as PartyIcon } from 'icons/party.svg';

import styles from './release-notes-modal.module.scss';

const ReleaseNotesModalComponent = ({
  isModalOpen,
  handleModalClose,
  releaseNotesTexts,
}) => (
  <Modal onRequestClose={handleModalClose} isOpen={isModalOpen} theme={styles}>
    <header className={styles.header}>
      <PartyIcon className={styles.icon} />
      <h1 className={styles.title}>What's new!</h1>
      <PartyIcon className={cx(styles.icon, styles.flipped)} />
    </header>
    {releaseNotesTexts &&
      releaseNotesTexts.map((note) => (
        <section className={styles.content} key={note.title}>
          <p className={styles.title}>{note.title}</p>
          <p className={styles.body}>{note.body}</p>
        </section>
      ))}
  </Modal>
);

export default ReleaseNotesModalComponent;
