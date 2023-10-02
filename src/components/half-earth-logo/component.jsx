import React from 'react';

import { t } from '@transifex/native';

import cx from 'classnames';
import logoImgBlack from 'logos/eowilson_logo_black.png';
import logoImgColor from 'logos/eowilson_logo_v3.svg';
import heLogoImg from 'logos/he_logo.svg';
import heLogoImgColor from 'logos/he_logo_color.png';

import styles from './half-earth-logo-styles.module.scss';

const IMAGES = {
  eowilson: {
    default: logoImgColor,
    black: logoImgBlack,
    height: '52px',
  },
  he: {
    default: heLogoImg,
    black: heLogoImgColor,
    height: '30px',
  },
};

function Logo({ className, pdf, linkClassName }) {
  const alt = t('E.O. Wilson Biodiversity Foundation logo');
  const logo = (images) =>
    pdf ? (
      <img src={images.black} alt={alt} style={{ height: images.height }} />
    ) : (
      <img src={images.default} alt={alt} style={{ height: images.height }} />
    );

  return (
    <div className={cx(styles.logo, className)}>
      <a
        href="https://eowilsonfoundation.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={cx(styles.link, linkClassName)}
      >
        {logo(IMAGES.eowilson)}
      </a>
      <a
        href="https://map.half-earthproject.org/"
        target="_blank"
        rel="noopener noreferrer"
        className={cx(styles.link, linkClassName)}
      >
        {logo(IMAGES.he)}
      </a>
    </div>
  );
}

export default Logo;
