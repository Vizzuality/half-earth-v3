import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import cx from 'classnames';

import styles from './partners-styles.module.scss';

const Logo = ({ href, image, label }) => (
  label ? (
    <span>{label}</span>
  ) : (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src={image.src} alt={image.alt} className={cx({[styles.narrow]: image.className })} />
    </a>
  )
);

const PartnersComponent = ({ sections }) => (
  <div className={styles.wrapper}>
    {sections && sections.map(({ title, description, content, theme }) => (
      <div className={cx(styles.section, theme)} key={`${title}-section`}>
        <h1 className={styles.title} key={title}>{title}</h1>
        <div className={styles.logosWrapper} key={`${title}-content`}>
          {content && content.map(logo => <Logo key={logo.href} {...logo} />)}
        </div>
        {description && description.map(paragraph => (
          <ReactMarkdown
            className={styles.description}
            source={paragraph}
            escapeHtml={false}
          />
        ))}
      </div>
    ))}
  </div>
);

export default PartnersComponent;
