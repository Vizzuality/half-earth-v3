import React from 'react';

import cx from 'classnames';
import { Modal } from 'he-components';
import ReactMarkdown from 'react-markdown/with-html';

import styles from './styles.module';

function AboutModalComponent({ handleClose, isOpen, sections }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      theme={styles}
    >
      <div className={styles.modalContainer}>
        <div className={styles.wrapper}>
          {sections && sections.map(({
            title, description, content, theme,
          }) => (
            <div className={cx(styles.section, theme)} key={`${title}-section`}>
              <h1 className={styles.title} key={title}>{title}</h1>
              <div className={styles.logosWrapper} key={`${title}-content`}>
                {content && content
                  .map(({ href, image, label }) => {
                    return (
                      label ? (
                        <span key={label}>{label}</span>
                      ) : (
                        <a
                          key={label}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            alt={image.alt}
                            className={cx({ [styles.narrow]: image.className })}
                            src={image.src}
                          />
                        </a>
                      ));
                  })}
              </div>
              {description && description.map((paragraph) => (
                <ReactMarkdown
                  key={paragraph}
                  className={styles.description}
                  source={paragraph}
                  escapeHtml={false}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

export default AboutModalComponent;
