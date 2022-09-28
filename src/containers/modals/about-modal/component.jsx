import React from 'react';

import PropTypes from 'prop-types';

import cx from 'classnames';
import { Modal } from 'he-components';
import ReactMarkdown from 'react-markdown/with-html';

import styles from './styles.module';

function AboutModal({ handleClose, isOpen, sections }) {
  console.log(sections);
  return (
    <Modal isOpen={isOpen} onRequestClose={handleClose} theme={styles}>
      <div className={styles.modalContainer}>
        <div className={styles.wrapper}>
          {sections &&
            sections.map(({ title, description, content, theme }) => (
              <div
                className={cx(styles.section, theme)}
                key={`${title}-section`}
              >
                <h1 className={styles.title} key={title}>
                  {title}
                </h1>
                <div className={styles.logosWrapper} key={`${title}-content`}>
                  {content &&
                    content.map(({ href, image, label, index }) => {
                      return label ? (
                        <span key={`${index}-${href}`}>{label}</span>
                      ) : (
                        <a
                          key={`${index}-${href}`}
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
                      );
                    })}
                </div>
                {description &&
                  description.map((paragraph) => (
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

AboutModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          image: PropTypes.shape({
            alt: PropTypes.string,
            src: PropTypes.string,
          }),
        })
      ),
      description: PropTypes.arrayOf(PropTypes.string),
      theme: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

AboutModal.defaultProps = {
  isOpen: false,
};

export default AboutModal;
