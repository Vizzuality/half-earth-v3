import React from 'react';
import cx from 'classnames';
import sections from './partners-data';

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
      <img src={image.src} alt={image.alt} className={image.className} />
    </a>
  )
);

const PartnersComponent = () => (
  <div className={styles.wrapper}>
    {sections.map(({ title, description, content, theme }) => (
      <div className={cx(styles.section, theme)} key={`${title}-section`}>
        <h1 className={styles.title} key={title}>{title}</h1>
        <div className={styles.logosWrapper} key={`${title}-content`}>
          {content && content.map(logo => <Logo key={logo.href} {...logo} />)}
        </div>
        <p className={styles.description} key={description}>{description}</p>
      </div>
    ))}
  </div>
);

export default PartnersComponent;
