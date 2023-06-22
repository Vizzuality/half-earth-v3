import React from 'react';

import { t } from '@transifex/native';

import logoImg from 'icons/eowilson_logo.png';
import logoImgBlack from 'icons/eowilson_logo_black.png';

function Logo({ className, pdf, linkClassName }) {
  const alt = t('E.O. Wilson Biodiversity Foundation logo');
  const logo = pdf ? (
    <img src={logoImgBlack} alt={alt} className={className} />
  ) : (
    <img src={logoImg} alt={alt} className={className} />
  );

  return (
    <a
      href="https://eowilsonfoundation.org/"
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      {logo}
    </a>
  );
}

export default Logo;
